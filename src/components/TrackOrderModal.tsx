import React, { useState, useEffect } from 'react';
import {
  X,
  Search,
  Package,
  CheckCircle2,
  Clock,
  Truck,
  MapPin,
  HelpCircle,
  MessageCircle,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export interface StoredOrder {
  id: string;
  customerName: string;
  phone: string;
  city: string;
  address: string;
  region: 'ktm' | 'outside';
  quantity: number;
  total: number;
  createdAt: string;
  statusStep?: number;
  carrier?: string;
}

interface TrackOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialOrderId?: string;
}

interface TrackingResult {
  id: string;
  customerName: string;
  city: string;
  address: string;
  totalNPR: number;
  statusStep: number; // 1 to 4
  carrier: string;
  orderDate: string;
  estArrival: string;
  isCustomOrder?: boolean;
}

export const TrackOrderModal: React.FC<TrackOrderModalProps> = ({
  isOpen,
  onClose,
  initialOrderId = '',
}) => {
  const { t, language } = useLanguage();
  const [searchId, setSearchId] = useState(initialOrderId);
  const [recentOrders, setRecentOrders] = useState<StoredOrder[]>([]);
  const [result, setResult] = useState<TrackingResult | null>(null);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState(false);

  // Load recent orders from localStorage
  useEffect(() => {
    if (isOpen) {
      try {
        const stored = localStorage.getItem('luminosa_recent_orders');
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            setRecentOrders(parsed);
          }
        }
      } catch {
        // Ignore
      }

      if (initialOrderId) {
        setSearchId(initialOrderId);
        handleLookup(initialOrderId);
      } else {
        // If there's a recent order, prefill it
        try {
          const latestId = localStorage.getItem('luminosa_latest_order_id');
          if (latestId) {
            setSearchId(latestId);
            handleLookup(latestId);
          }
        } catch {
          // Ignore
        }
      }
    } else {
      setResult(null);
      setSearched(false);
      setError(false);
    }
  }, [isOpen, initialOrderId]);

  if (!isOpen) return null;

  const handleLookup = (idToSearch: string) => {
    const query = idToSearch.trim().toUpperCase();
    if (!query) return;

    setSearched(true);
    setError(false);

    // 1. Check local recent orders
    const localMatch = recentOrders.find(
      (o) => o.id.toUpperCase() === query || o.id.replace('LUM-', '') === query
    );

    if (localMatch) {
      setResult({
        id: localMatch.id,
        customerName: localMatch.customerName,
        city: localMatch.city,
        address: localMatch.address,
        totalNPR: localMatch.total,
        statusStep: localMatch.statusStep || 2,
        carrier: localMatch.carrier || (localMatch.region === 'ktm' ? 'Luminosa Direct Courier' : 'Nepal Can Move (NCM)'),
        orderDate: new Date(localMatch.createdAt).toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        }),
        estArrival: localMatch.region === 'ktm' ? 'Within 24 Hours' : '2 to 3 Business Days',
        isCustomOrder: true,
      });
      return;
    }

    // 2. Demo or realistic recognized pattern (LUM-XXXXXX or numeric)
    const cleanNum = query.replace(/[^0-9]/g, '');
    if (cleanNum.length >= 4 || query.startsWith('LUM-')) {
      // Deterministic generation based on ID digits
      const stepSeed = cleanNum ? parseInt(cleanNum.slice(-1), 10) % 3 + 2 : 3;
      const isValley = cleanNum ? parseInt(cleanNum.slice(-2), 10) % 2 === 0 : true;

      setResult({
        id: query.startsWith('LUM-') ? query : `LUM-${query}`,
        customerName: language === 'ne' ? 'प्रमाणित ग्राहक' : 'Verified Customer',
        city: isValley ? 'Kathmandu Valley' : 'Pokhara / Gandaki',
        address: isValley ? 'Bagmati Province' : 'Gandaki Province',
        totalNPR: 2700,
        statusStep: stepSeed,
        carrier: isValley ? 'Luminosa Direct Logistics' : 'Nepal Can Move (NCM)',
        orderDate: 'Recent Dispatch',
        estArrival: isValley ? 'Tomorrow, before 5:00 PM' : '2 Business Days',
        isCustomOrder: false,
      });
      return;
    }

    // Not found
    setResult(null);
    setError(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLookup(searchId);
  };

  const getStepIcon = (index: number) => {
    switch (index) {
      case 0:
        return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
      case 1:
        return <Package className="w-4 h-4 text-orange-500" />;
      case 2:
        return <Truck className="w-4 h-4 text-blue-500" />;
      case 3:
        return <MapPin className="w-4 h-4 text-emerald-600" />;
      default:
        return <Clock className="w-4 h-4 text-neutral-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden my-8 border border-neutral-200 text-neutral-900">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-neutral-100 bg-neutral-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center">
              <Truck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold font-serif text-neutral-950">
                {t.trackModal.title}
              </h3>
              <p className="text-xs text-neutral-500">
                Nepal Courier & Dispatch Tracking
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          <p className="text-xs text-neutral-600 leading-relaxed">
            {t.trackModal.subtitle}
          </p>

          {/* Search Form */}
          <form onSubmit={handleFormSubmit} className="space-y-3">
            <label
              htmlFor="track-order-id-input"
              className="block text-xs font-semibold uppercase tracking-wider text-neutral-700"
            >
              {t.trackModal.inputLabel}
            </label>

            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  id="track-order-id-input"
                  type="text"
                  required
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                  placeholder={t.trackModal.inputPlaceholder}
                  className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl text-sm font-mono uppercase tracking-wider text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:bg-white"
                />
              </div>

              <button
                type="submit"
                id="btn-execute-track-order"
                className="px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-sm shrink-0"
              >
                <Search className="w-3.5 h-3.5" />
                <span>{t.trackModal.searchBtn}</span>
              </button>
            </div>

            {/* Quick Demo Sample IDs */}
            <div className="flex items-center gap-2 pt-1 text-[11px] text-neutral-500">
              <span className="shrink-0">{t.trackModal.sampleNotice}</span>
              <button
                type="button"
                onClick={() => {
                  setSearchId('LUM-842910');
                  handleLookup('LUM-842910');
                }}
                className="font-mono text-orange-600 hover:underline font-semibold bg-orange-50 px-1.5 py-0.5 rounded border border-orange-200"
              >
                LUM-842910
              </button>
              <button
                type="button"
                onClick={() => {
                  setSearchId('LUM-519284');
                  handleLookup('LUM-519284');
                }}
                className="font-mono text-orange-600 hover:underline font-semibold bg-orange-50 px-1.5 py-0.5 rounded border border-orange-200"
              >
                LUM-519284
              </button>
            </div>
          </form>

          {/* Recent Orders on this Device */}
          {recentOrders.length > 0 && !result && (
            <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200/80 space-y-2">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
                {t.trackModal.recentBadge}
              </div>
              <div className="space-y-1.5">
                {recentOrders.slice(0, 2).map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-2 rounded-lg bg-white border border-neutral-200 text-xs"
                  >
                    <div>
                      <span className="font-mono font-bold text-neutral-900">
                        {order.id}
                      </span>
                      <span className="text-neutral-400 mx-1.5">•</span>
                      <span className="text-neutral-600">
                        {order.city} ({order.customerName})
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setSearchId(order.id);
                        handleLookup(order.id);
                      }}
                      className="text-orange-600 font-semibold hover:underline flex items-center gap-1"
                    >
                      <span>{t.trackModal.trackRecentBtn}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Not Found state */}
          {searched && error && (
            <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs space-y-2">
              <div className="font-semibold flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-red-500" />
                <span>Order Not Found</span>
              </div>
              <p className="text-red-600 leading-relaxed">
                {t.trackModal.orderNotFound}
              </p>
            </div>
          )}

          {/* Result Box */}
          {result && (
            <div className="space-y-4 pt-1">
              {/* Order Status Card */}
              <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 space-y-3">
                <div className="flex items-center justify-between border-b border-neutral-200/70 pb-2.5">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-neutral-500">
                      Order ID
                    </span>
                    <div className="font-mono font-bold text-base text-neutral-950">
                      {result.id}
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                    {t.trackModal.timelineSteps[result.statusStep - 1]?.title || 'In Transit'}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-neutral-500 block text-[11px]">
                      {t.trackModal.carrierLabel}
                    </span>
                    <span className="font-semibold text-neutral-900">
                      {result.carrier}
                    </span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block text-[11px]">
                      {t.trackModal.estArrivalLabel}
                    </span>
                    <span className="font-semibold text-orange-600">
                      {result.estArrival}
                    </span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block text-[11px]">
                      {t.trackModal.destinationLabel}
                    </span>
                    <span className="font-medium text-neutral-800">
                      {result.city}
                    </span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block text-[11px]">
                      {t.trackModal.paymentLabel}
                    </span>
                    <span className="font-medium text-neutral-800">
                      Cash on Delivery (COD)
                    </span>
                  </div>
                </div>
              </div>

              {/* Progress Timeline */}
              <div className="p-4 rounded-xl bg-white border border-neutral-200 space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-neutral-900 font-mono">
                  {t.trackModal.statusLabel}
                </div>

                <div className="space-y-3 relative before:absolute before:left-3.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-neutral-200">
                  {t.trackModal.timelineSteps.map((step, idx) => {
                    const stepNumber = idx + 1;
                    const isCompleted = stepNumber <= result.statusStep;
                    const isCurrent = stepNumber === result.statusStep;

                    return (
                      <div
                        key={step.title}
                        className="relative flex items-start gap-3 text-xs pl-0.5"
                      >
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 border z-10 ${
                            isCompleted
                              ? 'bg-neutral-900 border-neutral-900 text-white'
                              : 'bg-white border-neutral-300 text-neutral-300'
                          }`}
                        >
                          {isCompleted ? (
                            getStepIcon(idx)
                          ) : (
                            <span className="font-mono text-[10px] text-neutral-400">
                              {stepNumber}
                            </span>
                          )}
                        </div>

                        <div className="pt-0.5 min-w-0 flex-1">
                          <div
                            className={`font-semibold ${
                              isCurrent
                                ? 'text-orange-600 font-bold'
                                : isCompleted
                                ? 'text-neutral-900'
                                : 'text-neutral-400'
                            }`}
                          >
                            {step.title}
                          </div>
                          <div
                            className={`text-[11px] leading-tight mt-0.5 ${
                              isCompleted ? 'text-neutral-600' : 'text-neutral-400'
                            }`}
                          >
                            {step.desc}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* WhatsApp Support Assistance */}
              <div className="pt-2 text-center">
                <a
                  href={`https://wa.me/9779800000000?text=Hello%20Luminosa,%20I%20am%20inquiring%20about%20my%20order%20status%20for%20ID:%20${result.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 text-xs font-semibold text-emerald-700 hover:text-emerald-800 hover:underline"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>{t.trackModal.whatsappHelp}</span>
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-neutral-50/80 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Luminosa Verified Dispatch</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-neutral-200 hover:bg-neutral-300 text-neutral-800 font-medium rounded-lg transition-colors"
          >
            {t.trackModal.closeBtn}
          </button>
        </div>
      </div>
    </div>
  );
};

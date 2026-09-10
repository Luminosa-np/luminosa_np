import React, { useState } from 'react';
import { X, CheckCircle, MessageCircle } from 'lucide-react';
import { LUMINOSA_PRODUCT } from '../data/luminosaData';
import { OrderFormState, ProductColor } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuantity?: number;
  initialColor?: ProductColor;
}

export const OrderModal: React.FC<OrderModalProps> = ({
  isOpen,
  onClose,
  initialQuantity = 1,
  initialColor = 'black',
}) => {
  const { t, language } = useLanguage();
  const product = LUMINOSA_PRODUCT;
  const [formData, setFormData] = useState<OrderFormState>({
    fullName: '',
    phone: '',
    email: '',
    region: 'ktm',
    city: 'Kathmandu',
    address: '',
    quantity: Math.max(1, initialQuantity),
    color: initialColor,
    notes: '',
    paymentMethod: 'cod',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [confirmedOrderId, setConfirmedOrderId] = useState('');

  if (!isOpen) return null;

  const unitPrice = product.priceNPR;
  const subtotal = unitPrice * formData.quantity;
  const deliveryFee = formData.region === 'ktm' ? 100 : 150;
  const total = subtotal + deliveryFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const generatedId = `LUM-${Math.floor(100000 + Math.random() * 900000)}`;

    try {
      const newOrder = {
        id: generatedId,
        customerName: formData.fullName,
        phone: formData.phone,
        city: formData.city,
        address: formData.address,
        region: formData.region,
        quantity: formData.quantity,
        color: formData.color || 'black',
        total: total,
        createdAt: new Date().toISOString(),
        statusStep: 1,
        carrier: formData.region === 'ktm' ? 'Luminosa Direct Express' : 'Nepal Can Move (NCM)',
      };
      const existing = JSON.parse(localStorage.getItem('luminosa_recent_orders') || '[]');
      localStorage.setItem('luminosa_recent_orders', JSON.stringify([newOrder, ...existing]));
      localStorage.setItem('luminosa_latest_order_id', generatedId);
    } catch {
      // Ignore storage restrictions
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setConfirmedOrderId(generatedId);
      setOrderConfirmed(true);
    }, 600);
  };

  const generateWhatsAppMessage = () => {
    const colorLabel = formData.color === 'green' ? 'Forest Green' : 'Matte Black';
    const text = `*New Order: ${confirmedOrderId}*%0A` +
      `Product: ${product.name} (${colorLabel}, Qty: ${formData.quantity})%0A` +
      `Total: NPR ${total.toLocaleString()}%0A` +
      `Customer: ${formData.fullName}%0A` +
      `Phone: ${formData.phone}%0A` +
      `Delivery Location: ${formData.address}, ${formData.city} (${formData.region === 'ktm' ? 'Inside Valley' : 'Outside Valley'})%0A` +
      `Payment: ${formData.paymentMethod.toUpperCase()}`;
    return `https://wa.me/9779800000000?text=${text}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-lg bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl overflow-hidden my-8 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100 transition-colors">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-neutral-100 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-850">
          <div>
            <h3 className="text-lg font-bold font-serif text-neutral-950 dark:text-white">
              {orderConfirmed ? t.orderModal.titleDone : t.orderModal.title}
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
              {orderConfirmed ? t.orderModal.subDone : t.orderModal.sub}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {orderConfirmed ? (
          <div className="p-6 text-center space-y-5">
            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10" />
            </div>

            <div>
              <div className="text-xs uppercase font-mono tracking-wider text-neutral-400 dark:text-neutral-500">
                {t.orderModal.trackingId}
              </div>
              <div className="text-2xl font-mono font-bold text-neutral-950 dark:text-white mt-0.5">
                {confirmedOrderId}
              </div>
              <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-2 max-w-sm mx-auto">
                {t.orderModal.confirmMsg}
              </p>
            </div>

            {/* Order Summary box */}
            <div className="bg-neutral-50 dark:bg-neutral-800 p-4 rounded-xl border border-neutral-200 dark:border-neutral-700 text-left text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-neutral-500 dark:text-neutral-400">{t.orderModal.recipient}</span>
                <span className="font-semibold text-neutral-900 dark:text-white">{formData.fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500 dark:text-neutral-400">{language === 'ne' ? 'छानिएको रङ' : 'Color Variant'}</span>
                <span className="font-semibold text-neutral-900 dark:text-white">
                  {formData.color === 'green'
                    ? (language === 'ne' ? 'हरियो (Forest Green)' : 'Forest Green')
                    : (language === 'ne' ? 'कालो (Matte Black)' : 'Matte Black')}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500 dark:text-neutral-400">{t.orderModal.addressLabel}</span>
                <span className="text-neutral-900 dark:text-white">{formData.address}, {formData.city}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500 dark:text-neutral-400">{t.orderModal.amountToPay}</span>
                <span className="font-bold text-orange-600 dark:text-orange-400 font-mono text-sm">
                  {language === 'ne' ? `रु ${total.toLocaleString()}` : `NPR ${total.toLocaleString()}`}
                </span>
              </div>
            </div>

            {/* WhatsApp Direct Notification */}
            <div className="space-y-2 pt-2">
              <a
                href={generateWhatsAppMessage()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{t.orderModal.whatsappBtn}</span>
              </a>

              <button
                type="button"
                onClick={onClose}
                className="w-full py-2.5 text-xs text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white font-medium cursor-pointer"
              >
                {t.orderModal.doneBtn}
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
            {/* Product recap pill with color variant selector */}
            <div className="p-3 bg-neutral-100 dark:bg-neutral-800 rounded-xl space-y-2.5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-bold text-neutral-900 dark:text-white text-sm font-serif">{product.name}</div>
                  <div className="text-[11px] text-neutral-500 dark:text-neutral-400">
                    {language === 'ne' ? `रु ${product.priceNPR.toLocaleString()}` : `NPR ${product.priceNPR.toLocaleString()}`}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-[11px] text-neutral-600 dark:text-neutral-300">{t.product.qty}:</label>
                  <select
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) })}
                    className="bg-white dark:bg-neutral-700 dark:text-white border border-neutral-300 dark:border-neutral-600 rounded-md px-2 py-1 text-xs font-semibold"
                  >
                    {[1, 2, 3, 4, 5].map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Color switcher inside modal */}
              <div className="pt-2 border-t border-neutral-200 dark:border-neutral-700 flex items-center justify-between">
                <span className="text-[11px] text-neutral-600 dark:text-neutral-400 font-medium">
                  {language === 'ne' ? 'रङ:' : 'Color:'}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, color: 'black' })}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-medium flex items-center gap-1.5 transition-all ${
                      formData.color === 'black'
                        ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 font-semibold'
                        : 'bg-white dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 border border-neutral-300 dark:border-neutral-600'
                    }`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-[#2b2d30] border border-neutral-400" />
                    <span>{language === 'ne' ? 'कालो' : 'Black'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, color: 'green' })}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-medium flex items-center gap-1.5 transition-all ${
                      formData.color === 'green'
                        ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 font-semibold'
                        : 'bg-white dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 border border-neutral-300 dark:border-neutral-600'
                    }`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-[#3b533b] border border-emerald-400" />
                    <span>{language === 'ne' ? 'हरियो' : 'Green'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Contact Details */}
            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-1">
                  {t.orderModal.fullName}
                </label>
                <input
                  type="text"
                  required
                  placeholder={language === 'ne' ? 'उदा. रमेश श्रेष्ठ' : 'e.g. Ramesh Shrestha'}
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white text-xs focus:ring-1 focus:ring-neutral-900 dark:focus:ring-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-1">
                    {t.orderModal.mobile}
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="98XXXXXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white text-xs focus:ring-1 focus:ring-neutral-900 dark:focus:ring-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-1">
                    {t.orderModal.email}
                  </label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white text-xs focus:ring-1 focus:ring-neutral-900 dark:focus:ring-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Delivery Area Selection */}
              <div>
                <label className="block text-[11px] font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-1">
                  {t.orderModal.deliveryRegion}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, region: 'ktm', city: 'Kathmandu' })}
                    className={`p-2.5 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                      formData.region === 'ktm'
                        ? 'border-neutral-900 dark:border-white bg-neutral-900 dark:bg-neutral-750 text-white shadow-sm'
                        : 'border-neutral-200 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-600 text-neutral-700 dark:text-neutral-300 bg-white dark:bg-neutral-800/60'
                    }`}
                  >
                    <span className="font-semibold text-xs">{t.orderModal.insideValley}</span>
                    <span className={`text-[10px] ${formData.region === 'ktm' ? 'text-neutral-300' : 'text-neutral-500 dark:text-neutral-400'}`}>
                      {t.orderModal.insideValleyDesc}
                    </span>
                    <span className="font-mono text-[11px] mt-1 font-bold text-orange-400">
                      {language === 'ne' ? '+रु १०० डेलिभरी' : '+NPR 100 delivery'}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, region: 'outside_ktm', city: 'Pokhara' })}
                    className={`p-2.5 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                      formData.region === 'outside_ktm'
                        ? 'border-neutral-900 dark:border-white bg-neutral-900 dark:bg-neutral-750 text-white shadow-sm'
                        : 'border-neutral-200 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-600 text-neutral-700 dark:text-neutral-300 bg-white dark:bg-neutral-800/60'
                    }`}
                  >
                    <span className="font-semibold text-xs">{t.orderModal.outsideValley}</span>
                    <span className={`text-[10px] ${formData.region === 'outside_ktm' ? 'text-neutral-300' : 'text-neutral-500 dark:text-neutral-400'}`}>
                      {t.orderModal.outsideValleyDesc}
                    </span>
                    <span className="font-mono text-[11px] mt-1 font-bold text-orange-400">
                      {language === 'ne' ? '+रु १५० डेलिभरी' : '+NPR 150 delivery'}
                    </span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-1">
                    {t.orderModal.cityTown}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={language === 'ne' ? 'उदा. पोखरा, बानेश्वर' : 'e.g. Pokhara, Baneshwor'}
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white text-xs focus:ring-1 focus:ring-neutral-900 dark:focus:ring-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-1">
                    {t.orderModal.fullAddress}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={language === 'ne' ? 'वडा, चोक, घर नम्बर' : 'Ward, Landmark, House No.'}
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white text-xs focus:ring-1 focus:ring-neutral-900 dark:focus:ring-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <label className="block text-[11px] font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-1">
                  {t.orderModal.paymentMethod}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <label
                    className={`flex items-center gap-2 p-2.5 rounded-lg border cursor-pointer transition-all ${
                      formData.paymentMethod === 'cod'
                        ? 'border-orange-500 bg-orange-50 dark:bg-orange-950/40 text-orange-950 dark:text-orange-200 font-semibold'
                        : 'border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 bg-white dark:bg-neutral-800/60'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                      className="accent-orange-600"
                    />
                    <span>{t.orderModal.cod}</span>
                  </label>

                  <label
                    className={`flex items-center gap-2 p-2.5 rounded-lg border cursor-pointer transition-all ${
                      formData.paymentMethod === 'esewa'
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-200 font-semibold'
                        : 'border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 bg-white dark:bg-neutral-800/60'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={formData.paymentMethod === 'esewa'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'esewa' })}
                      className="accent-emerald-600"
                    />
                    <span>{t.orderModal.esewa}</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Bill Summary */}
            <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 space-y-1 text-xs">
              <div className="flex justify-between text-neutral-500 dark:text-neutral-400">
                <span>{t.orderModal.subtotal} ({formData.quantity})</span>
                <span className="font-mono text-neutral-800 dark:text-neutral-200">
                  {language === 'ne' ? `रु ${subtotal.toLocaleString()}` : `NPR ${subtotal.toLocaleString()}`}
                </span>
              </div>
              <div className="flex justify-between text-neutral-500 dark:text-neutral-400">
                <span>{t.orderModal.deliveryFee}</span>
                <span className="font-mono text-neutral-800 dark:text-neutral-200">
                  {language === 'ne' ? `रु ${deliveryFee}` : `NPR ${deliveryFee}`}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-neutral-950 dark:text-white pt-1 border-t border-neutral-200 dark:border-neutral-700">
                <span>{t.orderModal.totalPayable}</span>
                <span className="font-mono text-orange-600 dark:text-orange-400 text-base">
                  {language === 'ne' ? `रु ${total.toLocaleString()}` : `NPR ${total.toLocaleString()}`}
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              id="btn-submit-order-form"
              disabled={isSubmitting}
              className="w-full py-3 bg-orange-600 hover:bg-orange-500 text-white rounded-xl font-semibold text-xs uppercase tracking-wider transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 shadow cursor-pointer"
            >
              {isSubmitting ? (
                <span>{t.orderModal.confirming}</span>
              ) : (
                <span>
                  {t.orderModal.confirmBtn} {language === 'ne' ? `रु ${total.toLocaleString()}` : `NPR ${total.toLocaleString()}`}
                </span>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

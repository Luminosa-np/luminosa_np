import React from 'react';
import { Truck, MapPin, Banknote, Clock, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const DeliverySection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="delivery" className="py-16 lg:py-24 bg-white text-neutral-900 border-t border-neutral-200/80 scroll-mt-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-neutral-100 rounded-full text-xs font-semibold text-neutral-800 uppercase tracking-wider mb-2">
            <Truck className="w-3.5 h-3.5 text-orange-600" />
            <span>{t.delivery.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950 font-serif">
            {t.delivery.title}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-neutral-600 font-light">
            {t.delivery.sub}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Inside Kathmandu Valley */}
          <div className="p-7 rounded-2xl bg-neutral-50 border border-neutral-200/90 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center mb-5">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-neutral-950 font-serif mb-2">
                {t.delivery.card1Title}
              </h3>
              <p className="text-sm text-neutral-600 mb-4 leading-relaxed font-light">
                {t.delivery.card1Desc}
              </p>
              <div className="space-y-2 text-xs text-neutral-700">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-orange-600 shrink-0" />
                  <span><strong>{t.delivery.card1Timeline}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{t.delivery.card1Check}</span>
                </div>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-neutral-200 text-xs font-semibold text-neutral-900">
              {t.delivery.card1Footer}
            </div>
          </div>

          {/* Card 2: Outside Kathmandu Valley */}
          <div className="p-7 rounded-2xl bg-neutral-50 border border-neutral-200/90 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-5">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-neutral-950 font-serif mb-2">
                {t.delivery.card2Title}
              </h3>
              <p className="text-sm text-neutral-600 mb-4 leading-relaxed font-light">
                {t.delivery.card2Desc}
              </p>
              <div className="space-y-2 text-xs text-neutral-700">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-600 shrink-0" />
                  <span><strong>{t.delivery.card2Timeline}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{t.delivery.card2Check}</span>
                </div>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-neutral-200 text-xs font-semibold text-neutral-900">
              {t.delivery.card2Footer}
            </div>
          </div>

          {/* Card 3: Cash on Delivery & Payment */}
          <div className="p-7 rounded-2xl bg-neutral-900 text-white border border-neutral-800 shadow-lg flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-5">
                <Banknote className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white font-serif mb-2">
                {t.delivery.card3Title}
              </h3>
              <p className="text-sm text-neutral-300 mb-4 leading-relaxed font-light">
                {t.delivery.card3Desc}
              </p>
              <div className="space-y-2 text-xs text-neutral-300">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{t.delivery.card3Check1}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{t.delivery.card3Check2}</span>
                </div>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-neutral-800 text-xs font-medium text-emerald-400">
              {t.delivery.card3Footer}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

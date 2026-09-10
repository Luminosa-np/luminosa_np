import React from 'react';
import { Package, CheckCircle2, ShieldCheck } from 'lucide-react';
import boxImg from '../assets/images/luminosa_in_box_1788929167839.jpg';
import { useLanguage } from '../context/LanguageContext';

export const BoxContents: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16 lg:py-24 bg-neutral-50 text-neutral-900 border-t border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left: Box Flatlay Image */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden bg-white p-3 border border-neutral-200 shadow-md">
              <img
                src={boxImg}
                alt="What's in the box - Luminosa YSF-005BT and accessories"
                className="w-full aspect-[4/3] object-cover rounded-xl"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-6 left-6 right-6 bg-neutral-900/80 backdrop-blur-md text-white p-3 rounded-xl text-xs flex items-center justify-between">
                <span>{t.box.banner}</span>
                <span className="font-mono text-emerald-400">{t.box.readyToPlay}</span>
              </div>
            </div>
          </div>

          {/* Right: Detailed Checklist */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-neutral-200/70 rounded-full text-xs font-semibold text-neutral-800 uppercase tracking-wider">
              <Package className="w-3.5 h-3.5" />
              <span>{t.box.badge}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950 font-serif">
              {t.box.title}
            </h2>

            <p className="text-base text-neutral-600 font-light leading-relaxed">
              {t.box.sub}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {t.box.items.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 p-3.5 bg-white rounded-xl border border-neutral-200/80 shadow-xs"
                >
                  <CheckCircle2 className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm font-medium text-neutral-800">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <div className="p-4 bg-white rounded-xl border border-neutral-200/80 flex items-start gap-3 text-xs text-neutral-600">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-neutral-900 font-semibold block mb-0.5">
                  {t.box.inspectionTitle}
                </strong>
                {t.box.inspectionText}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

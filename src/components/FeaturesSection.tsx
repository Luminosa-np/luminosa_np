import React from 'react';
import {
  Radio,
  Bluetooth,
  HardDrive,
  Headphones,
  Compass,
  BatteryCharging,
  Zap,
  Sliders,
} from 'lucide-react';
import travelImg from '../assets/images/luminosa_outdoor_travel_1788929201391.jpg';
import { useLanguage } from '../context/LanguageContext';

export const FeaturesSection: React.FC = () => {
  const { t } = useLanguage();

  const iconList = [
    <Radio className="w-6 h-6 text-orange-600" key="radio" />,
    <Bluetooth className="w-6 h-6 text-blue-600" key="bt" />,
    <HardDrive className="w-6 h-6 text-emerald-600" key="hd" />,
    <Headphones className="w-6 h-6 text-purple-600" key="hp" />,
    <Compass className="w-6 h-6 text-amber-600" key="cp" />,
    <BatteryCharging className="w-6 h-6 text-rose-600" key="bc" />,
    <Zap className="w-6 h-6 text-indigo-600" key="zap" />,
    <Sliders className="w-6 h-6 text-teal-600" key="sl" />,
  ];

  return (
    <section id="features" className="py-16 lg:py-24 bg-neutral-50 text-neutral-900 border-t border-neutral-200/80 scroll-mt-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-orange-600 mb-2 block">
            {t.features.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950 font-serif">
            {t.features.title}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-neutral-600 font-light">
            {t.features.sub}
          </p>
        </div>

        {/* 8 Feature Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {t.features.items.map((feat, index) => (
            <div
              key={feat.title}
              className="bg-white p-6 rounded-2xl border border-neutral-200/90 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-neutral-100 flex items-center justify-center mb-4">
                  {iconList[index] || <Radio className="w-6 h-6 text-neutral-700" />}
                </div>
                <h3 className="text-lg font-bold text-neutral-900 font-serif mb-2">
                  {feat.title}
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed font-light">
                  {feat.desc}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center text-[11px] font-medium text-neutral-400">
                <span>YSF-005BT Standard</span>
              </div>
            </div>
          ))}
        </div>

        {/* Product Story: "More than a radio. More than a speaker." */}
        <div className="mt-16 bg-neutral-900 text-white rounded-3xl overflow-hidden shadow-2xl border border-neutral-800">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            {/* Story Text */}
            <div className="lg:col-span-7 p-8 sm:p-12 lg:p-14">
              <span className="text-xs font-bold uppercase tracking-widest text-orange-400 mb-3 block">
                {t.features.storyBadge}
              </span>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif leading-tight text-white mb-6">
                {t.features.storyTitle}
              </h3>
              <div className="space-y-4 text-neutral-300 text-base sm:text-lg font-light leading-relaxed">
                <p>{t.features.storyP1}</p>
                <p>{t.features.storyP2}</p>
                <blockquote className="border-l-2 border-orange-500 pl-4 py-1 text-white font-serif italic text-lg sm:text-xl">
                  {t.features.quote}
                </blockquote>
              </div>

              <div className="mt-8 flex items-center gap-4 text-xs text-neutral-400">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>{t.features.storyFooter1}</span>
                </div>
                <span>•</span>
                <span>{t.features.storyFooter2}</span>
              </div>
            </div>

            {/* Travel Image Showcase */}
            <div className="lg:col-span-5 h-72 lg:h-full relative overflow-hidden">
              <img
                src={travelImg}
                alt="Carrying Luminosa YSF-005BT outdoor in Nepal"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-l from-neutral-900 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

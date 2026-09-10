import React from 'react';
import { LuminosaLogo } from './LuminosaLogo';
import { Compass, Sparkles, HeartHandshake, Flag, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const BrandStory: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div id="about" className="scroll-mt-14">
      {/* Brand Philosophy Hero Banner */}
      <section className="py-16 lg:py-24 bg-neutral-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.08),transparent_70%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Brand Identity Poster */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-sm p-8 sm:p-10 rounded-3xl bg-neutral-950 border border-neutral-800 shadow-2xl flex flex-col items-center text-center">
                <LuminosaLogo
                  variant="dark"
                  mode="full"
                  tagline="Make Your Memories Immortal"
                  className="mb-4"
                />
                <div className="mt-4 pt-4 border-t border-neutral-800/80 w-full text-center">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400">
                    {t.brand.location}
                  </span>
                  <p className="text-xs text-neutral-400 mt-1">
                    {t.brand.cardSub}
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Brand Story Narrative */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-neutral-800 rounded-full text-xs font-semibold text-orange-400 uppercase tracking-wider">
                <Compass className="w-3.5 h-3.5" />
                <span>{t.brand.philosophyBadge}</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-white tracking-tight leading-tight">
                {t.brand.philoTitle}
              </h2>

              <p className="text-lg sm:text-xl text-neutral-300 font-light leading-relaxed">
                {t.brand.philoText}
              </p>

              <div className="p-6 rounded-2xl bg-neutral-800/60 border border-neutral-700/80 space-y-3">
                <h3 className="text-base font-bold text-white font-serif flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-orange-400" />
                  <span>{t.brand.beginsTitle}</span>
                </h3>
                <p className="text-sm text-neutral-300 leading-relaxed font-light">
                  {t.brand.beginsP1}
                </p>
                <p className="text-sm text-neutral-300 leading-relaxed font-light">
                  {t.brand.beginsP2}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Luminosa 5 Pillars Section */}
      <section id="why-luminosa" className="py-16 lg:py-24 bg-white text-neutral-900 border-t border-neutral-200/80 scroll-mt-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-orange-600 mb-2 block">
              {t.brand.whyBadge}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950 font-serif">
              {t.brand.whyTitle}
            </h2>
            <p className="mt-3 text-base sm:text-lg text-neutral-600 font-light">
              {t.brand.whySub}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {t.brand.pillars.map((pillar, i) => (
              <div
                key={pillar.title}
                className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200/80 hover:bg-white hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-mono font-bold text-neutral-400 block mb-3">
                    0{i + 1}
                  </span>
                  <h3 className="text-base font-bold text-neutral-950 font-serif mb-2 leading-snug">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-light">
                    {pillar.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Vision & Mission Grid */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Vision */}
            <div className="p-8 rounded-3xl bg-neutral-900 text-white border border-neutral-800 shadow-lg">
              <div className="flex items-center gap-2 text-xs font-semibold text-orange-400 uppercase tracking-wider mb-3">
                <Flag className="w-4 h-4" />
                <span>{t.brand.visionBadge}</span>
              </div>
              <h3 className="text-2xl font-bold font-serif mb-4 text-white">
                {t.brand.visionTitle}
              </h3>
              <p className="text-neutral-300 text-sm leading-relaxed font-light">
                {t.brand.visionText}
              </p>
            </div>

            {/* Mission */}
            <div className="p-8 rounded-3xl bg-neutral-50 text-neutral-900 border border-neutral-200/90 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-3">
                <HeartHandshake className="w-4 h-4 text-orange-600" />
                <span>{t.brand.missionBadge}</span>
              </div>
              <h3 className="text-2xl font-bold font-serif mb-4 text-neutral-950">
                {t.brand.missionTitle}
              </h3>
              <div className="grid grid-cols-2 gap-2.5 text-xs text-neutral-700 pt-2">
                {t.brand.missionChecks.map((item) => (
                  <div key={item} className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

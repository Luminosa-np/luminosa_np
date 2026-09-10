import React from 'react';
import { Users, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const AudienceSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16 lg:py-24 bg-white text-neutral-900 border-t border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-neutral-100 rounded-full text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-3">
            <Users className="w-3.5 h-3.5 text-neutral-900" />
            <span>{t.audience.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950 font-serif">
            {t.audience.title}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-neutral-600 font-light">
            {t.audience.sub}
          </p>
        </div>

        {/* 5 Audience Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.audience.personas.map((persona, index) => (
            <div
              key={persona.id}
              className={`p-6 sm:p-7 rounded-2xl border transition-all hover:shadow-md ${
                index === 0
                  ? 'bg-neutral-900 text-white border-neutral-800 lg:col-span-1'
                  : 'bg-neutral-50/70 text-neutral-900 border-neutral-200/80 hover:bg-white'
              }`}
            >
              <div className="text-3xl mb-4">{persona.emoji}</div>
              <h3
                className={`text-xl font-bold font-serif mb-2 ${
                  index === 0 ? 'text-white' : 'text-neutral-950'
                }`}
              >
                {persona.title}
              </h3>
              <p
                className={`text-sm leading-relaxed mb-4 ${
                  index === 0 ? 'text-neutral-300' : 'text-neutral-600'
                }`}
              >
                {persona.description}
              </p>
              <div
                className={`pt-3 border-t text-xs ${
                  index === 0
                    ? 'border-neutral-800 text-orange-400'
                    : 'border-neutral-200 text-neutral-500'
                }`}
              >
                <strong className="font-semibold block mb-0.5">{t.audience.idealScenario}</strong>
                <span>{persona.idealFor}</span>
              </div>
            </div>
          ))}

          {/* Quick summary banner card */}
          <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-md flex flex-col justify-between">
            <div>
              <Sparkles className="w-8 h-8 text-orange-200 mb-3" />
              <h3 className="text-xl font-bold font-serif mb-2 text-white">
                {t.audience.bannerTitle}
              </h3>
              <p className="text-sm text-orange-100 leading-relaxed">
                {t.audience.bannerText}
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-orange-400/40 text-xs text-orange-100">
              {t.audience.bannerFooter}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

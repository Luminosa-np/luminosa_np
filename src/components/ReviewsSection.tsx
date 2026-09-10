import React from 'react';
import { Star, CheckCircle2, Quote, MessageSquare } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const ReviewsSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="reviews" className="py-16 lg:py-24 bg-neutral-50 text-neutral-900 border-t border-neutral-200/80 scroll-mt-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-neutral-200/70 rounded-full text-xs font-semibold text-neutral-800 uppercase tracking-wider mb-2">
            <MessageSquare className="w-3.5 h-3.5 text-orange-600" />
            <span>{t.reviews.badge}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950 font-serif">
            {t.reviews.title}
          </h2>

          <p className="mt-3 text-base sm:text-lg text-neutral-600 font-light">
            {t.reviews.sub}
          </p>

          {/* Rating Summary Pill */}
          <div className="mt-6 inline-flex items-center gap-3 px-4 py-2 bg-white rounded-full border border-neutral-200 shadow-xs">
            <div className="flex items-center gap-1 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="font-bold text-neutral-900 font-mono text-sm">
              {t.reviews.ratingScore}
            </span>
            <span className="text-neutral-300">•</span>
            <span className="text-xs text-neutral-500">{t.reviews.ratingCount}</span>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.reviews.items.map((rev) => (
            <div
              key={rev.name}
              className="bg-white p-6 rounded-2xl border border-neutral-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Top: Stars & Quote Icon */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-0.5 text-amber-500">
                    {[...Array(rev.rating)].map((_, idx) => (
                      <Star key={idx} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-4 h-4 text-neutral-300" />
                </div>

                {/* Highlight Tag */}
                <div className="inline-block text-[11px] font-semibold text-orange-700 bg-orange-50 px-2.5 py-0.5 rounded-md mb-3">
                  {rev.highlight}
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-light">
                  "{rev.text}"
                </p>
              </div>

              {/* Author Info */}
              <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-neutral-900 font-serif">
                    {rev.name}
                  </div>
                  <div className="text-[11px] text-neutral-500">
                    {rev.role} • {rev.location}
                  </div>
                </div>

                <div className="flex items-center gap-1 text-[10px] text-emerald-600 font-medium" title="Verified Customer">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Verified</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

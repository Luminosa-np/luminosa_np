import React, { useState, useRef } from 'react';
import { ChevronRight, Sparkles, Box } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'motion/react';
import blackRadioImg from '../assets/images/ysf_radio_hero.png';
import greenRadioImg from '../assets/images/ysf_radio_green_1789052136359.jpg';
import { LuminosaLogo } from './LuminosaLogo';
import { useLanguage } from '../context/LanguageContext';
import { ProductColor } from '../types';

interface HeroProps {
  onExploreProduct: () => void;
  onExploreStory: () => void;
  onOpenOrder: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreProduct,
  onExploreStory,
  onOpenOrder,
}) => {
  const [headlineIndex, setHeadlineIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<ProductColor>('black');
  const { t, language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // 3D Scroll-linked animations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Smooth scroll transformations for 3D depth
  const rawRotateX = useTransform(scrollYProgress, [0, 0.8], [0, 14]);
  const rawRotateY = useTransform(scrollYProgress, [0, 0.8], [0, -12]);
  const rawScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.96]);
  const rawTranslateY = useTransform(scrollYProgress, [0, 0.8], [0, 36]);

  const rotateX = useSpring(rawRotateX, { stiffness: 120, damping: 25 });
  const rotateY = useSpring(rawRotateY, { stiffness: 120, damping: 25 });
  const scale = useSpring(rawScale, { stiffness: 120, damping: 25 });
  const translateY = useSpring(rawTranslateY, { stiffness: 120, damping: 25 });

  // Interactive 3D Cursor Parallax
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -20;
    setMouseOffset({ x, y });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
  };

  const headlines = t.hero.headlines;
  const current = headlines[headlineIndex] || headlines[0];
  const activeRadioImg = selectedColor === 'green' ? greenRadioImg : blackRadioImg;

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-neutral-900 text-white pt-10 pb-16 lg:pt-16 lg:pb-24 [perspective:1400px]"
    >
      {/* Subtle atmospheric gradient and grid lines */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.12),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.04),transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Brand Statement & CTA */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.25, 0.1, 0.25, 1.0] }}
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            {/* Tagline switcher pills */}
            <div className="inline-flex items-center gap-1.5 p-1 bg-neutral-800/80 border border-neutral-700/80 rounded-full mb-6">
              <span className="px-3 py-1 bg-white text-neutral-950 text-xs font-semibold rounded-full uppercase tracking-wider">
                {t.hero.tag}
              </span>
              <div className="flex items-center gap-1 px-2 text-xs text-neutral-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>{t.hero.intro}</span>
              </div>
            </div>

            {/* Main Headline with subtle transition */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${headlineIndex}-${current.main}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
              >
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white font-serif leading-[1.15]">
                  {current.main}
                </h1>
                <p className="mt-5 text-base sm:text-lg text-neutral-300 max-w-2xl leading-relaxed font-light">
                  {current.sub}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Alternate headline tabs */}
            <div className="flex flex-wrap gap-2 mt-4 pt-1">
              {headlines.map((item, idx) => (
                <button
                  key={item.tag}
                  type="button"
                  onClick={() => setHeadlineIndex(idx)}
                  className={`text-[11px] px-3 py-1 rounded-md border transition-all ${
                    headlineIndex === idx
                      ? 'bg-neutral-800 border-neutral-600 text-white font-medium'
                      : 'border-transparent text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  {item.tag}
                </button>
              ))}
            </div>

            {/* CTA Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto">
              <button
                type="button"
                id="btn-hero-explore-product"
                onClick={onExploreProduct}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-white hover:bg-neutral-100 text-neutral-950 font-semibold rounded-xl text-sm tracking-wide transition-all shadow-lg hover:shadow-xl active:scale-95 cursor-pointer"
              >
                <span>{t.hero.exploreProduct}</span>
                <ChevronRight className="w-4 h-4 text-neutral-700" />
              </button>

              <button
                type="button"
                id="btn-hero-order-now"
                onClick={onOpenOrder}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-orange-600 hover:bg-orange-500 text-white font-semibold rounded-xl text-sm tracking-wide transition-all active:scale-95 shadow-md cursor-pointer"
              >
                <span>{t.hero.orderNow}</span>
              </button>

              <button
                type="button"
                id="btn-hero-story"
                onClick={onExploreStory}
                className="inline-flex items-center justify-center px-5 py-3.5 text-neutral-300 hover:text-white text-sm font-medium transition-colors cursor-pointer"
              >
                {t.hero.vision}
              </button>
            </div>

            {/* Trust highlights bar */}
            <div className="mt-10 pt-6 border-t border-neutral-800/80 grid grid-cols-3 gap-4 w-full text-left">
              <div>
                <div className="text-sm font-bold text-white font-serif">{t.hero.nepalDelivery}</div>
                <div className="text-xs text-neutral-400 mt-0.5">{t.hero.nepalDeliverySub}</div>
              </div>
              <div>
                <div className="text-sm font-bold text-white font-serif">{t.hero.codTitle}</div>
                <div className="text-xs text-neutral-400 mt-0.5">{t.hero.codSub}</div>
              </div>
              <div>
                <div className="text-sm font-bold text-white font-serif">{t.hero.firstRelease}</div>
                <div className="text-xs text-neutral-400 mt-0.5">{t.hero.firstReleaseSub}</div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Hero Visual Showcase with 3D Scroll Animation */}
          <div className="lg:col-span-5 relative [perspective:1200px]">
            <motion.div
              ref={cardRef}
              style={{
                rotateX,
                rotateY,
                scale,
                y: translateY,
                transformStyle: 'preserve-3d',
              }}
              animate={{
                rotateY: mouseOffset.x,
                rotateX: mouseOffset.y,
              }}
              transition={{ type: 'spring', damping: 20, stiffness: 100 }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative rounded-2xl overflow-hidden bg-neutral-800/80 border border-neutral-700/90 shadow-2xl p-3 transition-shadow duration-300 hover:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)]"
            >
              {/* Product Visual Frame */}
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden group bg-neutral-900">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={selectedColor}
                    src={activeRadioImg}
                    alt={`Luminosa YSF-005BT ${selectedColor === 'green' ? 'Forest Green' : 'Matte Black'}`}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.35 }}
                    className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                </AnimatePresence>

                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

                {/* 3D Dynamic Badge */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 bg-black/60 backdrop-blur-md rounded-lg border border-white/10 text-[11px] font-medium text-neutral-200">
                  <Box className="w-3.5 h-3.5 text-orange-400" />
                  <span>3D Interactive</span>
                </div>

                {/* Floating Product Badge & Color Indicator */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between bg-black/75 backdrop-blur-md p-3.5 rounded-xl border border-white/10">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-bold text-orange-400 uppercase tracking-wider">
                        {t.hero.flagshipBadge}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-neutral-700/80 text-neutral-300">
                        {selectedColor === 'green'
                          ? language === 'ne'
                            ? 'हरियो संस्करण'
                            : 'Forest Green'
                          : language === 'ne'
                          ? 'कालो संस्करण'
                          : 'Matte Black'}
                      </span>
                    </div>
                    <div className="text-base font-bold text-white font-serif">YSF-005BT</div>
                    <div className="text-xs text-neutral-300">FM Radio + Bluetooth Speaker</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-extrabold text-white font-mono">{t.nav.price}</div>
                    <span className="text-[10px] text-emerald-400 font-medium">{t.hero.inStock}</span>
                  </div>
                </div>
              </div>

              {/* Color Selection Bar: Black & Green */}
              <div className="mt-3 pt-2.5 border-t border-neutral-700/70 flex items-center justify-between px-1">
                <div className="text-xs text-neutral-300 font-medium flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-orange-400" />
                  <span>
                    {language === 'ne' ? 'उपलब्ध रङहरू:' : 'Available Colors:'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedColor('black')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      selectedColor === 'black'
                        ? 'bg-neutral-700 text-white border border-neutral-500 shadow-sm'
                        : 'text-neutral-400 hover:text-white border border-transparent'
                    }`}
                  >
                    <span className="w-3.5 h-3.5 rounded-full bg-[#2b2d30] border border-neutral-500 inline-block shadow-inner" />
                    <span>{language === 'ne' ? 'कालो (Black)' : 'Black'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedColor('green')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      selectedColor === 'green'
                        ? 'bg-neutral-700 text-white border border-neutral-500 shadow-sm'
                        : 'text-neutral-400 hover:text-white border border-transparent'
                    }`}
                  >
                    <span className="w-3.5 h-3.5 rounded-full bg-[#3b533b] border border-emerald-500/60 inline-block shadow-inner" />
                    <span>{language === 'ne' ? 'हरियो (Green)' : 'Green'}</span>
                  </button>
                </div>
              </div>

              {/* Floating Camera Logo Emblem matching user's uploaded art */}
              <div className="absolute -top-3 -right-3 bg-neutral-900 border border-neutral-700 p-2.5 rounded-xl shadow-xl hidden sm:flex items-center gap-2">
                <LuminosaLogo variant="dark" mode="mark-only" className="w-8 h-5" />
                <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-300">
                  {t.hero.lifestyleBadge}
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

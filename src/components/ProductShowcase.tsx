import React, { useState } from 'react';
import {
  ShoppingBag,
  Radio,
  Bluetooth,
  HardDrive,
  Headphones,
  Check,
  ChevronDown,
  ChevronUp,
  Truck,
  Sparkles,
  Layers,
  Volume2,
  Bell,
  Box
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { LUMINOSA_PRODUCT } from '../data/luminosaData';
import { InteractiveRadioPlayer } from './InteractiveRadioPlayer';
import { NotifyMeModal } from './NotifyMeModal';
import { useLanguage } from '../context/LanguageContext';
import { ProductColor } from '../types';

interface ProductShowcaseProps {
  onAddToCart: (quantity: number, color?: ProductColor) => void;
  onOpenOrder: (quantity: number, color?: ProductColor) => void;
  isOutOfStock?: boolean;
}

export const ProductShowcase: React.FC<ProductShowcaseProps> = ({
  onAddToCart,
  onOpenOrder,
  isOutOfStock: isOutOfStockProp,
}) => {
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [selectedColor, setSelectedColor] = useState<ProductColor>('black');
  const [quantity, setQuantity] = useState(1);
  const [showSpecs, setShowSpecs] = useState(false);
  const [activeTab, setActiveTab] = useState<'gallery' | 'simulator'>('gallery');
  const [addedToast, setAddedToast] = useState(false);
  const [isNotifyModalOpen, setIsNotifyModalOpen] = useState(false);
  const [outOfStockState, setOutOfStockState] = useState(false);

  // 3D image tilt on mouse move
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const handleImageMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12;
    setTilt({ x, y });
  };
  const handleImageMouseLeave = () => setTilt({ x: 0, y: 0 });

  const { t, language } = useLanguage();
  const product = LUMINOSA_PRODUCT;
  const isOutOfStock = isOutOfStockProp !== undefined ? isOutOfStockProp : outOfStockState;
  const currentImg = product.images[selectedImageIdx] || product.images[0];

  const handleAddToCart = () => {
    onAddToCart(quantity, selectedColor);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2400);
  };

  const handleSelectColor = (color: ProductColor) => {
    setSelectedColor(color);
    if (color === 'green') {
      setSelectedImageIdx(1);
    } else {
      setSelectedImageIdx(0);
    }
  };

  return (
    <section id="product" className="py-16 lg:py-24 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 scroll-mt-14 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-neutral-200 dark:border-neutral-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-neutral-100 dark:bg-neutral-800 rounded-full text-xs font-semibold text-neutral-800 dark:text-neutral-200 tracking-wider uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400" />
              <span>{t.product.tag}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950 dark:text-white font-serif">
              {product.name}
            </h2>
            <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 mt-1 font-light">
              {t.product.tagline}
            </p>
          </div>

          {/* View mode toggle: Product Photos vs Interactive Audio Simulator */}
          <div className="mt-4 md:mt-0 flex items-center bg-neutral-100 dark:bg-neutral-800 p-1 rounded-xl border border-neutral-200 dark:border-neutral-700 text-xs font-medium">
            <button
              type="button"
              id="tab-view-gallery"
              onClick={() => setActiveTab('gallery')}
              className={`px-4 py-2 rounded-lg transition-all ${
                activeTab === 'gallery'
                  ? 'bg-white dark:bg-neutral-700 text-neutral-950 dark:text-white font-semibold shadow-sm'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              {t.product.photoTab} ({product.images.length})
            </button>
            <button
              type="button"
              id="tab-view-simulator"
              onClick={() => setActiveTab('simulator')}
              className={`px-4 py-2 rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'simulator'
                  ? 'bg-neutral-900 dark:bg-neutral-600 text-white font-semibold shadow-sm'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              <Volume2 className="w-3.5 h-3.5 text-amber-400" />
              <span>{t.product.simTab}</span>
            </button>
          </div>
        </div>

        {/* Main Product Display Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Visual Showcase or Simulator */}
          <div className="lg:col-span-7 space-y-4">
            {activeTab === 'simulator' ? (
              <div className="space-y-3">
                <InteractiveRadioPlayer />
                <div className="flex justify-between items-center text-xs text-neutral-500 dark:text-neutral-400 px-2">
                  <span>{t.product.simNote}</span>
                  <button
                    type="button"
                    onClick={() => setActiveTab('gallery')}
                    className="text-orange-600 dark:text-orange-400 hover:underline font-medium"
                  >
                    {t.product.backToPhotos}
                  </button>
                </div>
              </div>
            ) : (
              <div>
                {/* Main Large Image Display with 3D Parallax Tilt */}
                <div
                  onMouseMove={handleImageMouseMove}
                  onMouseLeave={handleImageMouseLeave}
                  style={{
                    transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
                    transition: 'transform 0.15s ease-out',
                  }}
                  className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-200 dark:border-neutral-700 shadow-xl group cursor-crosshair"
                >
                  <img
                    src={currentImg.url}
                    alt={currentImg.title}
                    className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />

                  {/* 3D Interactive Badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 bg-black/60 backdrop-blur-md rounded-lg border border-white/10 text-[11px] font-medium text-neutral-200">
                    <Box className="w-3.5 h-3.5 text-orange-400" />
                    <span>3D Interactive View</span>
                  </div>

                  {/* Photo Title & Caption Bar */}
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-neutral-950/85 via-neutral-950/40 to-transparent p-4 text-white">
                    <div className="text-xs font-bold uppercase tracking-wider text-orange-400 flex items-center gap-2">
                      <span>{currentImg.title}</span>
                      {selectedImageIdx === 0 && (
                        <span className="px-1.5 py-0.2 bg-neutral-700 text-[10px] rounded text-neutral-200">
                          Matte Black
                        </span>
                      )}
                      {selectedImageIdx === 1 && (
                        <span className="px-1.5 py-0.2 bg-emerald-800 text-[10px] rounded text-neutral-200">
                          Forest Green
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-neutral-200 mt-0.5">
                      {currentImg.caption}
                    </div>
                  </div>
                </div>

                {/* Thumbnail Strip */}
                <div className="grid grid-cols-6 gap-2 mt-3">
                  {product.images.map((img, idx) => (
                    <button
                      key={img.id}
                      type="button"
                      onClick={() => {
                        setSelectedImageIdx(idx);
                        if (idx === 1) setSelectedColor('green');
                        if (idx === 0) setSelectedColor('black');
                      }}
                      className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all cursor-pointer bg-neutral-900 ${
                        selectedImageIdx === idx
                          ? 'border-neutral-900 dark:border-white ring-2 ring-neutral-900/10 dark:ring-white/20'
                          : 'border-transparent opacity-70 hover:opacity-100 hover:border-neutral-300 dark:hover:border-neutral-600'
                      }`}
                    >
                      <img
                        src={img.url}
                        alt={img.title}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Feature Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
              <div className="p-3 bg-neutral-50 dark:bg-neutral-800/60 rounded-xl border border-neutral-200/80 dark:border-neutral-700/80 flex items-center gap-2.5">
                <Radio className="w-4 h-4 text-orange-600 dark:text-orange-400 shrink-0" />
                <div className="text-xs">
                  <div className="font-semibold text-neutral-900 dark:text-white">
                    {language === 'ne' ? 'एफएम रेडियो' : 'FM Radio'}
                  </div>
                  <div className="text-[10px] text-neutral-500 dark:text-neutral-400">
                    {language === 'ne' ? 'एन्टेना सहित' : 'Telescopic antenna'}
                  </div>
                </div>
              </div>
              <div className="p-3 bg-neutral-50 dark:bg-neutral-800/60 rounded-xl border border-neutral-200/80 dark:border-neutral-700/80 flex items-center gap-2.5">
                <Bluetooth className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                <div className="text-xs">
                  <div className="font-semibold text-neutral-900 dark:text-white">
                    {language === 'ne' ? 'ब्लुटुथ' : 'Bluetooth Audio'}
                  </div>
                  <div className="text-[10px] text-neutral-500 dark:text-neutral-400">
                    {language === 'ne' ? 'वायरलेस फोन कनेक्ट' : 'Wireless phone connect'}
                  </div>
                </div>
              </div>
              <div className="p-3 bg-neutral-50 dark:bg-neutral-800/60 rounded-xl border border-neutral-200/80 dark:border-neutral-700/80 flex items-center gap-2.5">
                <HardDrive className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <div className="text-xs">
                  <div className="font-semibold text-neutral-900 dark:text-white">USB & TF</div>
                  <div className="text-[10px] text-neutral-500 dark:text-neutral-400">
                    {language === 'ne' ? 'पेनड्राइभ / मेमोरी' : 'Play local files'}
                  </div>
                </div>
              </div>
              <div className="p-3 bg-neutral-50 dark:bg-neutral-800/60 rounded-xl border border-neutral-200/80 dark:border-neutral-700/80 flex items-center gap-2.5">
                <Headphones className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />
                <div className="text-xs">
                  <div className="font-semibold text-neutral-900 dark:text-white">AUX 3.5mm</div>
                  <div className="text-[10px] text-neutral-500 dark:text-neutral-400">
                    {language === 'ne' ? 'इयरफोन ज्याक' : 'Headphone jack'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Purchasing Info, Specs & Actions */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div>
              {/* Product Type & Stock status */}
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                  {t.nav.radioSpeaker}
                </span>
                <div className="flex items-center gap-2">
                  {isOutOfStock ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-100 dark:bg-rose-950/50 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-900/50">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-600 dark:bg-rose-400 animate-pulse" />
                      {t.product.outOfStock}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/50">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400" />
                      {t.product.availableNepal}
                    </span>
                  )}
                  {/* Stock simulation toggle for reviewing */}
                  <button
                    type="button"
                    id="btn-toggle-stock-status"
                    onClick={() => setOutOfStockState(!isOutOfStock)}
                    className="text-[11px] text-neutral-400 dark:text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200 font-mono transition-colors underline cursor-pointer"
                    title="Toggle stock status between In Stock and Out of Stock"
                  >
                    [{isOutOfStock ? 'Simulate In Stock' : 'Simulate Out of Stock'}]
                  </button>
                </div>
              </div>

              {/* Price Banner */}
              <div className="mt-4 flex items-baseline gap-3">
                <span className="text-3xl sm:text-4xl font-extrabold text-neutral-950 dark:text-white font-serif tracking-tight">
                  {language === 'ne' ? 'रु २,६००' : `NPR ${product.priceNPR.toLocaleString()}`}
                </span>
                {product.originalPriceNPR && (
                  <span className="text-base text-neutral-400 dark:text-neutral-500 line-through">
                    {language === 'ne' ? 'रु ३,२००' : `NPR ${product.originalPriceNPR.toLocaleString()}`}
                  </span>
                )}
                <span className="px-2 py-0.5 bg-orange-100 dark:bg-orange-950/60 text-orange-800 dark:text-orange-300 text-xs font-bold rounded">
                  {t.product.introOffer}
                </span>
              </div>

              {/* Description */}
              <p className="mt-4 text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed font-normal">
                {t.product.shortDesc}
              </p>

              {/* Practical Highlights Checklist */}
              <div className="mt-5 space-y-2 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 bg-neutral-50 dark:bg-neutral-800/50 p-4 rounded-xl border border-neutral-200/80 dark:border-neutral-750">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>{t.product.bullet1}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>{t.product.bullet2}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>{t.product.bullet3}</span>
                </div>
              </div>

              {/* Color Selection: Black and Green Variants */}
              <div className="mt-5 p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/80 dark:border-neutral-700/80">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-neutral-900 dark:text-white uppercase tracking-wider">
                    {language === 'ne' ? 'उपलब्ध रङहरू (Colors)' : 'Available Colors'}
                  </span>
                  <span className="text-xs font-bold text-orange-600 dark:text-orange-400">
                    {selectedColor === 'green'
                      ? (language === 'ne' ? 'हरियो (Forest Green)' : 'Forest / Army Green')
                      : (language === 'ne' ? 'कालो (Matte Black)' : 'Matte Black / Gunmetal')}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {/* Black Variant */}
                  <button
                    type="button"
                    id="btn-color-black"
                    onClick={() => handleSelectColor('black')}
                    className={`p-3 rounded-xl border-2 text-left transition-all flex items-center gap-3 cursor-pointer ${
                      selectedColor === 'black'
                        ? 'border-neutral-900 dark:border-white bg-white dark:bg-neutral-700 shadow-sm'
                        : 'border-neutral-200 dark:border-neutral-700 bg-white/60 dark:bg-neutral-800/40 hover:border-neutral-300 dark:hover:border-neutral-600'
                    }`}
                  >
                    <span className="w-6 h-6 rounded-full bg-[#2b2d30] border-2 border-neutral-400 shrink-0 shadow-sm flex items-center justify-center">
                      {selectedColor === 'black' && <Check className="w-3.5 h-3.5 text-white" />}
                    </span>
                    <div>
                      <div className="text-xs font-bold text-neutral-900 dark:text-white">
                        {language === 'ne' ? 'कालो (Black)' : 'Matte Black'}
                      </div>
                      <div className="text-[10px] text-neutral-500 dark:text-neutral-400">
                        {language === 'ne' ? 'क्लासिक चेसिस' : 'Classic Edition'}
                      </div>
                    </div>
                  </button>

                  {/* Green Variant */}
                  <button
                    type="button"
                    id="btn-color-green"
                    onClick={() => handleSelectColor('green')}
                    className={`p-3 rounded-xl border-2 text-left transition-all flex items-center gap-3 cursor-pointer ${
                      selectedColor === 'green'
                        ? 'border-neutral-900 dark:border-white bg-white dark:bg-neutral-700 shadow-sm'
                        : 'border-neutral-200 dark:border-neutral-700 bg-white/60 dark:bg-neutral-800/40 hover:border-neutral-300 dark:hover:border-neutral-600'
                    }`}
                  >
                    <span className="w-6 h-6 rounded-full bg-[#3b533b] border-2 border-emerald-400 shrink-0 shadow-sm flex items-center justify-center">
                      {selectedColor === 'green' && <Check className="w-3.5 h-3.5 text-white" />}
                    </span>
                    <div>
                      <div className="text-xs font-bold text-neutral-900 dark:text-white">
                        {language === 'ne' ? 'हरियो (Green)' : 'Forest Green'}
                      </div>
                      <div className="text-[10px] text-neutral-500 dark:text-neutral-400">
                        {language === 'ne' ? 'आउटडोर चेसिस' : 'Outdoor Edition'}
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Conditional Display: Out of Stock (Notify Me) vs In Stock (Quantity + Buy/Cart) */}
              {isOutOfStock ? (
                <div className="mt-6 space-y-4">
                  {/* Out of Stock Notice Card */}
                  <div className="p-4 rounded-xl bg-amber-50/90 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/40 text-amber-950 dark:text-amber-200 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300 flex items-center justify-center shrink-0 mt-0.5">
                      <Bell className="w-4 h-4" />
                    </div>
                    <div className="text-xs space-y-1">
                      <div className="font-bold text-neutral-900 dark:text-white text-sm">
                        {t.product.outOfStock}
                      </div>
                      <p className="text-neutral-600 dark:text-neutral-300 font-light leading-relaxed">
                        {t.product.notifyMeSub}
                      </p>
                    </div>
                  </div>

                  {/* Notify Me Primary Action Button */}
                  <button
                    type="button"
                    id="btn-notify-me"
                    onClick={() => setIsNotifyModalOpen(true)}
                    className="w-full py-4 px-6 bg-orange-600 hover:bg-orange-500 text-white font-semibold rounded-xl text-sm shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2.5 cursor-pointer"
                  >
                    <Bell className="w-4 h-4" />
                    <span>{t.product.notifyMe}</span>
                  </button>

                  <p className="text-center text-[11px] text-neutral-400 dark:text-neutral-500 font-light">
                    {language === 'ne'
                      ? 'इमेल दर्ता भएपछि नयाँ लट आउनासाथ सूचना पठाइनेछ।'
                      : 'Priority notification sent as soon as Kathmandu inventory is replenished.'}
                  </p>
                </div>
              ) : (
                /* Quantity Selector & Action Buttons */
                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border border-neutral-300 dark:border-neutral-700 rounded-xl bg-white dark:bg-neutral-800 shadow-sm overflow-hidden">
                      <button
                        type="button"
                        id="btn-qty-minus"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-3.5 py-2.5 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 font-bold transition-colors"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="px-4 py-2.5 font-mono text-sm font-semibold text-neutral-900 dark:text-white min-w-10 text-center">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        id="btn-qty-plus"
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-3.5 py-2.5 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 font-bold transition-colors"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    <span className="text-xs text-neutral-500 dark:text-neutral-400">
                      {t.product.total}: <strong className="text-neutral-900 dark:text-white font-mono text-sm">
                        {language === 'ne'
                          ? `रु ${(product.priceNPR * quantity).toLocaleString()}`
                          : `NPR ${(product.priceNPR * quantity).toLocaleString()}`}
                      </strong>
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <button
                      type="button"
                      id="btn-order-now-main"
                      onClick={() => onOpenOrder(quantity, selectedColor)}
                      className="w-full py-3.5 px-4 bg-orange-600 hover:bg-orange-500 text-white font-semibold rounded-xl text-sm shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>{t.product.orderCod}</span>
                    </button>

                    <button
                      type="button"
                      id="btn-add-to-cart-main"
                      onClick={handleAddToCart}
                      className="w-full py-3.5 px-4 bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950 font-semibold rounded-xl text-sm shadow transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>{addedToast ? t.product.addedToBag : t.product.addToBag}</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Delivery Assurance Note */}
              <div className="mt-5 p-3 bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/40 rounded-xl flex items-start gap-2.5 text-xs text-amber-900 dark:text-amber-200">
                <Truck className="w-4 h-4 text-amber-700 dark:text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-semibold">{t.product.deliveryNoteTitle}</strong> {t.product.deliveryNoteText}
                </div>
              </div>
            </div>

            {/* Collapsible Technical Specifications Table */}
            <div className="border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden mt-6">
              <button
                type="button"
                id="btn-toggle-specs"
                onClick={() => setShowSpecs(!showSpecs)}
                className="w-full flex items-center justify-between p-4 bg-neutral-50 dark:bg-neutral-800/80 hover:bg-neutral-100 dark:hover:bg-neutral-750 transition-colors text-left"
              >
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
                  <span className="text-sm font-bold text-neutral-900 dark:text-white font-serif">
                    {t.product.specsTitle}
                  </span>
                </div>
                {showSpecs ? (
                  <ChevronUp className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
                )}
              </button>

              {showSpecs && (
                <div className="p-4 bg-white dark:bg-neutral-850 divide-y divide-neutral-100 dark:divide-neutral-800 text-xs">
                  {product.specifications.map((spec) => (
                    <div key={spec.name} className="py-2.5 flex items-start justify-between gap-4">
                      <span className="font-semibold text-neutral-700 dark:text-neutral-300 w-1/3 shrink-0">
                        {spec.name}
                      </span>
                      <span className="text-neutral-600 dark:text-neutral-400 text-right w-2/3">
                        {spec.details}
                      </span>
                    </div>
                  ))}
                  <p className="pt-3 text-[11px] text-neutral-400 dark:text-neutral-500 italic">
                    {t.product.specsFootnote}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Restock Notification Modal */}
      <NotifyMeModal
        isOpen={isNotifyModalOpen}
        onClose={() => setIsNotifyModalOpen(false)}
        productName={product.name}
        productImage={currentImg.url}
      />
    </section>
  );
};

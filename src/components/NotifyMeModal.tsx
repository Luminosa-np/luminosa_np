import React, { useState, useEffect } from 'react';
import { X, Bell, Mail, CheckCircle2, ShieldCheck, Sparkles, Loader2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface NotifyMeModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  productImage?: string;
}

export const NotifyMeModal: React.FC<NotifyMeModalProps> = ({
  isOpen,
  onClose,
  productName,
  productImage,
}) => {
  const { t, language } = useLanguage();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Reset state on open
  useEffect(() => {
    if (isOpen) {
      setIsSubmitted(false);
      setErrorMessage('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const trimmedEmail = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
      setErrorMessage(
        language === 'ne'
          ? 'कृपया मान्य इमेल ठेगाना प्रविष्ट गर्नुहोस्।'
          : 'Please enter a valid email address.'
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const subscriber = {
        email: trimmedEmail,
        name: name.trim() || undefined,
        product: productName,
        createdAt: new Date().toISOString(),
      };
      const existing = JSON.parse(
        localStorage.getItem('luminosa_restock_subscribers') || '[]'
      );
      localStorage.setItem(
        'luminosa_restock_subscribers',
        JSON.stringify([subscriber, ...existing])
      );
    } catch {
      // Ignore localStorage restrictions if any
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 500);
  };

  const handleReset = () => {
    setEmail('');
    setName('');
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="notify-modal-title"
    >
      <div
        className="relative w-full max-w-md bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl overflow-hidden my-8 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100 transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between p-5 border-b border-neutral-100 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-850">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 flex items-center justify-center">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h3 id="notify-modal-title" className="text-base font-bold font-serif text-neutral-950 dark:text-white">
                {t.product.notifyModalTitle}
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 font-light">
                {productName}
              </p>
            </div>
          </div>
          <button
            type="button"
            id="btn-close-notify-modal"
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        {isSubmitted ? (
          <div className="p-6 text-center space-y-4">
            <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h4 className="text-lg font-bold text-neutral-950 dark:text-white font-serif">
                {t.product.notifySuccessTitle}
              </h4>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 font-light leading-relaxed max-w-sm mx-auto">
                {t.product.notifySuccessSub.replace('{email}', email)}
              </p>
            </div>

            <div className="p-3 bg-neutral-50 dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 text-xs text-neutral-500 dark:text-neutral-400 flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>
                {language === 'ne'
                  ? 'काठमाडौं हबमा नयाँ ब्याच आउनासाथ तपाईंलाई प्राथमिकता दिइनेछ।'
                  : 'You will receive priority access as soon as inventory arrives.'}
              </span>
            </div>

            <div className="pt-2">
              <button
                type="button"
                id="btn-notify-done"
                onClick={handleReset}
                className="w-full py-3 px-4 bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 font-semibold rounded-xl text-xs sm:text-sm hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-all cursor-pointer"
              >
                {language === 'ne' ? 'बन्द गर्नुहोस् (Close)' : 'Done'}
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Product Summary Mini Card */}
            <div className="flex items-center gap-3 p-3 bg-neutral-50 dark:bg-neutral-800 rounded-xl border border-neutral-200/80 dark:border-neutral-700">
              {productImage ? (
                <img
                  src={productImage}
                  alt={productName}
                  className="w-12 h-12 object-contain p-1 rounded-lg bg-neutral-900 border border-neutral-200 dark:border-neutral-700 shrink-0"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-12 h-12 rounded-lg bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5 text-neutral-500 dark:text-neutral-400" />
                </div>
              )}
              <div className="min-w-0 flex-1">
                <div className="text-xs font-semibold text-neutral-900 dark:text-white truncate">
                  {productName}
                </div>
                <div className="text-[11px] text-rose-600 dark:text-rose-400 font-medium flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-600 dark:bg-rose-400" />
                  {t.product.outOfStock}
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 font-light leading-relaxed">
              {t.product.notifyModalSub}
            </p>

            {/* Email Input Field */}
            <div className="space-y-1.5">
              <label
                htmlFor="notify-email"
                className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300"
              >
                {language === 'ne' ? 'इमेल ठेगाना' : 'Email Address'} <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  id="notify-email"
                  required
                  autoFocus
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errorMessage) setErrorMessage('');
                  }}
                  placeholder={t.product.emailPlaceholder}
                  className="w-full pl-9 pr-3.5 py-2.5 text-xs sm:text-sm bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                />
              </div>
              {errorMessage && (
                <p className="text-[11px] text-rose-600 dark:text-rose-400 font-medium">
                  {errorMessage}
                </p>
              )}
            </div>

            {/* Optional Name Field */}
            <div className="space-y-1.5">
              <label
                htmlFor="notify-name"
                className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300"
              >
                {language === 'ne' ? 'नाम (ऐच्छिक)' : 'Your Name (Optional)'}
              </label>
              <input
                type="text"
                id="notify-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={language === 'ne' ? 'तपाईंको नाम' : 'e.g. Aarav Sharma'}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
              />
            </div>

            {/* Privacy Assurance */}
            <div className="flex items-center gap-2 pt-1 text-[11px] text-neutral-500 dark:text-neutral-400">
              <ShieldCheck className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
              <span>
                {language === 'ne'
                  ? 'कुनै स्पाम आउने छैन। स्टक आउँदा मात्र एकपटक इमेल पठाइनेछ।'
                  : 'Zero spam. We will only email you when restocked.'}
              </span>
            </div>

            {/* Submit Action */}
            <div className="pt-2">
              <button
                type="submit"
                id="btn-submit-notify"
                disabled={isSubmitting}
                className="w-full py-3.5 px-4 bg-orange-600 hover:bg-orange-500 disabled:bg-orange-400 text-white font-semibold rounded-xl text-xs sm:text-sm shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>{language === 'ne' ? 'सुरक्षित गर्दै...' : 'Saving...'}</span>
                  </>
                ) : (
                  <>
                    <Bell className="w-4 h-4" />
                    <span>{t.product.notifySubmit}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

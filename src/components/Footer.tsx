import React, { useState, useEffect } from 'react';
import { LuminosaLogo } from './LuminosaLogo';
import {
  Instagram,
  Mail,
  MapPin,
  ArrowUp,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Loader2,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Footer: React.FC = () => {
  const [modalType, setModalType] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'success' | 'already'>('idle');
  const [subscribedEmail, setSubscribedEmail] = useState<string>('');
  const { t } = useLanguage();

  useEffect(() => {
    try {
      const saved = localStorage.getItem('luminosa_subscribed_email');
      if (saved) {
        setSubscribedEmail(saved);
      }
    } catch {
      // Ignore
    }
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes('@')) {
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      try {
        const stored = JSON.parse(localStorage.getItem('luminosa_newsletter_emails') || '[]');
        if (stored.includes(cleanEmail)) {
          setSubscribeStatus('already');
          setSubscribedEmail(cleanEmail);
          return;
        }
        stored.push(cleanEmail);
        localStorage.setItem('luminosa_newsletter_emails', JSON.stringify(stored));
        localStorage.setItem('luminosa_subscribed_email', cleanEmail);
      } catch {
        // Ignore
      }
      setSubscribedEmail(cleanEmail);
      setSubscribeStatus('success');
      setEmail('');
    }, 600);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-neutral-950 text-neutral-300 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        {/* Newsletter Subscription Section */}
        <div className="mb-16 p-7 sm:p-10 rounded-3xl bg-neutral-900/90 border border-neutral-800 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: Heading & Description */}
            <div className="lg:col-span-7 space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold uppercase tracking-wider font-mono">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t.footer.newsletter.badge}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold font-serif text-white tracking-tight">
                {t.footer.newsletter.title}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed max-w-xl">
                {t.footer.newsletter.sub}
              </p>
            </div>

            {/* Right: Subscription Form & Feedback */}
            <div className="lg:col-span-5">
              {subscribeStatus === 'success' ? (
                <div className="p-5 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 space-y-2 animate-fade-in">
                  <div className="flex items-center gap-2 text-sm font-bold text-white">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span>{t.footer.newsletter.success}</span>
                  </div>
                  <p className="text-xs text-emerald-400/90 font-mono">
                    {subscribedEmail}
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubscribeStatus('idle')}
                    className="text-[11px] text-neutral-400 hover:text-white underline pt-1 block"
                  >
                    Subscribe another email
                  </button>
                </div>
              ) : subscribeStatus === 'already' ? (
                <div className="p-5 rounded-2xl bg-neutral-850 border border-neutral-750 text-neutral-300 space-y-2 animate-fade-in">
                  <div className="flex items-center gap-2 text-sm font-bold text-white">
                    <CheckCircle2 className="w-5 h-5 text-orange-400 shrink-0" />
                    <span>{t.footer.newsletter.alreadySubscribed}</span>
                  </div>
                  <p className="text-xs text-neutral-400 font-mono">
                    {subscribedEmail}
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubscribeStatus('idle')}
                    className="text-[11px] text-orange-400 hover:underline pt-1 block"
                  >
                    Register a different email
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-3">
                  <div className="flex flex-col sm:flex-row gap-2.5">
                    <div className="relative flex-1">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
                        <Mail className="w-4 h-4" />
                      </div>
                      <input
                        type="email"
                        required
                        id="newsletter-email-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={t.footer.newsletter.placeholder}
                        className="w-full pl-10 pr-4 py-3 bg-neutral-950 border border-neutral-800 rounded-xl text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
                      />
                    </div>

                    <button
                      type="submit"
                      id="btn-subscribe-newsletter"
                      disabled={isSubmitting}
                      className="px-6 py-3 bg-orange-600 hover:bg-orange-500 disabled:opacity-60 text-white rounded-xl text-xs sm:text-sm font-semibold tracking-wide flex items-center justify-center gap-2 transition-all shadow-sm shrink-0 active:scale-95"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>{t.footer.newsletter.subscribing}</span>
                        </>
                      ) : (
                        <span>{t.footer.newsletter.button}</span>
                      )}
                    </button>
                  </div>

                  <div className="flex items-center gap-1.5 text-[11px] text-neutral-400 font-light">
                    <ShieldCheck className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                    <span>{t.footer.newsletter.privacyNote}</span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12 pb-14 border-b border-neutral-800/80">
          {/* Col 1 & 2: Brand Info & Camera Vector Logo */}
          <div className="lg:col-span-2 space-y-4">
            <LuminosaLogo
              variant="dark"
              mode="horizontal"
              tagline={t.footer.tagline}
            />

            <p className="text-sm text-neutral-400 font-light leading-relaxed max-w-sm pt-2">
              {t.footer.desc}
            </p>

            <div className="flex items-center gap-3 pt-3">
              <a
                href="https://instagram.com/luminosa.np"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-neutral-900 hover:bg-pink-600/30 text-neutral-300 hover:text-pink-400 border border-neutral-800 flex items-center justify-center transition-colors"
                aria-label="Luminosa Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href="mailto:hello@luminosa.com.np"
                className="w-9 h-9 rounded-full bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 flex items-center justify-center transition-colors"
                aria-label="Email Luminosa"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>

            <div className="flex items-center gap-2 text-xs text-neutral-400 pt-1">
              <MapPin className="w-3.5 h-3.5 text-orange-500" />
              <span>Kathmandu, Nepal</span>
            </div>
          </div>

          {/* Col 3: Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-mono font-bold tracking-widest text-white">
              {t.footer.navTitle}
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  {t.footer.home}
                </a>
              </li>
              <li>
                <a href="#product" className="hover:text-white transition-colors">
                  {t.footer.shop}
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-white transition-colors">
                  {t.footer.features}
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  {t.footer.about}
                </a>
              </li>
              <li>
                <a href="#why-luminosa" className="hover:text-white transition-colors">
                  {t.footer.why}
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-white transition-colors">
                  {t.nav.reviews}
                </a>
              </li>
              <li>
                <a href="#support" className="hover:text-white transition-colors">
                  {t.footer.support}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Customer Care */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-mono font-bold tracking-widest text-white">
              {t.footer.careTitle}
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>
                <a href="#delivery" className="hover:text-white transition-colors">
                  {t.footer.deliveryInfo}
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setModalType('warranty')}
                  className="hover:text-white transition-colors text-left"
                >
                  {t.footer.warranty}
                </button>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  {t.footer.contact}
                </a>
              </li>
              <li>
                <a href="#support" className="hover:text-white transition-colors">
                  {t.footer.faqs}
                </a>
              </li>
              <li>
                <span className="text-[11px] text-emerald-400">{t.footer.codPill}</span>
              </li>
            </ul>
          </div>

          {/* Col 5: Legal & Policy */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-mono font-bold tracking-widest text-white">
              {t.footer.legalTitle}
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>
                <button
                  type="button"
                  onClick={() => setModalType('privacy')}
                  className="hover:text-white transition-colors text-left"
                >
                  {t.footer.privacy}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setModalType('terms')}
                  className="hover:text-white transition-colors text-left"
                >
                  {t.footer.terms}
                </button>
              </li>
              <li className="pt-2">
                <span className="text-[11px] text-neutral-400 block font-mono">
                  {t.footer.taglineLabel}
                </span>
                <span className="text-xs text-neutral-300 italic font-serif">
                  "{t.footer.memoriesTagline}"
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <div className="flex items-center gap-1.5 text-center sm:text-left">
            <span>© {new Date().getFullYear()} Luminosa. {t.footer.rights}</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">{t.footer.designedFor}</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[11px] text-neutral-400">{t.footer.philo}</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors flex items-center gap-1"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span className="text-[11px]">{t.footer.top}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Policy Modals */}
      {modalType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl max-w-md w-full text-white space-y-4">
            <h3 className="text-lg font-bold font-serif">
              {modalType === 'warranty' && (t.footer.warranty)}
              {modalType === 'privacy' && (t.footer.privacy)}
              {modalType === 'terms' && (t.footer.terms)}
            </h3>
            <p className="text-xs text-neutral-300 leading-relaxed font-light">
              {modalType === 'warranty' &&
                'Luminosa provides a 7-day direct exchange policy for verified manufacturing defects upon arrival. If your unit encounters functional issues, contact our support on WhatsApp or Instagram @luminosa.np with your order details.'}
              {modalType === 'privacy' &&
                'We respect your privacy. Customer names, delivery addresses, and contact numbers collected during checkout are strictly utilized for delivery dispatch via our courier partners and customer service communications.'}
              {modalType === 'terms' &&
                'All orders placed for the YSF-005BT are subject to product availability and courier confirmation. Cash on Delivery is honored across major serviceable locations in Nepal.'}
            </p>
            <button
              type="button"
              onClick={() => setModalType(null)}
              className="w-full py-2 bg-white text-neutral-950 font-semibold text-xs rounded-lg hover:bg-neutral-200"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </footer>
  );
};

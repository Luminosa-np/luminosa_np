import React, { useState } from 'react';
import {
  HelpCircle,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  Mail,
  Instagram,
  Send,
  CheckCircle2,
  FileQuestion,
  Truck,
  ArrowRight,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { TrackOrderModal } from './TrackOrderModal';

export const SupportAndFaq: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isTrackModalOpen, setIsTrackModalOpen] = useState(false);
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryContact, setInquiryContact] = useState('');
  const [inquiryMessage, setInquiryMessage] = useState('');

  const { t } = useLanguage();

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setInquiryName('');
      setInquiryContact('');
      setInquiryMessage('');
    }, 4000);
  };

  return (
    <section id="support" className="py-16 lg:py-24 bg-neutral-900 text-white scroll-mt-14 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(249,115,22,0.06),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Support Introduction */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-neutral-800 rounded-full text-xs font-semibold text-orange-400 uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{t.support.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-serif">
            {t.support.title}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-neutral-300 font-light">
            {t.support.sub}
          </p>
        </div>

        {/* 4 Support Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {t.support.pillars.map((p, idx) => (
            <div
              key={p.title}
              className={`p-5 rounded-2xl bg-neutral-950/70 border border-neutral-800 text-left hover:border-neutral-700 transition-colors flex flex-col justify-between ${
                idx === 2 ? 'border-orange-500/30 group' : ''
              }`}
            >
              <div>
                <h3 className="text-sm font-bold text-white font-serif mb-1.5 flex items-center justify-between">
                  <span>{p.title}</span>
                  {idx === 2 && (
                    <span className="text-[10px] bg-orange-500/20 text-orange-400 px-1.5 py-0.5 rounded font-mono">
                      Track
                    </span>
                  )}
                </h3>
                <p className="text-xs text-neutral-400 font-light leading-relaxed">
                  {p.desc}
                </p>
              </div>

              {idx === 2 && (
                <button
                  type="button"
                  onClick={() => setIsTrackModalOpen(true)}
                  className="mt-3 text-xs text-orange-400 hover:text-orange-300 font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-all text-left"
                >
                  <span>{t.support.trackOrderLink}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Two Columns: FAQs on Left, Direct Contact on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left: FAQs Accordion */}
          <div className="lg:col-span-7 space-y-3">
            <div className="flex items-center gap-2 mb-4">
              <FileQuestion className="w-5 h-5 text-orange-400" />
              <h3 className="text-xl font-bold text-white font-serif">
                {t.support.faqTitle}
              </h3>
            </div>

            <div className="space-y-3">
              {t.support.faqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={faq.q}
                    className="rounded-xl bg-neutral-800/60 border border-neutral-700/80 overflow-hidden transition-all"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between p-4 sm:p-5 text-left transition-colors hover:bg-neutral-800"
                    >
                      <span className="text-sm sm:text-base font-semibold text-neutral-100 pr-4">
                        {faq.q}
                      </span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-orange-400 shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-neutral-400 shrink-0" />
                      )}
                    </button>

                    {isOpen && (
                      <div className="px-4 pb-5 pt-1 sm:px-5 text-xs sm:text-sm text-neutral-300 font-light leading-relaxed border-t border-neutral-700/50">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Direct Contact Form & Channels */}
          <div id="contact" className="lg:col-span-5 space-y-6">
            {/* Contact channels card */}
            <div className="bg-neutral-950 p-6 sm:p-7 rounded-2xl border border-neutral-800 shadow-xl">
              <h3 className="text-lg font-bold text-white font-serif mb-4 flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-orange-400" />
                <span>{t.support.talkTitle}</span>
              </h3>

              {/* Track Order Direct Link & Action */}
              <div className="mb-4 p-3.5 rounded-xl bg-gradient-to-r from-orange-500/15 via-orange-500/5 to-transparent border border-orange-500/30 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-lg bg-orange-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Truck className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      <span>{t.support.trackOrderLink}</span>
                      <span className="px-1.5 py-0.2 bg-emerald-500/20 text-emerald-400 text-[10px] rounded font-mono font-bold">
                        Live
                      </span>
                    </div>
                    <div className="text-[11px] text-neutral-300 truncate mt-0.5">
                      {t.support.trackOrderSub}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  id="btn-track-order-open"
                  onClick={() => setIsTrackModalOpen(true)}
                  className="px-3 py-1.5 bg-orange-600 hover:bg-orange-500 text-white text-xs font-semibold rounded-lg shrink-0 flex items-center gap-1 transition-all active:scale-95 shadow-sm"
                >
                  <span>{t.support.trackOrderBtn}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-3.5 text-xs sm:text-sm">
                <a
                  href="https://instagram.com/luminosa.np"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-200 transition-colors group"
                >
                  <div className="w-9 h-9 rounded-lg bg-pink-500/20 text-pink-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Instagram className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] text-neutral-400">Instagram</div>
                    <div className="font-semibold text-white">@luminosa.np</div>
                  </div>
                </a>

                <a
                  href="https://wa.me/9779800000000?text=Hello%20Luminosa,%20I%20have%20an%20inquiry%20about%20the%20YSF-005BT"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-200 transition-colors group"
                >
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] text-neutral-400">WhatsApp Order & Support</div>
                    <div className="font-semibold text-white">+977 9800000000 / Direct Chat</div>
                  </div>
                </a>

                <a
                  href="mailto:hello@luminosa.com.np"
                  className="flex items-center gap-3 p-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-200 transition-colors group"
                >
                  <div className="w-9 h-9 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] text-neutral-400">Official Brand Email</div>
                    <div className="font-semibold text-white">hello@luminosa.com.np</div>
                    <div className="text-[10px] text-neutral-400">Alt: mallamission976@gmail.com</div>
                  </div>
                </a>
              </div>

              {/* Instant Inquiry Form */}
              <form onSubmit={handleFormSubmit} className="mt-6 pt-6 border-t border-neutral-800 space-y-3">
                <div className="text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">
                  {t.support.sendNoteTitle}
                </div>

                {formSubmitted ? (
                  <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span>{t.support.successMsg}</span>
                  </div>
                ) : (
                  <>
                    <input
                      type="text"
                      required
                      placeholder={t.support.namePlaceholder}
                      value={inquiryName}
                      onChange={(e) => setInquiryName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-900 border border-neutral-700 text-white placeholder-neutral-500 text-xs focus:outline-none focus:border-orange-500"
                    />

                    <input
                      type="text"
                      required
                      placeholder={t.support.contactPlaceholder}
                      value={inquiryContact}
                      onChange={(e) => setInquiryContact(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-900 border border-neutral-700 text-white placeholder-neutral-500 text-xs focus:outline-none focus:border-orange-500"
                    />

                    <textarea
                      required
                      rows={2}
                      placeholder={t.support.msgPlaceholder}
                      value={inquiryMessage}
                      onChange={(e) => setInquiryMessage(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-900 border border-neutral-700 text-white placeholder-neutral-500 text-xs focus:outline-none focus:border-orange-500 resize-none"
                    />

                    <button
                      type="submit"
                      id="btn-submit-support"
                      className="w-full py-2.5 bg-orange-600 hover:bg-orange-500 text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{t.support.sendBtn}</span>
                    </button>
                  </>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Track Order Modal */}
      <TrackOrderModal
        isOpen={isTrackModalOpen}
        onClose={() => setIsTrackModalOpen(false)}
      />
    </section>
  );
};

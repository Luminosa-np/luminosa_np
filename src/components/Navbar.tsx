import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, Instagram, ChevronRight, Truck, Globe, Sun, Moon } from 'lucide-react';
import { LuminosaLogo } from './LuminosaLogo';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenOrder: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenOrder,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: t.nav.shop, href: '#product' },
    { label: t.nav.features, href: '#features' },
    { label: t.nav.about, href: '#about' },
    { label: t.nav.whyLuminosa, href: '#why-luminosa' },
    { label: t.nav.reviews, href: '#reviews' },
    { label: t.nav.delivery, href: '#delivery' },
    { label: t.nav.support, href: '#support' },
  ];

  return (
    <>
      {/* Top micro announcement bar */}
      <div className="bg-neutral-900 dark:bg-black text-neutral-200 text-xs py-1.5 px-4 font-medium tracking-wide border-b border-neutral-800/60 transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-[11px] text-amber-400 font-medium">
              <Truck className="w-3 h-3" />
              <span>{t.topBar.delivery}</span>
            </span>
            <span className="hidden sm:inline text-neutral-600 dark:text-neutral-500">•</span>
            <span className="hidden sm:inline text-neutral-400 text-[11px]">
              {t.topBar.cod}
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-neutral-400">
            <a
              href="https://instagram.com/luminosa.np"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              <Instagram className="w-3 h-3 text-pink-400" />
              <span>@luminosa.np</span>
            </a>
            <span className="hidden md:inline text-neutral-600 dark:text-neutral-500">|</span>
            <a
              href="#support"
              className="hidden md:inline hover:text-white transition-colors"
            >
              {t.topBar.helpdesk}
            </a>
          </div>
        </div>
      </div>

      {/* Main sticky navigation */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md shadow-sm border-b border-neutral-200/80 dark:border-neutral-800 py-2.5'
            : 'bg-white/95 dark:bg-neutral-900/95 backdrop-blur-sm border-b border-neutral-100 dark:border-neutral-800/80 py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#"
            id="nav-logo"
            className="flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 dark:focus-visible:ring-white rounded-lg p-1"
            aria-label="Luminosa Home"
          >
            <LuminosaLogo variant="light" mode="horizontal" />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-neutral-950 dark:hover:text-white transition-colors relative py-1 text-neutral-600 dark:text-neutral-300 hover:font-semibold"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action Icons & Language / Theme Switchers */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Language Switcher Pill */}
            <div
              id="nav-language-switcher"
              className="flex items-center bg-neutral-100 dark:bg-neutral-800 p-0.5 rounded-lg border border-neutral-200 dark:border-neutral-700 text-xs font-semibold transition-colors"
              title="Switch Language / भाषा परिवर्तन"
            >
              <div className="px-1.5 text-neutral-400 flex items-center">
                <Globe className="w-3.5 h-3.5" />
              </div>
              <button
                type="button"
                id="btn-lang-en"
                onClick={() => setLanguage('en')}
                aria-label="Switch to English"
                className={`px-2 py-1 rounded-md text-xs transition-all ${
                  language === 'en'
                    ? 'bg-white dark:bg-neutral-700 text-neutral-950 dark:text-white shadow-xs font-bold'
                    : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                EN
              </button>
              <button
                type="button"
                id="btn-lang-ne"
                onClick={() => setLanguage('ne')}
                aria-label="Switch to Nepali"
                className={`px-2 py-1 rounded-md text-xs transition-all ${
                  language === 'ne'
                    ? 'bg-white dark:bg-neutral-700 text-neutral-950 dark:text-white shadow-xs font-bold'
                    : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                नेपाली
              </button>
            </div>

            {/* Desktop Theme Toggle Button */}
            <button
              type="button"
              id="btn-theme-toggle"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? t.nav.themeLight : t.nav.themeDark}
              title={theme === 'dark' ? `${t.nav.themeLight} (Click to switch to Light)` : `${t.nav.themeDark} (Click to switch to Dark)`}
              className="p-2 text-neutral-700 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 border border-neutral-200/80 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/80 transition-all active:scale-95 flex items-center justify-center"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-neutral-700" />
              )}
            </button>

            {/* Quick Buy CTA */}
            <button
              type="button"
              id="btn-nav-buy"
              onClick={onOpenOrder}
              className="hidden sm:inline-flex items-center justify-center px-3.5 py-2 text-xs font-semibold tracking-wider uppercase text-white bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 dark:text-neutral-950 rounded-lg shadow-sm hover:shadow transition-all active:scale-95"
            >
              {t.nav.orderBtn}
            </button>

            {/* Cart Drawer Trigger */}
            <button
              type="button"
              id="btn-nav-cart"
              onClick={onOpenCart}
              className="relative p-2 text-neutral-700 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              aria-label="View Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-orange-600 text-white font-mono text-[10px] font-bold rounded-full flex items-center justify-center animate-scale-in">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              id="btn-mobile-menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-neutral-700 hover:text-neutral-950 dark:text-neutral-300 dark:hover:text-white lg:hidden rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer content */}
          <div className="relative ml-auto w-full max-w-xs bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 h-full shadow-2xl p-6 flex flex-col justify-between overflow-y-auto border-l border-neutral-200 dark:border-neutral-800">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-neutral-100 dark:border-neutral-800">
                <LuminosaLogo variant="light" mode="horizontal" />
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-lg text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Language Switcher */}
              <div className="pt-4 pb-2">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-2">
                  Language / भाषा
                </div>
                <div className="grid grid-cols-2 gap-2 bg-neutral-100 dark:bg-neutral-800 p-1 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setLanguage('en')}
                    className={`py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                      language === 'en'
                        ? 'bg-white dark:bg-neutral-700 text-neutral-950 dark:text-white shadow-xs font-bold'
                        : 'text-neutral-600 dark:text-neutral-400'
                    }`}
                  >
                    <span>English</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setLanguage('ne')}
                    className={`py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                      language === 'ne'
                        ? 'bg-white dark:bg-neutral-700 text-neutral-950 dark:text-white shadow-xs font-bold'
                        : 'text-neutral-600 dark:text-neutral-400'
                    }`}
                  >
                    <span>नेपाली (Nepali)</span>
                  </button>
                </div>
              </div>

              {/* Mobile Theme Toggle Section */}
              <div className="pt-2 pb-2">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-2">
                  Theme / थिम
                </div>
                <div className="grid grid-cols-2 gap-2 bg-neutral-100 dark:bg-neutral-800 p-1 rounded-xl">
                  <button
                    type="button"
                    id="btn-mobile-theme-light"
                    onClick={() => setTheme('light')}
                    className={`py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                      theme === 'light'
                        ? 'bg-white dark:bg-neutral-700 text-neutral-950 dark:text-white shadow-xs font-bold'
                        : 'text-neutral-600 dark:text-neutral-400'
                    }`}
                  >
                    <Sun className="w-3.5 h-3.5 text-amber-500" />
                    <span>Light</span>
                  </button>
                  <button
                    type="button"
                    id="btn-mobile-theme-dark"
                    onClick={() => setTheme('dark')}
                    className={`py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                      theme === 'dark'
                        ? 'bg-white dark:bg-neutral-700 text-neutral-950 dark:text-white shadow-xs font-bold'
                        : 'text-neutral-600 dark:text-neutral-400'
                    }`}
                  >
                    <Moon className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Dark</span>
                  </button>
                </div>
              </div>

              {/* Navigation Links */}
              <div className="py-4 space-y-1">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                  >
                    <span>{link.label}</span>
                    <ChevronRight className="w-4 h-4 text-neutral-400" />
                  </a>
                ))}
              </div>

              {/* Product Card Promo */}
              <div className="p-3.5 bg-neutral-50 dark:bg-neutral-800/60 rounded-xl border border-neutral-200/80 dark:border-neutral-700/80 mb-4">
                <div className="text-[10px] font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-0.5">
                  {t.nav.featuredProduct}
                </div>
                <div className="text-sm font-bold text-neutral-900 dark:text-white font-serif">YSF-005BT</div>
                <div className="text-xs text-neutral-600 dark:text-neutral-300 mt-0.5">
                  {t.nav.radioSpeaker}
                </div>
                <div className="text-sm font-bold text-orange-600 dark:text-orange-400 mt-1.5">{t.nav.price}</div>
              </div>
            </div>

            <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 space-y-2.5">
              <button
                type="button"
                id="btn-mobile-order-cta"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenOrder();
                }}
                className="w-full py-3 bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950 rounded-xl text-xs font-semibold tracking-wide uppercase shadow flex items-center justify-center gap-2 transition-colors"
              >
                <span>{t.hero.orderNow}</span>
              </button>

              <div className="flex items-center justify-center gap-3 text-[11px] text-neutral-500 dark:text-neutral-400 pt-1">
                <a
                  href="https://instagram.com/luminosa.np"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-pink-600 dark:hover:text-pink-400"
                >
                  <Instagram className="w-3.5 h-3.5" />
                  <span>@luminosa.np</span>
                </a>
                <span>•</span>
                <span>Nepal</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

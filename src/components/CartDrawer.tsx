import React from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';
import { CartItem } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}) => {
  const { t, language } = useLanguage();

  if (!isOpen) return null;

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.priceNPR * item.quantity,
    0
  );

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer panel */}
      <div className="relative ml-auto w-full max-w-md bg-white dark:bg-neutral-900 h-full shadow-2xl flex flex-col justify-between overflow-hidden text-neutral-900 dark:text-neutral-100 animate-slide-left transition-colors">
        {/* Top Header */}
        <div className="p-5 border-b border-neutral-100 dark:border-neutral-800 flex items-center justify-between bg-neutral-50/70 dark:bg-neutral-850">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-neutral-900 dark:text-white" />
            <h3 className="font-bold text-base font-serif text-neutral-950 dark:text-white">
              {t.cart.bagTitle}
            </h3>
            <span className="px-2 py-0.5 bg-neutral-200 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200 text-xs rounded-full font-mono">
              {totalItems}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-5 divide-y divide-neutral-100 dark:divide-neutral-800">
          {cartItems.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <ShoppingBag className="w-12 h-12 text-neutral-300 dark:text-neutral-600 mx-auto" />
              <div className="text-base font-serif font-bold text-neutral-800 dark:text-neutral-200">
                {t.cart.emptyTitle}
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-xs mx-auto">
                {t.cart.emptySub}
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-4 px-5 py-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 text-xs font-semibold rounded-lg hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors cursor-pointer"
              >
                {t.cart.browseBtn}
              </button>
            </div>
          ) : (
            cartItems.map((item) => {
              const itemImg = item.color === 'green'
                ? item.product.images[1]?.url || item.product.images[0]?.url
                : item.product.images[0]?.url;

              return (
                <div key={`${item.product.id}-${item.color || 'black'}`} className="py-4 flex gap-4 items-center">
                  <img
                    src={itemImg}
                    alt={item.product.name}
                    className="w-16 h-16 object-contain p-1 rounded-xl bg-neutral-900 border border-neutral-200 dark:border-neutral-700 shrink-0"
                    referrerPolicy="no-referrer"
                  />

                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-sm text-neutral-900 dark:text-white font-serif truncate">
                      {item.product.name}
                    </h4>

                    {/* Color variant indicator */}
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span
                        className={`w-2 h-2 rounded-full inline-block ${
                          item.color === 'green' ? 'bg-[#3b533b]' : 'bg-[#2b2d30]'
                        }`}
                      />
                      <span className="text-[11px] text-neutral-500 dark:text-neutral-400 font-medium">
                        {item.color === 'green'
                          ? (language === 'ne' ? 'हरियो (Forest Green)' : 'Forest Green')
                          : (language === 'ne' ? 'कालो (Matte Black)' : 'Matte Black')}
                      </span>
                    </div>

                    <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                      {language === 'ne' ? `रु ${item.product.priceNPR.toLocaleString()}` : `NPR ${item.product.priceNPR.toLocaleString()}`}
                    </div>

                    <div className="flex items-center gap-3 mt-2">
                      {/* Quantity controls */}
                      <div className="flex items-center border border-neutral-200 dark:border-neutral-700 rounded-lg overflow-hidden bg-white dark:bg-neutral-800 text-xs">
                        <button
                          type="button"
                          onClick={() =>
                            onUpdateQuantity(item.product.id, Math.max(1, item.quantity - 1))
                          }
                          className="px-2 py-1 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 font-bold cursor-pointer"
                        >
                          -
                        </button>
                        <span className="px-2.5 font-mono font-semibold text-neutral-800 dark:text-neutral-200">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            onUpdateQuantity(item.product.id, item.quantity + 1)
                          }
                          className="px-2 py-1 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 font-bold cursor-pointer"
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => onRemoveItem(item.product.id)}
                        className="text-neutral-400 hover:text-red-500 p-1 cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="text-right font-mono text-sm font-bold text-neutral-900 dark:text-white">
                    {language === 'ne'
                      ? `रु ${(item.product.priceNPR * item.quantity).toLocaleString()}`
                      : `NPR ${(item.product.priceNPR * item.quantity).toLocaleString()}`}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer with Checkout CTA */}
        {cartItems.length > 0 && (
          <div className="p-5 border-t border-neutral-100 dark:border-neutral-800 bg-neutral-50/80 dark:bg-neutral-850 space-y-3">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-neutral-500 dark:text-neutral-400">
                <span>{t.cart.subtotal}</span>
                <span className="font-mono text-neutral-800 dark:text-neutral-200">
                  {language === 'ne' ? `रु ${subtotal.toLocaleString()}` : `NPR ${subtotal.toLocaleString()}`}
                </span>
              </div>
              <div className="flex justify-between text-neutral-500 dark:text-neutral-400">
                <span>{t.cart.estDelivery}</span>
                <span className="text-neutral-700 dark:text-neutral-300 font-medium">{t.cart.calcAtCheckout}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-neutral-950 dark:text-white pt-2 border-t border-neutral-200 dark:border-neutral-700">
                <span>{t.cart.estTotal}</span>
                <span className="font-mono text-orange-600 dark:text-orange-400">
                  {language === 'ne' ? `रु ${subtotal.toLocaleString()}` : `NPR ${subtotal.toLocaleString()}`}
                </span>
              </div>
            </div>

            <button
              type="button"
              id="btn-cart-checkout"
              onClick={() => {
                onClose();
                onCheckout();
              }}
              className="w-full py-3.5 bg-orange-600 hover:bg-orange-500 text-white rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm active:scale-95 transition-all cursor-pointer"
            >
              <span>{t.cart.checkoutBtn}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-neutral-500 dark:text-neutral-400 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>{t.cart.codAssurance}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

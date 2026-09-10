import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductShowcase } from './components/ProductShowcase';
import { FeaturesSection } from './components/FeaturesSection';
import { AudienceSection } from './components/AudienceSection';
import { BoxContents } from './components/BoxContents';
import { BrandStory } from './components/BrandStory';
import { DeliverySection } from './components/DeliverySection';
import { ReviewsSection } from './components/ReviewsSection';
import { SupportAndFaq } from './components/SupportAndFaq';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { OrderModal } from './components/OrderModal';
import { MotionFadeIn } from './components/MotionFadeIn';
import { LUMINOSA_PRODUCT } from './data/luminosaData';
import { CartItem, ProductColor } from './types';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    // Start empty, or user adds items
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [orderQuantity, setOrderQuantity] = useState(1);
  const [orderColor, setOrderColor] = useState<ProductColor>('black');

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleAddToCart = (qty: number, color: ProductColor = 'black') => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === LUMINOSA_PRODUCT.id && (item.color || 'black') === color
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + qty,
        };
        return updated;
      }
      return [...prev, { product: LUMINOSA_PRODUCT, quantity: qty, color }];
    });
  };

  const handleUpdateCartQuantity = (productId: string, qty: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity: qty } : item
      )
    );
  };

  const handleRemoveCartItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleOpenOrder = (qty: number = 1, color: ProductColor = 'black') => {
    setOrderQuantity(qty);
    setOrderColor(color);
    setIsOrderModalOpen(true);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 font-sans selection:bg-neutral-900 selection:text-white dark:selection:bg-amber-500 dark:selection:text-neutral-950 transition-colors duration-200">
      {/* Navigation Bar */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenOrder={() => handleOpenOrder(1)}
        activeSection=""
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onExploreProduct={() => scrollToSection('product')}
          onExploreStory={() => scrollToSection('about')}
          onOpenOrder={() => handleOpenOrder(1)}
        />

        {/* Featured Product: YSF-005BT */}
        <MotionFadeIn yOffset={24} duration={0.6}>
          <ProductShowcase
            onAddToCart={handleAddToCart}
            onOpenOrder={(qty, color) => handleOpenOrder(qty, color)}
          />
        </MotionFadeIn>

        {/* Features Highlights & Product Story */}
        <MotionFadeIn yOffset={24} duration={0.6}>
          <FeaturesSection />
        </MotionFadeIn>

        {/* Who Is It For? (5 Audience Personas) */}
        <MotionFadeIn yOffset={24} duration={0.6}>
          <AudienceSection />
        </MotionFadeIn>

        {/* What's In The Box */}
        <MotionFadeIn yOffset={24} duration={0.6}>
          <BoxContents />
        </MotionFadeIn>

        {/* Brand Story, Philosophy & Why Luminosa */}
        <MotionFadeIn yOffset={24} duration={0.6}>
          <BrandStory />
        </MotionFadeIn>

        {/* Customer Reviews & Testimonials */}
        <MotionFadeIn yOffset={24} duration={0.6}>
          <ReviewsSection />
        </MotionFadeIn>

        {/* Delivery Across Nepal */}
        <MotionFadeIn yOffset={24} duration={0.6}>
          <DeliverySection />
        </MotionFadeIn>

        {/* Support, FAQs & Contact */}
        <MotionFadeIn yOffset={24} duration={0.6}>
          <SupportAndFaq />
        </MotionFadeIn>
      </main>

      {/* Footer */}
      <Footer />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onCheckout={() => {
          setIsCartOpen(false);
          const currentQty = cartItems[0]?.quantity || 1;
          const currentColor = cartItems[0]?.color || 'black';
          handleOpenOrder(currentQty, currentColor);
        }}
      />

      {/* Checkout / Order Modal for Nepal */}
      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        initialQuantity={orderQuantity}
        initialColor={orderColor}
      />
    </div>
  );
}

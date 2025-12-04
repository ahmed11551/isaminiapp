'use client';

import { useState, useMemo, useEffect } from 'react';
import { useTelegram } from '@/hooks/useTelegram';
import { useCart } from '@/hooks/useCart';
import { products, getProductsByCategory } from '@/data/products';
import CategoryList from '@/components/CategoryList';
import ProductGrid from '@/components/ProductGrid';
import Cart from '@/components/Cart';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { tg } = useTelegram();
  const { getItemCount } = useCart();

  const filteredProducts = useMemo(() => {
    if (!selectedCategory) {
      return products;
    }
    return getProductsByCategory(selectedCategory);
  }, [selectedCategory]);

  // Настройка кнопки корзины в Telegram
  useEffect(() => {
    if (tg?.MainButton) {
      tg.MainButton.setText(`Корзина (${getItemCount()})`);
      tg.MainButton.onClick(() => setIsCartOpen(true));
      tg.MainButton.show();
    }
    
    return () => {
      if (tg?.MainButton) {
        tg.MainButton.offClick(() => setIsCartOpen(true));
      }
    };
  }, [tg, getItemCount]);

  return (
    <div className="min-h-screen bg-telegram-bg text-telegram-text">
      <header className="bg-telegram-secondary sticky top-0 z-10 shadow-md">
        <div className="px-4 py-3">
          <h1 className="text-white text-xl font-bold text-center">Магазин</h1>
        </div>
      </header>

      <CategoryList
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <main className="py-4">
        <ProductGrid products={filteredProducts} />
      </main>

      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Плавающая кнопка корзины (для веб-версии) */}
      {typeof window !== 'undefined' && !window.Telegram?.WebApp && (
        <button
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-6 right-6 bg-telegram-button text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center text-2xl hover:bg-telegram-buttonHover active:scale-95 transition-all z-40"
        >
          🛒
          {getItemCount() > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
              {getItemCount()}
            </span>
          )}
        </button>
      )}
    </div>
  );
}


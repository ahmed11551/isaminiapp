'use client';

import { useState, useEffect } from 'react';
import { Product } from '@/types';
import { useCart } from '@/hooks/useCart';
import { getProductImageUrl } from '@/utils/productImage';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [imageError, setImageError] = useState(false);
  const [imageUrl, setImageUrl] = useState(product.image);

  // Если есть код товара, используем его для получения изображения
  useEffect(() => {
    if (product.code && !product.image.includes('isa-access.ru')) {
      setImageUrl(getProductImageUrl(product.code));
    } else {
      setImageUrl(product.image);
    }
  }, [product.code, product.image]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="bg-telegram-secondary rounded-lg overflow-hidden shadow-lg">
      <div className="aspect-square bg-gray-700 relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageError ? 'https://via.placeholder.com/300x300?text=No+Image' : imageUrl}
          alt={product.name}
          className="w-full h-full object-cover"
          onError={() => {
            if (!imageError) {
              setImageError(true);
              // Пробуем fallback на оригинальное изображение
              if (imageUrl !== product.image) {
                setImageUrl(product.image);
                setImageError(false);
              }
            }
          }}
        />
        {!product.inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
            <span className="text-white font-bold">Нет в наличии</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-white font-semibold text-lg mb-1">{product.name}</h3>
        <p className="text-gray-400 text-sm mb-2 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-telegram-button font-bold text-xl">
            {formatPrice(product.price)}
          </span>
          <button
            onClick={() => product.inStock && addToCart(product)}
            disabled={!product.inStock}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              product.inStock
                ? 'bg-telegram-button text-white hover:bg-telegram-buttonHover active:scale-95'
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }`}
          >
            {product.inStock ? 'В корзину' : 'Нет в наличии'}
          </button>
        </div>
      </div>
    </div>
  );
}


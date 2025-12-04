import { Product } from '@/types';
import { products } from '@/data/products';
import { getProductImageUrl } from './productImage';

/**
 * Получает товар по коду с сайта isa-access.ru
 * @param code - Код товара
 * @returns Товар с обновленным URL изображения или null
 */
export function getProductByCode(code: string): Product | null {
  const product = products.find((p) => p.code === code || p.id === code);
  
  if (!product) {
    return null;
  }

  // Если у товара есть код, обновляем URL изображения
  if (product.code) {
    return {
      ...product,
      image: getProductImageUrl(product.code),
    };
  }

  return product;
}

/**
 * Обновляет изображение товара по коду
 * @param product - Товар
 * @returns Товар с обновленным URL изображения
 */
export function updateProductImage(product: Product): Product {
  if (product.code) {
    return {
      ...product,
      image: getProductImageUrl(product.code),
    };
  }
  return product;
}


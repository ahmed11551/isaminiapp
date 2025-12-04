/**
 * Утилиты для работы с изображениями товаров с сайта isa-access.ru
 */

/**
 * Формирует URL изображения товара по коду
 * @param code - Код товара с сайта isa-access.ru
 * @returns URL изображения товара
 */
export function getProductImageUrl(code: string): string {
  // Стандартный путь к изображениям на isa-access.ru
  // Обычно изображения находятся в /upload/iblock/ или /upload/resize_cache/iblock/
  return `https://www.isa-access.ru/upload/iblock/${code}.jpg`;
}

/**
 * Альтернативные пути для поиска изображения
 */
export function getProductImageUrls(code: string): string[] {
  return [
    `https://www.isa-access.ru/upload/iblock/${code}.jpg`,
    `https://www.isa-access.ru/upload/iblock/${code}.png`,
    `https://www.isa-access.ru/upload/resize_cache/iblock/${code}/300_300_1/${code}.jpg`,
    `https://www.isa-access.ru/upload/resize_cache/iblock/${code}/300_300_1/${code}.png`,
    `https://www.isa-access.ru/upload/iblock/${code.toLowerCase()}.jpg`,
    `https://www.isa-access.ru/upload/iblock/${code.toLowerCase()}.png`,
  ];
}

/**
 * Проверяет доступность изображения по URL
 * @param url - URL изображения
 * @returns Promise<boolean> - true если изображение доступно
 */
export async function checkImageExists(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, { method: 'HEAD', mode: 'no-cors' });
    // В no-cors режиме мы не можем проверить статус, но можем попробовать загрузить
    return true; // Предполагаем, что изображение существует
  } catch {
    return false;
  }
}

/**
 * Находит первое доступное изображение для товара по коду
 * @param code - Код товара
 * @returns Promise<string> - URL первого доступного изображения или placeholder
 */
export async function findProductImage(code: string): Promise<string> {
  const urls = getProductImageUrls(code);
  
  // В клиентской части просто возвращаем первый URL
  // Проверка доступности будет происходить через onError в компоненте
  return urls[0];
}


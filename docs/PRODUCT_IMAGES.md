# Работа с изображениями товаров по коду

## Обзор

Система автоматически получает изображения товаров с сайта isa-access.ru по коду товара.

## Структура

### 1. Тип Product

В типе `Product` добавлено опциональное поле `code`:

```typescript
interface Product {
  id: string;
  code?: string; // Код товара с сайта isa-access.ru
  name: string;
  description: string;
  price: number;
  image: string; // Будет автоматически обновлено, если указан code
  category: string;
  inStock: boolean;
}
```

### 2. Утилиты

#### `utils/productImage.ts`

- `getProductImageUrl(code: string)` - Формирует URL изображения по коду
- `getProductImageUrls(code: string)` - Возвращает массив возможных URL
- `findProductImage(code: string)` - Находит первое доступное изображение

#### `utils/getProductByCode.ts`

- `getProductByCode(code: string)` - Получает товар по коду
- `updateProductImage(product: Product)` - Обновляет изображение товара по коду

### 3. API Endpoint

`GET /api/product/[code]` - Получает информацию о товаре по коду

Пример запроса:
```typescript
const response = await fetch('/api/product/x31-m2-isa');
const data = await response.json();
// { code: 'x31-m2-isa', imageUrls: [...], primaryImage: '...' }
```

## Использование

### Добавление товара с кодом

```typescript
{
  id: 'mic-x31-m2-isa',
  code: 'x31-m2-isa', // Код товара с isa-access.ru
  name: 'Микрофон беспроводной Type-C+Lightning X31-M2 ISA',
  description: '...',
  price: 1890,
  image: 'https://www.isa-access.ru/upload/iblock/x31-m2-isa.jpg', // Будет использован code если указан
  category: 'audio',
  inStock: true,
}
```

### Автоматическое получение изображения

Компонент `ProductCard` автоматически использует код товара для получения изображения:

1. Если у товара есть `code`, формируется URL: `https://www.isa-access.ru/upload/iblock/{code}.jpg`
2. Если изображение не загружается, используется fallback на `product.image`
3. Если и оно не работает, показывается placeholder

## Формат кодов товаров

Коды товаров на isa-access.ru обычно имеют формат:
- Буквенно-цифровой (например: `x31-m2-isa`)
- Могут содержать дефисы и подчеркивания
- Регистр может быть разным

## Структура URL изображений

Изображения обычно находятся по следующим путям:
- `/upload/iblock/{code}.jpg`
- `/upload/iblock/{code}.png`
- `/upload/resize_cache/iblock/{code}/300_300_1/{code}.jpg`

Система автоматически пробует все варианты.

## Примеры кодов

- `gl-27-remax-iph16pm` - Защитное стекло
- `x31-m2-isa` - Микрофон
- `case-silicone-iph16pm-black` - Чехол

## Отладка

Если изображение не загружается:

1. Проверьте код товара на сайте isa-access.ru
2. Убедитесь, что код указан правильно в `data/products.ts`
3. Проверьте консоль браузера на наличие ошибок CORS
4. Используйте API endpoint для проверки доступных URL


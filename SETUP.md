# Инструкция по настройке

## Переменные окружения

Создайте файл `.env.local` в корне проекта со следующим содержимым:

```
NEXT_PUBLIC_BOT_TOKEN=your_bot_token_here
NEXT_PUBLIC_ADMIN_CHAT_ID=your_chat_id_here
```

### Как получить токен бота:

1. Откройте [@BotFather](https://t.me/BotFather) в Telegram
2. Отправьте команду `/newbot`
3. Следуйте инструкциям для создания бота
4. Скопируйте полученный токен в `NEXT_PUBLIC_BOT_TOKEN`

### Как получить Chat ID:

1. Откройте [@userinfobot](https://t.me/userinfobot) в Telegram
2. Бот покажет ваш Chat ID
3. Скопируйте ID в `NEXT_PUBLIC_ADMIN_CHAT_ID`

## Добавление товаров

Отредактируйте файл `data/products.ts` и добавьте свои товары в массив `products`. 

Пример структуры товара:
```typescript
{
  id: 'unique_id',
  name: 'Название товара',
  description: 'Описание товара',
  price: 1000, // цена в рублях
  image: 'https://example.com/image.jpg',
  category: 'electronics', // ID категории
  inStock: true,
}
```

## Деплой на Vercel

1. Загрузите проект в GitHub репозиторий
2. Зайдите на [vercel.com](https://vercel.com) и войдите через GitHub
3. Нажмите "Add New Project"
4. Выберите ваш репозиторий
5. В настройках проекта добавьте переменные окружения:
   - `NEXT_PUBLIC_BOT_TOKEN`
   - `NEXT_PUBLIC_ADMIN_CHAT_ID`
6. Нажмите "Deploy"

## Создание Mini App в Telegram

1. Откройте [@BotFather](https://t.me/BotFather)
2. Отправьте команду `/newapp`
3. Выберите вашего бота
4. Введите название приложения
5. Введите описание
6. Загрузите иконку (512x512px)
7. Введите URL вашего приложения на Vercel (например: `https://your-app.vercel.app`)
8. Готово! Ваше Mini App создано

## Тестирование

Для тестирования Mini App:
1. Найдите вашего бота в Telegram
2. Откройте меню бота
3. Нажмите на ваше Mini App
4. Приложение откроется внутри Telegram

## Интеграция оплаты

Для полноценной интеграции оплаты через Telegram Payments необходимо:

1. Настроить бэкенд (API route в Next.js или отдельный сервер)
2. Создать endpoint для генерации инвойсов
3. Использовать Telegram Bot API для создания платежных инвойсов
4. Обработать webhook от Telegram после успешной оплаты

Пример создания инвойса (требует бэкенд):
```typescript
// pages/api/create-invoice.ts
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { amount, description } = req.body;
  
  // Используйте Telegram Bot API для создания инвойса
  const response = await fetch(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/createInvoiceLink`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: 'Оплата заказа',
      description: description,
      payload: JSON.stringify({ orderId: '...' }),
      provider_token: 'YOUR_PROVIDER_TOKEN', // токен платежного провайдера
      currency: 'RUB',
      prices: [{ label: 'Товары', amount: amount * 100 }], // в копейках
    }),
  });
  
  const data = await response.json();
  res.json({ invoiceUrl: data.result });
}
```


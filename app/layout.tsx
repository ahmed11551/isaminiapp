import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Магазин - Telegram Mini App',
  description: 'Каталог товаров с возможностью заказа',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <head>
        <script src="https://telegram.org/js/telegram-web-app.js"></script>
      </head>
      <body>{children}</body>
    </html>
  );
}


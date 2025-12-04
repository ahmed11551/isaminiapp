import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const order = await request.json();
    
    const botToken = process.env.NEXT_PUBLIC_BOT_TOKEN;
    const adminChatId = process.env.NEXT_PUBLIC_ADMIN_CHAT_ID;
    
    if (!botToken || !adminChatId) {
      return NextResponse.json(
        { error: 'Bot token or admin chat ID not configured' },
        { status: 500 }
      );
    }

    // Форматируем сообщение о заказе
    const formatPrice = (price: number) => {
      return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB',
        minimumFractionDigits: 0,
      }).format(price);
    };

    const itemsText = order.items
      .map(
        (item: any) =>
          `• ${item.product.name} x${item.quantity} = ${formatPrice(
            item.product.price * item.quantity
          )}`
      )
      .join('\n');

    const message = `🛒 <b>Новый заказ!</b>\n\n` +
      `👤 <b>Покупатель:</b> ${order.customerName}\n` +
      `📞 <b>Телефон:</b> ${order.customerPhone || 'Не указан'}\n` +
      `📍 <b>Адрес:</b> ${order.customerAddress || 'Не указан'}\n\n` +
      `📦 <b>Товары:</b>\n${itemsText}\n\n` +
      `💰 <b>Итого:</b> ${formatPrice(order.total)}\n\n` +
      `🕐 <b>Время:</b> ${new Date(order.timestamp).toLocaleString('ru-RU')}`;

    // Отправляем сообщение в Telegram
    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const response = await fetch(telegramUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: adminChatId,
        text: message,
        parse_mode: 'HTML',
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Telegram API error:', error);
      return NextResponse.json(
        { error: 'Failed to send order notification' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, message: 'Order sent successfully' });
  } catch (error) {
    console.error('Error processing order:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}


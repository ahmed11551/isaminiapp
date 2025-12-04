'use client';

import { useCart } from '@/hooks/useCart';
import { useTelegram } from '@/hooks/useTelegram';
import { useState, useEffect } from 'react';

interface ImageErrorState {
  [key: string]: boolean;
}

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Cart({ isOpen, onClose }: CartProps) {
  const { cart, removeFromCart, updateQuantity, clearCart, getTotal } = useCart();
  const { tg, user } = useTelegram();
  const [isProcessing, setIsProcessing] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [imageErrors, setImageErrors] = useState<ImageErrorState>({});

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Заполняем данные пользователя из Telegram при открытии корзины
  useEffect(() => {
    if (isOpen && user) {
      setCustomerName(user.first_name + (user.last_name ? ` ${user.last_name}` : ''));
      if (!customerPhone && user.id) {
        setCustomerPhone(user.id.toString());
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, user]);

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    
    if (!customerName.trim()) {
      tg?.showAlert('Пожалуйста, укажите ваше имя');
      return;
    }
    
    if (!customerPhone.trim()) {
      tg?.showAlert('Пожалуйста, укажите ваш телефон');
      return;
    }

    setIsProcessing(true);

    try {
      // Создаем заказ
      const order = {
        items: cart,
        total: getTotal(),
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
        customerAddress: customerAddress.trim() || undefined,
        timestamp: new Date().toISOString(),
      };

      // Отправляем заказ через API
      try {
        const response = await fetch('/api/order', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(order),
        });

        if (!response.ok) {
          throw new Error('Failed to send order');
        }
      } catch (error) {
        console.error('Error sending order:', error);
        // Fallback: используем sendData если API недоступен
        if (tg) {
          tg.sendData(JSON.stringify(order));
        }
      }

      // Показываем форму оплаты через Telegram Payments
      if (tg?.openInvoice) {
        // В реальном приложении здесь должен быть URL инвойса от вашего бэкенда
        // Для демо используем простой alert
        tg.showAlert('Заказ оформлен! С вами свяжется менеджер для подтверждения и оплаты.', () => {
          clearCart();
          onClose();
        });
      } else {
        tg?.showAlert('Заказ оформлен! С вами свяжется менеджер для подтверждения и оплаты.', () => {
          clearCart();
          onClose();
        });
      }
    } catch (error) {
      console.error('Error processing order:', error);
      tg?.showAlert('Произошла ошибка при оформлении заказа. Попробуйте позже.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
      <div className="bg-telegram-bg w-full max-h-[90vh] rounded-t-2xl flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-telegram-secondary">
          <h2 className="text-white text-xl font-bold">Корзина</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl"
          >
            ×
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4">
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">Корзина пуста</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.product.id}
                  className="bg-telegram-secondary rounded-lg p-4 flex gap-4"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imageErrors[item.product.id] ? 'https://via.placeholder.com/80x80?text=No+Image' : item.product.image}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded flex-shrink-0"
                    onError={() => setImageErrors(prev => ({ ...prev, [item.product.id]: true }))}
                  />
                  <div className="flex-1">
                    <h3 className="text-white font-semibold mb-1">{item.product.name}</h3>
                    <p className="text-gray-400 text-sm mb-2">
                      {formatPrice(item.product.price)} × {item.quantity}
                    </p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="w-8 h-8 bg-telegram-button text-white rounded flex items-center justify-center"
                      >
                        −
                      </button>
                      <span className="text-white w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="w-8 h-8 bg-telegram-button text-white rounded flex items-center justify-center"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="ml-auto text-red-400 hover:text-red-300"
                      >
                        Удалить
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="border-t border-telegram-secondary p-4">
            <div className="mb-4 space-y-3">
              <div>
                <label className="block text-gray-400 text-sm mb-1">Имя *</label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Ваше имя"
                  className="w-full bg-telegram-secondary text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-telegram-button focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-1">Телефон *</label>
                <input
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="+7 (999) 123-45-67"
                  className="w-full bg-telegram-secondary text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-telegram-button focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-1">Адрес доставки</label>
                <input
                  type="text"
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  placeholder="Адрес доставки (необязательно)"
                  className="w-full bg-telegram-secondary text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-telegram-button focus:outline-none"
                />
              </div>
            </div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-400 text-lg">Итого:</span>
              <span className="text-white font-bold text-2xl">
                {formatPrice(getTotal())}
              </span>
            </div>
            <button
              onClick={handleCheckout}
              disabled={isProcessing}
              className="w-full bg-telegram-button text-white py-3 rounded-lg font-semibold text-lg hover:bg-telegram-buttonHover active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? 'Оформление...' : 'Оформить заказ'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}


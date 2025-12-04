import { NextRequest, NextResponse } from 'next/server';
import { getProductImageUrls } from '@/utils/productImage';

/**
 * API endpoint для получения информации о товаре по коду
 * GET /api/product/[code]
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { code: string } }
) {
  try {
    const code = params.code;
    
    if (!code) {
      return NextResponse.json(
        { error: 'Product code is required' },
        { status: 400 }
      );
    }

    // Получаем возможные URL изображений
    const imageUrls = getProductImageUrls(code);

    // Пытаемся найти доступное изображение
    // В реальном приложении здесь можно сделать запрос к API isa-access.ru
    // или парсить страницу товара
    
    return NextResponse.json({
      code,
      imageUrls,
      primaryImage: imageUrls[0],
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}


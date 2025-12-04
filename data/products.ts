import { Product, Category } from '@/types';

export const categories: Category[] = [
  { id: 'electronics', name: 'Электроника' },
  { id: 'clothing', name: 'Одежда' },
  { id: 'food', name: 'Еда и напитки' },
  { id: 'books', name: 'Книги' },
  { id: 'home', name: 'Дом и сад' },
  { id: 'sports', name: 'Спорт и отдых' },
];

export const products: Product[] = [
  // Электроника
  {
    id: '1',
    name: 'Смартфон Premium',
    description: 'Современный смартфон с отличной камерой',
    price: 29999,
    image: 'https://via.placeholder.com/300x300?text=Smartphone',
    category: 'electronics',
    inStock: true,
  },
  {
    id: '2',
    name: 'Наушники Bluetooth',
    description: 'Беспроводные наушники с шумоподавлением',
    price: 4999,
    image: 'https://via.placeholder.com/300x300?text=Headphones',
    category: 'electronics',
    inStock: true,
  },
  {
    id: '3',
    name: 'Планшет 10"',
    description: 'Планшет для работы и развлечений',
    price: 19999,
    image: 'https://via.placeholder.com/300x300?text=Tablet',
    category: 'electronics',
    inStock: true,
  },
  // Одежда
  {
    id: '4',
    name: 'Футболка Premium',
    description: 'Качественная хлопковая футболка',
    price: 1999,
    image: 'https://via.placeholder.com/300x300?text=T-Shirt',
    category: 'clothing',
    inStock: true,
  },
  {
    id: '5',
    name: 'Джинсы Classic',
    description: 'Классические джинсы из денима',
    price: 3999,
    image: 'https://via.placeholder.com/300x300?text=Jeans',
    category: 'clothing',
    inStock: true,
  },
  {
    id: '6',
    name: 'Кроссовки Sport',
    description: 'Удобные спортивные кроссовки',
    price: 5999,
    image: 'https://via.placeholder.com/300x300?text=Sneakers',
    category: 'clothing',
    inStock: true,
  },
  // Еда и напитки
  {
    id: '7',
    name: 'Кофе Premium',
    description: 'Ароматный кофе в зернах, 500г',
    price: 899,
    image: 'https://via.placeholder.com/300x300?text=Coffee',
    category: 'food',
    inStock: true,
  },
  {
    id: '8',
    name: 'Чай Collection',
    description: 'Набор элитных чаев, 200г',
    price: 1299,
    image: 'https://via.placeholder.com/300x300?text=Tea',
    category: 'food',
    inStock: true,
  },
  // Книги
  {
    id: '9',
    name: 'Книга "Программирование"',
    description: 'Учебник по современному программированию',
    price: 1499,
    image: 'https://via.placeholder.com/300x300?text=Book',
    category: 'books',
    inStock: true,
  },
  {
    id: '10',
    name: 'Художественная литература',
    description: 'Сборник лучших произведений',
    price: 999,
    image: 'https://via.placeholder.com/300x300?text=Novel',
    category: 'books',
    inStock: true,
  },
  // Дом и сад
  {
    id: '11',
    name: 'Горшок для цветов',
    description: 'Керамический горшок, 20см',
    price: 599,
    image: 'https://via.placeholder.com/300x300?text=Pot',
    category: 'home',
    inStock: true,
  },
  {
    id: '12',
    name: 'Набор посуды',
    description: 'Современный набор посуды на 6 персон',
    price: 4999,
    image: 'https://via.placeholder.com/300x300?text=Dishes',
    category: 'home',
    inStock: true,
  },
  // Спорт и отдых
  {
    id: '13',
    name: 'Мяч футбольный',
    description: 'Профессиональный футбольный мяч',
    price: 2999,
    image: 'https://via.placeholder.com/300x300?text=Ball',
    category: 'sports',
    inStock: true,
  },
  {
    id: '14',
    name: 'Гантели 5кг',
    description: 'Набор гантелей для тренировок',
    price: 3999,
    image: 'https://via.placeholder.com/300x300?text=Dumbbells',
    category: 'sports',
    inStock: true,
  },
];

export const getProductsByCategory = (categoryId: string): Product[] => {
  return products.filter((product) => product.category === categoryId);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find((product) => product.id === id);
};


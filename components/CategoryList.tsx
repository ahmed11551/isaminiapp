'use client';

import { Category } from '@/types';
import { categories } from '@/data/products';

interface CategoryListProps {
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string | null) => void;
}

export default function CategoryList({ selectedCategory, onSelectCategory }: CategoryListProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 px-4 scrollbar-hide">
      <button
        onClick={() => onSelectCategory(null)}
        className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
          selectedCategory === null
            ? 'bg-telegram-button text-white'
            : 'bg-telegram-secondary text-gray-300'
        }`}
      >
        Все товары
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onSelectCategory(category.id)}
          className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
            selectedCategory === category.id
              ? 'bg-telegram-button text-white'
              : 'bg-telegram-secondary text-gray-300'
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}


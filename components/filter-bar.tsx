'use client';

import { useState } from 'react';

interface FilterBarProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  onSearchChange: (search: string) => void;
}
import { Combobox, ComboboxInput } from '@headlessui/react';

export default function FilterBar({ 
  categories, 
  selectedCategory,
  onCategoryChange,
  onSearchChange 
}: FilterBarProps) {
  const [query, setQuery] = useState('');

  return (
    <div className="mb-8 flex flex-col md:flex-row gap-4">
      {/* 分类筛选 */}
      <div className="flex gap-2 flex-wrap">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              selectedCategory === category
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      
      {/* 搜索框 */}
      <div className="relative max-w-xs w-full">
        <Combobox onChange={onSearchChange}>
          <div className="relative">
            <ComboboxInput
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="搜索模板..."
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setQuery(e.target.value);
                onSearchChange(e.target.value || '');
              }}
            />
            <svg 
              className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </Combobox>
      </div>
    </div>
  );
}

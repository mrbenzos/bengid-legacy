'use client';

import { HiSearch } from 'react-icons/hi';

const DEFAULT_CATEGORIES = [
  'Inks',
  'Stationary',
  'Photo Papers',
  'Lamination Films',
  'Hardwares',
  'Delivery Service',
  'Other',
];

interface SearchFilterProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  categories?: string[];
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
}

export default function SearchFilter({
  searchTerm,
  onSearchChange,
  categories = DEFAULT_CATEGORIES,
  selectedCategory,
  onCategoryChange,
}: SearchFilterProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 w-full max-w-4xl mx-auto mb-8">
      {/* Search Input */}
      <div className="relative flex-grow">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
          <HiSearch className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search printing materials..."
          className="block w-full pl-11 pr-4 py-2.5 border border-gray-300 rounded-full focus:ring-2 focus:ring-[#4B6F23]/20 focus:border-[#4B6F23] bg-white text-gray-900 placeholder-gray-400 shadow-sm transition-all text-sm outline-none"
        />
      </div>

      {/* Category Filter */}
      <div className="md:w-64 flex-shrink-0">
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="block w-full px-4 py-2.5 border border-gray-300 rounded-full focus:ring-2 focus:ring-[#4B6F23]/20 focus:border-[#4B6F23] bg-white text-gray-900 shadow-sm transition-all text-sm cursor-pointer outline-none"
        >
          <option value="All Categories">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

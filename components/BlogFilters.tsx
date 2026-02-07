'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';
import { Filter, X } from 'lucide-react';

interface Category {
  title: string;
}

interface BlogFiltersProps {
  categories: Category[];
  currentCategory?: string;
}

export default function BlogFilters({ categories, currentCategory }: BlogFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const handleCategoryClick = (category?: string) => {
    const params = new URLSearchParams(searchParams?.toString() || '');
    
    if (category) {
      params.set('category', category);
    } else {
      params.delete('category');
    }
    
    params.delete('page'); // Reset to page 1
    
    startTransition(() => {
      router.push(`/blog?${params.toString()}`);
    });
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* All Articles Button */}
      <button
        onClick={() => handleCategoryClick()}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
          !currentCategory
            ? 'bg-blue-600 text-white'
            : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
        }`}
        aria-current={!currentCategory ? 'page' : undefined}
      >
        <Filter className="w-4 h-4" />
        All Articles
      </button>

      {/* Category Filters */}
      {categories.map((category) => (
        <button
          key={category.title}
          onClick={() => handleCategoryClick(category.title)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            currentCategory === category.title
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
          }`}
          aria-current={currentCategory === category.title ? 'page' : undefined}
        >
          {category.title}
        </button>
      ))}
    </div>
  );
}
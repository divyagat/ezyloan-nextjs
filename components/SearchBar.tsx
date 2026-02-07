'use client';

import { useState, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, X } from 'lucide-react';

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [searchQuery, setSearchQuery] = useState(searchParams?.get('search') || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = searchQuery.trim();
    
    const params = new URLSearchParams(searchParams?.toString() || '');
    
    if (trimmed) {
      params.set('search', trimmed);
      params.delete('page'); // Reset to page 1 on new search
    } else {
      params.delete('search');
    }
    
    startTransition(() => {
      router.push(`/blog?${params.toString()}`);
    });
  };

  const handleClear = () => {
    setSearchQuery('');
    const params = new URLSearchParams(searchParams?.toString() || '');
    params.delete('search');
    params.delete('page');
    router.push(`/blog?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="relative max-w-2xl mx-auto">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search loan guides, tips, and advice..."
          className="block w-full pl-11 pr-12 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400"
          aria-label="Search blog articles"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
            aria-label="Clear search"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
      <button
        type="submit"
        disabled={isPending}
        className="sr-only"
        aria-label="Submit search"
      >
        Search
      </button>
    </form>
  );
}
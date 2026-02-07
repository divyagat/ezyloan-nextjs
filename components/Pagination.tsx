'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const getPageLink = (page: number) => {
    const params = new URLSearchParams(searchParams?.toString() || '');
    if (page === 1) {
      params.delete('page');
    } else {
      params.set('page', page.toString());
    }
    return `/blog?${params.toString()}`;
  };

  const pages = [];
  const maxVisible = 5;

  if (totalPages <= maxVisible) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    if (currentPage <= 3) {
      pages.push(1, 2, 3, 4, '...', totalPages);
    } else if (currentPage >= totalPages - 2) {
      pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
    }
  }

  return (
    <nav aria-label="Blog pagination" className="flex items-center justify-center">
      <ul className="flex items-center gap-1">
        {/* Previous Button */}
        <li>
          {currentPage > 1 ? (
            <Link
              href={getPageLink(currentPage - 1)}
              className="flex items-center justify-center w-10 h-10 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-5 h-5" />
            </Link>
          ) : (
            <span className="flex items-center justify-center w-10 h-10 rounded-lg border border-gray-200 text-gray-400 cursor-not-allowed">
              <ChevronLeft className="w-5 h-5" />
            </span>
          )}
        </li>

        {/* Page Numbers */}
        {pages.map((page, index) => {
          if (page === '...') {
            return (
              <li key={`ellipsis-${index}`}>
                <span className="px-3 py-2 text-gray-500">...</span>
              </li>
            );
          }

          const pageNum = page as number;
          const isActive = pageNum === currentPage;

          return (
            <li key={pageNum}>
              <Link
                href={getPageLink(pageNum)}
                className={`flex items-center justify-center w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-gray-50 border border-gray-300'
                }`}
                aria-current={isActive ? 'page' : undefined}
                aria-label={isActive ? `Page ${pageNum}, current page` : `Page ${pageNum}`}
              >
                {pageNum}
              </Link>
            </li>
          );
        })}

        {/* Next Button */}
        <li>
          {currentPage < totalPages ? (
            <Link
              href={getPageLink(currentPage + 1)}
              className="flex items-center justify-center w-10 h-10 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
              aria-label="Next page"
            >
              <ChevronRight className="w-5 h-5" />
            </Link>
          ) : (
            <span className="flex items-center justify-center w-10 h-10 rounded-lg border border-gray-200 text-gray-400 cursor-not-allowed">
              <ChevronRight className="w-5 h-5" />
            </span>
          )}
        </li>
      </ul>
    </nav>
  );
}
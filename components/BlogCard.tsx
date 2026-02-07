'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, User } from 'lucide-react';

interface BlogPost {
  title: string;
  slug: { current: string };
  metaDescription?: string;
  publishDate: string;
  updatedDate?: string;
  mainImage?: string;
  category?: { title: string };
  author?: { name: string };
}

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  const publishDate = new Date(post.publishDate).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const readingTime = Math.ceil((post.metaDescription?.length || 300) / 200);

  return (
    <article className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-200 flex flex-col h-full">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        {post.mainImage ? (
          <Image
            src={post.mainImage}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
            <svg
              className="w-16 h-16 text-blue-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Category Badge */}
        {post.category?.title && (
          <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium mb-3 w-fit">
            {post.category.title}
          </span>
        )}

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-blue-600 transition-colors">
          <Link href={`/blog/${post.slug.current}`} className="block">
            {post.title}
          </Link>
        </h3>

        {/* Description */}
        {post.metaDescription && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
            {post.metaDescription}
          </p>
        )}

        {/* Meta Info */}
        <div className="flex flex-wrap items-center text-xs text-gray-500 gap-4 pt-2 border-t border-gray-200 mt-auto">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            <time dateTime={post.publishDate}>{publishDate}</time>
          </div>
          
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>{readingTime} min read</span>
          </div>
          
          {post.author?.name && (
            <div className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" />
              <span>{post.author.name}</span>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
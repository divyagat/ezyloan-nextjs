// components/PortableText.tsx
'use client';

import { PortableText as PortableTextComponent } from '@portabletext/react';
import Link from 'next/link';

const components = {
  marks: {
    link: ({ children, value }: any) => {
      const href = value?.href || '';
      
      // Internal links
      if (href.startsWith('/') && !href.startsWith('//')) {
        return (
          <Link href={href} className="text-blue-600 hover:underline font-medium">
            {children}
          </Link>
        );
      }
      
      // External links
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline font-medium"
        >
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }: any) => (
      <div className="my-8 text-center">
        <img
          src={value?.asset?.url || value}
          alt={value.alt || 'Image'}
          className="max-w-full h-auto rounded-lg"
          loading="lazy"
        />
        {value.caption && (
          <p className="mt-2 text-sm text-gray-600">{value.caption}</p>
        )}
      </div>
    ),
  },
  block: {
    h2: ({ children }: any) => (
      <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-xl font-bold mt-6 mb-3 text-gray-900">{children}</h3>
    ),
    normal: ({ children }: any) => (
      <p className="mb-4 text-gray-700 leading-relaxed">{children}</p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-blue-500 pl-4 py-2 my-6 italic text-gray-700 bg-blue-50">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc list-inside mb-4 space-y-2 text-gray-700">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal list-inside mb-4 space-y-2 text-gray-700">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => <li className="pl-1">{children}</li>,
    number: ({ children }: any) => <li className="pl-1">{children}</li>,
  },
};

export default function PortableText({ value }: { value: any }) {
  if (!value || value.length === 0) return null;
  return <PortableTextComponent value={value} components={components} />;
}
// components/PortableText.tsx
'use client';

import { PortableText as PortableTextComponent } from '@portabletext/react';
import Link from 'next/link';
import Image from 'next/image';
import { client } from '@/lib/sanity';

const imageUrlBuilder = (client: any) => {
  return {
    image: (source: any) => {
      return {
        width: (w: number) => {
          return {
            url: () => {
              if (!source?.asset?._ref) return '';
              const imageId = source.asset._ref.replace('image-', '').replace(/-.*/, '');
              return `https://cdn.sanity.io/images/${client.config().projectId}/${client.config().dataset}/${imageId}.webp?w=${w}&auto=format`;
            }
          };
        }
      };
    }
  };
};

const builder = imageUrlBuilder(client);

function urlFor(source: any) {
  return builder.image(source);
}

const components = {
  marks: {
    link: ({ children, value }: any) => {
      const href = value?.href || '';
      
      // Handle internal links
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
          rel="noopener noreferrer nofollow"
          className="text-blue-600 hover:underline font-medium"
        >
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) return null;
      
      const imageUrl = urlFor(value)
        .width(800)
        .url();

      return (
        <div className="my-8 text-center">
          <Image
            src={imageUrl}
            alt={value.alt || 'Blog image'}
            width={800}
            height={450}
            className="rounded-lg shadow-md mx-auto"
            loading="lazy"
          />
          {value.caption && (
            <p className="mt-2 text-sm text-gray-600">{value.caption}</p>
          )}
        </div>
      );
    },
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

interface PortableTextProps {
  value: any;
}

export default function PortableText({ value }: PortableTextProps) {
  if (!value || value.length === 0) return null;
  
  return <PortableTextComponent value={value} components={components} />;
}
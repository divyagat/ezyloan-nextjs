'use client';

import { useEffect, useState } from 'react';
import type { BlogPost } from '@/lib/schemas';

interface StructuredDataProps {
  post: BlogPost;
}

export default function StructuredData({ post }: StructuredDataProps) {
  const [articleData, setArticleData] = useState<any>(null);
  const [faqData, setFaqData] = useState<any>(null);

  useEffect(() => {
    const baseUrl = 'https://ezyloan.co.in';
    const publishDate = new Date(post.publishDate).toISOString();
    const modifiedDate = post.updatedDate 
      ? new Date(post.updatedDate).toISOString() 
      : publishDate;

    // Article Schema
    setArticleData({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: post.title,
      description: post.metaDescription || post.title,
      image: post.mainImage || `${baseUrl}/ezy-logo.png`,
      datePublished: publishDate,
      dateModified: modifiedDate,
      author: {
        '@type': 'Person',
        name: post.author?.name || 'EzyLoan Team',
      },
      publisher: {
        '@type': 'Organization',
        name: 'EzyLoan',
        logo: {
          '@type': 'ImageObject',
          url: `${baseUrl}/ezy-logo.png`,
          width: 600,
          height: 60,
        },
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `${baseUrl}/blog/${post.slug.current}`,
      },
    });

    // FAQ Schema (if exists)
    if (post.faq && post.faq.length > 0) {
      setFaqData({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: post.faq.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      });
    }
  }, [post]);

  if (!articleData) return null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleData) }}
      />
      {faqData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
        />
      )}
    </>
  );
}
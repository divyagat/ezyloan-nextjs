import type { BlogPost } from './schemas';

export function generateBlogMetadata(post: BlogPost) {
  const baseUrl = 'https://ezyloan.co.in';
  const ogImage = post.mainImage || `${baseUrl}/ezy-logo.png`;
  const publishDate = new Date(post.publishDate).toISOString();
  const modifiedDate = post.updatedDate 
    ? new Date(post.updatedDate).toISOString() 
    : publishDate;

  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || `${post.title} - Expert insights on loans from EzyLoan`,
    openGraph: {
      type: 'article',
      url: `${baseUrl}/blog/${post.slug.current}`,
      title: post.metaTitle || post.title,
      description: post.metaDescription,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      publishedTime: publishDate,
      modifiedTime: modifiedDate,
      section: post.category?.title || 'Loans',
      authors: [post.author?.name || 'EzyLoan Team'],
      siteName: 'EzyLoan',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.metaTitle || post.title,
      description: post.metaDescription,
      images: [ogImage],
    },
    alternates: {
      canonical: `${baseUrl}/blog/${post.slug.current}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/'],
    },
    sitemap: [
      'https://ezyloan.co.in/sitemap.xml',
      'https://ezyloan.co.in/blog/sitemap.xml',
    ],
  };
}
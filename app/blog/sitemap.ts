import { MetadataRoute } from 'next';
import { getAllBlogPosts } from '@/lib/sanity';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllBlogPosts();
  const baseUrl = 'https://ezyloan.co.in';

  return posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug.current}`,
    lastModified: new Date(post.updatedDate || post.publishDate),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));
}
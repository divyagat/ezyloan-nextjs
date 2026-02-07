import { MetadataRoute } from 'next';
import { getAllBlogPosts } from '@/lib/sanity';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://ezyloan.co.in';
  
  // Static routes
  const staticRoutes = [
    { url: `${baseUrl}`, lastModified: new Date() },
    { url: `${baseUrl}/about`, lastModified: new Date() },
    { url: `${baseUrl}/contact`, lastModified: new Date() },
    { url: `${baseUrl}/apply`, lastModified: new Date() },
    { url: `${baseUrl}/blog`, lastModified: new Date() },
    // Add other critical pages here
  ];

  // Blog posts
  const blogPosts = await getAllBlogPosts();
  const blogRoutes = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug.current}`,
    lastModified: new Date(post.updatedDate || post.publishDate),
  }));

  return [...staticRoutes, ...blogRoutes];
}
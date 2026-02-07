import { notFound } from 'next/navigation';
import { getBlogPost } from '@/lib/sanity';
import BlogPost from '@/components/BlogPost';
import StructuredData from '@/components/StructuredData';
import { generateBlogMetadata } from '@/lib/seo';

// ISR Configuration
export const revalidate = 3600; // 1 hour

// Generate dynamic metadata
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug);
  if (!post) return notFound();
  return generateBlogMetadata(post);
}

// Generate static paths for SSG
export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs();
  return slugs.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug);
  
  if (!post) {
    notFound();
  }

  return (
    <>
      <StructuredData post={post} />
      <BlogPost post={post} />
    </>
  );
}
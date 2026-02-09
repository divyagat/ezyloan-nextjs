import { Metadata } from 'next';
import Link from 'next/link';
import { getPost, getAllSlugs } from '@/lib/sanity';
import PortableText from '@/components/PortableText';

export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((s: any) => ({ slug: s.slug }));
}

export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const post = await getPost(params.slug);

  if (!post) return { title: 'Post Not Found' };

  return {
    title: post.title,
    description: post.metaDescription,
  };
}

export default async function BlogPostPage(
  { params }: { params: { slug: string } }
) {
  const post = await getPost(params.slug);

  if (!post) {
    return <Link href="/blog">← Back to blog</Link>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded shadow">

        {post.mainImage && (
          <img
            src={post.mainImage}
            className="w-full h-96 object-cover"
            alt={post.title}
          />
        )}

        <div className="p-8">
          <h1 className="text-3xl font-bold mb-3">{post.title}</h1>

          <p className="text-sm text-gray-500 mb-6">
            {new Date(post.publishDate).toDateString()}
            {post.author && ` • ${post.author}`}
          </p>

          <div className="prose max-w-none">
            <PortableText value={post.body} />
          </div>

          <Link href="/blog" className="text-blue-600 mt-6 inline-block">
            ← Back to Blog
          </Link>
        </div>
      </div>
    </div>
  );
}

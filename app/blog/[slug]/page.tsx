import { Metadata } from 'next';
import Link from 'next/link';
import { getPost, getAllSlugs } from '@/lib/sanity';
import PortableText from '@/components/PortableText';

export const revalidate = 3600;

type Props = {
  params: { slug: string };
};

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const post = await getPost(params.slug);

  if (!post) {
    return { title: 'Post Not Found | EzyLoan' };
  }

  return {
    title: post.title,
    description: post.metaDescription,
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      images: post.mainImage ? [post.mainImage] : [],
    },
  };
}

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((s) => ({ slug: s.slug }));
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getPost(params.slug);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Link href="/blog" className="text-blue-600">
          ← Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow overflow-hidden">

        {/* Header */}
        <div className="p-8 border-b">
          {post.category && (
            <span className="inline-block mb-4 px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-700">
              {post.category}
            </span>
          )}

          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            {post.title}
          </h1>

          <p className="text-sm text-gray-500">
            {new Date(post.publishDate).toLocaleDateString()}
            {post.author && ` • ${post.author}`}
          </p>
        </div>

        {/* Image */}
        {post.mainImage && (
          <img
            src={post.mainImage}
            alt={post.title}
            className="w-full h-96 object-cover"
          />
        )}

        {/* Content */}
        <div className="prose prose-lg max-w-none p-8">
          <PortableText value={post.content} />
        </div>

        {/* Footer */}
        <div className="border-t p-6">
          <Link href="/blog" className="text-blue-600 hover:underline">
            ← Back to Blog
          </Link>
        </div>
      </div>
    </div>
  );
}

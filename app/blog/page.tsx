import { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts } from '@/lib/sanity';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Loan Blog | EzyLoan',
  description: 'Expert loan guides and financial tips',
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 mt-10">
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Loan Guides & Tips</h1>
          <p className="text-gray-600">
            Expert advice on loans and financial planning
          </p>
        </div>

        {posts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post: any) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="bg-white rounded-lg shadow hover:shadow-lg overflow-hidden"
              >
                {post.mainImage ? (
                  <img
                    src={post.mainImage}
                    className="h-48 w-full object-cover"
                    alt={post.title}
                  />
                ) : (
                  <div className="h-48 flex items-center justify-center bg-gray-100">
                    📝
                  </div>
                )}

                <div className="p-6">
                  {post.category && (
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                      {post.category}
                    </span>
                  )}

                  <h2 className="text-xl font-bold mt-2">
                    {post.title}
                  </h2>

                  <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                    {post.metaDescription}
                  </p>

                  <p className="text-xs text-gray-500 mt-3">
                    {new Date(post.publishDate).toDateString()}
                    {post.author && ` • ${post.author}`}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No posts yet</p>
        )}
      </div>
    </div>
  );
}

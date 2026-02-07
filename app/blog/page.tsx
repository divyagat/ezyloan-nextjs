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
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Loan Guides & Tips
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Expert advice on loans, credit scores, and financial planning
          </p>
        </div>

        {/* Blog Grid */}
        {posts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
              >
                {post.mainImage ? (
                  <img
                    src={post.mainImage}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="h-48 flex items-center justify-center bg-blue-50 text-4xl">
                    📝
                  </div>
                )}

                <div className="p-6">
                  {post.category && (
                    <span className="inline-block mb-3 px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-700">
                      {post.category}
                    </span>
                  )}

                  <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                    {post.title}
                  </h2>

                  {post.metaDescription && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {post.metaDescription}
                    </p>
                  )}

                  <div className="text-sm text-gray-500">
                    {new Date(post.publishDate).toLocaleDateString()}
                    {post.author && ` • ${post.author}`}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-white p-12 rounded shadow text-center">
            <h2 className="text-2xl font-bold mb-2">No posts yet</h2>
            <p className="text-gray-600">
              Check back soon for helpful loan guides!
            </p>
          </div>
        )}

        {/* CTA */}
        <div className="mt-16 text-center">
          <Link
            href="/apply"
            className="inline-block px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Apply for a Loan
          </Link>
        </div>
      </div>
    </div>
  );
}

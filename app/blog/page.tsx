import { Metadata } from 'next';
import Link from 'next/link';
import { getAllBlogPosts, getCategories } from '@/lib/sanity';
import BlogCard from '@/components/BlogCard';
import BlogFilters from '@/components/BlogFilters';
import SearchBar from '@/components/SearchBar';
import Pagination from '@/components/Pagination';

// ISR Configuration
export const revalidate = 3600; // 1 hour

// Generate metadata for blog listing page
export const metadata: Metadata = {
  title: 'Loan Blog & Guides | EzyLoan',
  description:
    'Expert insights on personal loans, business loans, credit scores, and financial tips. Stay informed with EzyLoan\'s comprehensive loan guides.',
  keywords:
    'loan blog, personal loan guide, business loan tips, credit score advice, financial education, loan eligibility, EMI calculator guide, loan documents, CIBIL score tips',
  openGraph: {
    title: 'Loan Blog & Guides | EzyLoan',
    description:
      'Expert insights on personal loans, business loans, credit scores, and financial tips. Stay informed with EzyLoan\'s comprehensive loan guides.',
    url: 'https://ezyloan.co.in/blog',
    siteName: 'EzyLoan',
    images: [
      {
        url: 'https://ezyloan.co.in/ezy-logo.png',
        width: 1200,
        height: 630,
        alt: 'EzyLoan Blog',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Loan Blog & Guides | EzyLoan',
    description:
      'Expert insights on personal loans, business loans, credit scores, and financial tips.',
    images: ['https://ezyloan.co.in/ezy-logo.png'],
  },
  alternates: {
    canonical: 'https://ezyloan.co.in/blog',
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

// Server-side search and filter function
async function getFilteredPosts({
  category,
  search,
  page = 1,
  limit = 9,
}: {
  category?: string;
  search?: string;
  page?: number;
  limit?: number;
}) {
  const skip = (page - 1) * limit;

  // Build query based on filters
  let query = `*[_type == "blogPost"`;
  const params: any = {};

  if (category) {
    query += ` && category->title == $category`;
    params.category = category;
  }

  if (search) {
    query += ` && (title match $search || metaDescription match $search || content[].children[].text match $search)`;
    params.search = `*${search}*`;
  }

  query += `] | order(publishDate desc) [${skip}...${skip + limit}] {
    title,
    slug,
    metaDescription,
    publishDate,
    updatedDate,
    "mainImage": mainImage.asset->url,
    category->title,
    author->name,
    "excerpt": pt::text(content)[0..200]
  }`;

  const posts = await getAllBlogPosts();
  
  // Client-side filtering (since Sanity doesn't support full-text search in free tier)
  let filteredPosts = posts;
  
  if (category) {
    filteredPosts = filteredPosts.filter(post => post.category?.title === category);
  }
  
  if (search) {
    const searchTerm = search.toLowerCase();
    filteredPosts = filteredPosts.filter(post => 
      post.title.toLowerCase().includes(searchTerm) ||
      post.metaDescription?.toLowerCase().includes(searchTerm) ||
      post.category?.title?.toLowerCase().includes(searchTerm)
    );
  }

  // Pagination
  const totalPosts = filteredPosts.length;
  const paginatedPosts = filteredPosts.slice(skip, skip + limit);

  return {
    posts: paginatedPosts,
    total: totalPosts,
    currentPage: page,
    totalPages: Math.ceil(totalPosts / limit),
  };
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const category = typeof searchParams?.category === 'string' ? searchParams.category : undefined;
  const search = typeof searchParams?.search === 'string' ? searchParams.search : undefined;
  const page = typeof searchParams?.page === 'string' ? parseInt(searchParams.page) : 1;

  const { posts, total, currentPage, totalPages } = await getFilteredPosts({
    category,
    search,
    page,
    limit: 9,
  });

  const categories = await getCategories();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Loan Guides & Financial Insights
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Expert advice on personal loans, business financing, credit scores, and smart money management
            </p>
            <SearchBar />
          </div>
        </div>
      </section>

      {/* Filters & Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <BlogFilters categories={categories} currentCategory={category} />
          </div>
          <div className="text-sm text-gray-600">
            {total} {total === 1 ? 'article' : 'articles'} found
            {category && ` in ${category}`}
            {search && ` for "${search}"`}
          </div>
        </div>

        {/* Blog Grid */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {posts.map((post) => (
              <BlogCard
                key={post.slug.current}
                post={{
                  title: post.title,
                  slug: post.slug,
                  metaDescription: post.metaDescription,
                  publishDate: post.publishDate,
                  updatedDate: post.updatedDate,
                  mainImage: post.mainImage,
                  category: post.category,
                  author: post.author,
                }}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-lg shadow-md">
            <svg
              className="mx-auto h-16 w-16 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9.172 9.172a4 4 0 015.656 0m-7.071 7.071L3 19.243"
              />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">
              No articles found
            </h3>
            <p className="mt-2 text-gray-600">
              {search
                ? `Try adjusting your search terms`
                : category
                ? `There are no articles in the ${category} category yet`
                : 'Check back soon for new content!'}
            </p>
            <div className="mt-6">
              <Link
                href="/blog"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
              >
                Clear filters
              </Link>
            </div>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination currentPage={currentPage} totalPages={totalPages} />
        )}

        {/* Popular Categories */}
        <section className="mt-16 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.title}
                href={`/blog?category=${encodeURIComponent(cat.title)}`}
                className="group p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                    {cat.title}
                  </span>
                  <span className="text-sm text-gray-500">→</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-blue-50 rounded-lg p-8 text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Ready to Get Your Loan?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Apply now and get quick approval with competitive rates and minimal documentation
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
            >
              Apply Now
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 border border-gray-300 text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50"
            >
              Talk to an Expert
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
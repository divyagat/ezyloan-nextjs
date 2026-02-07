import PortableText from './PortableText';
import type { BlogPost } from '@/lib/schemas';

interface BlogPostProps {
  post: BlogPost;
}

export default function BlogPost({ post }: BlogPostProps) {
  const publishDate = new Date(post.publishDate).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  const updatedDate = post.updatedDate 
    ? new Date(post.updatedDate).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null;

  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
      <header className="mb-8">
        {post.category?.title && (
          <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium mb-4">
            {post.category.title}
          </span>
        )}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          {post.title}
        </h1>
        <div className="flex items-center text-gray-600 text-sm space-x-4">
          <div className="flex items-center">
            {post.author?.image && (
              <img
                src={post.author.image}
                alt={post.author.name}
                className="w-8 h-8 rounded-full mr-2"
              />
            )}
            <span>{post.author?.name || 'EzyLoan Team'}</span>
          </div>
          <time dateTime={post.publishDate}>{publishDate}</time>
          {updatedDate && (
            <span title={`Updated on ${updatedDate}`}>• Updated</span>
          )}
        </div>
      </header>

      {post.mainImage && (
        <div className="mb-8">
          <img
            src={post.mainImage}
            alt={post.title}
            className="w-full h-auto rounded-lg shadow-md"
            width={1200}
            height={630}
          />
        </div>
      )}

      <div className="prose prose-lg max-w-none">
        <PortableText value={post.content} />
      </div>

      {post.faq && post.faq.length > 0 && (
        <section className="mt-16 pt-8 border-t border-gray-200">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {post.faq.map((item, index) => (
              <div key={index} className="border-b pb-4 last:border-b-0">
                <h3 className="font-bold text-lg mb-2">{item.question}</h3>
                <div className="text-gray-700">{item.answer}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="mt-12 pt-6 border-t border-gray-200 text-center">
        <p className="text-gray-600">
          Published on {publishDate}
          {updatedDate && ` • Updated on ${updatedDate}`}
        </p>
        <p className="mt-2 font-medium text-blue-600">
          Need a loan?{' '}
          <a href="/apply" className="underline hover:text-blue-800">
            Apply now with EzyLoan
          </a>
        </p>
      </div>
    </article>
  );
}
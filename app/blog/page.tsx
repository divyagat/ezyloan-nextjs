// app/blog/page.tsx
// SEO Friendly Blog Page (Static for now — you can connect CMS/API later)

import Link from "next/link";

export const metadata = {
  title: "EzyLoan Blog | Loan Tips, Finance Guides & Updates",
  description:
    "Read the latest loan tips, financial guides, EMI planning advice, and credit insights from EzyLoan experts.",
  keywords: [
    "instant loan",
    "personal loan guide",
    "EMI calculator tips",
    "credit score improvement",
    "loan in India",
    "EzyLoan finance blog",
  ],
};

const posts = [
  {
    slug: "how-to-choose-the-right-personal-loan",
    title: "How to Choose the Right Personal Loan in 2025",
    description:
      "Learn how to compare interest rates, tenure, and hidden charges before selecting a personal loan.",
    date: "Feb 10, 2026",
    readTime: "5 min read",
  },
  {
    slug: "improve-credit-score-fast",
    title: "7 Proven Ways to Improve Your Credit Score Quickly",
    description:
      "Boost your CIBIL score with these practical strategies to get faster loan approvals.",
    date: "Feb 05, 2026",
    readTime: "4 min read",
  },
  {
    slug: "emi-planning-guide",
    title: "Smart EMI Planning: Borrow Without Financial Stress",
    description:
      "Understand EMI structuring and repayment planning to avoid financial pressure.",
    date: "Jan 28, 2026",
    readTime: "6 min read",
  },
];

export default function BlogPage() {
  return (
    <main className="bg-gray-50 min-h-screen mt-10">
      {/* HERO */}
      <section className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-800">
            Financial Insights & Loan Guidance
          </h1>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Stay updated with expert advice on loans, credit scores, EMI
            planning, and smart financial decisions.
          </p>
        </div>
      </section>

      {/* BLOG LIST */}
      <section className="max-w-6xl mx-auto px-4 py-14">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="bg-white rounded-xl border shadow-sm hover:shadow-md transition"
            >
              <div className="p-6">
                <p className="text-sm text-blue-600 font-medium">
                  {post.date} • {post.readTime}
                </p>

                <h2 className="text-lg font-semibold text-gray-800 mt-3 leading-snug">
                  {post.title}
                </h2>

                <p className="text-gray-600 text-sm mt-3 leading-relaxed">
                  {post.description}
                </p>

                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-block mt-5 text-blue-600 font-medium hover:underline"
                >
                  Read More →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* SEO CONTENT BLOCK */}
      <section className="bg-white border-t">
        <div className="max-w-4xl mx-auto px-4 py-14">
          <h2 className="text-2xl font-semibold text-gray-800">
            Why Read the EzyLoan Blog?
          </h2>
          <p className="mt-4 text-gray-600 leading-relaxed">
            The EzyLoan blog is designed to help individuals and businesses make
            smarter borrowing decisions. Whether you are planning to apply for a
            personal loan, improve your credit score, or understand EMI
            management, our expert-backed content simplifies complex financial
            topics into practical insights.
          </p>

          <p className="mt-4 text-gray-600 leading-relaxed">
            We focus on transparency, financial literacy, and helping you choose
            the best lending solutions with confidence.
          </p>
        </div>
      </section>
    </main>
  );
}

"use client";

import { useState } from "react";

const faqs = [
  {
    question: "Who can apply for a loan?",
    answer:
      "Any salaried or self-employed individual aged 21–60 years with valid KYC documents can apply.",
  },
  {
    question: "What documents are required?",
    answer:
      "Aadhaar Card, PAN Card, income proof, and last 3–6 months bank statement are required.",
  },
  {
    question: "How long does approval take?",
    answer:
      "Loan approval usually takes 24–48 hours after successful verification.",
  },
  {
    question: "Can I repay early?",
    answer:
      "Yes, you can prepay or foreclose the loan depending on lender terms.",
  },
  {
    question: "Does checking eligibility affect my CIBIL?",
    answer:
      "No. Eligibility check is a soft inquiry and does not impact your credit score.",
  },
];

export default function FAQsPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main className="bg-gray-50 min-h-screen mt-10">
      {/* Header */}
      <section className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-14 text-center">
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-800">
            Frequently Asked Questions
          </h1>
          <p className="mt-3 text-gray-600">
            Get answers to common questions about EzyLoan services.
          </p>
        </div>
      </section>

      {/* FAQ List */}
      <section className="max-w-3xl mx-auto px-4 py-12">
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white border rounded-xl shadow-sm"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center p-5 text-left"
              >
                <span className="font-medium text-gray-800">
                  {faq.question}
                </span>
                <span className="text-blue-600 text-xl">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>

              {openIndex === index && (
                <div className="px-5 pb-5 text-gray-600">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

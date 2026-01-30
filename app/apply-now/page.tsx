'use client';

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

import Script from "next/script";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";

// Next.js requires NEXT_PUBLIC_ prefix for client-side env vars
const SERVER_HOST = process.env.NEXT_PUBLIC_SERVER_HOST || 'https://api.ezyloan.co.in';

const ApplyNowPage: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    email: '',
    phoneNumber: "",
    loanType: "",
    employmentType: "",
    city: "",
    pincode: "",
    cibilScore: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  // Handle Input Change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Submit Form Data to API
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      await axios.post(`${SERVER_HOST}/api/loans`, formData, {
        headers: { 'Content-Type': 'application/json' }
      });

      // ✅ Redirect to Thank You page after successful submission
      router.push("/thank-you");

      // Reset form
      setFormData({
        fullName: "",
        email: "",
        phoneNumber: "",
        loanType: "",
        employmentType: "",
        city: "",
        pincode: "",
        cibilScore: "",
      });

    } catch (error) {
      console.error("Error submitting loan application:", error);
      setSubmitMessage(
        "❌ Sorry, there was an error submitting your application. Please try again."
      );
    }

    setIsSubmitting(false);
  };

  // Structured data for SEO (LoanApplication schema)
  const loanApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "LoanApplication",
    "name": "EzyLoan Application Form",
    "description": "Apply for personal loans, car loans, home loans, business loans and more with EzyLoan. Quick approval process with competitive interest rates.",
    "applicationCategory": "FinancialLoan",
    "offers": {
      "@type": "Offer",
      "businessFunction": "ProvideLoan",
      "eligibleRegion": {
        "@type": "State",
        "name": "Odisha",
        "addressCountry": "IN"
      }
    },
    "provider": {
      "@type": "FinancialService",
      "name": "EzyLoan",
      "telephone": "+916372977626",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+91-6372977626",
        "contactType": "Customer Service",
        "areaServed": "IN",
        "availableLanguage": ["English", "Hindi"]
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "1st Floor, Hindustan Tyres Building, Pir Bazar, Bhanpur",
        "addressLocality": "Cuttack",
        "postalCode": "753011",
        "addressRegion": "Odisha",
        "addressCountry": "IN"
      }
    },
    "areaServed": "IN",
    "availableLanguage": ["English", "Hindi"]
  };

  // Benefits schema
  const benefitsSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": [
      {
        "@type": "HowToStep",
        "name": "Swift Online Process",
        "text": "Complete your application online in minutes with our streamlined process."
      },
      {
        "@type": "HowToStep",
        "name": "Lower Interest Rate",
        "text": "Get competitive interest rates tailored to your financial profile."
      },
      {
        "@type": "HowToStep",
        "name": "Fast and Efficient",
        "text": "Quick approval process with minimal documentation required."
      },
      {
        "@type": "HowToStep",
        "name": "Clear and Transparent",
        "text": "No hidden charges or fees. Complete transparency in all our dealings."
      }
    ]
  };

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50"
      itemScope
      itemType="https://schema.org/WebPage"
    >
      {/* Structured Data for SEO */}
      <Script
        id="loan-application-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ 
          __html: JSON.stringify(loanApplicationSchema) 
        }}
      />
      
      <Script
        id="benefits-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ 
          __html: JSON.stringify(benefitsSchema) 
        }}
      />

      <div className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 lg:pt-28 max-sm:pt-32">
        {/* Hero Image Section */}
        <div className="relative mb-16 max-w-8xl mx-auto overflow-hidden rounded-2xl shadow-xl">
          <HeroSection
            page="apply"
            title="Apply for Loan"
            subtitle="Get quick approval for your loan application"
          />
        </div>
      </div>

      {/* Form + Benefits Section */}
      <div className="pt-16 sm:pt-20 lg:pt-24">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Loan Application Form */}
            <div 
              className="bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg p-8 text-white"
              itemScope
              itemType="https://schema.org/ApplyAction"
            >
              <h1 className="text-2xl font-bold mb-6">Apply for Your Loan</h1>

              <form 
                onSubmit={handleSubmit} 
                className="space-y-6"
                noValidate
                aria-label="Loan application form"
              >
                {/* Personal Details */}
                <div>
                  <h2 className="font-semibold mb-4 text-blue-100">
                    Personal Details
                  </h2>
                  <div className="space-y-4">
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      aria-required="true"
                      placeholder="Enter your full name"
                      className="w-full px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-blue-300 outline-none text-gray-900"
                    />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      aria-required="true"
                      placeholder="Enter your email address"
                      className="w-full px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-blue-300 outline-none text-gray-900"
                    />
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      required
                      aria-required="true"
                      placeholder="Enter your phone number"
                      className="w-full px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-blue-300 outline-none text-gray-900"
                    />
                  </div>
                </div>

                {/* Loan Type */}
                <div>
                  <h2 className="font-semibold mb-4 text-blue-100">
                    Loan Details
                  </h2>
                  <select
                    id="loanType"
                    name="loanType"
                    value={formData.loanType}
                    onChange={handleChange}
                    required
                    aria-required="true"
                    className="w-full px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-blue-300 outline-none text-gray-900"
                  >
                    <option value="">Select Loan Type</option>
                    <option value="personal">Personal Loan</option>
                    <option value="car">Car Loan</option>
                    <option value="home">Home Loan</option>
                    <option value="business">Business Loan</option>
                    <option value="property">Property Loan</option>
                    <option value="commercial-vehicle">
                      Commercial Vehicle Loan
                    </option>
                  </select>
                </div>

                {/* Employment */}
                <div>
                  <h2 className="font-semibold mb-4 text-blue-100">
                    Employment Details
                  </h2>
                  <select
                    id="employmentType"
                    name="employmentType"
                    value={formData.employmentType}
                    onChange={handleChange}
                    required
                    aria-required="true"
                    className="w-full px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-blue-300 outline-none text-gray-900"
                  >
                    <option value="">Employment Type</option>
                    <option value="salaried">Salaried</option>
                    <option value="self-employed">Self Employed</option>
                    <option value="business">Business Owner</option>
                    <option value="professional">Professional</option>
                    <option value="retired">Retired</option>
                    <option value="student">Student</option>
                    <option value="housewife">Housewife</option>
                  </select>
                </div>

                {/* Address */}
                <div>
                  <h2 className="font-semibold mb-4 text-blue-100">
                    Address Details
                  </h2>
                  <div className="space-y-4">
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      aria-required="true"
                      placeholder="City *"
                      className="w-full px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-blue-300 outline-none text-gray-900"
                    />
                    <input
                      type="text"
                      id="pincode"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      required
                      aria-required="true"
                      placeholder="Pincode *"
                      className="w-full px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-blue-300 outline-none text-gray-900"
                    />
                  </div>
                </div>

                {/* CIBIL */}
                <div>
                  <h2 className="font-semibold mb-4 text-blue-100">
                    Additional Information
                  </h2>
                  <select
                    id="cibilScore"
                    name="cibilScore"
                    value={formData.cibilScore}
                    onChange={handleChange}
                    required
                    aria-required="true"
                    className="w-full px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-blue-300 outline-none text-gray-900"
                  >
                    <option value="">CIBIL Score Range</option>
                    <option value="300-549">300-549 (Poor)</option>
                    <option value="550-649">550-649 (Fair)</option>
                    <option value="650-749">650-749 (Good)</option>
                    <option value="750-900">750-900 (Excellent)</option>
                    <option value="not-sure">Not Sure</option>
                  </select>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-white text-blue-600 py-3 px-6 rounded-lg font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50"
                  aria-busy={isSubmitting}
                  aria-label={isSubmitting ? "Submitting your loan application" : "Submit loan application"}
                >
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </button>

                {/* Error Message */}
                {submitMessage && (
                  <div 
                    className="p-4 rounded-lg bg-red-50 text-red-800"
                    role="alert"
                    aria-live="polite"
                  >
                    {submitMessage}
                  </div>
                )}
              </form>
            </div>

            {/* Right Side - Benefits */}
            <div className="space-y-6 sm:space-y-8">
              <div 
                className="text-center"
                itemScope 
                itemType="https://schema.org/AboutPage"
              >
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  Why Choose EzyLoan?
                </h2>
                <p className="text-gray-600">
                  Experience hassle-free loan processing with competitive rates
                </p>
              </div>

              <div className="space-y-6">
                <BenefitCard
                  iconColor="blue"
                  title="Swift Online Process"
                  desc="Complete your application online in minutes with our streamlined process."
                />
                <BenefitCard
                  iconColor="green"
                  title="Lower Interest Rate"
                  desc="Get competitive interest rates tailored to your financial profile."
                />
                <BenefitCard
                  iconColor="purple"
                  title="Fast and Efficient"
                  desc="Quick approval process with minimal documentation required."
                />
                <BenefitCard
                  iconColor="orange"
                  title="Clear and Transparent"
                  desc="No hidden charges or fees. Complete transparency in all our dealings."
                />
              </div>

              <div 
                className="bg-gradient-to-r from-blue-600 to-cyan-500 p-4 sm:p-6 rounded-xl text-white"
                itemScope
                itemType="https://schema.org/ContactPoint"
              >
                <h3 className="text-xl font-semibold mb-4">Need Help?</h3>
                <div className="space-y-2">
                  <p className="flex items-center">
                    <span className="mr-2" aria-hidden="true">📞</span>
                    <a 
                      href="tel:+916372977626" 
                      className="hover:underline"
                      aria-label="Call EzyLoan at +91 6372977626"
                    >
                      +91 6372977626
                    </a>
                  </p>
                  <p className="flex items-center">
                    <span className="mr-2" aria-hidden="true">✉️</span>
                    <a 
                      href="mailto:contact@ezyloan.co.in" 
                      className="hover:underline"
                      aria-label="Email EzyLoan at contact@ezyloan.co.in"
                    >
                      contact@ezyloan.co.in
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

// Reusable Benefit Card Component
const BenefitCard = ({
  iconColor,
  title,
  desc,
}: {
  iconColor: string;
  title: string;
  desc: string;
}) => {
  return (
    <div 
      className="flex items-start space-x-4 p-6 bg-white rounded-xl shadow-lg"
      itemScope
      itemType="https://schema.org/HowToStep"
    >
      <div
        className={`w-12 h-12 bg-${iconColor}-100 rounded-full flex items-center justify-center flex-shrink-0`}
        aria-hidden="true"
      >
        <span className={`text-${iconColor}-600 text-xl`}>✔</span>
      </div>
      <div>
        <h3 
          className="text-lg font-semibold text-gray-800 mb-2"
          itemProp="name"
        >
          {title}
        </h3>
        <p 
          className="text-gray-600"
          itemProp="text"
        >
          {desc}
        </p>
      </div>
    </div>
  );
};

export default ApplyNowPage;
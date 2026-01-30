import React from "react";

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 ">
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r  from-blue-600 to-cyan-600 py-16 mt-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 ">
              Privacy 
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              We respect your privacy and are committed to protecting your personal information.
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">

            {/* Last Updated */}
            <div className="mb-8 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-600 font-medium">
                Last Updated: 24 December 2025
              </p>
            </div>

            {/* 1. Introduction */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                1. Introduction
              </h2>
              <p className="text-gray-600 leading-relaxed">
                This Privacy Policy explains how <strong>Ezy Loan Financial Services</strong> (“EzyLoan”, “we”, “our”, or “us”)
                collects, uses, stores, and protects personal information in accordance with applicable Indian laws,
                Reserve Bank of India (RBI) guidelines, and regulatory requirements.
              </p>
            </section>

            {/* 2. Definition */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                2. Definition of Personal Data
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Personal Data means any information that identifies or can reasonably identify an individual,
                including name, address, contact details, identification documents, financial information,
                and loan-related data.
              </p>
            </section>

            {/* 3. Information We Collect */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                3. Information We Collect
              </h2>

              <h3 className="text-xl font-semibold text-gray-700 mb-3">
                A. Information Provided by You
              </h3>
              <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
                <li>Name, address, email ID, mobile number</li>
                <li>KYC documents and identity proofs</li>
                <li>Income, employment, banking and loan details</li>
                <li>Any other information required for financial services</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-700 mb-3">
                B. Automatically Collected Information
              </h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>IP address, browser type, device information</li>
                <li>Website usage data and cookies</li>
              </ul>
            </section>

            {/* 4. Purpose */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                4. Purpose of Data Collection
              </h2>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Processing and evaluation of loan applications</li>
                <li>Communication regarding products and services</li>
                <li>Compliance with RBI and other legal requirements</li>
                <li>Fraud prevention and risk management</li>
                <li>Improvement of our services</li>
              </ul>
            </section>

            {/* 5. Legal Basis */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                5. Legal Basis for Processing
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We process personal data based on user consent, contractual necessity,
                and compliance with legal and regulatory obligations.
              </p>
            </section>

            {/* 6. Sharing */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                6. Data Sharing and Disclosure
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We may share information with banks, NBFCs, credit bureaus, service providers,
                or regulatory authorities strictly for legitimate business or legal purposes.
                We do not sell personal data to third parties.
              </p>
            </section>

            {/* 7. Retention */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                7. Data Retention
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Personal data is retained only for as long as required to fulfill legal,
                regulatory, audit, and business purposes. Data is securely deleted or anonymized thereafter.
              </p>
            </section>

            {/* 8. Security */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                8. Data Security
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We implement reasonable administrative, technical, and physical safeguards
                to protect personal data against unauthorized access, loss, misuse, or alteration.
              </p>
            </section>

            {/* 9. User Rights */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                9. User Rights
              </h2>
              <p className="text-gray-600 leading-relaxed">
                You may request access, correction, or withdrawal of consent for your personal data,
                subject to applicable laws and RBI guidelines, by contacting us.
              </p>
            </section>

            {/* 10. Children */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                10. Children’s Privacy
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Our services are not intended for individuals below 18 years of age.
                We do not knowingly collect personal data from minors.
              </p>
            </section>

            {/* 11. Changes */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                11. Changes to This Privacy Policy
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We reserve the right to update this Privacy Policy at any time.
                Changes will be posted on this page with an updated revision date.
              </p>
            </section>

            {/* 12. Contact */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                12. Contact Information
              </h2>
              <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-blue-500">
                <p className="font-semibold text-gray-800">Ezy Loan Financial Services</p>
                <p className="text-gray-600 mt-2">
                  1st Floor, Hindustan Tyres, Pir Bazar, Bhanpur,<br />
                  Cuttack – 753011, Odisha, India
                </p>
                <p className="text-gray-600 mt-2">
                  Phone: +91 63729 77626<br />
                  Email: contact@ezyloan.co.in<br />
                  Website: www.ezyloan.co.in
                </p>
              </div>
            </section>

          </div>
        </div>
      </div>

     
    </div>
  );
};

export default PrivacyPolicyPage;

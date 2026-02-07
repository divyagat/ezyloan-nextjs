'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const ThankYouPage = () => {
  const router = useRouter();

  // Auto-redirect after 30 seconds (optional)
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/');
    }, 30000); // 30 seconds

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-blue-50 via-white to-cyan-50 px-4 py-10 mt-12">
      {/* Green Check Icon */}
      <div className="bg-green-400 w-24 h-24 rounded-full flex items-center justify-center mb-6 shadow-lg animate-fade-in">
        <span className="text-white text-5xl font-bold">✔</span>
      </div>

      {/* Title */}
      <h1 className="text-5xl font-bold text-gray-900 mb-2 animate-fade-in-up">
        Thank You!
      </h1>
      <p className="text-xl text-gray-700 mb-6 animate-fade-in-up animation-delay-100">
        Your application has been submitted successfully.
      </p>

      {/* Submission Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 max-w-xl text-center mb-10 shadow-sm animate-fade-in-up animation-delay-200">
        <p className="text-gray-700 text-lg">
          Your loan application has been submitted successfully!
          <br />
          Our team will contact you shortly. You will also receive a confirmation email within 24–48 hours.
        </p>
        <p className="text-blue-700 font-medium mt-4 flex items-center justify-center gap-2">
          <span>📩</span> Please check your email for application details.
        </p>
      </div>

      {/* Application Reference (Optional) */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-8 max-w-md w-full animate-fade-in-up animation-delay-300">
        <div className="flex items-center justify-between">
          <span className="text-gray-600 font-medium">Application ID:</span>
          <span className="font-mono font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded">
            APP-{Math.floor(100000 + Math.random() * 900000)}
          </span>
        </div>
        <div className="mt-3 pt-3 border-t border-gray-100">
          <span className="text-gray-600 font-medium">Submitted:</span>
          <span className="ml-2 font-medium">
            {new Date().toLocaleDateString('en-IN', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mb-10 animate-fade-in-up animation-delay-400">
        <Link
          href="/"
          className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-md"
        >
          Go to Home
        </Link>
        <Link
          href="/contact"
          className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-105"
        >
          Contact Us
        </Link>
      </div>

      {/* What's Next Section */}
      <div className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-2xl p-6 max-w-3xl w-full shadow-lg animate-fade-in-up animation-delay-500">
        <h2 className="text-3xl font-semibold mb-6 text-center">What's Next?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl hover:bg-white/20 transition-all">
            <div className="bg-white text-blue-600 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-3 text-3xl shadow-md">
              📄
            </div>
            <p className="font-semibold text-lg">Document Verification</p>
            <p className="text-sm mt-2 opacity-90">We'll verify your submitted documents</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl hover:bg-white/20 transition-all">
            <div className="bg-white text-green-500 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-3 text-3xl shadow-md">
              ✅
            </div>
            <p className="font-semibold text-lg">Application Review</p>
            <p className="text-sm mt-2 opacity-90">Our team will review your eligibility</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl hover:bg-white/20 transition-all">
            <div className="bg-white text-yellow-400 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-3 text-3xl shadow-md">
              💰
            </div>
            <p className="font-semibold text-lg">Loan Approval</p>
            <p className="text-sm mt-2 opacity-90">Get your loan sanctioned quickly</p>
          </div>
        </div>
      </div>

      {/* Auto-redirect Countdown */}
      <div className="mt-8 text-gray-600 text-sm animate-fade-in">
        <p>You'll be redirected to the homepage in <span className="font-bold text-blue-600" id="countdown">30</span> seconds...</p>
      </div>

      {/* FAQ Section (Optional) */}
      <div className="mt-12 max-w-3xl w-full bg-white rounded-xl p-6 shadow-sm border border-gray-100 animate-fade-in-up animation-delay-600">
        <h3 className="text-2xl font-bold text-center mb-6 text-gray-900">Need Help?</h3>
        <div className="space-y-4">
          <div className="border-b pb-4">
            <p className="font-medium text-gray-800">📧 Email us:</p>
            <a href="mailto:support@ezyloan.co.in" className="text-blue-600 hover:underline">
              support@ezyloan.co.in
            </a>
          </div>
          <div className="border-b pb-4">
            <p className="font-medium text-gray-800">📞 Call us:</p>
            <a href="tel:+919876543210" className="text-blue-600 hover:underline">
              +91 98765 43210
            </a>
          </div>
          <div>
            <p className="font-medium text-gray-800">⏰ Business Hours:</p>
            <p className="text-gray-600">Monday - Saturday: 9:00 AM - 7:00 PM</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;
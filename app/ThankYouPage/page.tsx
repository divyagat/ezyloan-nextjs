import React from "react";
import { Link } from "react-router-dom";

const ThankYouPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-blue-50 via-white to-cyan-50 px-4 py-10 mt-5">
      {/* Green Check Icon */}
      <div className="bg-green-400 w-24 h-24 rounded-full flex items-center justify-center mb-6 shadow-lg mt-5">
        <span className="text-white text-5xl font-bold">✔</span>
      </div>

      {/* Title */}
      <h1 className="text-5xl font-bold text-gray-900 mb-2">Thank You!</h1>
      <p className="text-xl text-gray-700 mb-6">
        Your application has been submitted successfully.
      </p>

      {/* Submission Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 max-w-xl text-center mb-10 shadow-sm">
        <p className="text-gray-700 text-lg">
          Your loan application has been submitted successfully!
          <br />
          Our team will contact you shortly. You will also receive a confirmation email within 24–48 hours.
        </p>
        <p className="text-blue-700 font-medium mt-4 flex items-center justify-center gap-2">
          <span>📩</span> Please check your email for application details.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mb-10">
        <Link
          to="/"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Go to Home
        </Link>
        <Link
          to="/contact"
          className="border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition"
        >
          Contact Us
        </Link>
      </div>

      {/* What's Next Section */}
      <div className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-2xl p-6 max-w-3xl w-full shadow-lg">
        <h2 className="text-3xl font-semibold mb-6 text-center">What's Next?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div>
            <div className="bg-white text-blue-600 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-2 text-3xl">
              📄
            </div>
            <p className="font-semibold text-lg">Document Verification</p>
          </div>
          <div>
            <div className="bg-white text-green-500 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-2 text-3xl">
              ✅
            </div>
            <p className="font-semibold text-lg">Application Review</p>
          </div>
          <div>
            <div className="bg-white text-yellow-400 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-2 text-3xl">
              💰
            </div>
            <p className="font-semibold text-lg">Loan Approval</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;

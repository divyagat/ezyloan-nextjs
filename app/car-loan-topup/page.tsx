import React from 'react';
import Link from 'next/link';
import { 
  ArrowRight, CheckCircle, Calculator, Clock, Shield, 
  TrendingUp, CreditCard 
} from 'lucide-react';

import HeroSection from '@/components/HeroSection';

const CarLoanTopUp: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-cyan-50/30 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-20 sm:pt-24 lg:pt-28">
        
        {/* Hero Section */}
        <div className="relative mb-12 sm:mb-16 overflow-hidden rounded-2xl shadow-xl">
          <HeroSection
            page="car-top-up" 
            title="Car Top-Up Loan" 
            subtitle="Get additional funds against your existing car loan"
          />
        </div>

        {/* Intro Section */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center space-x-2 bg-green-100 px-4 py-2 rounded-full border border-green-200 mb-6">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-800">Car Loan Top-Up</span>
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-800">
                Car Loan Top-Up
              </h1>
              
              <p className="text-base md:text-lg text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed px-2">
                Unlock extra funds with our Car Loan Top-Up option! service, designed to meet your additional financial needs without the hassle of a new loan. EzyLoan offers quick approvals, competitive interest rates, and flexible repayment terms, allowing you to access more funds while keeping your existing car loan intact.
              </p>

              <div className="mb-10">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
                  Why EzyLoan's Car Loan Top-Up?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto">
                  {[
                    { icon: TrendingUp, title: "Low-interest rates", bg: "from-green-500 to-emerald-500" },
                    { icon: Clock, title: "Quick approval process", bg: "from-blue-500 to-cyan-500" },
                    { icon: Shield, title: "Flexible repayment options", bg: "from-purple-500 to-pink-500" }
                  ].map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <div 
                        key={index} 
                        className="bg-white rounded-2xl p-5 sm:p-6 shadow-lg border border-green-100"
                      >
                        <div className={`w-12 h-12 ${item.bg} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                      </div>
                    );
                  })}
                </div>
              </div>

              <p className="text-base md:text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
                Apply today and get the additional funds you need with ease!
              </p>

              <Link 
                href="/apply-now" 
                className="bg-gradient-to-r from-green-600 to-emerald-500 text-white px-6 py-4 rounded-full font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                aria-label="Apply for car loan top-up"
              >
                Apply for Top-Up
              </Link>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-gradient-to-br from-gray-50 via-white to-green-50 py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Car Loan Top-Up Section */}
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8">
                <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  Car Loan Top-Up
                </span>
              </h2>
            </div>

            {/* Ready to Experience Section */}
            <div className="text-center mb-16 sm:mb-20">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8">
                <span className="text-gray-800">Ready to Experience the Benefits of </span>
                <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  Car Loan Top-Up
                </span>
                <span className="text-gray-800">?</span>
              </h2>
              <Link 
                href="/apply-now" 
                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 sm:px-12 py-4 rounded-full text-lg sm:text-xl font-semibold hover:shadow-2xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                aria-label="Apply for car loan top-up now"
              >
                Apply Now
              </Link>
            </div>

            {/* Eligibility Section */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-green-100 max-w-6xl mx-auto mb-16">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* Left Side - Content */}
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">
                    <span className="text-gray-800">ELIGIBILITY</span>
                    <br />
                    <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                      for Car Loan Top Up
                    </span>
                  </h3>
                  
                  <div>
                    <h4 className="text-xl font-bold mb-4 text-blue-600">Salaried Individuals:</h4>
                    <ul className="space-y-2 sm:space-y-3">
                      {[
                        "Minimum 20 and maximum 60 years of age",
                        "Minimum employment of 2 years in the current company",
                        "Minimum income of Rs 3,00,000 a year",
                        "Valid Car Registration"
                      ].map((item, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                {/* Right Side - Image */}
                <div className="flex justify-center lg:justify-end">
                  <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl blur opacity-20"></div>
                    <div className="relative w-full h-64 sm:h-80 md:h-96 bg-gradient-to-r from-gray-200 to-gray-300 rounded-2xl shadow-2xl flex items-center justify-center">
                      <span className="text-gray-400 text-3xl sm:text-4xl">🚗</span>
                      <span className="absolute -bottom-4 -right-4 bg-green-500 text-white p-2 sm:p-3 rounded-full shadow-lg">
                        <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Benefits Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
              {[
                { 
                  icon: CreditCard, 
                  title: "Instant Liquidity", 
                  desc: "Get immediate access to funds without the hassle of applying for a new loan from scratch.",
                  bg: "from-green-500 to-emerald-500"
                },
                { 
                  icon: Clock, 
                  title: "Quick Approval", 
                  desc: "Faster processing since you're already our customer. Get approved in just 24 hours.",
                  bg: "from-blue-500 to-cyan-500"
                },
                { 
                  icon: Shield, 
                  title: "Same Interest Rate", 
                  desc: "Enjoy the same competitive interest rate as your existing car loan with no additional charges.",
                  bg: "from-purple-500 to-pink-500"
                }
              ].map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div 
                    key={index} 
                    className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/30 shadow-xl text-center hover:shadow-2xl transition-all duration-300"
                  >
                    <div className={`w-14 h-14 sm:w-16 sm:h-16 ${benefit.bg} rounded-2xl flex items-center justify-center mx-auto mb-5 sm:mb-6`}>
                      <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-800">{benefit.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{benefit.desc}</p>
                  </div>
                );
              })}
            </div>

            {/* TopUp Amount Calculator */}
            <div className="bg-gradient-to-br from-green-50 via-white to-emerald-50 rounded-3xl p-6 sm:p-8 lg:p-12 border border-green-100/50 shadow-xl mb-16">
              <div className="text-center mb-10">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
                    How Much Can You Get?
                  </span>
                </h2>
                <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-2">
                  TopUp amount depends on your loan repayment history and current vehicle value
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
                <div className="space-y-5 sm:space-y-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">TopUp Calculation Factors</h3>
                  <div className="space-y-3 sm:space-y-4">
                    {[
                      { title: "Current Vehicle Value", desc: "Based on current market price of your vehicle" },
                      { title: "Outstanding Loan Amount", desc: "Remaining principal amount on your existing loan" },
                      { title: "Repayment History", desc: "Your track record of timely EMI payments" },
                      { title: "Income Stability", desc: "Current income and employment stability" }
                    ].map((item, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                        <div>
                          <span className="font-semibold text-gray-800">{item.title}</span>
                          <p className="text-gray-600 text-sm">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-white/30">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-5 sm:mb-6">Typical TopUp Amounts</h3>
                  <div className="space-y-3 sm:space-y-4">
                    {[
                      { label: "Excellent Credit", amount: "Up to ₹10 Lakhs", bg: "bg-green-50" },
                      { label: "Good Credit", amount: "Up to ₹7 Lakhs", bg: "bg-blue-50" },
                      { label: "Average Credit", amount: "Up to ₹5 Lakhs", bg: "bg-yellow-50" }
                    ].map((item, index) => (
                      <div key={index} className={`flex justify-between items-center p-4 ${item.bg} rounded-xl`}>
                        <span className="font-medium text-gray-700">{item.label}</span>
                        <span className="font-bold text-green-600">{item.amount}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-gray-500 mt-4">
                    *Actual amount subject to eligibility and vehicle valuation
                  </p>
                </div>
              </div>
            </div>

            {/* Use Cases */}
            <div className="mb-16">
              <div className="text-center mb-10">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    Perfect For Your Needs
                  </span>
                </h2>
                <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-2">
                  Use your car loan top-up for various financial requirements
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {[
                  { icon: "🏠", title: "Home Renovation", desc: "Upgrade your home with the extra funds", bg: "from-blue-500 to-cyan-500" },
                  { icon: "🎓", title: "Education", desc: "Fund your or your child's education", bg: "from-purple-500 to-pink-500" },
                  { icon: "💼", title: "Business", desc: "Invest in your business growth", bg: "from-green-500 to-emerald-500" },
                  { icon: "🚨", title: "Emergency", desc: "Handle unexpected financial needs", bg: "from-orange-500 to-red-500" }
                ].map((item, index) => (
                  <div 
                    key={index} 
                    className="bg-white/70 backdrop-blur-xl rounded-2xl p-5 sm:p-6 border border-white/30 shadow-lg text-center hover:shadow-xl transition-all duration-300"
                  >
                    <div className={`w-12 h-12 ${item.bg} rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4`}>
                      <span className="text-white text-lg sm:text-xl">{item.icon}</span>
                    </div>
                    <h3 className="font-bold text-gray-800 mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-xs sm:text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Eligibility & Documents */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 mb-16">
              <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 sm:p-8 lg:p-10 border border-white/30 shadow-xl">
                <h3 className="text-xl sm:text-2xl font-bold mb-5 sm:mb-6 text-gray-800">Eligibility Criteria</h3>
                <div className="space-y-3 sm:space-y-4">
                  {[
                    "Existing car loan customer with EzyLoan",
                    "Minimum 12 months of loan repayment history",
                    "No EMI defaults in the last 12 months",
                    "Current income should support additional EMI",
                    "Vehicle should have sufficient market value"
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                      <span className="text-gray-600">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 sm:p-8 lg:p-10 border border-white/30 shadow-xl">
                <h3 className="text-xl sm:text-2xl font-bold mb-5 sm:mb-6 text-gray-800">Required Documents</h3>
                <div className="space-y-3 sm:space-y-4">
                  {[
                    "Latest salary slips (3 months)",
                    "Bank statements (6 months)",
                    "Current loan statement",
                    "Vehicle valuation report",
                    "Updated KYC documents"
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                      <span className="text-gray-600">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-500 rounded-3xl p-6 sm:p-8 lg:p-12 text-center text-white">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
                Need Extra Funds? We've Got You Covered!
              </h2>
              <p className="text-lg md:text-xl mb-6 sm:mb-8 opacity-90 px-2">
                Get instant access to additional funds with our car loan top-up facility
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/apply-now" 
                  className="bg-white text-green-600 px-6 py-4 rounded-full font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-green-600"
                  aria-label="Apply for car loan top-up"
                >
                  Apply for TopUp
                </Link>
                <Link 
                  href="/check-eligibility" 
                  className="border-2 border-white text-white px-6 py-4 rounded-full font-semibold hover:bg-white hover:text-green-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-green-600"
                  aria-label="Check eligibility for car loan top-up"
                >
                  Check Eligibility
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarLoanTopUp;
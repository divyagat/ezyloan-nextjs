import React from 'react';
import Link from 'next/link';
import { 
  ArrowRight, CheckCircle, Calculator, Clock, Shield, RefreshCw, 
  Percent, FileText, User, CreditCard, Car, MapPin, DollarSign, 
  TrendingDown 
} from 'lucide-react';

import HeroSection from '@/components/HeroSection';

const CarLoanBalanceTransfer: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 lg:pt-28">
        
        {/* Hero Section */}
        <div className="relative mb-12 sm:mb-16 overflow-hidden rounded-2xl shadow-xl">
          <HeroSection
            page="car-balance-transfer" 
            title="Car Balance Transfer" 
            subtitle="Switch your existing loan to a lower interest rate and save money"
          />
        </div>

        {/* Main Content */}
        <div className="py-12 sm:py-16 lg:py-20">
          
          {/* Introduction Section */}
          <div className="text-center mb-12 sm:mb-16">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-800">
              Looking to lower your monthly car loan payments?
            </h1>
            <p className="text-base md:text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed px-2">
              Our Car Loan Balance Transfer service offers you the perfect opportunity to switch your existing loan to a lower interest rate, helping you save money. With a hassle-free process and quick approval, you can enjoy reduced EMIs and better financial flexibility.
            </p>
          </div>

          {/* Why Choose EzyLoan Section */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-6 sm:p-8 lg:p-12 mb-12 sm:mb-16">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-gray-800">
                Why choose EzyLoan for a Car Loan Balance Transfer?
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-10">
              {[
                {
                  icon: TrendingDown,
                  title: "Low-interest rates",
                  desc: "Get significantly reduced interest rates compared to your current lender and save thousands on your monthly EMIs.",
                  bg: "from-green-500 to-emerald-500"
                },
                {
                  icon: Clock,
                  title: "Quick approval process",
                  desc: "Experience fast processing with minimal documentation and get approval within 24-48 hours.",
                  bg: "from-blue-500 to-cyan-500"
                },
                {
                  icon: Shield,
                  title: "Flexible repayment options",
                  desc: "Choose from various repayment tenures and enjoy the flexibility to prepay without penalties.",
                  bg: "from-purple-500 to-pink-500"
                }
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <div 
                    key={index} 
                    className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg text-center hover:shadow-xl transition-shadow duration-300 border border-gray-100"
                  >
                    <div className={`w-14 h-14 sm:w-16 sm:h-16 ${item.bg} rounded-2xl flex items-center justify-center mx-auto mb-5 sm:mb-6`}>
                      <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 sm:mb-4 text-gray-800">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{item.desc}</p>
                  </div>
                );
              })}
            </div>
            
            <div className="max-w-4xl mx-auto text-center px-2">
              <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                Choose EzyLoan for your Car Loan Balance Transfer to benefit from competitive interest rates, quick processing, and a transparent transfer process. We prioritize your convenience, offering flexible repayment options and personalized support to ensure a seamless transition. With EzyLoan, you can reduce your financial burden and enjoy lower EMIs with ease.
              </p>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-12 shadow-lg mb-12 sm:mb-16">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-gray-800">
                Discover the Benefits of Car Loan Balance Transfer
              </h2>
              <p className="text-lg text-gray-600">
                Why take Car Loan Balance Transfer from us?
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              {[
                {
                  icon: Clock,
                  title: "Swift Online Process",
                  desc: "No need to physically stand in line or wait for a call from the required lender. Directly apply online and get balance loan approval instantly.",
                  bg: "bg-blue-500",
                  cardBg: "from-blue-50 to-indigo-50"
                },
                {
                  icon: TrendingDown,
                  title: "Lower Interest Rate",
                  desc: "Get a new loan balance transfer with a lower interest rate. Our industry expert lenders will offer you competitive rates for your current financial requirement.",
                  bg: "bg-green-500",
                  cardBg: "from-green-50 to-emerald-50"
                },
                {
                  icon: RefreshCw,
                  title: "Fast and Efficient",
                  desc: "Our streamlined online process gets your balance transfer for car loan approved quickly, so you can start saving from the word go.",
                  bg: "bg-purple-500",
                  cardBg: "from-purple-50 to-pink-50"
                },
                {
                  icon: Shield,
                  title: "Clear and Transparent",
                  desc: "We are clear with our terms and conditions upfront. Therefore, you will be guided properly by our experts and will know what you are getting into.",
                  bg: "bg-orange-500",
                  cardBg: "from-orange-50 to-yellow-50"
                }
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <div 
                    key={index} 
                    className={`${item.cardBg} rounded-2xl p-6 sm:p-8`}
                  >
                    <div className="flex items-start space-x-3 sm:space-x-4">
                      <div className={`${item.bg} w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0`}>
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                        <p className="text-gray-600 text-sm sm:text-base">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Documents Section */}
          <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl p-6 sm:p-8 lg:p-12 mb-12 sm:mb-16">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-gray-800">
                Documents you require for Balance Loan Transfer?
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-10">
              {[
                { icon: FileText, title: "Complete application", bg: "bg-blue-500" },
                { icon: User, title: "Recent Passport Size Photograph", bg: "bg-green-500" },
                { icon: CreditCard, title: "Identity Proof", bg: "bg-purple-500" },
                { icon: Car, title: "Valid Car Registration Copy", bg: "bg-orange-500" },
                { icon: MapPin, title: "Address Proof", bg: "bg-indigo-500" },
                { icon: DollarSign, title: "Income Proof", bg: "bg-teal-500" },
                { icon: FileText, title: "Loan Track Statement", bg: "bg-red-500" }
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <div 
                    key={index} 
                    className="bg-white rounded-2xl p-5 sm:p-6 shadow-lg text-center hover:shadow-xl transition-shadow duration-300 border border-gray-100"
                  >
                    <div className={`w-12 h-12 sm:w-16 sm:h-16 ${item.bg} rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4`}>
                      <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <h3 className="text-sm sm:text-base font-semibold mb-1 sm:mb-2 text-gray-800">{item.title}</h3>
                  </div>
                );
              })}
            </div>

            <div className="text-center max-w-3xl mx-auto px-2">
              <p className="text-base md:text-lg text-gray-700 mb-6">
                Ready to escape a high-interest rate? Upgrade now to a more relaxing loan. Contact Ezyloan to resolve all your financial needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/apply-now" 
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  aria-label="Apply for car loan balance transfer"
                >
                  Apply Now
                </Link>
                <Link 
                  href="/contact" 
                  className="bg-gradient-to-r from-green-600 to-teal-600 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  aria-label="Contact EzyLoan support"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>

          {/* Eligibility Section */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-12 shadow-lg mb-12 sm:mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
              <div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-gray-800">
                  ELIGIBILITY
                </h2>
                <h3 className="text-xl sm:text-2xl font-semibold mb-6 text-blue-600">
                  for Car Loan Balance Transfer
                </h3>
                
                <div className="space-y-5">
                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold mb-3 text-gray-800">Salaried Individuals:</h4>
                    <div className="space-y-3">
                      {[
                        "Minimum 20 and maximum 60 years of age",
                        "Minimum employment of 2 years in the current company",
                        "Minimum income of Rs 3,00,000 a year",
                        "Valid Car Registration"
                      ].map((item, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                          <span className="text-gray-600">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl"></div>
                <div 
                  className="relative w-full h-64 sm:h-80 md:h-96 bg-gradient-to-r from-gray-200 to-gray-300 rounded-2xl flex items-center justify-center"
                  aria-label="Car loan eligibility illustration"
                >
                  <span className="text-gray-400 text-4xl sm:text-5xl">🚗</span>
                  <div className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 bg-blue-500 text-white p-2.5 sm:p-3 rounded-full shadow-lg">
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Final CTA Section */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-6 sm:p-8 lg:p-12 text-center text-white">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
              Ready to Make the Smart Switch?
            </h2>
            <p className="text-lg md:text-xl mb-8 opacity-95 max-w-3xl mx-auto px-2">
              Join thousands who have saved money by transferring their car loan to EzyLoan
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Link 
                href="/apply-now" 
                className="bg-white text-blue-600 font-bold px-6 py-3 sm:px-8 sm:py-4 rounded-full text-base sm:text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
                aria-label="Apply for car loan balance transfer now"
              >
                <span>Apply Now</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </Link>
              <button 
                className="border-2 border-white text-white font-bold px-6 py-3 sm:px-8 sm:py-4 rounded-full text-base sm:text-lg hover:bg-white/10 transition-all duration-300 flex items-center justify-center space-x-2 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
                aria-label="Calculate your potential savings"
              >
                <Calculator className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Calculate Savings</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarLoanBalanceTransfer;
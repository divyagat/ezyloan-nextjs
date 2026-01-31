import React from 'react';
import Link from 'next/link';
import { 
  Home, ArrowRight, Percent, Clock, Shield, DollarSign, 
  FileText, User, TrendingUp, CheckCircle, Building, 
  Zap, Award 
} from 'lucide-react';

import HeroSection from '@/components/HeroSection';

const PropertyLoanPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Main Container with responsive padding */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 lg:pt-28">
        
        {/* Hero Section */}
        <div className="relative mb-12 sm:mb-16 overflow-hidden rounded-2xl shadow-xl">
          <HeroSection
            page="property-loan" 
            title="Property Loan" 
            subtitle="Unlock the value of your property for your financial needs"
          />
        </div>

        {/* Introduction Section */}
        <div className="mb-12 lg:mb-16">
          <div className="text-center mb-10 lg:mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
              Transform Your Property Dreams Into Reality
            </h1>
            <p className="text-base md:text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed px-2">
              At EzyLoan, we offer hassle-free property loans tailored to meet your financial needs. Whether you want to buy, renovate, or expand your property, we've got you covered. Leverage your property's value to get funds for personal or business expenses.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 md:p-8 border border-blue-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Why Choose EzyLoan?</h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  At EzyLoan, we offer easy and flexible property loans to meet your financial needs. Get funds for buying, renovating, or expanding your property effortlessly. Leverage your property's value for personal or business expenses.
                </p>
                <div className="space-y-4">
                  {[
                    "Low-interest rates and flexible repayment options",
                    "Quick approvals with minimal documentation",
                    "Reliable and hassle-free property financing"
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:gap-6 mt-8 lg:mt-0">
              {[
                { icon: Zap, title: "Quick Process", desc: "Fast approvals and seamless disbursement", bg: "from-green-500 to-emerald-500" },
                { icon: Percent, title: "Best Rates", desc: "Competitive interest rates starting from 8.5%", bg: "from-blue-500 to-cyan-500" },
                { icon: Shield, title: "Secure", desc: "Safe and transparent loan process", bg: "from-purple-500 to-pink-500" },
                { icon: Award, title: "Trusted", desc: "Thousands of satisfied customers", bg: "from-orange-500 to-red-500" }
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <div 
                    key={index} 
                    className="bg-white rounded-2xl p-5 shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className={`w-14 h-14 ${item.bg} rounded-xl flex items-center justify-center mb-3`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="font-bold text-gray-800 mb-1 text-lg">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Why Choose Section */}
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-6 md:p-8 lg:p-12 border border-indigo-100 shadow-xl mb-12 lg:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-10 bg-gradient-to-r from-indigo-600 to-purple-500 bg-clip-text text-transparent">
            Why Choose EzyLoan Property Loan?
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {[
              { 
                icon: DollarSign, 
                title: "High Loan Amount", 
                desc: "Avail loans up to 75% of your property's market value, whether it's residential, commercial, or industrial.",
                bg: "from-green-500 to-emerald-500"
              },
              { 
                icon: Percent, 
                title: "Competitive Interest Rates", 
                desc: "Enjoy attractive interest rates starting as low as 8.5% p.a., ensuring affordable EMIs.",
                bg: "from-blue-500 to-cyan-500"
              },
              { 
                icon: Clock, 
                title: "Flexible Repayment Tenure", 
                desc: "Choose repayment terms ranging from 5 to 20 years based on your convenience.",
                bg: "from-purple-500 to-pink-500"
              },
              { 
                icon: Building, 
                title: "Loan for Multiple Purposes", 
                desc: "Use the loan amount for business expansion, education, weddings, medical emergencies, or debt consolidation.",
                bg: "from-orange-500 to-red-500"
              }
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div 
                  key={index} 
                  className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300 text-center"
                >
                  <div className={`w-16 h-16 ${item.bg} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Loan Details Section */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-6 md:p-8 lg:p-12 border border-blue-100 shadow-xl mb-12 lg:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-10 bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
            Property Loan Details & Features
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Loan Amount",
                icon: DollarSign,
                bg: "from-green-500 to-emerald-500",
                items: [
                  { label: "Minimum", value: "₹5,00,000" },
                  { label: "Maximum", value: "₹5 Crore+" },
                  { label: "LTV Ratio", value: "Up to 75%" }
                ]
              },
              {
                title: "Interest Rate",
                icon: Percent,
                bg: "from-blue-500 to-cyan-500",
                items: [
                  { label: "Starting from", value: "8.5% p.a." },
                  { label: "Up to", value: "12.0% p.a." },
                  { label: "Type", value: "Reducing Rate" }
                ]
              },
              {
                title: "Tenure & Fees",
                icon: Clock,
                bg: "from-purple-500 to-pink-500",
                items: [
                  { label: "Tenure", value: "5 - 20 years" },
                  { label: "Processing Fee", value: "Up to 1%" },
                  { label: "Prepayment", value: "Allowed" }
                ]
              }
            ].map((card, index) => {
              const Icon = card.icon;
              return (
                <div 
                  key={index} 
                  className={`bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 ${
                    index === 2 ? 'md:col-span-2 lg:col-span-1' : ''
                  }`}
                >
                  <div className={`w-14 h-14 ${card.bg} rounded-xl flex items-center justify-center mx-auto mb-5`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">{card.title}</h3>
                  <div className="space-y-3">
                    {card.items.map((item, i) => (
                      <div key={i} className="flex justify-between border-b pb-2 last:border-0 last:pb-0">
                        <span className="text-gray-600">{item.label}</span>
                        <span className="font-medium">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Eligibility Criteria */}
        <div className="bg-white rounded-3xl p-6 md:p-8 lg:p-10 shadow-xl border border-gray-100 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 bg-gradient-to-r from-indigo-600 to-purple-500 bg-clip-text text-transparent">
            Eligibility Criteria
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {[
              { 
                icon: User, 
                title: "Age Criteria", 
                value: "21 - 65 years", 
                desc: "At the time of loan maturity",
                bg: "from-blue-500 to-indigo-500",
                bgCard: "from-blue-50 to-indigo-50"
              },
              { 
                icon: DollarSign, 
                title: "Monthly Income", 
                value: "₹50,000+", 
                desc: "Net monthly income",
                bg: "from-green-500 to-emerald-500",
                bgCard: "from-green-50 to-emerald-50"
              },
              { 
                icon: FileText, 
                title: "Property Ownership", 
                value: "Clear Title", 
                desc: "Property documents required",
                bg: "from-purple-500 to-pink-500",
                bgCard: "from-purple-50 to-pink-50"
              },
              { 
                icon: TrendingUp, 
                title: "Credit Score", 
                value: "700+", 
                desc: "Higher scores get better rates",
                bg: "from-orange-500 to-red-500",
                bgCard: "from-orange-50 to-red-50"
              }
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div 
                  key={index} 
                  className={`text-center p-6 rounded-2xl transition-all duration-300 hover:shadow-md ${
                    item.bgCard
                  }`}
                >
                  <div className={`w-16 h-16 ${item.bg} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2 text-xl">{item.title}</h3>
                  <p className="text-gray-700 text-xl font-medium">{item.value}</p>
                  <p className="text-gray-600 mt-1">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-6 md:p-8 lg:p-12 text-center text-white shadow-2xl mb-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
              Ready to Unlock Your Property's Potential?
            </h2>
            <p className="text-lg md:text-xl mb-6 md:mb-8 opacity-95 leading-relaxed px-2">
              Join thousands of satisfied customers who chose EzyLoan for their property financing needs. 
              Get instant approval with competitive rates and flexible terms!
            </p>
            
            <div className="flex flex-wrap justify-center gap-3 md:gap-6 mb-8">
              {["Quick Approval", "Minimal Documentation", "Best Interest Rates"].map((feature, index) => (
                <div key={index} className="flex items-center bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  <CheckCircle className="w-5 h-5 mr-2 text-green-300" />
                  <span className="text-base md:text-lg">{feature}</span>
                </div>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Link 
                href="/apply-now" 
                className="bg-white text-indigo-700 font-bold text-lg md:text-xl px-6 py-4 rounded-2xl hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600"
                aria-label="Apply for property loan now"
              >
                Apply Now - Get Instant Approval
              </Link>
              <Link 
                href="/contact" 
                className="border-2 border-white text-white font-bold text-lg md:text-xl px-6 py-4 rounded-2xl hover:bg-white/10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600"
                aria-label="Contact EzyLoan support"
              >
                Contact Us
              </Link>
            </div>
            
            <p className="text-sm opacity-80 mt-6 max-w-2xl mx-auto px-2">
              *Subject to credit approval and property valuation. Terms and conditions apply.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyLoanPage;
import React from 'react';
import { 
  Car, ArrowRight, Percent, Clock, Shield, CheckCircle, 
  Star, Users, Award, Smartphone, FileText, Heart 
} from 'lucide-react';
import Link from "next/link";
import HeroSection from '@/components/HeroSection';

const NewCarLoanPage: React.FC = () => {
  const features = [
    'Competitive Interest Rates',
    'Quick Approval Process', 
    'Flexible Repayment Options',
    'Minimal Documentation',
    'Fast Processing',
    'Transparent Terms'
  ];
  
  const stats = [
    { value: '7.99%', label: 'Starting Interest Rate', icon: Percent },
    { value: '48h', label: 'Approval Time', icon: Clock },
    { value: '84mo', label: 'Max Tenure', icon: Shield },
    { value: '10k+', label: 'Happy Customers', icon: Users }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 lg:pt-28 max-sm:pt-32">
        <div className="relative mb-16 max-w-8xl mx-auto overflow-hidden rounded-2xl shadow-xl">
          <HeroSection
            page="new-car-loan"
            title="New Car Loan"
            subtitle="Drive your dream car today with our competitive car loan offers"
          />
        </div>
        
        <div className="mt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div 
                  key={index} 
                  className="bg-white p-4 sm:p-5 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow"
                >
                  <div className="w-10 h-10 mx-auto bg-blue-50 rounded-full flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="font-bold text-xl sm:text-2xl text-gray-800">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-gray-500 mt-1">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Turn Your Dream <span className="text-blue-600">Into Reality</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-3xl">
              Drive home your dream car with EzyLoan! We offer flexible and convenient loan options tailored to your needs, making it easier than ever to own the car you've always wanted. With our quick approval process and competitive interest rates, you can enjoy a hassle-free experience from start to finish.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="flex items-start space-x-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100"
                >
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-800 font-medium">{feature}</span>
                </div>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/apply-now" 
                className="group flex items-center justify-center space-x-2 text-white font-bold bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <span>Apply Now</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/contact" 
                className="flex items-center justify-center space-x-2 text-blue-700 font-bold border-2 border-blue-600 bg-white hover:bg-blue-50 transition-all duration-300 py-4 px-8 rounded-xl"
              >
                <span>Contact Us</span>
              </Link>
            </div>
          </div>
          
          <div className="order-1 lg:order-2 relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-500">
              <div className="aspect-w-16 aspect-h-9">
                <img 
                  src="/pic/car112.jpg" 
                  alt="New Car Loan - Drive your dream car" 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-xl shadow-lg border border-gray-100 max-w-xs hidden md:block">
              <div className="flex items-center">
                <Smartphone className="w-6 h-6 text-blue-600 mr-2" />
                <div>
                  <p className="font-bold text-gray-800">Apply in 2 minutes</p>
                  <p className="text-xs text-gray-500">Using our mobile app</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-6 md:p-10 lg:p-12 my-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="rounded-2xl overflow-hidden shadow-xl h-full">
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                    alt="Car Finance Solutions" 
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Customized Loan Solutions
              </h2>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Turn your dream of owning a new car into reality with EzyLoan! Our customized loan solutions are designed to fit your budget, ensuring you get behind the wheel of your favorite car without any financial stress. With fast processing and transparent terms, EzyLoan makes the journey to owning your new car smooth and effortless.
              </p>
              
              <div className="space-y-5">
                {[
                  { icon: Percent, title: "Interest Rates from 7.99%", desc: "Competitive rates in the market" },
                  { icon: Clock, title: "48 Hour Approval", desc: "Quick processing and disbursement" },
                  { icon: Shield, title: "Flexible Tenure", desc: "12 to 84 months repayment options" },
                  { icon: FileText, title: "Minimal Documentation", desc: "Only essential paperwork required" }
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div 
                      key={index} 
                      className="flex items-start space-x-4 p-5 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                    >
                      <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                        <Icon className="w-6 h-6 text-indigo-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800">{item.title}</h3>
                        <p className="text-gray-600 text-sm">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="py-16">
          <div className="text-center mb-16 max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
                Why Choose EzyLoan?
              </span>
            </h2>
            <p className="text-xl text-gray-600">
              Experience the difference with our customer-centric approach and industry-leading services
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                icon: Star, 
                title: "Best Rates", 
                desc: "Industry-leading interest rates starting from 7.99% per annum with no hidden charges",
                gradient: "from-yellow-400 to-amber-500"
              },
              { 
                icon: Clock, 
                title: "Quick Process", 
                desc: "Get approved within 48 hours with minimal documentation and digital verification",
                gradient: "from-blue-400 to-cyan-500"
              },
              { 
                icon: Users, 
                title: "Expert Support", 
                desc: "Dedicated relationship managers available 24/7 for personalized assistance",
                gradient: "from-purple-400 to-pink-500"
              },
              { 
                icon: Award, 
                title: "Trusted Brand", 
                desc: "Over 10,000+ satisfied customers across India with 4.9/5 average rating",
                gradient: "from-rose-400 to-red-500"
              }
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div 
                  key={index} 
                  className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1"
                >
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Testimonial Section */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-3xl p-8 md:p-12 my-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
              ))}
            </div>
            <blockquote className="text-2xl font-bold text-gray-900 mb-6 italic">
              "EzyLoan made buying my first car completely stress-free. The entire process took less than 2 days from application to approval!"
            </blockquote>
            <div className="flex items-center justify-center space-x-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xl">
                RS
              </div>
              <div className="text-left">
                <p className="font-bold text-gray-900">Rahul Sharma</p>
                <p className="text-gray-600">Maruti Swift Owner</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 text-center text-white shadow-2xl my-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
              Ready to Drive Your Dream Car?
            </h2>
            <p className="text-base sm:text-lg md:text-xl mb-8 max-w-3xl mx-auto leading-relaxed opacity-90">
              Apply today and drive away with confidence! Choose EzyLoan and hit the road in your new car without any worries. Our experts are ready to help you find the perfect financing solution.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Link 
                href="/apply-now" 
                className="bg-white text-blue-700 font-bold py-4 px-8 rounded-xl hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-base sm:text-lg flex items-center justify-center"
              >
                <Car className="w-5 h-5 mr-2" /> Apply Now
              </Link>
              <Link 
                href="/contact" 
                className="border-2 border-white text-white font-bold py-4 px-8 rounded-xl hover:bg-white/10 transition-colors text-base sm:text-lg flex items-center justify-center"
              >
                <Heart className="w-5 h-5 mr-2 fill-white" /> Contact Us
              </Link>
            </div>
            <p className="mt-6 text-sm opacity-80 max-w-2xl mx-auto">
              <Shield className="w-4 h-4 inline-block mr-1 mb-1" /> 
              Zero processing fees | 100% digital application | Secure & confidential
            </p>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="bg-gray-50 border-t border-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600 mb-4">Have questions? Our car loan experts are ready to help!</p>
          <Link 
            href="/contact" 
            className="inline-flex items-center space-x-2 bg-blue-600 text-white font-bold py-3 px-8 rounded-full hover:bg-blue-700 transition-colors shadow-md"
          >
            <span>Schedule a Free Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NewCarLoanPage;
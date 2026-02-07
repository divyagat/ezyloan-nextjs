'use client';

import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send,
  CheckCircle,
  User,
  MessageSquare,
  Calculator
} from 'lucide-react';
import axios from 'axios';

import Script from 'next/script';
import HeroSection from '@/components/HeroSection';

// Next.js requires NEXT_PUBLIC_ prefix for client-side env vars
const SERVER_HOST = process.env.NEXT_PUBLIC_SERVER_HOST || 'http://0.0.0.0:3001';

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    loanType: '',
    loanAmount: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      await axios.post(`${SERVER_HOST}/api/contacts`, formData, {
        headers: { 'Content-Type': 'application/json' }
      });
      setSubmitMessage('✅ Thank you! Your message has been sent successfully. We will get back to you soon.');
      setFormData({
        fullName: '',
        email: '',
        phoneNumber: '',
        loanType: '',
        loanAmount: '',
        message: ''
      });
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitMessage('❌ Sorry, there was an error sending your message. Please try again or contact us directly at contact@ezyloan.co.in.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Structured data for SEO (Organization schema)
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "name": "EzyLoan",
    "url": "https://ezyloan.co.in",
    "logo": "https://ezyloan.co.in/logo.png",
    "image": "https://ezyloan.co.in/og-image.jpg",
    "description": "Trusted financial partner offering car loans, personal loans, business loans, home loans, and gold loans across India",
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
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 20.4618,
      "longitude": 85.8812
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "09:00",
      "closes": "19:00"
    },
    "sameAs": [
      "https://facebook.com/ezyloan",
      "https://twitter.com/ezyloan",
      "https://linkedin.com/company/ezyloan"
    ]
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Call Us',
      details: '+91 6372977626',
      subtitle: 'Mon-Sat 9AM-7PM',
      href: 'tel:+916372977626',
      ariaLabel: 'Call EzyLoan at +91 6372977626'
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: 'contact@ezyloan.co.in',
      subtitle: 'Quick response guaranteed',
      href: 'mailto:contact@ezyloan.co.in',
      ariaLabel: 'Email EzyLoan at contact@ezyloan.co.in'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      details: '1st Floor, Hindustan Tyres Building, Pir Bazar, Bhanpur, Cuttack, Odisha - 753011, India',
      subtitle: 'Head Office Location',
      href: 'https://maps.app.goo.gl/?link=https://goo.gl/maps/your-map-link',
      ariaLabel: 'Visit EzyLoan office in Cuttack, Odisha'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: '9:00 AM - 7:00 PM',
      subtitle: 'Monday to Saturday',
      href: null,
      ariaLabel: 'Business hours: Monday to Saturday, 9 AM to 7 PM'
    }
  ];

  const loanTypes = [
    'Loan Against Car',
    'Car Refinance',
    'Personal Loan',
    'Business Loan',
    'Home Loan',
    'Gold Loan'
  ];

  return (
    <section 
      id="contact" 
      className="py-20 bg-gradient-to-br from-blue-50 via-white to-cyan-50 relative overflow-hidden"
      itemScope
      itemType="https://schema.org/ContactPage"
    >
      {/* Structured Data for SEO */}
      <Script
        id="organization-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ 
          __html: JSON.stringify(organizationSchema) 
        }}
      />
      
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-gradient-to-br from-blue-200/20 to-cyan-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-gradient-to-br from-cyan-200/20 to-blue-200/20 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mt-8">
        {/* Hero Section - Ensure Hero component uses next/image */}
        <div className="relative mb-16 max-w-7xl mx-auto overflow-hidden rounded-2xl shadow-xl">
          <HeroSection
            page="contact"
            title="Contact EzyLoan"
            subtitle="Your trusted financial partner for all loan needs"
          />
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header with Semantic HTML */}
        <div className="text-center mb-16">
          <div 
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-cyan-100 px-4 py-2 rounded-full backdrop-blur-sm border border-blue-200/50 mb-6"
            role="status"
            aria-label="Contact section highlight"
          >
            <MessageSquare 
              className="w-4 h-4 text-blue-600" 
              aria-hidden="true" 
              focusable="false" 
            />
            <span className="text-sm font-medium text-blue-700">Get in Touch</span>
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-bold mb-6"> {/* Changed to h1 for page context */}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Contact Us
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Ready to take the next step? Get in touch with our loan experts who will guide you 
            through the entire process and help you find the perfect loan solution.
          </p>
        </div>

        {/* Contact Info Cards with Accessible Links */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactInfo.map((info, index) => {
            const IconComponent = info.icon;
            return (
              <div
                key={index}
                className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 text-center border border-white/30 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                itemProp="contactPoint"
                itemScope
                itemType="https://schema.org/ContactPoint"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <IconComponent 
                    className="w-7 h-7 text-white" 
                    aria-hidden="true" 
                    focusable="false" 
                  />
                </div>
                <h2 className="text-lg font-bold text-gray-800 mb-2">{info.title}</h2>
                {info.href ? (
                  <a
                    href={info.href}
                    className="text-blue-600 font-semibold mb-1 block hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                    aria-label={info.ariaLabel}
                    itemProp={info.title === 'Call Us' ? 'telephone' : info.title === 'Email Us' ? 'email' : undefined}
                  >
                    {info.details}
                  </a>
                ) : (
                  <p 
                    className="text-blue-600 font-semibold mb-1"
                    itemProp={info.title === 'Business Hours' ? 'openingHours' : undefined}
                  >
                    {info.details}
                  </p>
                )}
                <p className="text-sm text-gray-500">{info.subtitle}</p>
              </div>
            );
          })}
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form with Enhanced Accessibility */}
          <div 
            className="bg-white/50 backdrop-blur-xl rounded-3xl p-8 border border-white/30 shadow-2xl"
            itemScope
            itemType="https://schema.org/Organization"
            itemProp="makesOffer"
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <Send 
                  className="w-5 h-5 text-white" 
                  aria-hidden="true" 
                  focusable="false" 
                />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Send us a Message</h2>
            </div>

            <form 
              onSubmit={handleSubmit} 
              className="space-y-6"
              noValidate
              aria-label="Contact form for loan inquiries"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User 
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" 
                      aria-hidden="true" 
                      focusable="false" 
                    />
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      aria-required="true"
                      className="w-full pl-12 pr-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your full name"
                      aria-describedby="fullNameHelp"
                    />
                    <p id="fullNameHelp" className="sr-only">Full name is required for loan processing</p>
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail 
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" 
                      aria-hidden="true" 
                      focusable="false" 
                    />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      aria-required="true"
                      className="w-full pl-12 pr-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your email"
                      aria-describedby="emailHelp"
                    />
                    <p id="emailHelp" className="sr-only">Valid email required for communication</p>
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone 
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" 
                      aria-hidden="true" 
                      focusable="false" 
                    />
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      required
                      aria-required="true"
                      pattern="[0-9]{10,13}"
                      className="w-full pl-12 pr-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your phone number"
                      aria-describedby="phoneHelp"
                    />
                    <p id="phoneHelp" className="sr-only">10-digit mobile number required</p>
                  </div>
                </div>

                <div>
                  <label htmlFor="loanType" className="block text-sm font-medium text-gray-700 mb-2">
                    Loan Type *
                  </label>
                  <select
                    id="loanType"
                    name="loanType"
                    value={formData.loanType}
                    onChange={handleChange}
                    required
                    aria-required="true"
                    className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                    aria-describedby="loanTypeHelp"
                  >
                    <option value="">Select loan type</option>
                    {loanTypes.map((type, index) => (
                      <option key={index} value={type}>{type}</option>
                    ))}
                  </select>
                  <p id="loanTypeHelp" className="sr-only">Select the type of loan you need</p>
                </div>
              </div>

              <div>
                <label htmlFor="loanAmount" className="block text-sm font-medium text-gray-700 mb-2">
                  Loan Amount *
                </label>
                <div className="relative">
                  <Calculator 
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" 
                    aria-hidden="true" 
                    focusable="false" 
                  />
                  <input
                    type="text"
                    id="loanAmount"
                    name="loanAmount"
                    value={formData.loanAmount}
                    onChange={handleChange}
                    required
                    aria-required="true"
                    className="w-full pl-12 pr-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter loan amount (e.g., ₹1,00,000)"
                    aria-describedby="amountHelp"
                  />
                  <p id="amountHelp" className="sr-only">Enter desired loan amount in Indian Rupees</p>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Tell us more about your requirements..."
                  aria-describedby="messageHelp"
                />
                <p id="messageHelp" className="sr-only">Additional details about your loan requirements</p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                aria-busy={isSubmitting}
                aria-label={isSubmitting ? "Sending your message" : "Send message to EzyLoan team"}
              >
                {isSubmitting ? (
                  <>
                    <Send className="w-5 h-5 animate-pulse" aria-hidden="true" focusable="false" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" aria-hidden="true" focusable="false" />
                    <span>Send Message</span>
                  </>
                )}
              </button>

              {submitMessage && (
                <div 
                  className={`p-4 rounded-xl text-center font-medium mt-4 ${
                    submitMessage.includes('error') || submitMessage.startsWith('❌')
                      ? 'bg-red-50 text-red-700 border border-red-200'
                      : 'bg-green-50 text-green-700 border border-green-200'
                  }`}
                  role={submitMessage.includes('error') ? "alert" : "status"}
                  aria-live="polite"
                >
                  {submitMessage}
                </div>
              )}
            </form>
          </div>

          {/* Right Side Content */}
          <div className="space-y-8">
            {/* Quick Apply Card - Changed to semantic link */}
            <div 
              className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-3xl p-8 text-white relative overflow-hidden"
              itemScope
              itemType="https://schema.org/FinancialProduct"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl" aria-hidden="true"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-2xl" aria-hidden="true"></div>
              
              <div className="relative z-10">
                <h2 className="text-2xl font-bold mb-4">Need a Loan Urgently?</h2>
                <p className="text-blue-100 mb-6 leading-relaxed">
                  Get instant pre-approval in just 2 minutes. No paperwork, no waiting. 
                  Just quick and easy loans when you need them most.
                </p>
                <a
                  href="/apply"
                  className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 inline-block text-center w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-500"
                  aria-label="Apply for instant loan pre-approval"
                >
                  Apply Now
                </a>
              </div>
            </div>

            {/* FAQ Section with Semantic Markup */}
            <div className="bg-white/50 backdrop-blur-xl rounded-3xl p-8 border border-white/30 shadow-2xl">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>
              
              <div className="space-y-4">
                <div className="border-b border-gray-200 pb-4" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="font-semibold text-gray-800 mb-2" itemProp="name">How quickly can I get approved?</h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-sm text-gray-600" itemProp="text">Most applications are approved within 24 hours of submission.</p>
                  </div>
                </div>
                
                <div className="border-b border-gray-200 pb-4" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="font-semibold text-gray-800 mb-2" itemProp="name">What documents do I need?</h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-sm text-gray-600" itemProp="text">Basic documents include ID proof, address proof, and income proof.</p>
                  </div>
                </div>
                
                <div className="border-b border-gray-200 pb-4" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="font-semibold text-gray-800 mb-2" itemProp="name">Is my information secure?</h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-sm text-gray-600" itemProp="text">Yes, we use bank-grade encryption to protect all your personal data.</p>
                  </div>
                </div>
                
                <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="font-semibold text-gray-800 mb-2" itemProp="name">Can I prepay my loan?</h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-sm text-gray-600" itemProp="text">Yes, we offer flexible prepayment options with minimal charges.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
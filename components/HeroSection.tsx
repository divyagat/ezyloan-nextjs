"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";

interface Banner {
  _id: string;
  image: string;
  page: string;
  isActive: boolean;
}

interface HeroProps {
  page: string;
  title?: string;
  subtitle?: string;
}

const SERVER_HOST = process.env.NEXT_PUBLIC_SERVER_HOST;

const Hero: React.FC<HeroProps> = ({ page, title, subtitle }) => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // 👈 Add error state

  const bankLogos = [
    "/banks/AU-Small-Finance-Bank.webp",
    "/banks/Axis_Bank_logo.svg.png",
    "/banks/Bajaj-Finsery-Logo.png",
    "/banks/chola-logo.jpg",
    "/banks/Tata-Capital.png",
    "/banks/HDB.png",
    "/banks/boi.png",
    "/banks/Hero-Fincorp.png",
    "/banks/ICICI-Bank-logo.png",
    "/banks/IDFC-logo.png",
    "/banks/Kotak_Mahindra_Bank_logo.png",
    "/banks/Mahindra_Finance_Logo.png",
    "/banks/Piramal-Logo.png",
    "/banks/esaf-seeklogo.png",
    "/banks/indostar.png",
  ];

  const [bankLogoPosition, setBankLogoPosition] = useState(0);

  useEffect(() => {
    if (!SERVER_HOST) {
      setError("Backend URL not configured");
      setIsLoading(false);
      return;
    }

    const fetchBanners = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await axios.get(`${SERVER_HOST}/api/banners?page=${encodeURIComponent(page)}`);
        const activeBanners = response.data.filter((banner: Banner) => banner.isActive);
        setBanners(activeBanners);
      } catch (err: any) {
        console.error("Banner fetch error:", err);
        setError("Failed to load banners. Please try again later.");
        setBanners([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBanners();
  }, [page]);

  // Auto rotate banners
  useEffect(() => {
    if (banners.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [banners.length]);

  // Auto scroll banking partners (only for home)
  useEffect(() => {
    if (page !== "home") return;
    const interval = setInterval(() => {
      setBankLogoPosition((prev) => (prev + 1) % bankLogos.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [page, bankLogos.length]);

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % Math.max(banners.length, 1));
  const prevSlide = () =>
    setCurrentSlide(
      (prev) => (prev - 1 + Math.max(banners.length, 1)) % Math.max(banners.length, 1)
    );

  // Loading
  if (isLoading) {
    return (
      <section className="relative overflow-hidden min-h-[50vh] bg-gray-100 flex items-center justify-center">
        <div className="text-lg">Loading banners...</div>
      </section>
    );
  }

  // Error
  if (error) {
    return (
      <section className="relative overflow-hidden min-h-[50vh] bg-red-50 flex items-center justify-center">
        <div className="text-red-600 text-center p-4">
          <p>⚠️ {error}</p>
          <p className="text-sm mt-2">Check console for details</p>
        </div>
      </section>
    );
  }

  // No banners
  if (banners.length === 0) {
    return (
      <section className="relative overflow-hidden min-h-[50vh] flex items-center justify-center bg-blue-600">
        <h1 className="text-4xl font-bold text-white">{title || "EzyLoan"}</h1>
      </section>
    );
  }

  return (
    <section
      id={page === "home" ? "home" : undefined}
      className={`relative overflow-hidden ${
        page === "home"
          ? "min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50"
          : "min-h-[16vh]"
      }`}
    >
      {/* Banner Carousel */}
      <div className={`w-full relative z-10 ${page === "home" ? "pt-24" : ""}`}>
        <div className="relative w-full h-[50vh] md:h-[400px] overflow-hidden">
          {banners.map((banner, index) => (
            <div
              key={banner._id}
              className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
                currentSlide === index ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={banner.image}
                alt={`Banner ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0 && page === "home"}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

              {title && page === "home" && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white px-4">
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">{title}</h1>
                    {subtitle && <p className="text-lg md:text-xl">{subtitle}</p>}
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Indicators */}
          {banners.length > 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {banners.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full ${
                    currentSlide === index ? "bg-white" : "bg-white/50"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}

          {/* Arrows */}
          {banners.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white"
                aria-label="Previous"
              >
                ‹
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white"
                aria-label="Next"
              >
                ›
              </button>
            </>
          )}
        </div>
      </div>

      {/* Banking Partners */}
      {page === "home" && (
        <div className="w-full px-4 py-8">
          <div className="max-w-7xl mx-auto bg-white/50 backdrop-blur rounded-2xl p-6">
            <h2 className="text-xl font-bold text-center mb-4">Our Banking Partners</h2>
            <div className="relative overflow-hidden">
              <div
                className="flex animate-scroll"
                style={{
                  animation: `scroll ${bankLogos.length * 2}s linear infinite`,
                }}
              >
                {[...bankLogos, ...bankLogos].map((logo, idx) => (
                  <div key={idx} className="flex-none w-1/3 sm:w-1/4 md:w-1/6 px-2">
                    <Image
                      src={logo}
                      alt="Partner"
                      width={120}
                      height={60}
                      className="object-contain mx-auto grayscale hover:grayscale-0 transition"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Optional: Add CSS animation for auto-scroll */}
      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll ${bankLogos.length * 2}s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;
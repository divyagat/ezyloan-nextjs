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

const SERVER_HOST = process.env.NEXT_PUBLIC_SERVER_HOST || "";

// Fallback image must exist in public folder
const FALLBACK_BANNER = "/fallback-banner.jpg"; 
const FALLBACK_LOGO = "/fallback-logo.png";

const HeroSection: React.FC<HeroProps> = ({ page, title, subtitle }) => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Validate and normalize image URL
  const getValidImageUrl = (url: string): string => {
    if (!url || typeof url !== "string" || url.trim() === "") return FALLBACK_BANNER;
    
    const trimmed = url.trim();
    // Handle relative paths from backend (prepend SERVER_HOST if needed)
    if (trimmed.startsWith("/") && SERVER_HOST && !trimmed.startsWith("//")) {
      return `${SERVER_HOST.replace(/\/+$/, "")}${trimmed}`;
    }
    // Handle protocol-relative URLs
    if (trimmed.startsWith("//")) return `https:${trimmed}`;
    
    return trimmed;
  };

  // Banking partners logos with validation
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
  ].filter(Boolean); // Remove any falsy values

  useEffect(() => {
    if (!SERVER_HOST) {
      setError("Backend URL not configured. Set NEXT_PUBLIC_SERVER_HOST");
      setIsLoading(false);
      return;
    }

    const fetchBanners = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await axios.get(`${SERVER_HOST}/api/banners?page=${encodeURIComponent(page)}`);
        
        // Filter active banners AND validate image URLs
        const validBanners = (response.data || [])
          .filter((banner: Banner) => 
            banner.isActive && 
            banner.image && 
            typeof banner.image === "string" &&
            banner.image.trim() !== ""
          )
          .map((banner: Banner) => ({
            ...banner,
            image: getValidImageUrl(banner.image) // Normalize URL immediately
          }));

        setBanners(validBanners);
        
        if (validBanners.length === 0) {
          console.warn(`No valid banners found for page: ${page}`);
        }
      } catch (err: any) {
        const errorMsg = err.response?.status === 404 
          ? "Banners not found for this page" 
          : "Failed to load banners. Please try again later.";
        console.error("Banner fetch error:", err);
        setError(errorMsg);
        setBanners([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBanners();
  }, [page]);

  // CRITICAL: Reset slide index when banners change to prevent out-of-bounds errors
  useEffect(() => {
    setCurrentSlide(0);
  }, [banners]);

  // Auto rotate banners (only if multiple banners exist)
  useEffect(() => {
    if (banners.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [banners.length]);

  // Auto scroll banking partners (home page only)
  useEffect(() => {
    if (page !== "home") return;
    const interval = setInterval(() => {
      setBankLogoPosition((prev) => (prev + 1) % bankLogos.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [page]);

  const [bankLogoPosition, setBankLogoPosition] = useState(0);

  const nextSlide = () => 
    banners.length > 1 && setCurrentSlide((prev) => (prev + 1) % banners.length);
  
  const prevSlide = () => 
    banners.length > 1 && setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);

  // Loading state
  if (isLoading) {
    return (
      <section className="relative overflow-hidden min-h-[50vh] bg-gray-100 flex items-center justify-center">
        <div className="text-lg">Loading banners...</div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="relative overflow-hidden min-h-[50vh] bg-red-50 flex items-center justify-center">
        <div className="text-red-600 text-center p-4 max-w-md">
          <p className="font-medium">⚠️ {error}</p>
          {SERVER_HOST && (
            <p className="text-sm mt-1 text-gray-600">
              Backend: {SERVER_HOST}
            </p>
          )}
          <button 
            onClick={() => window.location.reload()}
            className="mt-3 px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200 transition"
          >
            Retry
          </button>
        </div>
      </section>
    );
  }

  // No valid banners fallback
  if (banners.length === 0) {
    return (
      <section className="relative overflow-hidden min-h-[50vh] flex items-center justify-center bg-blue-600">
        <div className="text-center text-white p-6">
          <h1 className="text-4xl font-bold">{title || "EzyLoan"}</h1>
          {subtitle && <p className="text-xl mt-2">{subtitle}</p>}
        </div>
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
              {/* CRITICAL FIX: Validate src before rendering Image */}
              {banner.image && typeof banner.image === "string" && banner.image.trim() !== "" ? (
                <Image
                  src={banner.image}
                  alt={`Banner ${index + 1} for ${page}`}
                  fill
                  className="object-cover"
                  priority={index === 0 && page === "home"}
                  unoptimized // Prevents crash for external domains not in next.config.js
                  onError={(e) => {
                    // Fallback to default image on load error
                    (e.target as HTMLImageElement).src = FALLBACK_BANNER;
                  }}
                />
              ) : (
                // Fallback if validation fails at render time
                <Image
                  src={FALLBACK_BANNER}
                  alt="Fallback banner"
                  fill
                  className="object-cover"
                  unoptimized
                />
              )}
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              
              {title && page === "home" && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white px-4 max-w-3xl">
                    <h1 className="text-3xl md:text-4xl font-bold mb-2 drop-shadow-md">
                      {title}
                    </h1>
                    {subtitle && (
                      <p className="text-lg md:text-xl drop-shadow-md">
                        {subtitle}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Indicators (only show if multiple banners) */}
          {banners.length > 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
              {banners.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition ${
                    currentSlide === index ? "bg-white scale-110" : "bg-white/50"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                  aria-current={currentSlide === index ? "true" : "false"}
                />
              ))}
            </div>
          )}

          {/* Navigation arrows (only show if multiple banners) */}
          {banners.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/30 rounded-full flex items-center justify-center text-white text-2xl z-20 hover:bg-black/50 transition"
                aria-label="Previous banner"
              >
                ‹
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/30 rounded-full flex items-center justify-center text-white text-2xl z-20 hover:bg-black/50 transition"
                aria-label="Next banner"
              >
                ›
              </button>
            </>
          )}
        </div>
      </div>

      {/* Banking Partners (Home Page Only) */}
      {page === "home" && bankLogos.length > 0 && (
        <div className="w-full px-4 py-8">
          <div className="max-w-7xl mx-auto bg-white/50 backdrop-blur rounded-2xl p-6 border border-gray-200">
            <h2 className="text-xl font-bold text-center text-gray-800 mb-4">
              Our Banking Partners
            </h2>
            <div className="relative overflow-hidden">
              <div className="flex animate-scroll">
                {[...bankLogos, ...bankLogos].map((logo, idx) => (
                  <div 
                    key={idx} 
                    className="flex-none w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 px-3 py-2"
                  >
                    <div className="relative h-12 flex items-center justify-center">
                      {/* Fallback handling for partner logos */}
                      <Image
                        src={logo}
                        alt={`Banking partner ${idx + 1}`}
                        fill
                        className="object-contain grayscale hover:grayscale-0 transition"
                        unoptimized
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = FALLBACK_LOGO;
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Auto-scroll animation */}
      <style jsx global>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll ${Math.max(bankLogos.length, 1) * 2}s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '@/components/shop/Navbar';
import Footer from '@/components/shop/Footer';
import categoryimg from '../../../public/home/Types_of_pouch.webp';

function Page() {
  const [industries, setIndustries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const APIURL = process.env.NEXT_PUBLIC_API_URL;
  const NEXI_CDN_URL = process.env.NEXT_PUBLIC_CDNNEW_URL;

  useEffect(() => {
    const fetchIndustries = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${APIURL}/api/industries`);
        const data = await res.json();
        if (Array.isArray(data)) {
          setIndustries(data);
        }
      } catch (err) {
        console.error("Failed to fetch industries", err);
        setError("Failed to load industries. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchIndustries();
  }, [APIURL]);

  // Helper function to determine image URL with format fallback
  const getImageUrl = (image) => {
    if (!image || !NEXI_CDN_URL) return "/placeholder.png";
    
    // Remove any existing extension if present
    const baseImageName = image.replace(/\.(webp|png)$/i, "");
    
    // Try .webp first, then .png
    const extension = ".webp"; // Default to .webp
    return `${NEXI_CDN_URL}/industries/${baseImageName}${extension}`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-md px-4 py-3 text-center text-red-700 bg-red-100 border border-red-400 rounded">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen pb-12 bg-gray-50 pt-14">
        <main className="">
          <motion.div
            className="mb-8 sm:mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative overflow-hidden h-[200px] sm:h-[300px] md:h-[350px] lg:h-[400px] rounded-lg">
              <img
                src={categoryimg.src}
                alt="Types of Pouches"
                className="object-cover w-full h-full"
              />
              <div className="absolute bottom-[8%] left-[2%] z-10">
                <div className="px-3 border-t border-b border-gray-800 sm:py-2 sm:px-4">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-[#231f20]">
                    TYPES OF
                  </h1>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-[1000] text-[#231f20] mt-1 sm:mt-2">
                    POUCHES
                  </h1>
                </div>
              </div>
            </div>
          </motion.div>

          <h2 className="mb-8 text-2xl font-bold text-center text-gray-800 sm:text-3xl md:text-4xl sm:mb-12">
            Explore Industries
          </h2>
          <motion.div
            className="grid grid-cols-2 gap-4 p-2 mx-auto max-w-7xl sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-6"
            initial="hidden"
            animate="visible"
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }}
          >
            {industries.map((industry) => (
              <Link
                key={industry.id}
                href={`/industries/${industry.name.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <motion.div
                  variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.5 } } }}
                  className="overflow-hidden transition-shadow duration-300 bg-white rounded-lg shadow cursor-pointer hover:shadow-md"
                >
                  <div className="relative h-40 sm:h-[350px]">
                    <img
                      src={getImageUrl(industry.image)}
                      alt={industry.name}
                      className="object-cover w-full h-full"
                      onError={(e) => {
                        console.error(`Failed to load image: ${getImageUrl(industry.image)}`);
                        if (e.target.src.includes(".webp")) {
                          e.target.src = getImageUrl(industry.image).replace(".webp", ".png");
                        } else {
                          e.target.src = "/placeholder.png";
                        }
                      }}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="mb-1 text-base font-semibold text-gray-900 sm:text-lg">{industry.name}</h3>
                    <p className="mb-3 text-xs text-gray-700 sm:text-sm line-clamp-2">
                      {industry.description}
                    </p>
                    <span className="text-sm font-semibold text-blue-600">
                      Read more →
                    </span>
                  </div>
                </motion.div>
              </Link>
            ))}
          </motion.div>
        </main>
      </div>
      <Footer />
    </>
  );
}

export default Page;
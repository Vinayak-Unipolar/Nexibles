"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '@/components/shop/Navbar';
import Footer from '@/components/shop/Footer';

function Page() {
  const [industries, setIndustries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const APIURL = process.env.NEXT_PUBLIC_API_URL;
  const CDN_URL = process.env.NEXT_PUBLIC_CDN_URL;

  useEffect(() => {
    const fetchIndustries = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${APIURL}/api/industries`);
        const data = await res.json();
        if (Array.isArray(data)) {
          const sortedIndustries = [...data].sort((a, b) =>
            new Date(b.timestamp) - new Date(a.timestamp)
          );
          setIndustries(sortedIndustries);
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  const featuredIndustry = industries[0] || null;
  const restIndustries = industries.slice(1);

  return (
    <>
      <Navbar />

      <div className="bg-gray-50 min-h-screen mt-12 mb-12">
        <main>
          {featuredIndustry && (
            <motion.div
              className="mb-10 "
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="relative overflow-hidden shadow-lg h-[80vh]">
                <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent opacity-70"></div>
                <img
                  src="/home/Types_of_pouch.webp"
                  alt={featuredIndustry.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          )}

          <h2 className="text-4xl text-center font-bold text-gray-800 mb-12">
            Explore Industries
          </h2>
          <motion.div
            className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6"
            initial="hidden"
            animate="visible"
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }}
          >
            {restIndustries.map((industry) => (
              <Link
                key={industry.id}
                href={`/blog/${industry.name.toLowerCase()}`}
              >
                <motion.div
                  variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.5 } } }}
                  className="bg-white rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow duration-300 cursor-pointer"
                >
                  <div className="relative h-45">
                    <img
                      src={`${CDN_URL}/${industry.image}`}
                      alt={industry.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{industry.name}</h3>
                    <p className="text-xs text-gray-700 mb-3">{industry.description}</p>
                    <span className="text-blue-600 text-sm font-semibold">
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
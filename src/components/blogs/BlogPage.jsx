"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

function BlogPage() {
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (error) return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <p>{error}</p>
      </div>
    </div>
  );
  
  const featuredIndustry = industries.length > 0 ? industries[0] : null;
  const restIndustries = industries.length > 0 ? industries.slice(1) : [];

  return (
    <div className="bg-gray-50 min-h-screen mt-12">
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {featuredIndustry && (
          <motion.div 
            className="mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative rounded-lg overflow-hidden shadow-lg h-80">
              <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent opacity-70"></div>
              <img 
                src={`${CDN_URL || ""}/${featuredIndustry.image}`}
                alt={featuredIndustry.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h2 className="text-3xl font-bold mb-2">{featuredIndustry.name}</h2>
                <p className="mb-4">
                  Explore the latest trends and insights in the {featuredIndustry.name.toLowerCase()} industry
                </p>
                <Link href={`/industries/${featuredIndustry.name.toLowerCase().replace(/\s+/g, '-')}`}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-gray-800 px-4 py-2 rounded font-medium text-sm hover:bg-blue-50"
                  >
                    Read More
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}

        <h2 className="text-xl font-bold text-gray-800 mb-6">Explore Industries</h2>
        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {restIndustries.map((industry) => (
            <motion.div
              key={industry.id}
              variants={itemVariants}
              className="bg-white rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow duration-300"
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
                <h3 className="text-xs text-gray-900 mb-1">{industry.description}</h3>
                <Link href={`/industries/${industry.name.toLowerCase().replace(/\s+/g, '-')}`} className="text-gray-500 text-xs mb-3">
                  Read more →
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </main>
    </div>
  );
}

export default BlogPage;
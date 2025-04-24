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
    <div className="flex items-center justify-center h-screen">
      <div className="w-12 h-12 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
    </div>
  );

  if (error) return (
    <div className="flex items-center justify-center h-screen">
      <div className="px-4 py-3 text-red-700 bg-red-100 border border-red-400 rounded">
        <p>{error}</p>
      </div>
    </div>
  );

  const featuredIndustry = industries.length > 0 ? industries[0] : null;
  const restIndustries = industries.length > 0 ? industries.slice(1) : [];

  return (
    <div className="min-h-screen mt-12 bg-gray-50">
      <main className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {featuredIndustry && (
          <motion.div
            className="mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative overflow-hidden rounded-lg shadow-lg h-80">
              <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent opacity-70"></div>
              <img
                src={`${CDN_URL }/industries/${featuredIndustry.image}`}
                alt={featuredIndustry.name}
                className="object-cover w-full h-full"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h2 className="mb-2 text-3xl font-bold">{featuredIndustry.name}</h2>
                <p className="mb-4">
                  Explore the latest trends and insights in the {featuredIndustry.name.toLowerCase()} industry
                </p>
                <Link href={`/industries/${featuredIndustry.name.toLowerCase().replace(/\s+/g, '-')}`}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 text-sm font-medium text-gray-800 bg-yellow-500 rounded hover:bg-blue-50"
                  >
                    Read More
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}

        <h2 className="mb-6 text-xl font-bold text-gray-800">Explore Industries</h2>
        <motion.div
          className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {restIndustries.map((industry) => (
            <motion.div
              key={industry.id}
              variants={itemVariants}
              className="overflow-hidden transition-shadow duration-300 bg-white rounded-lg shadow hover:shadow-md"
            >
              <div className="relative h-45">
                <img
                  src={`${CDN_URL}/industries/${industry.image}`}
                  alt={industry.name}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-4">
                <h3 className="mb-1 text-lg font-semibold text-gray-900">{industry.name}</h3>
                <h3 className="mb-1 text-xs text-gray-900">{industry.description}</h3>
                <Link href={`/industries/${industry.name.toLowerCase().replace(/\s+/g, '-')}`} className="mb-3 text-xs text-gray-500">
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
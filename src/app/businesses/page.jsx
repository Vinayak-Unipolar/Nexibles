"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/shop/Navbar';
import Footer from '@/components/shop/Footer';

export default function Page() {
  const [industries, setIndustries] = useState([]);
  const [randomIndustries, setRandomIndustries] = useState([]); // now up to 5
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
          // sort by timestamp desc
          const sorted = [...data].sort(
            (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
          );
          setIndustries(sorted);

          // pick 5 random for featured + two small cards
          const shuffled = [...sorted].sort(() => 0.5 - Math.random());
          setRandomIndustries(shuffled.slice(0, 5));
        }
      } catch (err) {
        console.error('Failed to fetch industries', err);
        setError('Failed to load industries. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchIndustries();
  }, [APIURL]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
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

  // First random item for the big banner
  const featuredIndustry = randomIndustries[0] || null;
  // Next four go into two small cards, each with two images
  const rightPairs =
    randomIndustries.length === 5
      ? [randomIndustries.slice(1, 3), randomIndustries.slice(3, 5)]
      : [];

  // All others for the full Explore grid (still slicing off only the very first one)
  const restIndustries = industries.slice(1);

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 min-h-screen mt-12">
        <main>
          {/* Banner */}
          {featuredIndustry && (
            <motion.div
              className="mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="relative h-80 overflow-hidden shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent opacity-70" />
                <Image
                  src={`${CDN_URL}/${featuredIndustry.image}`}
                  alt={featuredIndustry.name}
                  fill
                  style={{ objectFit: 'cover' }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h2 className="text-3xl font-bold mb-2">
                    {featuredIndustry.name}
                  </h2>
                  <p className="mb-4">
                    Explore the latest trends and insights in the{' '}
                    {featuredIndustry.name.toLowerCase()} industry
                  </p>
                  <Link
                    href={`/blog/${featuredIndustry.name.toLowerCase()}`}
                    className="inline-block"
                  >
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

          {/* Random 5‑box grid: 1 big + 2 small (with 2 images each) */}
          {randomIndustries.length === 5 && (
            <div className="mb-10 px-4 md:px-40 xl:px-64">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* large left card */}
                <Link
                  href={`/blog/${featuredIndustry.name.toLowerCase()}`}
                  className="relative bg-gray-100 rounded-lg overflow-hidden h-full flex flex-col"
                >
                  <div className="relative w-full h-72 md:h-full">
                    <Image
                      src={`${CDN_URL}/${featuredIndustry.image}`}
                      alt={featuredIndustry.name}
                      fill
                      style={{ objectFit: 'contain' }}
                      className="p-4 rounded-lg"
                    />
                  </div>
                  <p className="text-gray-900 font-semibold absolute bottom-4 left-1/2 transform -translate-x-1/2">
                    {featuredIndustry.name}
                  </p>
                </Link>

                {/* two stacked cards, each with two images */}
                <div className="grid grid-rows-2 gap-6">
                  {rightPairs.map((pair, idx) => (
                    <Link
                      key={idx}
                      href="#"
                      className="relative bg-gray-100 rounded-lg overflow-hidden text-center"
                    >
                      <div className="flex h-48">
                        {pair.map((ind) => (
                          <div
                            key={ind.id}
                            className="relative w-1/2 h-full"
                          >
                            <Image
                              src={`${CDN_URL}/${ind.image}`}
                              alt={ind.name}
                              fill
                              style={{ objectFit: 'contain' }}
                              className="p-4 rounded-lg"
                            />
                          </div>
                        ))}
                      </div>
                      <p className="text-gray-900 font-semibold mt-2">
                        {pair.map((ind) => ind.name).join(' / ')}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Explore Industries */}
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Explore Industries
          </h2>
          <motion.div
            className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {restIndustries.map((industry) => (
              <Link
                key={industry.id}
                href={`/blog/${industry.name.toLowerCase()}`}
              >
                <motion.div
                  variants={itemVariants}
                  className="bg-white rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow duration-300"
                >
                  <div className="relative w-full h-48">
                    <Image
                      src={`${CDN_URL}/${industry.image}`}
                      alt={industry.name}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {industry.name}
                    </h3>
                    <p className="text-xs text-gray-900 mb-1">
                      {industry.description}
                    </p>
                    <span className="text-gray-500 text-xs mb-3 inline-block">
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

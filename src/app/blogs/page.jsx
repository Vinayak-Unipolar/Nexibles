"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '@/components/shop/Navbar';
import Footer from '@/components/shop/Footer';
import Loader from '@/components/comman/Loader';

function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMdOrAbove, setIsMdOrAbove] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  const CDN_URL = process.env.NEXT_PUBLIC_CDN_URL;

  // Fetch blogs from API
  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        if (!API_KEY) {
          throw new Error('API key is not configured.');
        }

        const res = await fetch(`${API_URL}/api/blogs`, {
          headers: {
            'Content-Type': 'application/json',
            'API-Key': API_KEY,
          },
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();

        if (data.status === 'success' && Array.isArray(data.data)) {
          setBlogs(data.data);
        } else {
          console.error('Failed to fetch blogs:', data.error || 'Invalid data format');
          setBlogs([]);
          setError('Failed to load blogs. Invalid response from server.');
        }
      } catch (err) {
        console.error('Error fetching blogs:', err);
        setError(
          err.message === 'Failed to fetch'
            ? 'Network error. Please check your connection.'
            : err.message || 'Failed to load blogs. Please try again later.'
        );
      } finally {
        setLoading(false);
      }
    };

    if (!API_URL) {
      setError('API URL is not configured.');
      setLoading(false);
      return;
    }

    fetchBlogs();
  }, [API_URL, API_KEY]);

  // Handle responsive video banner
  useEffect(() => {
    const handleResize = () => {
      setIsMdOrAbove(window.innerWidth >= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-md px-4 py-3 text-center text-red-700 bg-red-100 border border-red-400 rounded">
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen pb-12 bg-gray-50 pt-14">
        <main>
          <motion.div
            className="mb-8 sm:mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="">
              {isMdOrAbove ? (
                <video
                  className="object-cover w-full h-full"
                  src={`${CDN_URL}/blogs-banner.mp4`}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                >
                  Your browser does not support the video tag.
                </video>
              ) : (
                <video
                  className="object-cover w-full h-[28vh]"
                  src={`${CDN_URL}/blogs-banner.mp4`}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                >
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
          </motion.div>

          <h2 className="mb-8 text-2xl font-bold text-center text-gray-800 sm:text-3xl md:text-4xl sm:mb-12">
            Explore Our Blogs
          </h2>
          <motion.div
            className="grid grid-cols-1 gap-4 p-2 mx-auto max-w-7xl sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-6"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
            }}
          >
            {blogs.map((blog) => (
              <Link
                key={blog.id}
                href={`/blogs/${blog.slug || blog.title.toLowerCase().replace(/\s+/g, '-')}`}
                aria-label={`Read more about ${blog.title}`}
              >
                <motion.div
                  variants={{
                    hidden: { y: 20, opacity: 0 },
                    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
                  }}
                  className="overflow-hidden transition-shadow duration-300 bg-white rounded-lg shadow cursor-pointer hover:shadow-md"
                >
                  <div className="relative h-40 sm:h-48">
                    <img
                      src={`${CDN_URL}/blogs/${blog.image || 'default-blog.jpg'}`}
                      alt={blog.title}
                      className="object-cover w-full h-full"
                      loading="lazy"
                      onError={(e) => (e.target.src = `${CDN_URL}/fallback-image.jpg`)}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="mb-1 text-base font-semibold text-gray-900 sm:text-lg">
                      {blog.title}
                    </h3>
                    <p className="mb-3 text-xs text-gray-700 sm:text-sm line-clamp-2 italic">
                      {blog.excerpt || blog.description || 'No excerpt available.'}
                    </p>
                    <span className="text-sm font-semibold text-[#103b60]">
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

export default BlogPage;
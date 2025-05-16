"use client";
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/shop/Navbar';
import Banner from '@/components/shop/bannerproducts/Banner';
import Footer from '@/components/shop/Footer';
import Trendingproducts from '@/components/shop/trendingproducts/Trendingproducts';
import Backdrop from '@/components/shop/Backdrop';
import Productcategory from '@/components/shop/productcategory/Productcategory';
import Advantages from '@/components/shop/Advantages';
import PopularProducts from '@/components/shop/popularproducts/Popularproducts';
import AllProducts from '@/components/shop/AllProducts';
import SubscribeBanner from '@/components/shop/SubscribeBanner';
import BrandLogosSection from '@/components/instagramandlogos/BrandLogosSection';

// Animation variants for fade-in and slide-up effects
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const Shop = () => {
  const [categoryData, setData] = useState([]);
  const token = process.env.NEXT_PUBLIC_API_KEY;
  const APIURL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${APIURL}/api/category_master`, {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
            'API-Key': token,
          },
        });
        const data = await response.json();
        if (data.status === 'success') {
          const filterCategory = data.data.filter(
            (category) => category.origin?.toLowerCase() === "nexibles"
          );
          setData(filterCategory);
        } else {
          console.error('failed to fetch categories', data.error);
        }
      } catch (error) {
        console.log("Error Fetching Data", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <Navbar />
      <Backdrop />
      <motion.div
        className="mx-auto px-6 py-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Introduction Section */}
        <motion.section
          className="relative bg-white/80 backdrop-blur-md rounded-2xl p-8 mb-12"
          variants={itemVariants}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 to-purple-50/30 rounded-2xl" />
          <div className="relative z-10">
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-6 tracking-tight">
              NexiClassic Series
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed text-center max-w-3xl mx-auto">
              The NexiClassic series is crafted with precision, drawing from our extensive experience working with brands across various industry segments. These pouches are designed to offer flexibility and accessibility to businesses of all sizes, ensuring that quality packaging is within reach for every brand.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed text-center max-w-3xl mx-auto mt-4">
              One of the standout features of NexiClassic pouches is the ability to order in smaller quantities, starting from just 500 pieces per SKU. This makes them a perfect fit for emerging brands, start-ups, and businesses exploring new product lines without the burden of excessive packaging inventory.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed text-center max-w-3xl mx-auto mt-4">
              For brand owners, this eliminates the traditional challenges associated with high minimum order quantities (MOQs), which often result in unnecessary stockpiling and financial strain. Instead, NexiClassic empowers you to experiment with different product variations, introduce seasonal or limited-edition offerings, and enter new market segments—all while maintaining a lean and efficient supply chain.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed text-center max-w-3xl mx-auto mt-4">
              With NexiClassic, launching a new product becomes a hassle-free, cost-effective endeavor, allowing you to focus on scaling your brand, refining your products, and engaging with your customers.
            </p>
          </div>
        </motion.section>

        {/* All Products Section */}
        <motion.div variants={itemVariants}>
          <AllProducts />
        </motion.div>

        {/* Trusted Brands Section */}
        <motion.section
          className="text-center mt-16"
          variants={itemVariants}
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-8 tracking-tight">
            Trusted by 1500+ Brands
          </h2>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-100/20 to-purple-100/20 rounded-xl" />
            <div className="relative">
              <BrandLogosSection />
            </div>
          </div>
        </motion.section>

        <div className="mt-12" />
      </motion.div>
      <Footer />
    </div>
  );
};

export default Shop;
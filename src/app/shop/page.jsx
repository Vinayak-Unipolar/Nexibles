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

const NexiClassicHighlight = ({ children }) => (
  <span className="font-bold text-xl" style={{ color: '#ffd13d' }}>
    {children}
  </span>
);

const BlueHighlight = ({ children }) => (
  <span className="font-bold text-xl" style={{ color: '#103b60' }}>
    {children}
  </span>
);

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
        {/* Introduction Section - Updated to match the image */}
        <motion.section
          className="relative bg-white rounded-2xl p-8 mb-12"
          variants={itemVariants}
        >
          <div className="grid grid-cols-1 md:grid-cols-[60%_40%] gap-8">
            {/* Left Column */}
            <div className="text-left">
              <h2 className="text-md font-medium ">The <NexiClassicHighlight>NexiClassic</NexiClassicHighlight> series is crafted with precision, drawing from our extensive experience working with brands across various industry segments. These pouches are designed to offer <BlueHighlight>flexibility & accessibility</BlueHighlight> to businesses of all sizes, ensuring that quality packaging is within reach for every brand.One of the standout features of NexiClassic pouches is the ability to order in smaller quantities, starting from just <BlueHighlight>500 pieces per SKU</BlueHighlight>. This makes them a perfect fit for <BlueHighlight>emerging brands, start-ups, & businesses</BlueHighlight> exploring new product lines without the burden of excessive packaging inventory.For brand owners, this eliminates the traditional challenges associated with high minimum order quantities (MOQs), which often result in unnecessary stockpiling & financial strain. Instead, <NexiClassicHighlight>NexiClassic</NexiClassicHighlight> empowers you to experiment with <BlueHighlight>different product variations</BlueHighlight>, introduce seasonal or <BlueHighlight>limited-edition offerings</BlueHighlight>, & enter new market segments—all while maintaining a <BlueHighlight>lean & efficient supply chain</BlueHighlight>.</h2>
            </div>
            
            {/* Right Column */}
            <div className="text-center flex flex-col justify-center">
              <h3 className="text-center">With <span className='font-bold text-2xl text-[#ffd13d]'>NexiClassic</span>,<br />launching a new <span className="font-thin text-2xl">product</span> becomes a</h3>
              
              <h2 className="text-2xl font-bold text-center" style={{ color: '#103b60' }}>Hassle-Free</h2>
              <h2 className="text-2xl font-bold text-center ml-4" style={{ color: '#103b60' }}>Cost-Effective Endeavor</h2>
              
              <p className="text-center">allowing you to focus on</p>
              <h3 className="text-center"><span style={{ color: '#103b60' }} className="font-bold text-2xl ml-12">Scaling</span> Your <span style={{ color: '#103b60' }} className="font-bold text-2xl">Brand</span></h3>
              <h3 className="text-center"><span style={{ color: '#103b60' }} className="font-bold text-2xl ">Refining</span> Your <span style={{ color: '#103b60' }} className="font-bold text-2xl mr-12">Products</span></h3>
            </div>
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
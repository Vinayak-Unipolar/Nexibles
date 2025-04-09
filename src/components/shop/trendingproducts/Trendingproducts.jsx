'use client';
import React, { useEffect, useState } from 'react';
import Link from "next/link";
import { motion, AnimatePresence } from 'framer-motion';

const tabs = ['Best Sellers', 'On Sale', 'New Arrivals'];

export default function TrendingProducts() {
  const [productData, setProductData] = useState([]);
  const [activeTab, setActiveTab] = useState('Best Sellers');
  const token = process.env.NEXT_PUBLIC_API_KEY;
  const APIURL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${APIURL}/api/product/product_list/8`, {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
            'API-Key': token,
          },
        });
        const result = await response.json();
        if (result.status === "success") {
          setProductData(result.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // If you'd like different endpoints for each tab, add logic here.
    fetchData();
  }, [activeTab]);

  const fetchTabProducts = (tab) => {
    setActiveTab(tab);
    // Add conditional fetch endpoint logic if needed
  };

  const cardAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.4,
        ease: "easeOut"
      }
    })
  };

  return (
    <div className="bg-white p-4 md:mt-8">
      {/* Tabs with sliding indicator */}
      <div className="flex justify-center mb-12">
        <div className="relative inline-flex bg-gray-100 rounded-xl p-1.5">
          {tabs.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <div key={tab} className="relative">
                <button
                  onClick={() => fetchTabProducts(tab)}
                  className="relative z-10 px-4 py-2 text-sm font-semibold rounded-xl text-gray-700"
                >
                  {tab}
                </button>
                {isActive && (
                  <motion.div
                    layoutId="tab-underline"
                    className="absolute inset-0 bg-[#ECE0CC] rounded-xl z-0"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Responsive grid:
          - 2 columns for phones (below md breakpoint)
          - 4 fixed-width columns (220px each) for md and above
      */}
      <div className="grid grid-cols-2 md:grid-cols-[repeat(4,220px)] gap-6 justify-center">
        {productData.length > 0 ? (
          <AnimatePresence>
            {productData.map((product, index) => (
              <motion.div
                key={product.id}
                className="border border-gray-200 rounded-xl p-4 flex flex-col hover:bg-[#ECE0CC] transition-colors duration-200"
                custom={index}
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={cardAnimation}
              >
                <Link
                  href={`/product/${encodeURIComponent(product.category.toLowerCase()).replace(/%20/g, '-')}/${encodeURIComponent(product.name.toLowerCase()).replace(/%20/g, '-')}/${product.id}`}
                >
                  <div className="flex-grow flex items-center justify-center h-56">
                    <img
                      src={`${process.env.NEXT_PUBLIC_CDN_URL}/${product.image}`}
                      alt={product.alt || product.name}
                      className="max-w-full max-h-48 object-contain"
                    />
                  </div>
                  <div className="mt-4 text-center">
                    <p className="text-black font-bold text-xs uppercase tracking-wider">
                      {product.name || "STAND UP POUCH"}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        ) : (
          Array(8).fill(null).map((_, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-4 flex flex-col shadow-md"
            >
              <div className="flex-grow flex items-center justify-center h-56">
                <div className="bg-gray-200 w-36 h-40 rounded animate-pulse"></div>
              </div>
              <div className="mt-4 text-center">
                <div className="bg-gray-200 h-4 w-32 mx-auto rounded animate-pulse"></div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

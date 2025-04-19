'use client';
import React, { useEffect, useState } from 'react';
import Link from "next/link";
import { motion, AnimatePresence } from 'framer-motion';

export default function PopularProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const APIURL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${APIURL}/api/product/popular_product/data/yes`, {
          headers: {
            'Content-Type': 'application/json',
            'API-Key': apiKey,
          }
        });
        const data = await response.json();

        if (data.status === 'success') {
          const nexiblesProducts = data.data.filter(
            product => product.origin === 'Nexibles'
          );
          setProducts(nexiblesProducts);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [apiKey]);

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
    <div className="bg-white py-4 md:py-8">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl font-bold text-center text-[#333] mb-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
      {`Explore Pouch Types`}
        </motion.h2>

        <div className="grid gap-6 justify-center grid-cols-2 md:grid-cols-[repeat(4,220px)]">
          {!loading ? (
            <AnimatePresence>
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  className="border border-gray-200 rounded-xl p-4 flex flex-col hover:bg-[#ECE0CC] transition-colors duration-200"
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={cardAnimation}
                >
                  <Link href={`/product/${encodeURIComponent(product.category.toLowerCase()).replace(/%20/g, '-')}/${encodeURIComponent(product.name.toLowerCase()).replace(/%20/g, '-')}/${product.id}`}>
                    <div className="flex-grow flex items-center justify-center h-56">
                      <img
                        src={product.image ? `https://nexiblesapp.barecms.com/uploads/${product.image}` : '/placeholder.png'}
                        alt={product.name}
                        className="max-w-full max-h-48 object-contain"
                      />
                    </div>
                    <div className="mt-4 text-center min-h-[40px]">
                      <p className="text-black font-bold text-xs uppercase tracking-wider">
                        {product.name}
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
                className="border border-gray-200 rounded-xl p-4 flex flex-col"
              >
                <div className="flex-grow flex items-center justify-center h-56">
                  <div className="bg-gray-200 w-36 h-40 rounded animate-pulse"></div>
                </div>
                <div className="mt-4 text-center min-h-[40px]">
                  <div className="bg-gray-200 h-4 w-32 mx-auto rounded animate-pulse"></div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
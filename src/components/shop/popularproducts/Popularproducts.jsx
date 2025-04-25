"use client";
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Image from "next/image";

export default function PopularProducts() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const APIURL = process.env.NEXT_PUBLIC_API_URL;
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${APIURL}/api/category_master`, {
          headers: {
            "Content-Type": "application/json",
            "API-Key": apiKey,
          },
        });
        const data = await response.json();

        if (data.status === "success") {
          const nexiblesCategories = data.data.filter(
            (category) => category.origin?.toLowerCase() === "nexibles"
          );
          setCategories(nexiblesCategories);
        } else {
          console.error("Failed to fetch categories:", data.error);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [apiKey, APIURL]);

  // Animation variants
  const titleVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" },
    }),
  };

  return (
    <div ref={sectionRef} className="py-4 bg-white md:py-2">
      <div className="container px-4 mx-auto">
        <motion.h2
          className="md:text-4xl text-3xl font-bold text-center text-[#333] mb-8 mt-2"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={titleVariants}
        >
          Explore Pouch Types
        </motion.h2>

        <div className="grid grid-cols-2 gap-4 px-4 md:grid-cols-5 md:px-20">
          {!loading ? (
            <AnimatePresence>
              {categories.map((category, index) => (
                <motion.div
                  key={category.id}
                  className="relative w-32 h-32 overflow-hidden transition-all duration-300 rounded-lg hover:shadow-lg hover:-translate-y-1 sm:w-36 sm:h-36 md:w-44 md:h-44 lg:w-52 lg:h-72"
                  custom={index}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  variants={cardVariants}
                >
                  <Link href={`/category/${category.cat_url}`} passHref>
                    <div className="object-contain transition-transform duration-300 hover:scale-105">
                      <Image
                        src={
                          category.bg_Img
                            ? `${process.env.NEXT_PUBLIC_CDN_URL}/category/${category.bg_Img}`
                            : "/placeholder.png"
                        }
                        alt={category.name}
                        width={200}
                        height={192}
                        className="object-contain max-h-56"
                      />
                    </div>
                    <div className="mt-4 text-center min-h-[40px]">
                      <p className="text-xs font-bold tracking-wider text-black uppercase">
                        {category.name}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          ) : (
            Array(8)
              .fill(null)
              .map((_, index) => (
                <div
                  key={index}
                  className="flex flex-col p-4 border border-gray-200 rounded-xl"
                >
                  <div className="flex items-center justify-center flex-grow h-56">
                    <div className="h-40 bg-gray-200 rounded w-36 animate-pulse"></div>
                  </div>
                  <div className="mt-4 text-center min-h-[40px]">
                    <div className="w-32 h-4 mx-auto bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
              ))
          )}
        </div>
      </div>
    </div>
  );
}
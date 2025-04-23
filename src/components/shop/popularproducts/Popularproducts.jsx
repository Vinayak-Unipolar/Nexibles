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
  const NEXI_CDN_URL = process.env.NEXT_PUBLIC_CDNNEW_URL; // Fallback for safety

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
    <div ref={sectionRef} className="py-4 bg-white md:py-8">
      <div className="container px-4 mx-auto">
        <motion.h2
          className="md:text-4xl text-3xl font-bold text-center text-[#333] mb-8"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={titleVariants}
        >
          Explore Pouch Types
        </motion.h2>

        <div className="grid gap-6 justify-center grid-cols-2 md:grid-cols-[repeat(5,220px)]">
          {!loading ? (
            <AnimatePresence>
              {categories.map((category, index) => (
                <motion.div
                  key={category.id}
                  className="rounded-xl p-4 flex flex-col hover:bg-[#ECE0CC] transition-colors duration-200"
                  custom={index}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  variants={cardVariants}
                >
                  <Link href={`/category/${category.cat_url}`} passHref>
                    <div className="flex items-center justify-center flex-grow h-56">
                      <Image
                        src={
                          NEXI_CDN_URL && category.bg_Img
                            ? `${NEXI_CDN_URL}/category/${category.bg_Img}`
                            : "/placeholder.png"
                        }
                        alt={category.name}
                        width={200}
                        height={192}
                        className="object-contain max-w-full max-h-48"
                        onError={(e) => {
                          console.error(
                            `Failed to load image: ${NEXI_CDN_URL}/category/${category.bg_Img}`
                          );
                          e.target.src = "/placeholder.png";
                        }}
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
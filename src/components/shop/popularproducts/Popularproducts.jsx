"use client";
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Image from "next/image";
import RequestForm from "../../RequestForm";

export default function PopularProducts() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(""); // New state to track the selected category
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

  const titleVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" },
    }),
  };

  const handleOpenModal = (categoryName) => {
    setSelectedCategory(categoryName); // Set the selected category
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCategory(""); // Reset the selected category when closing the modal
  };

  return (
    <div ref={sectionRef} className="py-8 bg-white md:py-12 lg:py-16">
      <div className="container px-4 mx-auto">
        <motion.h2
          className="text-3xl font-bold text-center text-[#333] mb-8 md:mb-12 md:text-4xl"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={titleVariants}
        >
          Explore Custom Pouches
        </motion.h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
          {!loading ? (
            <AnimatePresence>
              {categories.map((category, index) => (
                <motion.div
                  key={category.id}
                  className="flex flex-col items-center"
                  custom={index}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  variants={cardVariants}
                >
                  <div className="flex flex-col items-center w-full transition-all duration-300 hover:shadow-lg rounded-lg p-4">
                    <div className="relative w-full aspect-square flex items-center justify-center overflow-hidden">
                      <Image
                        src={
                          category.bg_Img
                            ? `${process.env.NEXT_PUBLIC_CDN_URL}/category/${category.bg_Img}`
                            : "/placeholder.png"
                        }
                        alt={category.name}
                        width={300}
                        height={300}
                        className="object-contain transition-transform duration-300 hover:scale-105 max-h-full max-w-full"
                      />
                    </div>
                    <div className="mt-3 text-center w-full">
                      <p className="text-xs sm:text-sm md:text-sm font-bold tracking-wider text-black mb-2 sm:mb-3 md:mb-4">
                        {category.name}
                      </p>
                      <div className="flex justify-center space-x-2">
                        <div className="flex justify-center items-center gap-2 flex-wrap">
                          <Link
                            href={`/category/${category.cat_url}`}
                            className="px-4 py-1.5 text-xs font-medium rounded border border-black hover:bg-gray-100 text-black transition duration-300 whitespace-nowrap"
                          >
                            Details
                          </Link>
                          <button
                            onClick={() => handleOpenModal(category.name)}
                            className="px-4 py-1.5 text-xs font-medium rounded border border-black bg-[#ffd13e] hover:bg-yellow-500 text-black transition duration-300 whitespace-nowrap"
                          >
                            Get Quote
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          ) : (
            Array(6)
              .fill(null)
              .map((_, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center p-6 border border-gray-200 rounded-lg"
                >
                  <div className="relative w-full aspect-square flex items-center justify-center">
                    <div className="w-3/4 h-3/4 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                  <div className="mt-3 text-center w-full">
                    <div className="w-3/4 h-4 mx-auto bg-gray-200 rounded animate-pulse mb-4"></div>
                    <div className="flex justify-center space-x-2">
                      <div className="w-16 h-7 sm:w-20 sm:h-8 bg-white border border-black rounded animate-pulse"></div>
                      <div className="w-16 h-7 sm:w-20 sm:h-8 bg-[#ffd13e] border border-black rounded animate-pulse"></div>
                    </div>
                  </div>
                </div>
              ))
          )}
        </div>
      </div>
      <RequestForm
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        initialCategory={selectedCategory} // Pass the selected category to the form
      />
    </div>
  );
}
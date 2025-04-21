"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

const Industries = () => {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );
  const [industries, setIndustries] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const APIURL = process.env.NEXT_PUBLIC_API_URL;
  const CDN_URL = process.env.NEXT_PUBLIC_CDN_URL;
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.5,
    margin: "0px 0px -100px 0px", // Delay until section is closer to viewport center
  });

  // Fetch industries data
  useEffect(() => {
    const fetchIndustries = async () => {
      try {
        const res = await fetch(`${APIURL}/api/industries`);
        const data = await res.json();
        if (Array.isArray(data)) setIndustries(data);
      } catch (err) {
        console.error("Failed to fetch industries", err);
      }
    };
    fetchIndustries();
  }, [APIURL]);

  // Update window width on resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 768;
  const desktopCardWidth = 340;
  const desktopGap = 32;
  const mobileCardWidth = 200;
  const mobileGap = 16;

  const cardWidth = isMobile ? mobileCardWidth : desktopCardWidth;
  const gap = isMobile ? mobileGap : desktopGap;
  const visibleCount = 4;
  const viewportWidth = cardWidth * visibleCount + gap * (visibleCount - 1);

  // Auto-slide every 3 seconds, but only when in view
  useEffect(() => {
    if (industries.length === 0 || !isInView) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % industries.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [industries, isInView]);

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? industries.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % industries.length);
  };

  // Create a circular array for continuous scrolling
  const getCircularArray = () => {
    if (industries.length === 0) return [...industries];
    const displayItems = [...industries];
    for (let i = 0; i < visibleCount + 1; i++) {
      displayItems.push(industries[i % industries.length]);
    }
    return displayItems;
  };

  const circularItems = getCircularArray();

  // Framer Motion variants for animations
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

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4, delay: 0.6, ease: "easeOut" } },
  };

  return (
    <div ref={sectionRef} className="bg-white py-8 px-4 sm:px-6 lg:px-8 mt-[-16vh] md:mt-0">
      <motion.div
        className="mx-auto text-center mt-4 pb font-bold text-3xl md:text-4xl text-gray-800"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={titleVariants}
      >
        Explore Industries
      </motion.div>
      <div
        className="relative overflow-hidden mt-6 md:mt-12 mx-auto"
        style={{ width: `${viewportWidth}px`, maxWidth: "100%" }}
      >
        <motion.div
          className="flex"
          style={{ gap: `${gap}px` }}
          animate={isInView ? { x: -(cardWidth + gap) * currentIndex } : { x: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        >
          {circularItems.map((category, index) => (
            <motion.div
              key={`${category.name}-${index}`}
              style={{ flex: "0 0 auto", width: `${cardWidth}px` }}
              custom={index}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={cardVariants}
            >
              <Link
                href={`/industries/${category.name
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
                className="bg-white p-2 pb-4 border border-gray-200 rounded-xl overflow-hidden"
              >
                <div className="relative h-48 md:h-[400px] w-full flex items-center justify-center">
                  <Image
                    src={`${CDN_URL || ""}/${category.image}`}
                    width={400}
                    height={400}
                    alt={`Image for ${category.name}`}
                    quality={100}
                    className="w-full h-full object-contain pt-2"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                </div>
                <div className="flex flex-col items-center justify-center text-center mt-2">
                  <div
                    className="w-full px-2 py-1 sm:px-3 sm:py-2 bg-white rounded-lg text-gray-900 font-semibold text-xs md:text-lg text-center truncate hover:bg-black hover:text-white transition-all duration-300"
                  >
                    {category.name}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
        {/* Prev Button */}
        <motion.button
          onClick={handlePrev}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-md transition-all -ml-3"
          aria-label="Previous"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={buttonVariants}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </motion.button>
        {/* Next Button */}
        <motion.button
          onClick={handleNext}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-md transition-all -mr-3"
          aria-label="Next"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={buttonVariants}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </motion.button>
      </div>
    </div>
  );
};

export default Industries;

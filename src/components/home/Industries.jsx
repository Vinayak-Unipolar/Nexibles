"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useAnimationControls } from "framer-motion";

const Industries = () => {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );
  const [industries, setIndustries] = useState([]);
  const [currentPosition, setCurrentPosition] = useState(0);
  const APIURL = process.env.NEXT_PUBLIC_API_URL;
  const CDN_URL = process.env.NEXT_PUBLIC_CDN_URL;
  const controls = useAnimationControls();
  const scrollContainerRef = useRef(null);

  // Fetch industries from API
  useEffect(() => {
    const fetchIndustries = async () => {
      try {
        const res = await fetch(`${APIURL}/api/industries`);
        const data = await res.json();
        if (Array.isArray(data)) {
          setIndustries(data);
        }
      } catch (err) {
        console.error("Failed to fetch industries", err);
      }
    };

    fetchIndustries();
  }, [APIURL]);

  // Handle screen resize
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
  const viewportWidth = cardWidth * 4 + gap * 3;

  // Calculate marquee properties
  const n = industries.length || 1;
  const copyWidth = n * cardWidth + (n - 1) * gap;
  const speed = 150;
  const duration = copyWidth / speed;

  // Start the continuous marquee animation
  const startMarqueeAnimation = () => {
    const remainingDistance = -copyWidth - currentPosition;
    const remainingDuration = (remainingDistance / -copyWidth) * duration;
    
    controls.start({
      x: [currentPosition, -copyWidth],
      transition: {
        ease: "linear",
        duration: remainingDuration > 0 ? remainingDuration : duration,
        repeat: Infinity,
      },
    });
  };

  // Start animation when industries are loaded or position changes
  useEffect(() => {
    if (industries.length > 0) {
      startMarqueeAnimation();
    }
  }, [industries, currentPosition]);

  // Duplicate items for seamless marquee
  const marqueeItems = [...industries, ...industries];

  // Handle scroll left (previous button)
  const handlePrev = () => {
    let newPosition = currentPosition + (cardWidth + gap);
    if (newPosition > 0) {
      newPosition = -copyWidth;
    }

    setCurrentPosition(newPosition);
    controls.stop();
    controls.start({
      x: newPosition,
      transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
    }).then(() => {
      startMarqueeAnimation();
    });
  };

  // Handle scroll right (next button)
  const handleNext = () => {
    let newPosition = currentPosition - (cardWidth + gap);
    if (newPosition < -copyWidth) {
      newPosition = 0;
    }

    setCurrentPosition(newPosition);
    controls.stop();
    controls.start({
      x: newPosition,
      transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
    }).then(() => {
      startMarqueeAnimation();
    });
  };

  return (
    <div className="bg-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto text-center mt-4 pb font-bold text-4xl text-gray-800 relative">
        For Every Industry
        <div
          className="relative overflow-hidden mt-6 md:mt-12 mx-auto"
          style={{ width: `${viewportWidth}px`, maxWidth: "100%" }}
        >
          <motion.div
            ref={scrollContainerRef}
            className="flex"
            style={{ gap: `${gap}px` }}
            initial={{ x: 0 }}
            animate={controls}
          >
            {marqueeItems.map((category, index) => (
              <Link
                href={`/blog/${category.name
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
                key={index}
                style={{ flex: "0 0 auto", width: `${cardWidth}px` }}
                className="bg-white p-2 pb-4 border border-gray-200 transition-shadow duration-300 rounded-xl overflow-hidden"
              >
                <div>
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
                      className="
                        w-full
                        px-2
                        py-1
                        sm:px-3
                        sm:py-2
                        bg-white
                        rounded-lg
                        text-gray-900
                        font-semibold
                        text-xs
                        md:text-lg
                        text-center
                        truncate
                        hover:bg-black
                        hover:text-white
                        transition-all
                        duration-300
                      "
                    >
                      {category.name}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </motion.div>

          {/* Previous arrow */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top UPPERCASE-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-md transition-all -ml-3"
            aria-label="Previous items"
          >
            <div className="w-6 h-6 flex items-center justify-center">
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
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </div>
          </button>

          {/* Next arrow */}
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-md transition-all -mr-3"
            aria-label="Next items"
          >
            <div className="w-6 h-6 flex items-center justify-center">
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
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Industries;
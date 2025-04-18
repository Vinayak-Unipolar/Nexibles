"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useAnimationControls } from "framer-motion";

const Industries = () => {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );
  const [industries, setIndustries] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const APIURL = process.env.NEXT_PUBLIC_API_URL;
  const CDN_URL = process.env.NEXT_PUBLIC_CDN_URL;
  const controls = useAnimationControls();

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
  }, []);

  // Handle screen resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Start animation when industries are loaded
  useEffect(() => {
    if (industries.length > 0) {
      controls.start({
        x: -copyWidth,
        transition: {
          ease: "linear",
          duration: duration,
          repeat: Infinity,
        },
      });
    }
  }, [industries, controls]);

  // Handle hover to pause/resume animation
  useEffect(() => {
    if (isHovered) {
      controls.stop();
    } else {
      controls.start({
        x: -copyWidth,
        transition: {
          ease: "linear",
          duration: duration,
          repeat: Infinity,
        },
      });
    }
  }, [isHovered, controls]);

  const isMobile = windowWidth < 768;
  const desktopCardWidth = 340;
  const desktopGap = 32;
  const mobileCardWidth = 200;
  const mobileGap = 16;

  const cardWidth = isMobile ? mobileCardWidth : desktopCardWidth;
  const gap = isMobile ? mobileGap : desktopGap;
  const viewportWidth = cardWidth * 4 + gap * 3;
  const n = industries.length;
  const copyWidth = n * cardWidth + (n - 1) * gap;
  const speed = 150;
  const duration = copyWidth / speed;
  const marqueeItems = [...industries, ...industries];

  return (
    <div className="bg-white py-8 px-4 sm:px-6 lg:px-8">
      <div
        className="mx-auto text-center mt-4 pb font-bold text-4xl text-gray-800 relative overflow-hidden"
        style={{ width: `${viewportWidth}px`, maxWidth: "100%" }}
      >
        For Every Industry
        <motion.div
          className="flex md:mt-12 mt-6"
          style={{ gap: `${gap}px` }}
          initial={{ x: 0 }}
          animate={controls}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
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
                    src={`${process.env.NEXT_PUBLIC_CDN_URL || ""}/${category.image}`}
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
      </div>
    </div>
  );
};

export default Industries;
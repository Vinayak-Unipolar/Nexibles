import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const Productcategory = ({ categoryData }) => {
  // Track window width to determine mobile vs desktop
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Define breakpoints and dimensions
  const isMobile = windowWidth < 768;
  const desktopCardWidth = 340;
  const desktopGap = 32;
  const mobileCardWidth = 200;
  const mobileGap = 16;

  // Use different dimensions based on viewport
  const cardWidth = isMobile ? mobileCardWidth : desktopCardWidth;
  const gap = isMobile ? mobileGap : desktopGap;

  // Calculate how wide the container would be at 100% zoom
  const viewportWidth = cardWidth * 4 + gap * 3;

  // Calculate total width for one copy of the items
  const n = categoryData.length;
  const copyWidth = n * cardWidth + (n - 1) * gap;

  // Marquee scroll speed (pixels/second) and duration of one full cycle
  const speed = 100;
  const duration = copyWidth / speed;

  // Duplicate items for a seamless loop
  const marqueeItems = [...categoryData, ...categoryData];

  return (
    <div className="px-4 py-8 bg-white sm:px-6 lg:px-8">
      {/*
        Container:
        - Uses a fixed width (viewportWidth) at 100% zoom,
        - maxWidth: 100% so it shrinks if the screen is smaller,
        - overflow-hidden hides any horizontal scrolling.
      */}
      <div
        className="relative mx-auto mt-4 overflow-hidden text-4xl font-bold text-center text-gray-800"
        style={{
          width: `${viewportWidth}px`,
          maxWidth: "100%",
        }}
      >
        For Every Industry
        <motion.div
          className="flex md:mt-12"
          style={{ gap: `${gap}px` }}
          initial={{ x: 0 }}
          animate={{ x: -copyWidth }}
          transition={{
            ease: "linear",
            duration: duration,
            repeat: Infinity,
          }}
        >
          {marqueeItems.map((category, index) => (
            <div
              key={index}
              style={{
                flex: "0 0 auto",
                width: `${cardWidth}px`,
              }}
              className="
                bg-[#ECE0CC]
                shadow-lg
                p-2
                pb-4
                border
                hover:shadow-md
                transition-shadow
                duration-300
                rounded-xl
                overflow-hidden
              "
            >
              <Link href={`/category/${category.cat_url}`} passHref>
                <div>
                  <div className="relative h-48 md:h-[400px] lg:h-[400px] w-full flex items-center justify-center">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_CDN_URL}/category/${category.bg_Img}`}
                      width={400}
                      height={400}
                      alt={`Image for ${category.name}`}
                      quality={100}
                      className="object-contain w-full h-full rounded-t-lg"
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                  </div>
                  <div className="flex flex-col items-center justify-center mt-2 text-center">
                    <div
                      className="w-full px-2 py-1 text-xs font-semibold text-center text-gray-900 truncate transition-all duration-300 bg-white border border-gray-200 rounded-lg  sm:px-3 sm:py-2 sm:text-sm hover:bg-black hover:text-white"
                    >
                      {category.name}
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Productcategory;

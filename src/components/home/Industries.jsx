"use client";
import React, { useState, useEffect, useMemo, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"; // Fixed the import path
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

const Industries = () => {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );
  const [industries, setIndustries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sliderRef, setSliderRef] = useState(null);
  const APIURL = process.env.NEXT_PUBLIC_API_URL;
  const CDN_URL = process.env.NEXT_PUBLIC_CDN_URL;
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.5,
    margin: "0px 0px -100px 0px",
  });

  useEffect(() => {
    const fetchIndustries = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${APIURL}/api/industries`);
        if (!res.ok) throw new Error("Failed to fetch industries");
        const data = await res.json();
        if (Array.isArray(data)) setIndustries(data);
        else throw new Error("Invalid data format");
      } catch (err) {
        console.error("Failed to fetch industries", err);
        setError("Failed to load industries. Please try again later.");
      } finally {
        setLoading(false);
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
  const visibleCount = isMobile ? 2 : 4;

  // Create a circular array for continuous scrolling
  const circularItems = useMemo(() => {
    if (industries.length === 0)
      return Array(visibleCount).fill({ name: "Loading...", image: "/placeholder.png" });
    const displayItems = [...industries];
    const minItems = Math.max(industries.length, visibleCount + 1);
    for (let i = 0; i < minItems; i++) {
      displayItems.push(industries[i % industries.length]);
    }
    return displayItems;
  }, [industries, visibleCount]);

  // Custom arrow components
  const NextArrow = ({ onClick }) => (
    <motion.button
      onClick={onClick}
      className="absolute right-0 z-10 p-2 -mr-3 transition-all transform -translate-y-1/2 bg-white rounded-full shadow-md top-1/2 bg-opacity-80 hover:bg-opacity-100"
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
  );

  const PrevArrow = ({ onClick }) => (
    <motion.button
      onClick={onClick}
      className="absolute left-0 z-10 p-2 -ml-3 transition-all transform -translate-y-1/2 bg-white rounded-full shadow-md top-1/2 bg-opacity-80 hover:bg-opacity-100"
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
  );

  // Slider settings
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 700,
    slidesToShow: visibleCount,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    draggable: true,
    swipeToSlide: true,
    cssEase: "ease-in-out",
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          centerMode: false,
        },
      },
    ],
  };

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
    <div ref={sectionRef} className="bg-white py-8 px-4 max-w-[1400px] mx-auto sm:px-6 lg:px-8 mt-[-16vh] md:mt-0">
      {loading && <div className="py-4 text-center">Loading industries...</div>}
      {error && <div className="py-4 text-center text-red-500">{error}</div>}
      {!loading && !error && (
        <>
          <motion.div
            className="mx-auto mt-4 md:text-3xl text-2xl font-bold text-center text-gray-800"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={titleVariants}
          >
            Explore Industries
          </motion.div>
          <div className="relative mx-auto mt-6 md:mt-6" style={{ maxWidth: "100%" }}>
            <Slider ref={setSliderRef} {...sliderSettings}>
              {circularItems.map((category, index) => (
                <motion.div
                  key={`${category.name}-${index}`}
                  style={{ width: `${cardWidth}px`, padding: `0 ${gap / 2}px` }}
                  custom={index}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  variants={cardVariants}
                >
                  <Link
                    href={`/industries/${category.name
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                    className="p-1 pb-1 rounded-xl"
                  >
                    <div className="relative h-48 md:h-[400px] w-full flex items-center justify-center">
                      <Image
                        src={`${CDN_URL}/industries/${category.image}`}
                        width={400}
                        height={400}
                        alt={`Image for ${category.name}`}
                        quality={100}
                        className="object-contain w-full h-full pt-2"
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />
                    </div>
                    <div className="flex flex-col items-center justify-center mt-2 mx-[22px] text-center">
                      <div className="w-full px-2 py-1 text-xs font-semibold text-center text-gray-900 truncate transition-all duration-300 hover:bg-[#ffd13e] rounded-lg sm:px-3 sm:py-2 md:text-lg ">
                        {category.name}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </Slider>
          </div>
        </>
      )}
    </div>
  );
};

export default Industries;
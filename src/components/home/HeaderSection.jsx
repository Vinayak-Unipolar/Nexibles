"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const getMediaType = (fileName) => {
  const extension = fileName?.split(".").pop().toLowerCase();
  if (["mp4", "webm", "ogg"].includes(extension)) return "video";
  if (["jpg", "jpeg", "png", "gif"].includes(extension)) return "image";
  return "image";
};

const MediaComponent = ({ media, alt, isActive }) => {
  const mediaType = getMediaType(media);
  const videoRef = useRef(null);

  useEffect(() => {
    if (mediaType === "video" && videoRef.current) {
      if (isActive) {
        videoRef.current.currentTime = 0;
        videoRef.current
          .play()
          .catch((err) => console.warn("Error playing video:", err));
      } else {
        videoRef.current.pause();
      }
    }
  }, [isActive, mediaType]);

  if (mediaType === "video") {
    return (
      <video
        ref={videoRef}
        src={media}
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
      />
    );
  }

  return (
    <Image
      src={media}
      alt={alt}
      fill
      style={{ objectFit: "cover" }}
      className="transition-opacity"
    />
  );
};

const HeaderSection = () => {
  const [slides, setSlides] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for next, -1 for prev
  const BASE_IMAGE_URL = process.env.NEXT_PUBLIC_CDN_URL;
  const timerRef = useRef(null);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/banner`
        );
        const data = await response.json();

        const transformed = data.map((item) => ({
          bgMedia: `${BASE_IMAGE_URL}/${item.image}`,
          link: item.link || "/shop",
          title: item.title,
        }));
        setSlides(transformed);
      } catch (err) {
        console.error("Failed to fetch slides", err);
      }
    };
    fetchBanners();
  }, [BASE_IMAGE_URL]);

  useEffect(() => {
    if (slides.length > 0) {
      timerRef.current = setInterval(() => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % slides.length);
      }, 5000);
    }
    return () => clearInterval(timerRef.current);
  }, [slides]);

  const swipeVariants = {
    enter: (direction) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
      position: "absolute",
    }),
    center: {
      x: 0,
      opacity: 1,
      position: "relative",
    },
    exit: (direction) => ({
      x: direction > 0 ? "-100%" : "100%",
      opacity: 0,
      position: "absolute",
    }),
  };

  const handlePrev = () => {
    clearInterval(timerRef.current);
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    
    // Restart auto-slide timer
    timerRef.current = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
  };

  const handleNext = () => {
    clearInterval(timerRef.current);
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % slides.length);
    
    // Restart auto-slide timer
    timerRef.current = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
  };

  return (
    <div className="relative w-full h-[50vh] md:h-[84vh] overflow-hidden">
      <AnimatePresence initial={false} custom={direction}>
        {slides.length > 0 && (
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={swipeVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.3 },
            }}
            className="w-full h-full"
          >
            <Link href={slides[currentIndex].link}>
              <div className="relative w-full h-full">
                <MediaComponent
                  media={slides[currentIndex].bgMedia}
                  alt={`Slide ${currentIndex + 1}`}
                  isActive={true}
                />
              </div>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Previous arrow */}
      <button 
        onClick={handlePrev}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-30 hover:bg-opacity-50 rounded-full p-2 shadow-md transition-all"
        aria-label="Previous slide"
      >
        <div className="w-6 h-6 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </div>
      </button>
      
      {/* Next arrow */}
      <button 
        onClick={handleNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-30 hover:bg-opacity-50 rounded-full p-2 shadow-md transition-all"
        aria-label="Next slide"
      >
        <div className="w-6 h-6 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </div>
      </button>
    </div>
  );
};

export default HeaderSection;
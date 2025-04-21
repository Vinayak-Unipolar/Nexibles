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

const MediaComponent = ({ media, alt, isActive, onVideoEnd }) => {
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

  useEffect(() => {
    if (mediaType === "video" && videoRef.current) {
      const video = videoRef.current;
      const handleEnded = () => {
        if (isActive && onVideoEnd) {
          onVideoEnd();
        }
      };
      video.addEventListener("ended", handleEnded);
      return () => video.removeEventListener("ended", handleEnded);
    }
  }, [mediaType, isActive, onVideoEnd]);

  if (mediaType === "video") {
    return (
      <video
        ref={videoRef}
        src={media}
        autoPlay
        loop={false} // Disable loop to allow 'ended' event
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
      className="w-full h-full"
    />
  );
};

const HeaderSection = () => {
  const [slides, setSlides] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
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

  const startTimer = () => {
    clearInterval(timerRef.current);
    const currentSlide = slides[currentIndex];
    const mediaType = getMediaType(currentSlide?.bgMedia);
    if (mediaType === "image") {
      timerRef.current = setInterval(() => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % slides.length);
      }, 5000);
    }
  };

  useEffect(() => {
    if (!slides.length) return;
    startTimer();
    return () => clearInterval(timerRef.current);
  }, [slides, currentIndex]);

  const handleVideoEnd = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const slideVariants = {
    enter: (dir) => ({ x: dir > 0 ? "100%" : "-100%" }),
    center: { x: "0%" },
    exit: (dir) => ({ x: dir > 0 ? "-100%" : "100%" }),
  };

  const handlePrev = () => {
    clearInterval(timerRef.current);
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    clearInterval(timerRef.current);
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  // Custom CSS for hollow/outlined text effect with thinner border and slight italic
  const outlineTextStyle = {
    color: "transparent",
    WebkitTextStroke: "0.5px white",
    textStroke: "0.5px white",
    fontStyle: "italic",
    letterSpacing: "0.05em",
  };

  return (
    <div className="relative w-full h-[50vh] md:h-[84vh] overflow-hidden">
      <AnimatePresence initial={false} custom={direction}>
        {slides.map(
          (slide, index) =>
            index === currentIndex && (
              <motion.div
                key={index}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "tween", ease: "easeInOut", duration: 0.5 },
                }}
                className="absolute inset-0 w-full h-full"
              >
                <Link href="/all-category">
                  <div className="relative w-full h-full">
                    <MediaComponent
                      media={slide.bgMedia}
                      alt={slide.title}
                      isActive={true}
                      onVideoEnd={handleVideoEnd}
                    />

                    {/* Text Overlay - Only shown on the first slide */}
                    {index === 0 && (
                      <div className="absolute inset-0 flex flex-col justify-center items-center text-white z-10 pointer-events-none mt-20">
                        <h2
                          className="text-5xl md:text-[6vw] font-bold tracking-wider text-center mb-4 md:mb-6"
                          style={outlineTextStyle}
                        >
                          ENDLESS POUCHES
                        </h2>
                        <h1 className="text-6xl md:text-[8vw]  tracking-wider text-center font-[1000] italic">
                          ENDLESS POSSIBILITIES
                        </h1>
                        <div className="mt-8 pointer-events-auto">
                          <a
                            href="/shop"
                            className="bg-[#ffd13e] hover:bg-yellow-500 text-white font-extrabold py-3 px-8 rounded-full text-lg transition-colors"
                          >
                            Explore Pouches
                          </a>
                        </div>
                      </div>
                    )}
                    {index === 1 && (
                      <div className="absolute inset-0 flex flex-col top-[52%] left-[52%] text-white z-10 pointer-events-none mt-20">
                        <div className="mt-8 pointer-events-auto">
                          <a
                            href="/all-category"
                            className="bg-[#ffd13e] hover:bg-yellow-500 text-white font-extrabold py-3 px-8 rounded-full text-xl transition-colors"
                          >
                            Explore Industries
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </Link>
              </motion.div>
            )
        )}
      </AnimatePresence>

      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-30 hover:bg-opacity-50 rounded-full p-2 shadow-md transition-all"
        aria-label="Previous slide"
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
      </button>

      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-30 hover:bg-opacity-50 rounded-full p-2 shadow-md transition-all"
        aria-label="Next slide"
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
      </button>
    </div>
  );
};

export default HeaderSection;

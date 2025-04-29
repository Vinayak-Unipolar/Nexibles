"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion";

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
        loop={false}
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
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

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

  const textVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2, ease: "easeOut" } },
  };

  const arrowVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4, delay: 0.4, ease: "easeOut" } },
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

  const outlineTextStyle = {
    color: "transparent",
    WebkitTextStroke: "0.5px white",
    textStroke: "0.5px white",
    fontStyle: "italic",
    letterSpacing: "0.05em",
  };

  return (
    <div ref={sectionRef} className="relative w-full h-[50vh] md:h-[84vh] overflow-hidden">
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
                <Link href={slide.link}>
                  <div className="relative md:mt-[6vh] mt-[6vh] h-[30vh] md:w-full md:h-full">
                    <MediaComponent
                      media={slide.bgMedia}
                      alt={slide.title}
                      isActive={true}
                      onVideoEnd={handleVideoEnd}
                    />
                    {index === 0 && (
                      <motion.div
                        className="absolute inset-0 flex flex-col justify-center items-center text-white z-10 pointer-events-none md:mt-[-10vh]"
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        variants={textVariants}
                      >
                        <motion.h2
                          className="text-[5vw] md:text-[6vw] font-bold tracking-wider text-center mb-2 md:mb-0"
                          style={outlineTextStyle}
                          variants={textVariants}
                        >
                          DIGITALLY PRINTED
                        </motion.h2>
                        <motion.h1
                          className="text-[7vw] md:text-[7.6vw] tracking-wider text-center font-[1000] italic"
                          variants={textVariants}
                        >
                          ENDLESS POSSIBILITIES
                        </motion.h1>
                        <motion.div
                          className="md:mt-4 mt-4 pointer-events-auto"
                          variants={buttonVariants}
                        >
                          <a
                            href="/shop"
                            className="bg-[#ffd13e] hover:bg-yellow-500 text-black font-extrabold md:py-3 md:px-8 py-2 px-8 rounded-full md:text-xl text-sm transition-colors"
                          >
                            Explore Pouches
                          </a>
                        </motion.div>
                      </motion.div>
                    )}
                    {index === 1 && (
                      <motion.div
                        className="absolute inset-0 flex flex-col top-[26%] left-[50%] md:top-[55%] md:left-[52%] text-white z-10 pointer-events-none mt-20"
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        variants={textVariants}
                      >
                        <motion.div
                          className="mt-8 pointer-events-auto"
                          variants={buttonVariants}
                        >
                          <a
                            href="/businesses"
                            className="bg-[#ffd13e] hover:bg-yellow-500 text-black font-extrabold md:text-xl md:py-3 md:px-8 py-2 px-4 rounded-full text-xs transition-colors"
                          >
                            Explore Industries
                          </a>
                        </motion.div>
                      </motion.div>
                    )}
                  </div>
                </Link>
              </motion.div>
            )
        )}
      </AnimatePresence>

      <motion.button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-30 hover:bg-opacity-50 rounded-full p-2 shadow-md transition-all"
        aria-label="Previous slide"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={arrowVariants}
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

      <motion.button
        onClick={handleNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-30 hover:bg-opacity-50 rounded-full p-2 shadow-md transition-all"
        aria-label="Next slide"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={arrowVariants}
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
  );
};

export default HeaderSection;
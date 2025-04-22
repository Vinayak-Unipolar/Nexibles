"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

export default function NexiblesInstagramSection() {
  const [instaFeed, setInstaFeed] = useState([
    {
      image: "/insta-post1.jpg",
      link: "https://www.instagram.com/p/XXXXXXXX/",
    },
    {
      image: "/insta-post2.jpg",
      link: "https://www.instagram.com/p/XXXXXXXX/",
    },
    {
      image: "/insta-post3.jpg",
      link: "https://www.instagram.com/p/XXXXXXXX/",
    },
    {
      image: "/insta-post4.jpg",
      link: "https://www.instagram.com/p/XXXXXXXX/",
    },
  ]);

  const [brandLogos, setBrandLogos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.5,
    margin: "0px 0px -100px 0px", // Delay until section is closer to viewport center
  });

  useEffect(() => {
    async function fetchBrands() {
      try {
        setLoading(true);
        const res = await fetch("https://nexiblesapp.barecms.com/api/clients");
        if (!res.ok) throw new Error("Failed to fetch brand logos");
        const data = await res.json();
        if (Array.isArray(data)) setBrandLogos(data);
        else throw new Error("Invalid data format");
      } catch (error) {
        console.error("Failed to fetch brand logos:", error);
        setError("Failed to load brand logos. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    fetchBrands();
  }, []);

  // Framer Motion variants for animations
  const titleVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2, ease: "easeOut" } },
  };

  const feedItemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" },
    }),
  };

  const marqueeItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" },
    }),
  };

  return (
    <div ref={sectionRef} className="px-4 py-8 bg-white sm:px-6 lg:px-8">
      {loading && <div className="py-4 text-center">Loading brand logos...</div>}
      {error && <div className="py-4 text-center text-red-500">{error}</div>}
      {!loading && !error && (
        <>
          {/* Section Title & Subtitle */}
          <div className="max-w-5xl mx-auto text-center">
            <motion.h2
              className="mb-2 text-3xl font-bold sm:text-4xl"
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={titleVariants}
            >
              Nexibles On Instagram
            </motion.h2>
            <motion.p
              className="mb-8 text-gray-600"
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={subtitleVariants}
            >
              #Nexibles
            </motion.p>
          </div>

          {/* Instagram Feed */}
          <div className="grid max-w-5xl grid-cols-2 gap-4 mx-auto mb-12 md:grid-cols-4">
            {instaFeed.map((post, idx) => (
              <motion.div
                key={idx}
                className="relative overflow-hidden border border-gray-200 rounded-lg group aspect-square"
                custom={idx}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={feedItemVariants}
              >
                <Image
                  src={post.image}
                  alt="Instagram Post"
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 25vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 opacity-0 bg-black/50 group-hover:opacity-100">
                  <a
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center text-3xl text-white"
                  >
                    <svg
                      fill="currentColor"
                      viewBox="0 0 448 512"
                      className="w-12 h-12"
                    >
                      <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.6 0 63.4 51.3 114.7 114.9 114.7 63.6 0 114.9-51.3 114.9-114.7 0-63.3-51.3-114.6-114.9-114.6zm0 189.6c-41.3 0-74.9-33.3-74.9-74.3 0-41 33.6-74.3 74.9-74.3 41.3 0 74.9 33.3 74.9 74.3 0 41-33.6 74.3-74.9 74.3zm146.4-194.3c0 14.9-12 26.9-26.9 26.9-14.9 0-26.9-12-26.9-26.9 0-14.9 12-26.9 26.9-26.9 14.8.1 26.9 12.1 26.9 26.9zm76.1 27.2c-1.7-35.7-9.9-67.4-36.2-93.8-26.4-26.3-58.1-34.5-93.8-36.2-37-2.1-148-2.1-185 0-35.7 1.7-67.4 9.9-93.8 36.2-26.3 26.4-34.5 58.1-36.2 93.8-2.1 37-2.1 148 0 185 1.7 35.7 9.9 67.4 36.2 93.8 26.4 26.3 58.1 34.5 93.8 36.2 37 2.1 148 2.1 185 0 35.7-1.7 67.4-9.9 93.8-36.2 26.3-26.4 34.5-58.1 36.2-93.8 2.1-37 2.1-148 0-185zm-48.5 224c-7.8 19.6-23 35.1-42.6 42.9-29.5 11.7-99.5 9-132.4 9s-102.9 2.6-132.4-9c-19.6-7.8-34.8-23.3-42.6-42.9-11.7-29.5-9-99.5-9-132.4s-2.6-102.9 9-132.4c7.8-19.6 23-35.1 42.6-42.9 29.5-11.7 99.5-9 132.4-9s102.9-2.6 132.4 9c19.6 7.8 34.8 23.3 42.6 42.9 11.7 29.5 9 99.5 9 132.4s2.7 102.9-9 132.4z" />
                    </svg>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Marquee Brand Logos */}
          <div className="relative max-w-5xl mx-auto overflow-hidden">
            <motion.div
              className="flex items-center space-x-8"
              animate={isInView ? { x: ["0%", "-100%"] } : { x: "0%" }}
              transition={{
                repeat: Infinity,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
              }}
            >
              {brandLogos.map((brand, idx) => (
                <motion.div
                  key={brand.id}
                  className="flex items-center justify-center flex-shrink-0 w-24 h-24"
                  custom={idx}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  variants={marqueeItemVariants}
                >
                  <Image
                    src={`${process.env.NEXT_PUBLIC_CDN_URL}/clients/${brand.image}` || "/placeholder.png"}
                    alt={`Brand ${brand.id}`}
                    width={80}
                    height={80}
                    className="object-contain"
                    onError={(e) => {
                      e.target.src = "/placeholder.png";
                    }}
                  />
                </motion.div>
              ))}

              {/* Duplicate logos for seamless scroll */}
              {brandLogos.map((brand, idx) => (
                <motion.div
                  key={`dup-${brand.id || idx}`}
                  className="flex items-center justify-center flex-shrink-0 w-24 h-24"
                  custom={idx + brandLogos.length}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  variants={marqueeItemVariants}
                >
                  <Image
                    src={`${process.env.NEXT_PUBLIC_CDN_URL}/clients/${brand.image}` || "/placeholder.png"}
                    alt={`Brand ${brand.id}`}
                    width={80}
                    height={80}
                    className="object-contain"
                    onError={(e) => {
                      e.target.src = "/placeholder.png";
                    }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </>
      )}
    </div>
  );
}

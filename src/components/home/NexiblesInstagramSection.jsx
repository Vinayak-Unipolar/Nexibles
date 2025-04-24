"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function NexiblesInstagramSection() {
  const [instaFeed] = useState([
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
  const NEXI_CDN_URL = process.env.NEXT_PUBLIC_CDN_URL; // Fallback for safety

  useEffect(() => {
    async function fetchBrands() {
      try {
        const res = await fetch("https://nexiblesapp.barecms.com/api/clients");
        const data = await res.json();
        if (Array.isArray(data)) {
          setBrandLogos(data);
        }
      } catch (error) {
        console.error("Failed to fetch brand logos:", error);
      }
    }

    fetchBrands();
  }, []);

  return (
    <div className="bg-white py-8 px-4 sm:px-6 lg:px-8">
      {/* Section Title */}
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-2">
          Nexibles On Instagram
        </h2>
        <p className="text-gray-600 mb-8">#Nexibles</p>
      </div>

      {/* Instagram Feed */}
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {instaFeed.map((post, idx) => (
          <div
            key={idx}
            className="relative overflow-hidden rounded-lg group aspect-square border border-gray-200"
          >
            <Image
              src={post.image}
              alt="Instagram Post"
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 25vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <a
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white text-3xl"
              >
                <svg
                  fill="currentColor"
                  viewBox="0 0 448 512"
                  className="w-12 h-12"
                >
                  <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.6 ... (svg trimmed)" />
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Infinite Marquee */}
      <div className="relative overflow-hidden w-full pt-8">
        <motion.div
          className="flex space-x-8 w-max"
          animate={{ x: ["0%", "-30%"] }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 30,
            ease: "linear",
          }}
        >
          {[...brandLogos, ...brandLogos].map((brand, idx) => (
            <div
              key={`${brand.id}-${idx}`}
              className="w-24 h-24 flex-shrink-0 flex items-center justify-center"
            >
              <Image
                src={
                  NEXI_CDN_URL && brand.image
                    ? `${NEXI_CDN_URL}/clients/${brand.image}`
                    : "/placeholder.png"
                }
                alt={`Brand ${brand.id}`}
                width={80}
                height={80}
                className="object-contain"
                onError={(e) => {
                  console.error(
                    `Failed to load image: ${NEXI_CDN_URL}/clients/${brand.image}`
                  );
                  e.target.src = "/placeholder.png";
                }}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

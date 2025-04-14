"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function NexiblesInstagramSection() {
  // Example placeholders for an Instagram feed
  // Replace these with real images or dynamic data
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

  // Example brand logos for the marquee
  // Replace with your brand logos as needed
  const brandLogos = [
    { src: "/brand1.png", alt: "Brand 1" },
    { src: "/brand2.png", alt: "Brand 2" },
    { src: "/brand3.png", alt: "Brand 3" },
    { src: "/brand4.png", alt: "Brand 4" },
    { src: "/brand5.png", alt: "Brand 5" },
  ];

  /**
   * If you want to fetch your own Instagram feed dynamically,
   * you could do that in a useEffect here, once you have an access token.
   *
   * Example (pseudo-code):
   *
   * useEffect(() => {
   *   async function fetchInstagram() {
   *     const res = await fetch("/api/instagram-feed");
   *     const data = await res.json();
   *     setInstaFeed(data.posts); // or however your data is shaped
   *   }
   *   fetchInstagram();
   * }, []);
   */

  return (
    <div className="bg-white py-8 px-4 sm:px-6 lg:px-8">
      {/* Section Title & Subtitle */}
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-2">Nexibles On Instagram</h2>
        <p className="text-gray-600 mb-8">#Nexibles</p>
      </div>

      {/* Instagram Feed (4 items in a grid on desktop, fewer on smaller screens) */}
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {instaFeed.map((post, idx) => (
          <div
            key={idx}
            className="
              relative
              overflow-hidden
              rounded-lg
              group
              aspect-square
              border
              border-gray-200
            "
          >
            {/* Instagram Post Image */}
            <Image
              src={post.image}
              alt="Instagram Post"
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 25vw"
              className="object-cover"
            />

            {/* Hover Overlay with Insta Icon */}
            <div
              className="
                absolute inset-0
                bg-black/50
                flex items-center justify-center
                opacity-0
                group-hover:opacity-100
                transition-opacity
                duration-300
              "
            >
              {/* Link to the actual Instagram post or reel */}
              <a
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white text-3xl flex items-center justify-center"
              >
                {/* Instagram SVG Icon */}
                <svg
                  fill="currentColor"
                  viewBox="0 0 448 512"
                  className="w-12 h-12"
                >
                  <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.6 
                    0 63.4 51.3 114.7 114.9 114.7 
                    63.6 0 114.9-51.3 114.9-114.7 
                    0-63.3-51.3-114.6-114.9-114.6zm0 
                    189.6c-41.3 0-74.9-33.3-74.9-74.3 
                    0-41 33.6-74.3 74.9-74.3 
                    41.3 0 74.9 33.3 74.9 74.3 
                    0 41-33.6 74.3-74.9 74.3zm146.4-194.3
                    c0 14.9-12 26.9-26.9 26.9
                    -14.9 0-26.9-12-26.9-26.9
                    0-14.9 12-26.9 26.9-26.9
                    14.8.1 26.9 12.1 26.9 26.9zm76.1 27.2
                    c-1.7-35.7-9.9-67.4-36.2-93.8
                    -26.4-26.3-58.1-34.5-93.8-36.2
                    -37-2.1-148-2.1-185 0
                    -35.7 1.7-67.4 9.9-93.8 36.2
                    -26.3 26.4-34.5 58.1-36.2 93.8
                    -2.1 37-2.1 148 0 185
                    1.7 35.7 9.9 67.4 36.2 93.8
                    26.4 26.3 58.1 34.5 93.8 36.2
                    37 2.1 148 2.1 185 0
                    35.7-1.7 67.4-9.9 93.8-36.2
                    26.3-26.4 34.5-58.1 36.2-93.8
                    2.1-37 2.1-148 0-185zm-48.5 224
                    c-7.8 19.6-23 35.1-42.6 42.9
                    -29.5 11.7-99.5 9-132.4 9
                    s-102.9 2.6-132.4-9
                    c-19.6-7.8-34.8-23.3-42.6-42.9
                    -11.7-29.5-9-99.5-9-132.4
                    s-2.6-102.9 9-132.4
                    c7.8-19.6 23-35.1 42.6-42.9
                    29.5-11.7 99.5-9 132.4-9
                    s102.9-2.6 132.4 9
                    c19.6 7.8 34.8 23.3 42.6 42.9
                    11.7 29.5 9 99.5 9 132.4
                    s2.7 102.9-9 132.4z"/>
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Marquee of brand logos */}
      <div className="max-w-5xl mx-auto relative overflow-hidden">
        <motion.div
          className="flex items-center space-x-8"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 10,
            ease: "linear",
          }}
        >
          {brandLogos.map((brand, idx) => (
            <div
              key={idx}
              className="w-24 h-24 flex-shrink-0 flex items-center justify-center"
            >
              <Image
                src={brand.src}
                alt={brand.alt}
                width={80}
                height={80}
                className="object-contain"
              />
            </div>
          ))}

          {/* Duplicate logos for seamless looping */}
          {brandLogos.map((brand, idx) => (
            <div
              key={`dup-${idx}`}
              className="w-24 h-24 flex-shrink-0 flex items-center justify-center"
            >
              <Image
                src={brand.src}
                alt={brand.alt}
                width={80}
                height={80}
                className="object-contain"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

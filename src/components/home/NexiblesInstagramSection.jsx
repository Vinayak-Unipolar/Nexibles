"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Instagram } from "lucide-react";
import insta01 from "../../../public/insta/insta01.png";
import insta02 from "../../../public/insta/insta02.png";
import insta03 from "../../../public/insta/insta03.png";
export default function NexiblesInstagramSection() {
  const [instaFeed] = useState([
    {
      image: insta01, // Use imported image object
      link: "https://www.instagram.com/p/DIoW4DAhBKE/",
    },
    {
      image: insta02, // Use imported image object
      link: "https://www.instagram.com/p/DIly2SjRiNh/",
    },
    {
      image: insta03, // Use imported image object
      link: "https://www.instagram.com/p/DIjapyIIxLs/?img_index=1",
    },
  ]);

  const [brandLogos, setBrandLogos] = useState([]);
  const NEXI_CDN_URL = process.env.NEXT_PUBLIC_CDN_URL;

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
    <div className="px-4 py-8 bg-white sm:px-6 lg:px-8">
      {/* Section Title */}
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="mb-2 text-3xl font-bold sm:text-4xl">
          Nexibles On Instagram
        </h2>
        <p className="mb-8 text-gray-600">#Nexibles</p>
      </div>

      {/* Instagram Feed - Changed to grid-cols-3 for all screen sizes */}
      <div className="max-w-3xl mx-auto grid grid-cols-3 mb-12">
        {instaFeed.map((post, idx) => (
          <a
            key={idx}
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            className="relative block overflow-hidden group aspect-square"
          >
            <Image
              src={post.image}
              alt="Instagram Post"
              fill
              sizes="(max-width: 768px) 33vw, 33vw"
              className="object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 opacity-0 bg-black/50 group-hover:opacity-100">
              <Instagram size={24} className="w-6 h-6 text-white sm:w-12 sm:h-12" />
            </div>
          </a>
        ))}
      </div>

      {/* Infinite Marquee */}
      <div className="relative w-full pt-8 overflow-hidden">
        <motion.div
          className="flex space-x-8 w-max"
          animate={{ x: ["0%", "-15%"] }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 20,
            ease: "linear",
          }}
        >
          {[...brandLogos, ...brandLogos].map((brand, idx) => (
            <div
              key={`${brand.id}-${idx}`}
              className="flex items-center justify-center flex-shrink-0 w-16 h-16 sm:w-24 sm:h-24"
            >
              <Image
                src={
                  NEXI_CDN_URL && brand.image
                    ? `${NEXI_CDN_URL}/clients/${brand.image}`
                    : "/placeholder.png"
                }
                alt={`Brand ${brand.id}`}
                width={60}
                height={60}
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
"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function BrandLogosSection() {
  const [brandLogos, setBrandLogos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const NEXI_CDN_URL = process.env.NEXT_PUBLIC_CDN_URL;

  useEffect(() => {
    async function fetchBrands() {
      try {
        setIsLoading(true);
        const res = await fetch("https://nexiblesapp.barecms.com/api/clients", {
          headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
            Expires: "0",
          },
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();

        // Validate and clean the data
        const validLogos = Array.isArray(data)
          ? data.filter(
              (logo) =>
                logo &&
                logo.id &&
                logo.image &&
                typeof logo.image === "string"
            )
          : [];

        setBrandLogos(validLogos);
      } catch (error) {
        console.error("Failed to fetch brand logos:", error);
        setBrandLogos([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchBrands();
  }, []);

  // Duplicate logos to create infinite scroll effect
  const duplicatedLogos = [...brandLogos];

  return (
    <div className="relative w-full pt-8 overflow-hidden">
      {isLoading ? (
        <div className="flex justify-center items-center h-24">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      ) : brandLogos.length > 0 ? (
        <motion.div
          className="flex space-x-8 w-max"
          animate={{
            x: [0, -((brandLogos.length * 110) / 2)],
          }}
          transition={{
            duration: brandLogos.length * 0.75,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
          }}
        >
          {duplicatedLogos.map((brand, idx) => (
            <div
              key={`${brand.id}-${idx}`}
              className="flex items-center justify-center flex-shrink-0 w-24 h-24"
            >
              <Image
                src={
                  NEXI_CDN_URL && brand.image
                    ? `${NEXI_CDN_URL}/clients/${brand.image}`
                    : "/placeholder.png"
                }
                alt={brand.name || `Brand ${brand.id}`}
                width={96}
                height={96}
                className="object-contain hover:scale-110 transition-transform duration-300 ease-in-out"
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
      ) : (
        <p className="text-center text-gray-500">No brand logos available</p>
      )}
    </div>
  );
}
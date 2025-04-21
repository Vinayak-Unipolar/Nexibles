"use client";
import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import ProductStock from "../../../public/home/Reference NexiClassic Banner.webp";
import Customization from "../../../public/home/Reference Customisation Banner.webp";

const ProductSections = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  // Animation variants
  const imageVariants = {
    hidden: (direction) => ({
      opacity: 0,
      x: direction === "left" ? -100 : 100,
    }),
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div ref={sectionRef} className="">
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-0 gap-2 h-[500px]">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={imageVariants}
          custom="left"
        >
          <Link
            href="/all-category"
            className="relative flex items-center justify-center text-white text-center overflow-hidden h-full"
          >
            <Image
              src={ProductStock}
              alt="Stock Products"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </Link>
        </motion.div>
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={imageVariants}
          custom="right"
        >
          <Link
            href="/configuration-tool"
            className="relative flex items-center justify-center text-white text-center overflow-hidden h-full"
          >
            <Image
              src={Customization}
              alt="Customization Tool"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductSections;
"use client";
import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import ProductStock from "../../../public/home/Reference NexiClassic Banner.webp";
import Customization from "../../../public/home/Reference Customisation Banner.webp";

const fadeSlide = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

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

const buttonVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut", delay: 0.2 } },
  hover: {
    scale: 1.05,
    transition: { duration: 0.2 }
  }
};

const ProductSections = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  
  return (
    <div ref={sectionRef} className="w-full">
      <div className="flex flex-col md:flex-row justify-center">
        {/* Stock Products Section */}
        <div className="relative overflow-hidden group w-full">
          <Link href="/all-category" className="block relative">
            <motion.div
              custom="left"
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={imageVariants}
              className="relative"
            >
              <Image
                src={ProductStock}
                alt="Stock Products"
                loading="lazy"
                className="object-contain w-full"
                quality={100}
              />
              <motion.div
                className="absolute z-10 bottom-[28%] right-[3%] md:bottom-[30%] md:right-12"
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                whileHover="hover"
                variants={buttonVariants}
              >
                <button className="bg-[#ffd13e] hover:bg-yellow-500 text-sm md:text-base py-1 px-2 md:py-2 md:px-6 rounded-full shadow-md">
                  Shop Now
                </button>
              </motion.div>
            </motion.div>
          </Link>
        </div>

        {/* Customization Tool Section */}
        <div className="relative overflow-hidden group w-full">
          <Link href="/configuration-tool" className="block relative">
            <motion.div
              custom="right"
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={imageVariants}
              className="relative"
            >
              <Image
                src={Customization}
                alt="Customization Tool"
                loading="lazy"
                className="object-contain w-full"
                quality={100}
              />
              <motion.div
                className="absolute z-10 bottom-[35%] left-[2%] md:bottom-[37%] md:left-4"
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                whileHover="hover"
                variants={buttonVariants}
              >
                <button className="bg-[#ffd13e] hover:bg-yellow-500 text-sm md:text-base py-1 px-2 md:py-2 md:px-6 rounded-full shadow-md">
                  Configure Now
                </button>
              </motion.div>
            </motion.div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductSections;
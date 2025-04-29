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
      <div className="md:flex md:flex-row justify-center md:h-full">
        {/* Stock Products Section */}
        <Link href="/all-category" className="relative overflow-hidden group">
          <motion.div
            custom="left"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={imageVariants}
          >
            <Image
              src={ProductStock}
              alt="Stock Products"
              loading="lazy"
              className="object-contain w-full h-full"
              quality={100}
            />
          </motion.div>
      
          <motion.button 
            className="absolute z-50 bg-[#ffd13e] hover:bg-yellow-500 py-0.1 px-1 md:py-1.5 md:px-6 rounded-full top-[58%] left-[76%] md:top-[60%] md:left-[75%]"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            whileHover="hover"
            variants={buttonVariants}
          >
            Shop Now
          </motion.button>
        </Link>

        {/* Customization Tool Section */}
        <Link href="/configuration-tool" className="relative overflow-hidden group">
          <motion.div
            custom="right"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={imageVariants}
          >
            <Image
              src={Customization}
              alt="Customization Tool"
              loading="lazy"
              className="object-contain w-full h-full"
              quality={100}
            />
          </motion.div>
        
          <motion.button 
            className="absolute bg-[#ffd13e] hover:bg-yellow-500 py-1 px-3 md:py-1.5 md:px-6 rounded-full top-[55%] left-[1%] md:top-[50%] md:left-[5%]"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            whileHover="hover"
            variants={buttonVariants}
          >
            Configure Now
          </motion.button>
        </Link>
      </div>
    </div>
  );
};

export default ProductSections;
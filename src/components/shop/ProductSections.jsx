"use client";
import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import ProductStock from "../../../public/home/NexiClassic Banner.webp";
import Customization from "../../../public/home/Customisation Banner.webp";

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
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeSlide}
            className="absolute inset-0 flex flex-col text-white space-y-2 bg-black bg-opacity-0 top-[52%] left-[49%] md:top-[55%] md:left-[50%] border-t-2 md:w-[10vw]"
          >
            <h2 className="pr-2 text-xl font-light md:text-4xl">EXPLORE</h2>
            <h1 className="text-2xl md:text-5xl font-bold border-b-2 md:w-[300px]">NEXICLASSIC</h1>
          </motion.div>
          <motion.button 
            className="absolute bg-[#ffd13e] hover:bg-yellow-500 py-0.5 px-3 md:py-1.5 md:px-6 rounded-full top-[55%] left-[72%] md:top-[85%] md:left-[50%]"
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
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeSlide}
            className="absolute inset-0 flex flex-col text-white space-y-2 bg-black bg-opacity-0 top-[15%] left-[3%] right-[35%] md:top-[20%] md:left-[5%] md:right-[35%]"
          >
            <h2 className="text-xl md:text-4xl font-light pr-4 border-t-2 w-[80%] md:w-[350px]">
              MAKE YOUR OWN
            </h2>
            <h1 className="text-2xl md:text-5xl font-bold border-b-2 w-[80%] md:w-[12vw]">POUCH</h1>
          </motion.div>
          <motion.button 
            className="absolute bg-[#ffd13e] hover:bg-yellow-500 py-1 px-3 md:py-1.5 md:px-6 rounded-full top-[55%] left-[2%] md:top-[50%] md:left-[5%]"
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
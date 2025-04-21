<<<<<<< HEAD
"use client";
import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import ProductStock from "../../../public/home/Reference NexiClassic Banner.webp";
import Customization from "../../../public/home/Reference Customisation Banner.webp";
=======
import React from 'react';
import { motion } from 'framer-motion';
import ProductStock from '../../../public/home/NexiClassic Banner.webp';
import Customization from '../../../public/home/Customisation Banner.webp';
import Link from 'next/link';
>>>>>>> bc13dc7be0b62d58ae6f607b1793d336ee4d9d13

const fadeSlide = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
};

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
<<<<<<< HEAD
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
=======
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:h-[500px]">

        {/* 1 */}
        <Link href="/all-category" className="relative overflow-hidden group">
          <img
            src={ProductStock.src}
            alt="Stock Products"
            className="w-full h-full object-contain"
          />
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeSlide}
            className="absolute inset-0 bg-black bg-opacity-0 flex flex-col text-white space-y-2 top-[52%] left-[49%]"
          >
            <h2 className="text-2xl md:text-4xl font-semibold inline-block pr-2">
              EXPLORE
            </h2>
            <h1 className="text-3xl md:text-5xl font-bold">NEXICLASSIC</h1>
          </motion.div>
        </Link>

        {/* 2 */}
        <Link href="/configuration-tool" className="relative overflow-hidden group">
          <img
            src={Customization.src}
            alt="Customization Tool"
            className="w-full h-full object-contain"
          />
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeSlide}
            className="absolute inset-0 bg-black bg-opacity-0 flex flex-col top-[30%] right-[35%] left-[7%] text-white space-y-2"
          >
            <h2 className="text-2xl md:text-4xl font-semibold inline-block pr-4">
              MAKE YOUR OWN
            </h2>
            <h1 className="text-3xl md:text-5xl font-bold">POUCH</h1>
          </motion.div>
        </Link>

>>>>>>> bc13dc7be0b62d58ae6f607b1793d336ee4d9d13
      </div>
    </div>
  );
};

export default ProductSections;

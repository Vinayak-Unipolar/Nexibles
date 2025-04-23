"use client";
import React, { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import ProductStock from "../../../public/home/NexiClassic Banner.webp";
import Customization from "../../../public/home/Customisation Banner.webp";

const fadeSlide = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
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

const ProductSections = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:h-[500px]">

        {/* Stock Products Section */}
        <Link href="/all-category" className="relative overflow-hidden group">
          <img
            src={ProductStock.src}
            alt="Stock Products"
            loading="lazy"
            className="object-contain w-full h-full"
          />
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeSlide}
            layout
            className="absolute inset-0 flex flex-col text-white space-y-2 bg-black bg-opacity-0 top-[52%] left-[49%] md:top-[60%] md:left-[57%] border-t-2 w-[300px]"
          >
            <h2 className="pr-2 text-xl font-light md:text-4xl">EXPLORE</h2>
            <h1 className="text-2xl md:text-5xl font-bold border-b-2 w-[300px]">NEXICLASSIC</h1>
          </motion.div>
        </Link>

        {/* Customization Tool Section */}
        <Link href="/configuration-tool" className="relative overflow-hidden group">
          <img
            src={Customization.src}
            alt="Customization Tool"
            loading="lazy"
            className="object-contain w-full h-full"
          />
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeSlide}
            layout
            className="absolute inset-0 flex flex-col text-white space-y-2 bg-black bg-opacity-0 top-[15%] left-[3%] right-[35%] md:top-[20%] md:left-[5%] md:right-[35%]"
          >
            <h2 className="text-xl md:text-4xl font-light pr-4 border-t-2 w-[80%] md:w-[350px]">MAKE YOUR OWN</h2>
            <h1 className="text-2xl md:text-5xl font-bold border-b-2 w-[80%] md:w-[350px]">POUCH</h1>
          </motion.div>
        </Link>

      </div>
    </div>
  );
};

export default ProductSections;
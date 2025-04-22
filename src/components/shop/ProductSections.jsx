"use client";
import React, { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
 
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
    <div ref={sectionRef}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:h-full">
        {/* Stock Products Section */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={imageVariants}
          custom="left"
        >
          <Link href="/all-category" className="relative overflow-hidden group h-full block">
            <img
              src="/home/NexiClassic Banner.webp"
              alt="Stock Products"
              loading="lazy"
              className="w-full h-full object-contain"
            />
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeSlide}
              className="absolute flex flex-col text-white space-y-0 bottom-[10%] md:bottom-[20%] left-[50%] md:left-[50%]
              translate-x-[-50%]"
            >
              <h2 className="text-2xl md:text-5xl font-thin border-t-2 md:w-[12vw] w-[25vw] pt-0 md:pt-2 md:pb-4">
                EXPLORE
              </h2>
              <h1 className="text-3xl md:text-[3.5rem] font-extrabold border-b-2 md:pb-4 pb-1">
                NEXICLASSIC
              </h1>
            </motion.div>
          </Link>
        </motion.div>
 
        {/* Customization Tool Section */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={imageVariants}
          custom="right"
        >
          <Link href="/configuration-tool" className="relative overflow-hidden group h-full block">
            <img
              src="/home/Customisation Banner.webp"
              alt="Customization Tool"
              loading="lazy"
              className="w-full h-full object-contain"
            />
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeSlide}
              className="absolute flex flex-col text-white space-y-0 top-[20%] left-[2%] md:top-[25%] md:left-[2%]"
            >
              <h2 className="text-2xl md:text-5xl font-thin border-t-2 pt-0 md:pt-2 pb-0 md:pb-4 w-[90%] w-full md:w-full">
                MAKE YOUR OWN
              </h2>
              <h1 className="text-3xl md:text-[3.5rem] font-extrabold border-b-2 md:pb-4 pb-0 w-[52%] md:w-[50%]">
                POUCH
              </h1>
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};
 
export default ProductSections;
 
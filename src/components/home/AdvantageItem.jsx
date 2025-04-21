"use client";
import React, { useRef } from "react";
import { FaTruck, FaLeaf, FaBox, FaShieldAlt, FaLayerGroup, FaBan, FaBarcode } from "react-icons/fa";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { motion, useInView } from "framer-motion";

const AdvantageItem = ({ icon, text, index, isInView }) => (
  <motion.div
    className="flex flex-col items-center"
    custom={index}
    initial="hidden"
    animate={isInView ? "visible" : "hidden"}
    variants={{
      hidden: { opacity: 0, y: 50 },
      visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" },
      }),
    }}
  >
    {icon}
    <p className="text-lg mt-2 text-center md:text-base sm:text-xs">{text}</p>
  </motion.div>
);

const Advantages = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.5,
    margin: "0px 0px -100px 0px", // Delay until section is closer to viewport center
  });

  const titleVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div ref={sectionRef} className="bg-white py-12 w-full">
      <motion.h2
        className="md:text-4xl text-2xl font-bold text-center mb-8"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={titleVariants}
      >
        Our Advantages
      </motion.h2>
      <div className="container mx-auto grid grid-cols-2 gap-8 md:grid-cols-4 sm:grid-cols-1">
        <AdvantageItem
          icon={<FaBan size={26} className="md:size-14 sm:size-16" />}
          text="No MOQ"
          index={0}
          isInView={isInView}
        />
        <AdvantageItem
          icon={<FaLayerGroup size={26} className="md:size-14 sm:size-16" />}
          text="Multiple SKUs"
          index={1}
          isInView={isInView}
        />
        <AdvantageItem
          icon={<RiMoneyDollarCircleLine size={26} className="md:size-14 sm:size-16" />}
          text="No cylinder and plate cost"
          index={2}
          isInView={isInView}
        />
        <AdvantageItem
          icon={<FaBox size={26} className="md:size-14 sm:size-16" />}
          text="Low inventory"
          index={3}
          isInView={isInView}
        />
        <AdvantageItem
          icon={<FaTruck size={26} className="md:size-14 sm:size-16" />}
          text="Speed to market"
          index={4}
          isInView={isInView}
        />
        <AdvantageItem
          icon={<FaLeaf size={26} className="md:size-14 sm:size-16" />}
          text="Sustainable"
          index={5}
          isInView={isInView}
        />
        <AdvantageItem
          icon={<FaBarcode size={26} className="md:size-14 sm:size-16" />}
          text="Variable data"
          index={6}
          isInView={isInView}
        />
        <AdvantageItem
          icon={<FaShieldAlt size={26} className="md:size-14 sm:size-16" />}
          text="Security printing"
          index={7}
          isInView={isInView}
        />
      </div>
    </div>
  );
};

export default Advantages;

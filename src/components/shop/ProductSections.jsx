import React from 'react';
import { motion } from 'framer-motion';
import ProductStock from '../../../public/home/NexiClassic Banner.webp';
import Customization from '../../../public/home/Customisation Banner.webp';
import Link from 'next/link';

const fadeSlide = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
};

const ProductSections = () => {
  return (
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

      </div>
    </div>
  );
};

export default ProductSections;

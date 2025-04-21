import React from 'react';
import { motion } from 'framer-motion';

const AdvantageCard = ({ videoSrc, title, description }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="flex flex-col lg:flex-row items-center bg-white shadow-lg rounded-2xl overflow-hidden mb-12"
    >
      {/* Video Left */}
      <div className="w-full lg:w-1/2 h-[300px] lg:h-auto bg-blue-900 flex items-center justify-center">
        <video
          src={videoSrc}
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        />
      </div>

      {/* Text Right */}
      <div className="w-full lg:w-1/2 p-8 text-center lg:text-left">
        <h2 className="text-4xl font-extrabold text-blue-900 mb-4">{title}</h2>
        <p className="text-blue-900 font-semibold text-base leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

const Advantages = () => {
  return (
    <div className="bg-white py-16 px-4 sm:px-8">
      <AdvantageCard
        videoSrc="/videos/sample1.mp4" // <- Replace with your actual path
        title="Low MOQ"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat..."
      />
      <AdvantageCard
        videoSrc="/videos/sample2.mp4" // <- Replace with your actual path
        title="Fast Production"
        description="Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat..."
      />
    </div>
  );
};

export default Advantages;

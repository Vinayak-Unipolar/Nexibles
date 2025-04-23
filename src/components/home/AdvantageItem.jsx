import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const cardVariants = {
  hidden: { opacity: 0, x: 100 },  
  visible: { opacity: 1, x: 0 },   
  exit: { opacity: 0, x: -100 },   
};

const cards = [
  {
    videoSrc: '/home/packets.mp4',
    title: 'Low MOQ',
    description:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.',
  },
  {
    videoSrc: '/home/banner.mp4',
    title: 'Fast Production',
    description:
      'Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis.',
  },
  
];

const AdvantageCard = ({ videoSrc, title, description, onVideoEnd }) => (
  <motion.div
    variants={cardVariants}
    initial="hidden"
    animate="visible"
    exit="exit"
    transition={{ duration: 0.8 }}
    className="flex flex-col lg:flex-row items-center bg-white shadow-lg  overflow-hidden w-full "
  >
    {/* Video Section */}
    <div className="w-full h-64 sm:h-80 md:h-96 lg:h-[400px] bg-blue-900 flex items-center justify-center">
      <video
        src={videoSrc}
        className="w-full h-full object-cover"
        autoPlay
        muted
        playsInline
        onEnded={onVideoEnd}
      />
    </div>

    {/* Text Section */}
    <div className="w-full text-center">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-[1000] text-blue-900 mb-4">
        {title}
      </h2>
      <p className="text-blue-900 text-sm sm:text-base md:text-lg font-medium leading-relaxed">
        {description}
      </p>
    </div>
  </motion.div>
);

const Advantages = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleVideoEnd = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  const currentCard = cards[currentIndex];

  return (
    <div className="bg-white min-h-screen flex items-center justify-center">
      <AnimatePresence mode="wait">
        <AdvantageCard
          key={currentIndex}
          videoSrc={currentCard.videoSrc}
          title={currentCard.title}
          description={currentCard.description}
          onVideoEnd={handleVideoEnd}
        />
      </AnimatePresence>
    </div>
  );
};

export default Advantages;

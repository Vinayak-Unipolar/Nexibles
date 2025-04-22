import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Slide & fade variant for section entrance
const fadeSlide = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
};

// Card animation variants for entry & exit
const cardVariants = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  exit: { opacity: 0, x: -100, transition: { duration: 0.8, ease: 'easeIn' } },
};

const cards = [
  {
    videoSrc: '/home/packet.mp4',
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
    className="flex flex-col lg:flex-row items-center bg-white overflow-hidden w-full my-16 "
  >
    <div className="w-full h-64 sm:h-80 md:h-full bg-blue-900 flex items-center justify-center">
      <video
        src={videoSrc}
        className="w-full h-full object-cover"
        autoPlay
        muted
        playsInline
        onEnded={onVideoEnd}
      />
    </div>
    <div className="w-full p-6 text-center">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-blue-900 mb-4">
        {title}
      </h2>
      <p className="text-blue-900 text-sm sm:text-base md:text-lg font-medium leading-relaxed">
        {description}
      </p>
    </div>
  </motion.div>
);

const Advantages = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleVideoEnd = () => {
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };
  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };
  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  return (
    <motion.section
      ref={sectionRef}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={fadeSlide}
      className="relative bg-white w-full min-h-full  flex items-center justify-center"
    >
      <div className="relative w-full">
        <AnimatePresence mode="wait">
          <AdvantageCard
            key={currentIndex}
            videoSrc={cards[currentIndex].videoSrc}
            title={cards[currentIndex].title}
            description={cards[currentIndex].description}
            onVideoEnd={handleVideoEnd}
          />
        </AnimatePresence>

        {/* Arrow Controls */}
        <div className="absolute inset-0 flex items-center justify-between px-2">
          <button
            onClick={goToPrevious}
            className="bg-white p-3 rounded-full shadow-lg hover:bg-gray-100"
          >
            <ChevronLeft size={24} className="text-blue-900" />
          </button>
          <button
            onClick={goToNext}
            className="bg-white p-3 rounded-full shadow-lg hover:bg-gray-100"
          >
            <ChevronRight size={24} className="text-blue-900" />
          </button>
        </div>
      </div>
    </motion.section>
  );
};

export default Advantages;

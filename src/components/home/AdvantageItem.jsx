import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -30 }
};

const AdvantageCard = ({ videoSrc, title, description, onVideoEnd }) => {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.8 }}
      className="flex flex-col lg:flex-row items-center bg-white shadow-lg rounded-2xl overflow-hidden w-full  mb-1"
    >
      {/* Video Left */}
      <div className="w-full  h-[300px] md:h-[500px] bg-blue-900 flex items-center justify-center">
        <video
          src={videoSrc}
          className="w-full h-full object-cover"
          autoPlay
          muted
          playsInline
          onEnded={onVideoEnd}
        />
      </div>

      {/* Text Right */}
      <div className="w-full p-8 text-center ">
        <h2 className="text-4xl font-extrabold text-blue-900 mb-4">{title}</h2>
        <p className="text-blue-900 font-semibold text-base leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

const Advantages = () => {
  const [currentCard, setCurrentCard] = useState(1);

  return (
    <div className="bg-white min-h-screen flex items-center justify-center">
      <AnimatePresence mode="wait">
        {currentCard === 1 && (
          <AdvantageCard
            key="card1"
            videoSrc="/home/packets.mp4" // replace with your file
            title="Low MOQ"
            description="We support small businesses with flexible order quantities and scalable packaging."
            onVideoEnd={() => setCurrentCard(2)}
          />
        )}
        {currentCard === 2 && (
          <AdvantageCard
            key="card2"
            videoSrc="/home/packets.mp4" // replace with your file
            title="Fast Production"
            description="Quick turnaround from design to delivery ensures your product gets to market faster."
            onVideoEnd={() => console.log('All cards finished')}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Advantages;

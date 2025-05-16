"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Sliders, Cog } from 'lucide-react';

const SettingsButton = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(prev => !prev);
  };

  // Particle sparkle variants for the Cog button on hover
  const sparkleVariants = {
    initial: { opacity: 0, scale: 0, x: 0, y: 0 },
    animate: (i) => ({
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
      x: Math.random() * 60 - 30, // Random position around the button
      y: Math.random() * 60 - 30,
      transition: { duration: 0.8, delay: i * 0.1, repeat: Infinity, repeatDelay: 1 }
    }),
  };

  // Letter-by-letter animation for the text
  const textVariants = {
    initial: { opacity: 1 },
    hover: { 
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const letterVariants = {
    initial: { y: 0, opacity: 0.8 },
    hover: { 
      y: -2,
      opacity: 1,
      transition: { duration: 0.3, ease: "easeInOut" }
    }
  };

  return (
    <>
      {/* Settings button with enhanced aesthetic animations */}
      <div className="relative z-40">
        {/* Orbit glow effect around the button */}
        <motion.div
          className="absolute w-20 h-20 rounded-full border-2 border-opacity-20 border-white"
          style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
        />

        {/* Sparkle particles on hover */}
        <motion.div
          className="flex items-center justify-center bg-gradient-to-r from-gray-400 to-gray-500 rounded-full shadow-lg cursor-pointer relative"
          whileHover={{
            scale: 1.15,
            boxShadow: "0 0 20px rgba(255, 255, 255, 0.7), 0 0 30px rgba(255, 255, 255, 0.4)",
            transition: { duration: 0.3, ease: "easeInOut" }
          }}
          whileTap={{ scale: 0.85 }}
          initial={{ scale: 1 }}
          animate={{ 
            rotate: isExpanded ? 180 : 0,
            scale: [1, 1.05, 1], // Heartbeat-like pulse
            transition: { 
              rotate: { duration: 0.5, ease: "easeInOut" },
              scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
            }
          }}
          onHoverStart={() => setIsExpanded(true)}
          onHoverEnd={() => setIsExpanded(false)}
        >
          {/* Sparkle particles */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full"
              variants={sparkleVariants}
              initial="initial"
              animate="animate"
              custom={i}
            />
          ))}

          <motion.div
            animate={{
              rotate: [0, 360], // Continuous rotation
              transition: { duration: 5, repeat: Infinity, ease: "linear" }
            }}
          >
            <Cog
              size={60}
              className="p-3 text-white transition-all duration-300"
              strokeWidth={1.5}
              onClick={toggleExpand}
            />
          </motion.div>
        </motion.div>

        {/* Expanded menu with futuristic aesthetic animation */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              className="absolute bottom-full mb-3 right-0"
              initial={{ opacity: 0, scale: 0.8, y: 10, x: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10, x: 20 }}
              transition={{ 
                type: "spring", 
                stiffness: 700, 
                damping: 15 // More energetic bounce
              }}
            >
              <motion.div
                className="relative flex items-center gap-2 bg-gradient-to-r from-gray-50 to-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg shadow-xl border border-opacity-30 border-blue-300"
                whileHover={{ 
                  scale: 1.05,
                  x: -8,
                  boxShadow: "0 0 20px rgba(59, 130, 246, 0.5), 0 0 30px rgba(59, 130, 246, 0.3)", // Neon blue glow
                  background: "linear-gradient(90deg, #f3f4f6, #e5e7eb, #f3f4f6)", // Wave-like gradient
                  transition: { duration: 0.6, ease: "easeInOut" }
                }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Trailing comet effect */}
                <motion.div
                  className="absolute -left-4 top-1/2 w-8 h-1 bg-blue-400 rounded-full"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: [0, 1, 0], x: -40 }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: "easeOut" }}
                />

                {/* Sliders icon with spinning glow */}
                <motion.div
                  animate={{ 
                    rotate: [0, -10, 10, -10, 10, 0],
                    scale: [1, 1.15, 1], // Shimmer effect
                    boxShadow: "0 0 10px rgba(59, 130, 246, 0.5)",
                  }}
                  whileHover={{
                    color: "#2563eb", // Blue on hover
                    scale: 1.3,
                    rotate: 360, // Full spin on hover
                    boxShadow: "0 0 15px rgba(59, 130, 246, 0.7)",
                    transition: { duration: 0.5, ease: "easeInOut" }
                  }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity, 
                    repeatDelay: 1.5,
                    ease: "easeInOut"
                  }}
                >
                  <Sliders size={18} className="text-gray-600" />
                </motion.div>

                {/* Holographic text with letter-by-letter animation */}
                <motion.span
                  className="text-gray-400 flex"
                  variants={textVariants}
                  initial="initial"
                  whileHover="hover"
                  animate={{ 
                    textShadow: "0 0 10px rgba(59, 130, 246, 0.5), 0 0 20px rgba(59, 130, 246, 0.3)", // Holographic glow
                    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                  }}
                >
                  {"Configuration Tool".split("").map((char, i) => (
                    <motion.span key={i} variants={letterVariants}>
                      {char}
                    </motion.span>
                  ))}
                </motion.span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default SettingsButton;
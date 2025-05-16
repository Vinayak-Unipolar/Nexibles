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

  return (
    <>
      {/* Settings button with aesthetic animations */}
      <div className="relative z-40">
        <motion.div
          className="flex items-center justify-center bg-gray-400 rounded-full shadow-lg cursor-pointer"
          whileHover={{
            scale: 1.1,
            boxShadow: "0 0 15px rgba(255, 255, 255, 0.5), 0 0 25px rgba(255, 255, 255, 0.3)", // Glow effect
            transition: { duration: 0.3, ease: "easeInOut" }
          }}
          whileTap={{ scale: 0.9 }}
          initial={{ scale: 1 }}
          animate={{ 
            rotate: isExpanded ? 180 : 0,
            transition: { duration: 0.5, ease: "easeInOut" } // Smoother rotation
          }}
          onHoverStart={() => setIsExpanded(true)}
          onHoverEnd={() => setIsExpanded(false)}
        >
          <motion.div
            animate={{
              rotate: [0, 360], // Continuous subtle rotation for aesthetic effect
              transition: { duration: 4, repeat: Infinity, ease: "linear" }
            }}
          >
            <Cog
              size={60}
              className="p-3 text-white transition-all duration-300"
              strokeWidth={1.5}
              onClick={toggleExpand} // Moved onClick to the Cog icon
            />
          </motion.div>
        </motion.div>

        {/* Expanded menu with aesthetic animation */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              className="absolute bottom-full mb-3 right-0"
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              transition={{ 
                type: "spring", 
                stiffness: 600, 
                damping: 20 // Bouncier entrance
              }}
            >
              <Link href="/configuration-tool" passHref legacyBehavior>
                <motion.a
                  className="flex items-center gap-2 bg-gradient-to-r from-white to-gray-100 font-medium py-2 px-4 rounded-lg shadow-lg whitespace-nowrap"
                  whileHover={{ 
                    scale: 1.03,
                    x: -5,
                    boxShadow: "0 0 15px rgba(255, 255, 255, 0.5), 0 20px 25px -5px rgba(0, 0, 0, 0.1)", // Glow on hover
                    background: "linear-gradient(90deg, #ffffff, #e5e7eb, #ffffff)", // Gradient animation
                    transition: { duration: 0.5, ease: "easeInOut" }
                  }}
                  whileTap={{ scale: 0.97 }}
                >
                  <motion.div
                    animate={{ 
                      rotate: [0, -10, 10, -10, 10, 0],
                      scale: [1, 1.1, 1], // Subtle scaling for shimmer effect
                    }}
                    whileHover={{
                      color: "#2563eb", // Change to blue-600 on hover
                      scale: 1.2, // Slightly larger scale on hover
                      rotate: 90, // Rotate icon on hover for dynamic effect
                      transition: { duration: 0.3, ease: "easeInOut" }
                    }}
                    transition={{ 
                      duration: 1.5, 
                      repeat: Infinity, 
                      repeatDelay: 2,
                      ease: "easeInOut"
                    }}
                  >
                    <Sliders size={18} className="text-gray-600" />
                  </motion.div>
                  <motion.span
                    className="text-gray-400"
                    animate={{ 
                      opacity: [0.8, 1, 0.8], // Shimmer effect on text
                      transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                    }}
                  >
                    Configuration Tool
                  </motion.span>
                </motion.a>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default SettingsButton;
"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Cog } from 'lucide-react';

const SettingsButton = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [hasClicked, setHasClicked] = useState(false);
  const [pulseEffect, setPulseEffect] = useState(false);

  // Reset click animation after delay
  useEffect(() => {
    if (hasClicked) {
      const timer = setTimeout(() => setHasClicked(false), 800);
      return () => clearTimeout(timer);
    }
  }, [hasClicked]);

  // Handle hover with slight delay for better UX
  useEffect(() => {
    let timer;
    if (isHovering) {
      setIsExpanded(true);
    } else {
      timer = setTimeout(() => setIsExpanded(false), 300);
    }
    return () => clearTimeout(timer);
  }, [isHovering]);

  // Periodic pulse effect
  useEffect(() => {
    const pulseInterval = setInterval(() => {
      setPulseEffect(true);
      setTimeout(() => setPulseEffect(false), 1200);
    }, 8000);
    return () => clearInterval(pulseInterval);
  }, []);

  // Particle sparkle variants
  const sparkleVariants = {
    initial: { opacity: 0, scale: 0, x: 0, y: 0 },
    animate: (i) => ({
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
      x: Math.random() * 80 - 40,
      y: Math.random() * 80 - 40,
      transition: { duration: 1.2, delay: i * 0.15, repeat: Infinity, repeatDelay: 1.5 },
    }),
  };

  // Click burst particles with more variety
  const burstParticles = Array(16)
    .fill(0)
    .map((_, i) => {
      const size = 1 + Math.random() * 2.5;
      const colorIdx = Math.floor(Math.random() * 4);
      const colors = ['bg-blue-300', 'bg-blue-400', 'bg-indigo-300', 'bg-cyan-300'];
      
      return (
        <motion.div
          key={`burst-${i}`}
          className={`absolute rounded-full ${colors[colorIdx]}`}
          initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.2, 0.5],
            x: (Math.random() - 0.5) * 120,
            y: (Math.random() - 0.5) * 120,
            rotate: Math.random() * 720 - 360,
          }}
          transition={{
            duration: 0.8 + Math.random() * 0.8,
            ease: ["easeOut", "backOut", "easeInOut"][Math.floor(Math.random() * 3)],
          }}
          style={{
            width: size,
            height: size,
          }}
        />
      );
    });

  // Letter-by-letter animation for the text
  const textVariants = {
    initial: { opacity: 1 },
    hover: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const letterVariants = {
    initial: { y: 0, opacity: 0.8 },
    hover: {
      y: [0, -3, 0],
      opacity: 1,
      transition: { duration: 0.5, ease: "easeInOut", repeat: Infinity, repeatDelay: 2 },
    },
  };

  // Orbital particles around button with trailing effect
  const orbitalParticles = Array(8)
    .fill(0)
    .map((_, i) => {
      const angle = (i * Math.PI * 2) / 8;
      const baseRadius = 32;
      const variance = Math.random() * 8;
      const radius = baseRadius + variance;
      const size = 1 + Math.random();

      return (
        <motion.div
          key={`orbital-${i}`}
          className="absolute rounded-full bg-white"
          animate={{
            x: [
              Math.cos(angle) * radius,
              Math.cos(angle + 0.4) * (radius + 3),
              Math.cos(angle + 0.8) * radius,
              Math.cos(angle + 1.2) * (radius - 3),
              Math.cos(angle) * radius,
            ],
            y: [
              Math.sin(angle) * radius,
              Math.sin(angle + 0.4) * (radius + 3),
              Math.sin(angle + 0.8) * radius,
              Math.sin(angle + 1.2) * (radius - 3),
              Math.sin(angle) * radius,
            ],
            opacity: [0.4, 0.8, 0.4],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3,
          }}
          style={{
            width: size,
            height: size,
          }}
        />
      );
    });

  // Trailing effect particles
  const trailParticles = Array(12)
    .fill(0)
    .map((_, i) => {
      const size = 0.8 + Math.random() * 1.2;
      const opacity = 0.1 + Math.random() * 0.3;
      
      return (
        <motion.div
          key={`trail-${i}`}
          className="absolute rounded-full bg-blue-200"
          initial={{ opacity: 0, scale: 0 }}
          animate={isHovering ? {
            opacity: [0, opacity, 0],
            scale: [0, 1, 0],
            x: (Math.random() - 0.5) * 60,
            y: (Math.random() - 0.5) * 60,
          } : { opacity: 0 }}
          transition={{
            duration: 1.2 + Math.random() * 0.8,
            delay: i * 0.08,
            repeat: Infinity,
            repeatDelay: 0.2,
          }}
          style={{
            width: size,
            height: size,
          }}
        />
      );
    });

  // Handle click animation and state
  const handleClick = () => {
    setHasClicked(true);
  };

  return (
    <Link href="/configuration-tool" passHref>
      <div
        className="relative z-40 cursor-pointer"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onClick={handleClick}
      >
        <div className="relative flex items-center">
          {/* Border container that wraps both the text and button */}
          <AnimatePresence>
            <motion.div
              className="absolute rounded-full bg-gradient-to-r from-gray-500 to-gray-900"
              initial={{ width: 60, height: 60, left: 0 }}
              animate={{
                width: isExpanded ? 240 : 60,
                height: 60,
                left: isExpanded ? -180 : 0,
                borderRadius: "9999px",
                boxShadow: isExpanded 
                  ? "0 0 15px rgba(59, 130, 246, 0.3), inset 0 0 8px rgba(255, 255, 255, 0.2)" 
                  : "0 0 5px rgba(59, 130, 246, 0.1), inset 0 0 2px rgba(255, 255, 255, 0.1)",
              }}
              exit={{ width: 60, height: 60, left: 0 }}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 25,
              }}
              style={{
                zIndex: -1,
              }}
            >
              {/* Gradient overlay for expanded container */}
              {isExpanded && (
                <motion.div
                  className="absolute inset-0 rounded-full opacity-30"
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: [0.1, 0.3, 0.1],
                    background: [
                      "linear-gradient(45deg, rgba(59, 130, 246, 0) 0%, rgba(59, 130, 246, 0.3) 50%, rgba(59, 130, 246, 0) 100%)",
                      "linear-gradient(45deg, rgba(59, 130, 246, 0) 0%, rgba(99, 102, 241, 0.3) 50%, rgba(59, 130, 246, 0) 100%)",
                      "linear-gradient(45deg, rgba(59, 130, 246, 0) 0%, rgba(59, 130, 246, 0.3) 50%, rgba(59, 130, 246, 0) 100%)",
                    ]
                  }}
                  transition={{
                    opacity: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                    background: { duration: 5, repeat: Infinity, ease: "easeInOut" }
                  }}
                />
              )}
            </motion.div>
          </AnimatePresence>

          {/* Expanded text with gradient background */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                className="absolute flex items-center"
                style={{
                  left: -180,
                  height: 60,
                }}
                initial={{ opacity: 0, width: 0, x: 30 }}
                animate={{ opacity: 1, width: 180, x: 0 }}
                exit={{ opacity: 0, width: 0, x: 30 }}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 25,
                }}
              >
                <motion.div
                  className="flex items-center text-white px-6 py-2 relative overflow-hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {/* Subtle text glow effect */}
                  <motion.div 
                    className="absolute inset-0 blur-md opacity-50"
                    animate={{
                      background: [
                        "radial-gradient(circle at center, rgba(59, 130, 246, 0.3) 0%, rgba(59, 130, 246, 0) 70%)",
                        "radial-gradient(circle at center, rgba(99, 102, 241, 0.4) 0%, rgba(99, 102, 241, 0) 70%)",
                        "radial-gradient(circle at center, rgba(59, 130, 246, 0.3) 0%, rgba(59, 130, 246, 0) 70%)",
                      ]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  
                  <motion.span
                    className="flex text-white font-medium relative"
                    variants={textVariants}
                    initial="initial"
                    whileHover="hover"
                  >
                    {"Configuration Tool".split("").map((char, i) => (
                      <motion.span 
                        key={i} 
                        variants={letterVariants}
                        className="relative inline-block"
                      >
                        {char === " " ? "\u00A0" : char}
                        {/* Dot underneath each letter */}
                        {char !== " " && (
                          <motion.span 
                            className="absolute bottom-0 left-1/2 w-0.5 h-0.5 bg-blue-300 rounded-full"
                            initial={{ opacity: 0 }}
                            animate={isHovering ? { 
                              opacity: [0, 0.8, 0],
                              y: [-4, -1, -4],
                            } : { opacity: 0 }}
                            transition={{
                              duration: 1.5,
                              delay: i * 0.05,
                              repeat: Infinity,
                              repeatDelay: 0.5
                            }}
                            style={{ transform: "translateX(-50%)" }}
                          />
                        )}
                      </motion.span>
                    ))}
                  </motion.span>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Orbital particles moving around the button */}
          <div className="absolute inset-0 flex items-center justify-center">
            {orbitalParticles}
          </div>

          {/* Trailing effect particles */}
          <div className="absolute inset-0 flex items-center justify-center">
            {trailParticles}
          </div>

          {/* Main cog button */}
          <motion.div
            className="flex items-center justify-center bg-gradient-to-r from-gray-500 to-gray-900 rounded-full shadow-lg relative overflow-hidden"
            whileHover={{
              boxShadow:
                "0 0 20px rgba(255, 255, 255, 0.6), 0 0 30px rgba(59, 130, 246, 0.5)",
              background:
                "linear-gradient(135deg, #4b5563, #1f2937, #4b5563)",
              transition: { duration: 0.4, ease: "easeInOut" },
            }}
            whileTap={{
              scale: 0.85,
              rotate: 90,
              transition: { duration: 0.2, ease: "easeInOut" },
            }}
            initial={{ scale: 1 }}
            animate={{
              rotate: isExpanded ? 180 : 0,
              scale: pulseEffect ? [1, 1.15, 1] : [1, 1.05, 1],
              transition: {
                rotate: { duration: 0.5, ease: "easeInOut" },
                scale: pulseEffect 
                  ? { duration: 1.2, ease: "easeInOut" }
                  : { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
              },
            }}
            style={{
              width: 60,
              height: 60,
            }}
          >
            {/* Animated rim highlight */}
            <motion.div
              className="absolute inset-0 rounded-full border border-transparent"
              animate={{
                borderColor: [
                  "rgba(255, 255, 255, 0)",
                  "rgba(255, 255, 255, 0.3)",
                  "rgba(255, 255, 255, 0)",
                ],
                boxShadow: [
                  "0 0 0px rgba(59, 130, 246, 0)",
                  "0 0 8px rgba(59, 130, 246, 0.5)",
                  "0 0 0px rgba(59, 130, 246, 0)",
                ]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Ripple effect on pulse */}
            <AnimatePresence>
              {pulseEffect && (
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-blue-400"
                  initial={{ scale: 1, opacity: 1 }}
                  animate={{ scale: 1.8, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              )}
            </AnimatePresence>

            {/* Glow effect */}
            <motion.div
              className="absolute inset-1 rounded-full blur-md"
              animate={{
                background: isHovering
                  ? [
                      "radial-gradient(circle, rgba(59, 130, 246, 0.5) 0%, rgba(37, 99, 235, 0) 70%)",
                      "radial-gradient(circle, rgba(99, 102, 241, 0.6) 0%, rgba(79, 70, 229, 0) 70%)",
                      "radial-gradient(circle, rgba(59, 130, 246, 0.5) 0%, rgba(37, 99, 235, 0) 70%)",
                    ]
                  : "radial-gradient(circle, rgba(156, 163, 175, 0.3) 0%, rgba(156, 163, 175, 0) 70%)",
                opacity: isHovering ? [0.6, 0.8, 0.6] : [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Gradient overlay */}
            <motion.div 
              className="absolute inset-0 rounded-full opacity-80"
              animate={{
                background: [
                  "linear-gradient(135deg, rgba(249, 250, 251, 0.1) 0%, rgba(249, 250, 251, 0) 50%)",
                  "linear-gradient(135deg, rgba(249, 250, 251, 0.15) 10%, rgba(249, 250, 251, 0) 60%)",
                  "linear-gradient(135deg, rgba(249, 250, 251, 0.1) 0%, rgba(249, 250, 251, 0) 50%)",
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Click burst particles */}
            {hasClicked && (
              <div className="absolute inset-0 flex items-center justify-center">
                {burstParticles}
              </div>
            )}

            {/* Static sparkle particles */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1.5 h-1.5 bg-blue-200 rounded-full"
                variants={sparkleVariants}
                initial="initial"
                animate="animate"
                custom={i}
              />
            ))}

            {/* Rotating cog icon with dynamic color */}
            <motion.div
              animate={{
                rotate: [0, 360],
                transition: { duration: 15, repeat: Infinity, ease: "linear" },
              }}
            >
              <motion.div
                animate={{
                  filter: isHovering 
                    ? ["drop-shadow(0 0 2px rgba(255, 255, 255, 0.5))", "drop-shadow(0 0 4px rgba(59, 130, 246, 0.7))", "drop-shadow(0 0 2px rgba(255, 255, 255, 0.5))"]
                    : "none",
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Cog
                  size={60}
                  className="p-3 text-white transition-all duration-300"
                  strokeWidth={1.5}
                />
              </motion.div>
            </motion.div>

            {/* Secondary smaller cog for mechanical feel */}
            <motion.div
              className="absolute top-2 right-2"
              animate={{
                rotate: [360, 0],
                transition: { duration: 8, repeat: Infinity, ease: "linear" },
              }}
            >
              <motion.div
                animate={{
                  opacity: [0.7, 0.9, 0.7],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Cog size={18} className="text-white" strokeWidth={1.5} />
              </motion.div>
            </motion.div>
            
            {/* Tertiary tiny cog */}
            <motion.div
              className="absolute bottom-3 left-3"
              animate={{
                rotate: [0, 360],
                transition: { duration: 6, repeat: Infinity, ease: "linear" },
              }}
            >
              <Cog size={12} className="text-blue-200 opacity-80" strokeWidth={1.5} />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </Link>
  );
};

export default SettingsButton;
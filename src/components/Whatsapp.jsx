"use client";
import React, { useState, useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const gtag_report_conversion = (url) => {
  if (typeof window.gtag !== "function") {
    console.warn("gtag is not defined. Ensure gtag.js is loaded via GoogleAnalytics.jsx.");
    return false;
  }
  //console.log("Sending Google Ads conversion event");
  window.gtag('event', 'conversion', {
    'send_to': 'AW-17014026366',
    'event_callback': () => {
      //console.log("Google Ads conversion tracking successful");
    }
  });
  return false;
};

const Whatsapp = () => {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  // Auto-show tooltip after 3 seconds to improve UX
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 3000);

    const hideTimer = setTimeout(() => {
      setShowTooltip(false);
    }, 7000);

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, []);

  // Handle click animation effect, conversion tracking, and WhatsApp redirection in a new tab
  const handleClick = () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 700);

    // Google Ads conversion tracking
    //console.log("Attempting Google Ads conversion tracking for WhatsApp click");
    gtag_report_conversion("https://wa.me/919821045101");

    // Open WhatsApp in a new tab
    //console.log("Opening WhatsApp in a new tab: https://wa.me/919821045101");
    window.open("https://wa.me/919821045101", "_blank", "noopener,noreferrer");
  };

  // Generate random particles for the burst effect
  const generateParticles = (count) => {
    return Array.from({ length: count }).map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1.5 h-1.5 rounded-full bg-green-300"
        initial={{ scale: 0, x: 0, y: 0 }}
        animate={{
          scale: [0, 1, 0],
          x: (Math.random() - 0.5) * 60,
          y: (Math.random() - 0.5) * 60,
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 0.6 + Math.random() * 0.3,
          ease: "easeOut",
        }}
      />
    ));
  };

  // Generate decorative dots around the button
  const decorativeDots = Array.from({ length: 8 }).map((_, i) => {
    const angle = (i * Math.PI * 2) / 8;
    const distance = 20;
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;

    return (
      <motion.div
        key={i}
        className="absolute w-1 h-1 bg-green-300 rounded-full"
        style={{
          left: "50%",
          top: "50%",
          marginLeft: -0.5,
          marginTop: -0.5,
        }}
        animate={{
          x: [0, x, x, 0],
          y: [0, y, y, 0],
          opacity: [0, 0.8, 0.8, 0],
          scale: [0, 1, 1, 0],
        }}
        transition={{
          duration: 4,
          times: [0, 0.3, 0.7, 1],
          repeat: Infinity,
          repeatDelay: i * 0.15,
          ease: "easeInOut",
        }}
      />
    );
  });

  // Main button variants
  const buttonVariants = {
    initial: {
      opacity: 0,
      scale: 0.8,
      y: 20,
    },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        opacity: { duration: 0.6 },
        scale: { type: "spring", stiffness: 600, damping: 15 },
        y: { type: "spring", stiffness: 600, damping: 15 },
      },
    },
    hover: {
      scale: 1.1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
    tap: {
      scale: 0.9,
      transition: {
        type: "spring",
        stiffness: 800,
        damping: 10,
      },
    },
  };

  // Background gradient animation variants
  const gradientVariants = {
    initial: {
      background: "linear-gradient(45deg, #25d366, #128c7e)",
    },
    hover: {
      background: "linear-gradient(45deg, #128c7e, #25d366, #128c7e)",
      backgroundSize: "200% 200%",
      backgroundPosition: ["0% 0%", "100% 100%"],
    },
  };

  // Shadow animation variants
  const shadowVariants = {
    initial: {
      boxShadow: "0 0 10px rgba(37, 211, 102, 0.5)",
    },
    pulse: {
      boxShadow: [
        "0 0 10px rgba(37, 211, 102, 0.5)",
        "0 0 20px rgba(37, 211, 102, 0.7)",
        "0 0 10px rgba(37, 211, 102, 0.5)",
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
    hover: {
      boxShadow: [
        "0 0 15px rgba(37, 211, 102, 0.7)",
        "0 0 30px rgba(37, 211, 102, 0.9)",
        "0 0 15px rgba(37, 211, 102, 0.7)",
      ],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  // Icon animation variants
  const iconVariants = {
    initial: {
      rotate: 0,
      scale: 1,
    },
    animate: {
      rotate: [0, 10, -10, 10, -10, 0],
      scale: [1, 1.1, 1],
      transition: {
        rotate: { duration: 2, repeat: Infinity, repeatDelay: 4 },
        scale: { duration: 1.5, repeat: Infinity, repeatDelay: 1 },
      },
    },
    hover: {
      rotate: [0, -15, 15, -15, 15, 0],
      scale: [1, 1.2, 1.1],
      transition: {
        duration: 1,
        repeat: Infinity,
      },
    },
  };

  // Tooltip animation variants
  const tooltipVariants = {
    hidden: {
      opacity: 0,
      y: 10,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 15,
      },
    },
    exit: {
      opacity: 0,
      y: 10,
      scale: 0.8,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <div className="fixed bottom-4 right-4 z-[9999] flex items-center justify-center">
      {/* Outer ripple effect */}
      <motion.div
        className="absolute rounded-full"
        animate={{
          boxShadow: hovered
            ? [
                "0 0 0 0 rgba(37, 211, 102, 0)",
                "0 0 0 20px rgba(37, 211, 102, 0.1)",
                "0 0 0 40px rgba(37, 211, 102, 0)",
              ]
            : [
                "0 0 0 0 rgba(37, 211, 102, 0)",
                "0 0 0 15px rgba(37, 211, 102, 0.1)",
                "0 0 0 30px rgba(37, 211, 102, 0)",
              ],
        }}
        transition={{
          duration: hovered ? 1.5 : 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          width: 60,
          height: 60,
        }}
      />

      {/* Decorative dots around the button */}
      {decorativeDots}

      {/* Tooltip */}
      <AnimatePresence>
        {(showTooltip || hovered) && (
          <motion.div
            className="absolute right-full mr-4 bg-white text-green-600 py-2 px-4 rounded-lg shadow-lg whitespace-nowrap font-medium"
            variants={tooltipVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div
              className="flex items-center gap-2"
              animate={{ x: [0, 3, 0] }}
              transition={{
                duration: 1,
                repeat: Infinity,
                repeatDelay: 1,
              }}
            >
              <span>Chat with us</span>
              <FaWhatsapp size={16} />
            </motion.div>

            {/* Tooltip arrow */}
            <motion.div
              className="absolute top-1/2 right-0 w-2 h-2 bg-white transform translate-x-1 -translate-y-1/2 rotate-45"
              animate={{
                backgroundColor: ["#ffffff", "#f9fafb", "#ffffff"],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Button */}
      <motion.div
        className="relative overflow-hidden p-4 rounded-full"
        variants={buttonVariants}
        initial="initial"
        animate="animate"
        whileHover="hover"
        whileTap="tap"
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        onClick={handleClick}
      >
        {/* Gradient background */}
        <motion.div
          className="absolute inset-0 rounded-full"
          variants={gradientVariants}
          initial="initial"
          animate={hovered ? "hover" : "initial"}
          transition={{
            background: { duration: 3, repeat: Infinity, repeatType: "reverse" },
            backgroundPosition: { duration: 3, repeat: Infinity, repeatType: "mirror" },
          }}
        />

        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 rounded-full"
          variants={shadowVariants}
          initial="initial"
          animate={hovered ? "hover" : "pulse"}
        />

        {/* Click particles burst */}
        {clicked && (
          <div className="absolute inset-0 flex items-center justify-center">
            {generateParticles(12)}
          </div>
        )}

        {/* WhatsApp link and icon */}
        <a
          href="https://wa.me/919821045101"
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => {
            e.preventDefault(); // Prevent default to allow handleClick to execute first
            handleClick();
          }}
          className="relative block"
        >
          <motion.div
            variants={iconVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
          >
            <FaWhatsapp size={28} className="text-white" />
          </motion.div>
        </a>
      </motion.div>

      {/* Interactive ping effect */}
      <motion.div
        className="absolute w-full h-full rounded-full bg-green-400"
        initial={{ scale: 0, opacity: 0.2 }}
        animate={{
          scale: [0, 1.8, 0],
          opacity: [0.2, 0, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 3,
          ease: "easeOut",
        }}
      />
    </div>
  );
};

export default Whatsapp;
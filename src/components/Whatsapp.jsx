"use client";
import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";

const Whatsapp = () => {
  return (
    <motion.div
      className="fixed bottom-4 right-4 z-[9999] bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-full shadow-lg"
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ 
        opacity: 1, 
        scale: 1, 
        y: 0,
        boxShadow: [
          "0 0 10px rgba(34, 197, 94, 0.5)", // Green glow matching WhatsApp color
          "0 0 20px rgba(34, 197, 94, 0.3)",
          "0 0 10px rgba(34, 197, 94, 0.5)",
        ], // Pulsing glow effect
      }}
      transition={{ 
        opacity: { duration: 0.5 },
        scale: { type: "spring", stiffness: 600, damping: 20 }, // Bouncy entrance
        y: { type: "spring", stiffness: 600, damping: 20 },
        boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }, // Pulsing glow
      }}
      whileHover={{
        scale: 1.1,
        boxShadow: "0 0 15px rgba(255, 255, 255, 0.5), 0 0 25px rgba(34, 197, 94, 0.7)", // Enhanced glow on hover
        background: "linear-gradient(to right, #22c55e, #16a34a, #22c55e)", // Gradient animation on hover
        transition: { duration: 0.4, ease: "easeInOut" },
      }}
      whileTap={{ scale: 0.9 }}
    >
      <a
        href="https://wa.me/919821045101"
        target="_blank"
        rel="noopener noreferrer"
      >
        <motion.div
          animate={{
            rotate: [0, 10, -10, 10, -10, 0], // Subtle wobble effect
            scale: [1, 1.1, 1], // Shimmer effect
          }}
          transition={{
            rotate: { duration: 2, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" },
            scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <FaWhatsapp size={28} />
        </motion.div>
      </a>
    </motion.div>
  );
};

export default Whatsapp;
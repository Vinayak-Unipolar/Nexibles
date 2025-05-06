"use client";
import { useState, useEffect } from "react";
 const LoadingScreen = ({ onComplete }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const letters = ["N", "E", "X", "I", "B", "L", "E", "S"];  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % letters.length);
    }, 250);
    
    const timer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 2000);
    
    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [letters.length, onComplete]);
  
  return (
    <div className="fixed inset-0 z-[9999] bg-white text-black flex items-center justify-center">
      <div className="flex flex-col items-center space-y-6">
        <div className="flex items-center justify-center space-x-0 text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-normal">
          {letters.map((letter, index) => (
            letter === "X" ? (
              <img
                key={index}
                src="/favicon.ico"
                alt="X"
                className={`h-8 w-8 md:h-10 md:w-10 transition-transform duration-300 ${
                  activeIndex === index ? "transform -translate-y-4" : ""
                }`}
              />
            ) : (
              <span
                key={index}
                className={`text-black transition-transform duration-300 ${
                  activeIndex === index ? "transform -translate-y-4" : ""
                }`}
              >
                {letter}
              </span>
            )
          ))}
        </div>
        
        {/* Animated Progress Bar */}
        <div className="w-[200px] h-[2px] bg-gray-800 rounded relative overflow-hidden">
          <div className="w-[40%] h-full bg-blue-500 shadow-[0_0_15px_#3b82f6] animate-loading-bar"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
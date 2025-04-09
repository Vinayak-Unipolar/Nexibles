"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import machine1 from '../../../public/home/machine1.png';
import machine2 from '../../../public/home/machine2.png';
import machine3 from '../../../public/home/machine3.png';
import Link from 'next/link';

const GreenPart = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [showFullText, setShowFullText] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const images = [machine1, machine2, machine3];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    setIsMounted(true);
    // Set initial window width
    setWindowWidth(window.innerWidth);
    
    // Add event listener for window resize
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(interval);
  }, [isMounted]);

  if (!isMounted) {
    return null;
  }

  const currentImage = images[currentIndex];

  const textContent = `
    Under the brand name- 'NEXt generation flexIBLES,' we look forward to taking the idea of flexible packaging to the next level by bringing in digital printing as a revolutionary alternative to conventional processes of producing flexible packaging. We utilize the room for experimentation and creativity to help clients with high yielding and quick-quality packaging solutions.
    With an efficient team of experts and experienced professionals, we provide converters and end-users with a wide range of custom flexible packaging solutions, including pouches, shrink sleeves, labels, and roll stock. Our broad range of product packaging solutions enables us to meet the demands of a diverse range of market segments.
    Our in-house Quality Control lab also ensures that each produced batch satisfies the most stringent quality requirements that the industry demands and the product deserves.
    A fully equipped in-house pre-press division translates into quality of design & layouts, all under the qualified and watchful eyes of our team.
  `;

  const machineText = `Fully Automatic Rigid Box Making Machine adopts servo control system, programmable logic control system, photoelectric servo positioning system, and HMI system to process automatic paper feeding, gluing, positioning and wrapping action at one time, to achieve the high-end boxes' requirements. Suitable for production of mobile box, cosmetics box, shoe box, garment box, gift box, food box, hardware box, etc.`;

  // Truncate the text for mobile view only
  const truncateText = (text, percentage) => {
    const length = text.length;
    const truncatePoint = Math.floor(length * percentage);
    return text.slice(0, truncatePoint) + '...';
  };

  // Check if we're on mobile
  const isMobile = windowWidth < 768;

  // For mobile: show truncated text
  // For desktop: use the same behavior that was there before (showFullText state)
  const displayedAboutText = isMobile 
    ? truncateText(textContent, 0.3) 
    : (showFullText ? textContent : textContent);

  const displayedMachineText = isMobile 
    ? truncateText(machineText, 0.5) 
    : machineText;

  return (
    <section className="bg-[#89D0B7] py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4 lg:text-justify text-justify lg:ml-8">
            <h2 className="text-3xl font-bold text-white mb-6">{`About Nexibles`}</h2>
            <p className="text-white">{displayedAboutText}</p>
            {isMobile && (
              <Link href="/about">
                <div className="text-white underline">{`Read more`}</div>
              </Link>
            )}
            {!isMobile && !showFullText && (
              <Link href="/about">
                <div className="text-white underline">{`Read more`}</div>
              </Link>
            )}
          </div>
          <div className="flex flex-col items-center lg:items-end">
            <h2 className="text-3xl font-bold text-white mb-6 lg:text-justify">
              {`Fully Automatic Rigid Box Making Machine`}
            </h2>
            <p className="text-white mb-6 text-justify lg:text-justify">
              {displayedMachineText}
            </p>
            {isMobile && (
              <Link href="/machines">
                <div className="text-white underline mb-4">{`Read more`}</div>
              </Link>
            )}
            <div className="w-full max-w-xl h-64 sm:h-80 relative overflow-hidden">
              <Image
                src={currentImage}
                alt={`Machine ${currentIndex + 1}`}
                layout="fill"
                objectFit="contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GreenPart;
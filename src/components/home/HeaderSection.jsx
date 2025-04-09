"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Link from "next/link";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const HeaderSection = () => {
  const [slides, setSlides] = useState([]);
  const swiperRef = useRef(null); // Ref to access Swiper instance
  const BASE_IMAGE_URL = process.env.NEXT_PUBLIC_CDN_URL;

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/banner`);
        const data = await response.json();
        const transformedSlides = data.map((item) => ({
          bgMedia: `${BASE_IMAGE_URL}/${item.image}`,
          link: item.link,
          title: item.title,
          active: item.active,
          shown: item.shown,
          content: (
            <div className="absolute inset-0 flex items-center justify-center">
              {/* <div className="text-center">
                <h2 className="text-xl md:text-6xl font-extrabold text-black">
                  {item.title}
                </h2>
              </div> */}
            </div>
          ),
        }));
        setSlides(transformedSlides);
      } catch (error) {
        console.error("Error fetching banners:", error);
      }
    };

    fetchBanners();
  }, []);

  // Helper function to determine media type based on file extension
  const getMediaType = (fileName) => {
    const extension = fileName.split('.').pop().toLowerCase();
    if (['mp4', 'webm', 'ogg'].includes(extension)) return 'video';
    if (['jpg', 'jpeg', 'png', 'gif'].includes(extension)) return 'image';
    return 'image'; // Default to image if unknown
  };

  // Component to render either image or video
  const MediaComponent = ({ media, alt, isActive }) => {
    const videoRef = useRef(null);
    const mediaType = getMediaType(media);

    useEffect(() => {
      if (mediaType === 'video' && videoRef.current) {
        if (isActive) {
          videoRef.current.currentTime = 0; // Reset to start
          videoRef.current.play(); // Ensure it plays
        } else {
          videoRef.current.pause(); // Pause when not active
        }
      }
    }, [isActive, mediaType]);

    if (mediaType === 'video') {
      return (
        <video
          ref={videoRef}
          src={media}
          autoPlay={isActive} // Only autoplay when active
          loop
          muted
          playsInline
          className="w-full h-full object-cover transition-opacity hover:opacity-90"
        />
      );
    }
    return (
      <Image
        src={media}
        alt={alt}
        layout="fill"
        objectFit="cover"
        className="transition-opacity hover:opacity-90"
      />
    );
  };

  // Handle slide change to reset video playback
  const handleSlideChange = () => {
    if (swiperRef.current) {
      const activeIndex = swiperRef.current.swiper.realIndex;
      // No need to manually reset here; MediaComponent handles it via isActive
    }
  };

  return (
    <div className="h-[50vh] md:h-[84vh] overflow-hidden relative">
      <style jsx global>{`
        .swiper-button-next,
        .swiper-button-prev {
          color: white !important;
          display: none !important; /* Hide navigation on mobile */
        }
        .swiper-pagination-bullet {
          background: white !important;
        }
        .swiper-pagination-bullet-active {
          background: white !important;
        }
      `}</style>
      <Swiper
        ref={swiperRef}
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation={{ enabled: false }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop={true}
        onSlideChange={handleSlideChange}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            {({ isActive }) => (
              <Link href={slide.link || "/shop"} className="block w-full h-full">
                <div className="relative w-full h-[50vh] sm:h-[60vh] md:h-[84vh] lg:h-[90vh]">
                  <MediaComponent
                    media={slide.bgMedia}
                    alt={`Background ${index + 1}`}
                    isActive={isActive}
                  />
                  {slide.content}
                </div>
              </Link>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeaderSection;
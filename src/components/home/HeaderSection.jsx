"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Link from "next/link";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const HeaderSection = () => {
  const [slides, setSlides] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);
  const BASE_IMAGE_URL = process.env.NEXT_PUBLIC_CDN_URL;

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/banner`);
        const data = await response.json();
        const transformedSlides = data.map((item) => ({
          bgImage: `${BASE_IMAGE_URL}/${item.image}`,
          link: item.link,
          title: item.title,
          active: item.active,
          shown: item.shown,
          content: (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <h2 className="text-xl md:text-6xl font-extrabold text-black">
                  {item.title}
                </h2>
              </div>
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
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation={{ enabled: false }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop={true}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <Link href={slide.link || "/shop"} className="block w-full h-full">
              <div className="relative w-full h-[50vh] sm:h-[60vh] md:h-[84vh] lg:h-[90vh]">
                <Image
                  src={slide.bgImage}
                  alt={`Background ${index + 1}`}
                  layout="fill"
                  objectFit="cover"
                  className="transition-opacity hover:opacity-90"
                />
                {slide.content}
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeaderSection;
"use client";
import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import categoryimg from "../../../public/home/Types_of_pouch.webp";

export default function Backdrop() {
  return (
    <div className="h-[400px] mt-[4rem] overflow-hidden relative">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation={{ enabled: true, hideOnClick: true }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop={true}
        className="h-full"
      >
        <SwiperSlide>
          <div className="relative h-full">
            <Image
              src={categoryimg}
              alt="Backdrop"
              fill
              className="object-cover"
            />
            {/* Title Overlay */}
            <div className="absolute bottom-[10%] left-[2%] z-10">
              <div className="border-b border-t border-gray-800 py-2 px-4">
                <h1 className="text-4xl md:text-5xl font-medium text-[#231f20]">
                  TYPES OF
                </h1>
                <h1 className="text-5xl md:text-6xl font-[1000] text-[#231f20] mt-2">
                  POUCHES
                </h1>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>

      <style jsx global>{`
        .swiper-pagination-bullet {
          background-color: white;
          opacity: 0.5;
        }
        .swiper-pagination-bullet-active {
          opacity: 1;
        }
        .swiper-button-next,
        .swiper-button-prev {
          color: white;
        }
        @media (max-width: 768px) {
          .swiper-button-next,
          .swiper-button-prev {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
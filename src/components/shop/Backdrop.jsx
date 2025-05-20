"use client";
import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Backdrop() {
  return (
    <div className="h-[20vh] md:h-[400px] mt-[2rem] overflow-hidden relative">
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
              src={`${process.env.NEXT_PUBLIC_CDN_URL}/NexiClassic_Banner.webp`}
              alt="Backdrop"
              fill
              className="object-fill"
            />
            {/* Title Overlay */}
            <div className="absolute top-14 left-0 right-0 flex justify-center items-start pt-4 z-10">
              <div className="py-2 px-4 text-center">
                <h1 className="text-xs md:text-[5vw] text-white">
                  <span className="font-[200] tracking-wider">SHOP</span>{" "}
                  <span className="font-[1000]">NEXICLASSIC</span>{" "}
                  <span className="font-[200] tracking-wider">POUCHES</span>
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
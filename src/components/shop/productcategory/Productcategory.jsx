import React, { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import { IoChevronForward, IoChevronBack } from "react-icons/io5";
import Link from "next/link";
import Image from "next/image";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Productcategory = ({ categoryData }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);
  useEffect(() => {
    if (swiperRef.current && prevRef.current && nextRef.current) {
      const swiper = swiperRef.current.swiper;
      swiper.navigation.update();
    }
  }, []);

  return (
    <div className="bg-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="relative">
        <Swiper
          ref={swiperRef}
          modules={[Navigation, Autoplay, Pagination]}
          spaceBetween={24} 
          slidesPerView="auto" 
          centeredSlides={false}
          centerInsufficientSlides={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop={true}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
            enabled: true,
          }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          pagination={false}
          className="px-2 sm:px-4"
        >
          {categoryData.map((category) => (
            <SwiperSlide
              key={category.name}
              style={{ width: "220px" }}
            >
              <Link href={`/category/${category.cat_url}`} passHref>
                <div
                  className="
                    bg-[#ECE0CC]
                    h-auto
                    shadow-lg
                    p-2
                    pb-4
                    border
                    hover:shadow-md
                    transition-shadow
                    duration-300
                    rounded-xl
                    overflow-hidden
                    mx-auto
                  "
                >
                  <div className="relative h-48 md:h-[400px] lg:h-[400px] w-full flex items-center justify-center">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_CDN_URL}/${category.bg_Img}`}
                      width={400}
                      height={400}
                      alt={`Image for ${category.name}`}
                      quality={100}
                      className="w-full h-full object-contain rounded-t-lg"
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                  </div>
                  <div className="flex flex-col items-center justify-center text-center mt-2">
                    <h2
                      className="
                        px-2
                        py-1
                        sm:px-3
                        sm:py-2
                        border
                        border-gray-200
                        bg-white
                        rounded-lg
                        text-gray-900
                        font-semibold
                        text-xs
                        sm:text-sm
                        truncate
                        hover:bg-black
                        hover:text-white
                        transition-all
                        duration-300
                      "
                    >
                      {category.name}
                    </h2>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
        <div
          ref={prevRef}
          className="absolute top-1/2 -left-2 sm:-left-4 transform -translate-y-1/2 z-10 bg-white rounded-full p-1 sm:p-2 shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer hidden sm:block"
          aria-label="Previous"
        >
          <IoChevronBack
            className="text-black hover:text-red-500 transition-colors duration-200"
            size={20}
          />
        </div>
        <div
          ref={nextRef}
          className="absolute top-1/2 -right-2 sm:-right-4 transform -translate-y-1/2 z-10 bg-white rounded-full p-1 sm:p-2 shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer hidden sm:block"
          aria-label="Next"
        >
          <IoChevronForward
            className="text-black hover:text-red-500 transition-colors duration-200"
            size={20}
          />
        </div>
      </div>
    </div>
  );
};

export default Productcategory;

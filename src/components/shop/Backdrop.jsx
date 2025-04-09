"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const images = [
  "/home/Nexibles-07.png",
  "/home/Nexibles-08.png",
  "/home/Nexibles-09.png",
];

const content = [
  {
    title: "Your Print & Packaging Solution",
    subtitle: "High-Quality Print & Packaging Tailored to Your Business",
    description: "Personalize Your Business Stationery with Premium Designs!",
    cta: "Start Personalizing Now",
  },
  {
    title: "Branded Packaging for Every Need",
    subtitle: "Innovative Solutions for Packaging & Branding",
    description: "Enhance your brand presence with our customized, eco-friendly packaging!",
    cta: "Order Custom Packaging",
  },
  {
    title: "Create a Lasting Impression",
    subtitle: "Stand Out with Custom Business Cards & Marketing Materials",
    description: "From business cards to brochures, we've got all your marketing collateral covered!",
    cta: "Design Your Business Cards",
  },
  {
    title: "Fast & Reliable Printing",
    subtitle: "Get Your Custom Orders Delivered Quickly",
    description: "Trust us for premium quality prints delivered on time, every time!",
    cta: "Get Fast Delivery",
  },
];

export default function Backdrop() {
  return (
    <div className="h-[55vh] overflow-hidden relative">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation={{
          enabled: true,
          hideOnClick: true,
        }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop={true}
        className="h-full"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full">
              <Image
                src={img}
                alt={`Slide ${index + 1}`}
                layout="fill"
                objectFit="cover"
              />
              <div className="absolute inset-0 flex flex-col justify-center md:justify-start px-4 md:px-24 pt-16 md:pt-24 items-start text-black text-start">
                <p className="mb-2 text-2xl md:text-4xl text-gray-800">
                  {content[index]?.title}
                  <span className="inline-block w-5 h-2 bg-red-500"></span>
                </p>
                <p className="text-xl md:text-xl mb-2">
                  {content[index]?.subtitle}
                </p>
                <p className="text-lg md:text-xl mb-6">
                  {content[index]?.description}
                </p>
                <Link
                  href="/all-category"
                  className="bg-white text-black px-6 py-2 rounded-md text-lg hover:bg-opacity-80 transition-colors"
                >
                  {content[index]?.cta}
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
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

















// "use client";
// import React, { useState, useEffect } from 'react';
// import Image from "next/image";
// import Link from "next/link";

// const images = [
//   // "/home/paper-asset.png",
//   "/home/Nexibles-07.png",
//   "/home/Nexibles-08.png",
//   "/home/Nexibles-09.png",
// ];

// const content = [
//   {
//     title: "One Stop SHOP",
//     subtitle: "for all your print & packaging needs...",
//     description: "customise your business stationery now!!",
//   },{
//     title: "One Stop SHOP",
//     subtitle: "for all your print & packaging needs...",
//     description: "customise your business stationery now!!",
//   },{
//     title: "One Stop SHOP",
//     subtitle: "for all your print & packaging needs...",
//     description: "customise your business stationery now!!",
//   },{
//     title: "One Stop SHOP",
//     subtitle: "for all your print & packaging needs...",
//     description: "customise your business stationery now!!",
//   },

// ];

// export default function Backdrop() {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const nextSlide = () => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
//   };

//   const prevSlide = () => {
//     setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
//   };

//   const goToSlide = (index) => {
//     setCurrentIndex(index);
//   };

//   useEffect(() => {
//     const timer = setInterval(nextSlide, 5000);
//     return () => clearInterval(timer);
//   }, []);

//    return (
//     <div className="h-[65vh] overflow-hidden relative">
//       {images.map((img, index) => (
//         <div
//           key={index}
//           className={`absolute inset-0 transition-opacity duration-500 ${
//             currentIndex === index ? "opacity-100" : "opacity-0"
//           }`}
//           style={{ zIndex: currentIndex === index ? 10 : 0 }}
//         >
//           <Image
//             src={img}
//             alt={`Slide ${index + 1}`}
//             layout="fill"
//             objectFit="cover"
//           />
//           <div className="absolute inset-0 flex flex-col justify-center md:left-24 left-10 md:top-36 items-start text-black text-start">
//             <p className="mb-2 text-3xl md:text-5xl text-gray-800">One Stop <span className="font-bold uppercase"> Shop </span><span className="inline-block w-5 h-2 bg-red-500"></span></p>
//             <p className="text-2xl mb-2">{content[index]?.subtitle}</p>
//             <p className="text-xl mb-6">{content[index]?.description}</p>
//             <Link href="/all-category" className="bg-white text-black px-6 py-2 rounded-md text-lg hover:bg-opacity-80 transition-colors">
//               order nowzz
//             </Link>
//           </div>
//         </div>
//       ))}

//       <button
//         className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white text-3xl z-20"
//         onClick={prevSlide}
//       >
//         ❮
//       </button>
//       <button
//         className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white text-3xl z-20"
//         onClick={nextSlide}
//       >
//         ❯
//       </button>

//       <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
//         {images.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => goToSlide(index)}
//             className={`w-3 h-3 rounded-full ${
//               index === currentIndex ? 'bg-white' : 'bg-gray-400'
//             }`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

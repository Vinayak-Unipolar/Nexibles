"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Instagram } from "lucide-react";

export default function NexiblesInstagramSection() {
  const [instaFeed] = useState([
    {
      image: `${process.env.NEXT_PUBLIC_CDN_URL}/insta01.png`,
      link: "https://www.instagram.com/p/DIoW4DAhBKE/",
    },
    {
      image: `${process.env.NEXT_PUBLIC_CDN_URL}/insta02.png`, 
      link: "https://www.instagram.com/p/DIly2SjRiNh/",
    },
    {
      image: `${process.env.NEXT_PUBLIC_CDN_URL}/insta03.png`, 
      link: "https://www.instagram.com/p/DIjapyIIxLs/?img_index=1",
    },
  ]);

  const [brandLogos, setBrandLogos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const NEXI_CDN_URL = process.env.NEXT_PUBLIC_CDN_URL;

  useEffect(() => {
    async function fetchBrands() {
      try {
        setIsLoading(true);
        const res = await fetch("https://nexiblesapp.barecms.com/api/clients", {
          headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
            'Expires': '0'
          }
        });
        
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const data = await res.json();
        
        // Validate and clean the data
        const validLogos = Array.isArray(data) 
          ? data.filter(logo => 
              logo && 
              logo.id && 
              logo.image && 
              typeof logo.image === 'string'
            )
          : [];
        
        setBrandLogos(validLogos);
      } catch (error) {
        console.error("Failed to fetch brand logos:", error);
        setBrandLogos([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchBrands();
  }, []);

  // Duplicate logos to create infinite scroll effect
  const duplicatedLogos = [...brandLogos];

  return (
    <div className="px-4 py-8 bg-white sm:px-6 lg:px-8">
      {/* Section Title */}
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="mb-2 text-3xl font-bold sm:text-4xl">
          Nexibles On Instagram
        </h2>
        <p className="mb-8 text-gray-smartest-600">#Nexibles</p>
      </div>

      {/* Instagram Feed - Grid layout */}
      <div className="max-w-3xl mx-auto grid grid-cols-3 mb-12 gap-[0.2px]">
        {instaFeed.map((post, idx) => (
          <a
            key={idx}
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            className="relative block overflow-hidden group aspect-square"
          >
            <Image
<<<<<<< HEAD
              src={post.image} // Use the imported image object
              alt="Instagram Post"
=======
              src={post.image}
              alt={`Instagram Post ${idx + 1}`}
>>>>>>> f5f8f5824d4127c3a374ddebcbddb24f07c136ec
              fill
              sizes="(max-width: 768px) 33vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 opacity-0 bg-black/50 group-hover:opacity-100">
              <Instagram size={24} className="w-6 h-6 text-white sm:w-12 sm:h-12" />
            </div>
          </a>
        ))}
      </div>

      {/* Infinite Marquee for Brand Logos */}
      <div className="relative w-full pt-8 overflow-hidden">
<<<<<<< HEAD
        {isLoading ? (
          <div className="flex justify-center items-center h-24">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        ) : brandLogos.length > 0 ? (
          <motion.div
            className="flex space-x-8 w-max"
            animate={{ 
              x: [0, -((brandLogos.length * 110) / 2)], 
            }}
            transition={{
              duration: brandLogos.length * 0.75, // Increased speed
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear",
            }}
          >
            {duplicatedLogos.map((brand, idx) => (
              <div
                key={`${brand.id}-${idx}`}
                className="flex items-center justify-center flex-shrink-0 w-24 h-24"
              >
                <Image
                  src={
                    NEXI_CDN_URL && brand.image
                      ? `${NEXI_CDN_URL}/clients/${brand.image}`
                      : "/placeholder.png"
                  }
                  alt={brand.name || `Brand ${brand.id}`}
                  width={96}
                  height={96}
                  className="object-contain hover:scale-110 transition-transform duration-300 ease-in-out"
                  onError={(e) => {
                    console.error(
                      `Failed to load image: ${NEXI_CDN_URL}/clients/${brand.image}`
                    );
                    e.target.src = "/placeholder.png";
                  }}
                />
              </div>
            ))}
          </motion.div>
        ) : (
          <p className="text-center text-gray-500">No brand logos available</p>
        )}
=======
        <motion.div
          className="flex space-x-8 w-max"
          animate={{ x: ["0%", "-15%"] }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 20,
            ease: "linear",
          }}
        >
          {[...brandLogos, ...brandLogos].map((brand, idx) => (
            <div
              key={`${brand.id}-${idx}`}
              className="flex items-center justify-center flex-shrink-0 w-16 h-16 sm:w-24 sm:h-24"
            >
              <Image
                src={
                  NEXI_CDN_URL && brand.image
                    ? `${NEXI_CDN_URL}/clients/${brand.image}`
                    : "/placeholder.png"
                }
                alt={`Brand ${brand.id}`}
                width={60}
                height={60}
                className="object-contain"
                onError={(e) => {
                  console.error(
                    `Failed to load image: ${NEXI_CDN_URL}/clients/${brand.image}`
                  );
                  e.target.src = "/placeholder.png";
                }}
              />
            </div>
          ))}
        </motion.div>
>>>>>>> a6b9638413e753e969226350f3a2bea08484a71f
      </div>
    </div>
  );
}



// "use client";
// import React, { useState, useEffect } from "react";
// import Image from "next/image";
// import { motion } from "framer-motion";

// export default function NexiblesInstagramSection() {
//   const [instaFeed] = useState([
//     { 
//       image: "/insta/insta01.png",
//       link: "https://www.instagram.com/p/DIoW4DAhBKE/",
//     },
//     {
//       image: "/insta/insta02.png",
//       link: "https://www.instagram.com/p/DIly2SjRiNh/",
//     },
//     {
//       image: "/insta/insta03.png",
//       link: "https://www.instagram.com/p/DIjapyIIxLs/?img_index=1",
//     },
//   ]);

//   const [brandLogos, setBrandLogos] = useState([]);
//   const NEXI_CDN_URL = process.env.NEXT_PUBLIC_CDN_URL; // Fallback for safety

//   useEffect(() => {
//     async function fetchBrands() {
//       try {
//         const res = await fetch("https://nexiblesapp.barecms.com/api/clients");
//         const data = await res.json();
//         if (Array.isArray(data)) {
//           setBrandLogos(data);
//         }
//       } catch (error) {
//         console.error("Failed to fetch brand logos:", error);
//       }
//     }

//     fetchBrands();
//   }, []);

//   return (
//     <div className="bg-white py-8 px-4 sm:px-6 lg:px-8">
//       {/* Section Title */}
//       <div className="max-w-5xl mx-auto text-center">
//         <h2 className="text-3xl sm:text-4xl font-bold mb-2">
//           Nexibles On Instagram
//         </h2>
//         <p className="text-gray-600 mb-8">#Nexibles</p>
//       </div>

//       {/* Instagram Feed */}
//       <div className="max-w-3xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-0.5 mb-12">
//         {instaFeed.map((post, idx) => (
//           <div
//             key={idx}
//             className="relative overflow-hidden  group aspect-square "
//           >
//             <Image
//               src={post.image}
//               alt="Instagram Post"
//               fill
//               sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 25vw"
//               className="object-cover"
//             />
//             <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//               <a
//                 href={post.link}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-white text-3xl"
//               >
//                 <svg
//                   fill="currentColor"
//                   viewBox="0 0 448 512"
//                   className="w-12 h-12"
//                 >
//                   <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.6 ... (svg trimmed)" />
//                 </svg>
//               </a>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Infinite Marquee */}
//       <div className="relative overflow-hidden w-full pt-8">
//         <motion.div
//           className="flex space-x-8 w-max"
//           animate={{ x: ["0%", "-15%"] }} // Translate by half the total width for seamless looping
//           transition={{
//             repeat: Infinity,
//             repeatType: "loop",
//             duration: 20, // Adjust duration for desired speed
//             ease: "linear",
//           }}
//         >
//           {[...brandLogos, ...brandLogos].map((brand, idx) => (
//             <div
//               key={`${brand.id}-${idx}`}
//               className="w-24 h-24 flex-shrink-0 flex items-center justify-center"
//             >
//               <Image
//                 src={
//                   NEXI_CDN_URL && brand.image
//                     ? `${NEXI_CDN_URL}/clients/${brand.image}`
//                     : "/placeholder.png"
//                 }
//                 alt={`Brand ${brand.id}`}
//                 width={80}
//                 height={80}
//                 className="object-contain"
//                 onError={(e) => {
//                   console.error(
//                     `Failed to load image: ${NEXI_CDN_URL}/clients/${brand.image}`
//                   );
//                   e.target.src = "/placeholder.png";
//                 }}
//               />
//             </div>
//           ))}
//         </motion.div>
//       </div>
//     </div>
//   );
// }










// "use client";
// import React, { useState, useEffect } from "react";
// import Image from "next/image";
// import { motion } from "framer-motion";

// export default function NexiblesInstagramSection() {
//   const [instaFeed] = useState([
//     {
//       image: "/insta-post1.jpg",
//       link: "https://www.instagram.com/p/XXXXXXXX/",
//     },
//     {
//       image: "/insta-post2.jpg",
//       link: "https://www.instagram.com/p/XXXXXXXX/",
//     },
//     {
//       image: "/insta-post3.jpg",
//       link: "https://www.instagram.com/p/XXXXXXXX/",
//     },
//   ]);

//   const [brandLogos, setBrandLogos] = useState([]);
//   const NEXI_CDN_URL = process.env.NEXT_PUBLIC_CDN_URL; // Fallback for safety

//   useEffect(() => {
//     async function fetchBrands() {
//       try {
//         const res = await fetch("https://nexiblesapp.barecms.com/api/clients");
//         const data = await res.json();
//         if (Array.isArray(data)) {
//           setBrandLogos(data);
//         }
//       } catch (error) {
//         console.error("Failed to fetch brand logos:", error);
//       }
//     }

//     fetchBrands();
//   }, []);

//   return (
//     <div className="bg-white py-8 px-4 sm:px-6 lg:px-8">
//       {/* Section Title */}
//       <div className="max-w-5xl mx-auto text-center">
//         <h2 className="text-3xl sm:text-4xl font-bold mb-2">
//           Nexibles On Instagram
//         </h2>
//         <p className="text-gray-600 mb-8">#Nexibles</p>
//       </div>

//       {/* Instagram Feed */}
//       <div className="max-w-3xl mx-auto grid grid-cols-2 md:grid-cols-3 mb-12">
//         {instaFeed.map((post, idx) => (
//           <div
//             key={idx}
//             className="relative overflow-hidden  group aspect-square "
//           >
//             <Image
//               src={post.image}
//               alt="Instagram Post"
//               fill
//               sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 25vw"
//               className="object-cover"
//             />
//             <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//               <a
//                 href={post.link}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-white text-3xl"
//               >
//                 <svg
//                   fill="currentColor"
//                   viewBox="0 0 448 512"
//                   className="w-12 h-12"
//                 >
//                   <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.6 ... (svg trimmed)" />
//                 </svg>
//               </a>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Infinite Marquee */}
//       <div className="relative overflow-hidden w-full pt-8">
//         <motion.div
//           className="flex space-x-8 w-max"
//           animate={{ x: ["0%", "-30%"] }}
//           transition={{
//             repeat: Infinity,
//             repeatType: "loop",
//             duration: 30,
//             ease: "linear",
//           }}
//         >
//           {[...brandLogos, ...brandLogos].map((brand, idx) => (
//             <div
//               key={`${brand.id}-${idx}`}
//               className="w-24 h-24 flex-shrink-0 flex items-center justify-center"
//             >
//               <Image
//                 src={
//                   NEXI_CDN_URL && brand.image
//                     ? `${NEXI_CDN_URL}/clients/${brand.image}`
//                     : "/placeholder.png"
//                 }
//                 alt={`Brand ${brand.id}`}
//                 width={80}
//                 height={80}
//                 className="object-contain"
//                 onError={(e) => {
//                   console.error(
//                     `Failed to load image: ${NEXI_CDN_URL}/clients/${brand.image}`
//                   );
//                   e.target.src = "/placeholder.png";
//                 }}
//               />
//             </div>
//           ))}
//         </motion.div>
//       </div>
//     </div>
//   );
// }






// "use client";
// import React, { useState, useEffect } from "react";
// import Image from "next/image";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// export default function NexiblesInstagramSection() {
//   const [instaFeed] = useState([
//     {
//       image: "/insta-post1.jpg",
//       link: "https://www.instagram.com/p/XXXXXXXX/",
//     },
//     {
//       image: "/insta-post2.jpg",
//       link: "https://www.instagram.com/p/XXXXXXXX/",
//     },
//     {
//       image: "/insta-post3.jpg",
//       link: "https://www.instagram.com/p/XXXXXXXX/",
//     },
//   ]);

//   const [brandLogos, setBrandLogos] = useState([]);
//   const NEXI_CDN_URL = process.env.NEXT_PUBLIC_CDN_URL;

//   useEffect(() => {
//     async function fetchBrands() {
//       try {
//         const res = await fetch("https://nexiblesapp.barecms.com/api/clients");
//         const data = await res.json();
//         if (Array.isArray(data)) {
//           setBrandLogos(data);
//         }
//       } catch (error) {
//         console.error("Failed to fetch brand logos:", error);
//       }
//     }

//     fetchBrands();
//   }, []);

//   const sliderSettings = {
//     infinite: true,
//     speed: 2000, // Smoother transition duration
//     slidesToShow: Math.min(brandLogos.length, 12), // Show up to 12 logos
//     slidesToScroll: 3, // Scroll 3 logos at a time for smoother flow
//     autoplay: true,
//     autoplaySpeed: 3000, // Slight pause for stability
//     cssEase: "linear", // Linear easing for consistent motion
//     arrows: false,
//     draggable: true,
//     centerMode: true,
//     centerPadding: "0px",
//     pauseOnHover: false,
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: Math.min(brandLogos.length, 8),
//           slidesToScroll: 2,
//         },
//       },
//       {
//         breakpoint: 768,
//         settings: {
//           slidesToShow: Math.min(brandLogos.length, 4),
//           slidesToScroll: 1,
//         },
//       },
//       {
//         breakpoint: 480,
//         settings: {
//           slidesToShow: Math.min(brandLogos.length, 2),
//           slidesToScroll: 1,
//         },
//       },
//     ],
//   };

//   return (
//     <div className="bg-white py-8 px-4 sm:px-6 lg:px-8">
//       <style jsx>{`
//         .slick-track {
//           display: flex;
//           align-items: center;
//         }
//         .slick-slide img {
//           transition: transform 0.3s ease;
//         }
//       `}</style>

//       {/* Section Title */}
//       <div className="max-w-5xl mx-auto text-center">
//         <h2 className="text-3xl sm:text-4xl font-bold mb-2">
//           Nexibles On Instagram
//         </h2>
//         <p className="text-gray-600 mb-8">#Nexibles</p>
//       </div>

//       {/* Instagram Feed */}
//       <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-3 mb-12">
//         {instaFeed.map((post, idx) => (
//           <div
//             key={idx}
//             className="relative overflow-hidden group aspect-square"
//           >
//             <Image
//               src={post.image}
//               alt="Instagram Post"
//               fill
//               sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 25vw"
//               className="object-cover"
//             />
//             <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//               <a
//                 href={post.link}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-white text-3xl"
//               >
//                 <svg
//                   fill="currentColor"
//                   viewBox="0 0 448 512"
//                   className="w-12 h-12"
//                 >
//                   <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.6 ... (svg trimmed)" />
//                 </svg>
//               </a>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Brand Logos Slider */}
//       <div className="w-full pt-8">
//         {brandLogos.length > 0 ? (
//           <Slider {...sliderSettings}>
//             {brandLogos.map((brand) => (
//               <div
//                 key={brand.id}
//                 className="flex items-center justify-center px-4"
//               >
//                 <div className="w-24 h-24 flex items-center justify-center">
//                   <Image
//                     src={
//                       NEXI_CDN_URL && brand.image
//                         ? `${NEXI_CDN_URL}/clients/${brand.image}`
//                         : "/placeholder.png"
//                     }
//                     alt={`Brand ${brand.id}`}
//                     width={80}
//                     height={80}
//                     className="object-contain"
//                     onError={(e) => {
//                       console.error(
//                         `Failed to load image: ${NEXI_CDN_URL}/clients/${brand.image}`
//                       );
//                       e.target.src = "/placeholder.png";
//                     }}
//                   />
//                 </div>
//               </div>
//             ))}
//           </Slider>
//         ) : (
//           <div className="text-center text-gray-600">Loading brands...</div>
//         )}
//       </div>
//     </div>
//   );
// }

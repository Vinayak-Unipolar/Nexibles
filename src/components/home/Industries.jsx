"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

const Industries = () => {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );
  const [industries, setIndustries] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const APIURL = process.env.NEXT_PUBLIC_API_URL;
  const CDN_URL = process.env.NEXT_PUBLIC_CDN_URL;
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.5,
    margin: "0px 0px -100px 0px",
  });

  useEffect(() => {
    const fetchIndustries = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${APIURL}/api/industries`);
        if (!res.ok) throw new Error("Failed to fetch industries");
        const data = await res.json();
        if (Array.isArray(data)) setIndustries(data);
        else throw new Error("Invalid data format");
      } catch (err) {
        console.error("Failed to fetch industries", err);
        setError("Failed to load industries. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchIndustries();
  }, [APIURL]);

  // Update window width on resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 768;
  const desktopCardWidth = 340;
  const desktopGap = 32;
  const mobileCardWidth = 200;
  const mobileGap = 16;

  const cardWidth = isMobile ? mobileCardWidth : desktopCardWidth;
  const gap = isMobile ? mobileGap : desktopGap;
  const visibleCount = 4;
  const viewportWidth = cardWidth * visibleCount + gap * (visibleCount - 1);

  // Auto-slide every 3 seconds, but only when in view
  useEffect(() => {
    if (industries.length === 0 || !isInView || loading) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % Math.max(industries.length, visibleCount));
    }, 3000);
    return () => clearInterval(interval);
  }, [industries, isInView, loading]);

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? Math.max(industries.length, visibleCount) - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.max(industries.length, visibleCount));
  };

  // Create a circular array for continuous scrolling
  const getCircularArray = () => {
    if (industries.length === 0) return Array(visibleCount).fill({ name: "Loading...", image: "/placeholder.png" });
    const displayItems = [...industries];
    const minItems = Math.max(industries.length, visibleCount + 1);
    for (let i = 0; i < minItems; i++) {
      displayItems.push(industries[i % industries.length]);
    }
    return displayItems;
  };

  const circularItems = getCircularArray();

  // Framer Motion variants for animations
  const titleVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" },
    }),
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4, delay: 0.6, ease: "easeOut" } },
  };

  return (
    <div ref={sectionRef} className="bg-white py-8 px-4 sm:px-6 lg:px-8 mt-[-16vh] md:mt-0">
      {loading && <div className="py-4 text-center">Loading industries...</div>}
      {error && <div className="py-4 text-center text-red-500">{error}</div>}
      {!loading && !error && (
        <>
          <motion.div
            className="mx-auto mt-4 text-3xl font-bold text-center text-gray-800 pb md:text-4xl"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={titleVariants}
          >
            Explore Industries
          </motion.div>
          <div
            className="relative mx-auto mt-6 overflow-hidden md:mt-12"
            style={{ width: `${viewportWidth}px`, maxWidth: "100%" }}
          >
            <motion.div
              className="flex"
              style={{ gap: `${gap}px` }}
              animate={isInView ? { x: -(cardWidth + gap) * currentIndex } : { x: 0 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
            >
              {circularItems.map((category, index) => (
                <motion.div
                  key={`${category.name}-${index}`}
                  style={{ flex: "0 0 auto", width: `${cardWidth}px` }}
                  custom={index}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  variants={cardVariants}
                >
                  <Link
                    href={`/industries/${category.name
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                    className="p-2 pb-4  rounded-xl"
                  >
                    <div className="relative h-48 md:h-[400px] w-full flex items-center justify-center">
                      <Image
                        src={`${CDN_URL}/industries/${category.image}`}
                        width={400}
                        height={400}
                        alt={`Image for ${category.name}`}
                        quality={100}
                        className="object-contain w-full h-full pt-2"
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />
                    </div>
                    <div className="flex flex-col items-center justify-center mt-2 mx-[22px] text-center">
                      <div
                        className="w-full px-2 py-1 text-xs font-semibold text-center text-gray-900 truncate transition-all duration-300 bg-[#ffd13e] rounded-lg sm:px-3 sm:py-2 md:text-lg hover:bg-yellow-500"
                      >
                        {category.name}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
            {/* Prev Button */}
            <motion.button
              onClick={handlePrev}
              className="absolute left-0 z-10 p-2 -ml-3 transition-all transform -translate-y-1/2 bg-white rounded-full shadow-md top-1/2 bg-opacity-80 hover:bg-opacity-100"
              aria-label="Previous"
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={buttonVariants}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </motion.button>
            {/* Next Button */}
            <motion.button
              onClick={handleNext}
              className="absolute right-0 z-10 p-2 -mr-3 transition-all transform -translate-y-1/2 bg-white rounded-full shadow-md top-1/2 bg-opacity-80 hover:bg-opacity-100"
              aria-label="Next"
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={buttonVariants}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </motion.button>
          </div>
        </>
      )}
    </div>
  );
};

export default Industries;


// "use client";
// import React, { useState, useEffect, useRef } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { motion, useInView } from "framer-motion";

// const Industries = () => {
//   const [windowWidth, setWindowWidth] = useState(
//     typeof window !== "undefined" ? window.innerWidth : 1200
//   );
//   const [industries, setIndustries] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const APIURL = process.env.NEXT_PUBLIC_API_URL;
//   const NEXI_CDN_URL = process.env.NEXT_PUBLIC_CDNNEW_URL;
//   const sectionRef = useRef(null);
//   const isInView = useInView(sectionRef, {
//     once: true,
//     amount: 0.5,
//     margin: "0px 0px -100px 0px",
//   });

//   // Fetch industries data
//   useEffect(() => {
//     const fetchIndustries = async () => {
//       try {
//         setLoading(true);
//         const res = await fetch(`${APIURL}/api/industries`);
//         if (!res.ok) throw new Error("Failed to fetch industries");
//         const data = await res.json();
//         if (Array.isArray(data)) setIndustries(data);
//         else throw new Error("Invalid data format");
//       } catch (err) {
//         console.error("Failed to fetch industries", err);
//         setError("Failed to load industries. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchIndustries();
//   }, [APIURL]);

//   // Update window width on resize
//   useEffect(() => {
//     const handleResize = () => setWindowWidth(window.innerWidth);
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const isMobile = windowWidth < 768;
//   const desktopCardWidth = 340;
//   const desktopGap = 32;
//   const mobileCardWidth = 200;
//   const mobileGap = 16;

//   const cardWidth = isMobile ? mobileCardWidth : desktopCardWidth;
//   const gap = isMobile ? mobileGap : desktopGap;
//   const visibleCount = 4;
//   const viewportWidth = cardWidth * visibleCount + gap * (visibleCount - 1);

//   // Auto-slide every 3 seconds, but only when in view
//   useEffect(() => {
//     if (industries.length === 0 || !isInView || loading) return;
//     const interval = setInterval(() => {
//       setCurrentIndex((prev) => (prev + 1) % Math.max(industries.length, visibleCount));
//     }, 3000);
//     return () => clearInterval(interval);
//   }, [industries, isInView, loading]);

//   const handlePrev = () => {
//     setCurrentIndex((prev) =>
//       prev === 0 ? Math.max(industries.length, visibleCount) - 1 : prev - 1
//     );
//   };

//   const handleNext = () => {
//     setCurrentIndex((prev) => (prev + 1) % Math.max(industries.length, visibleCount));
//   };

//   // Helper function to determine image URL with format fallback
//   const getImageUrl = (image) => {
//     if (!image || !NEXI_CDN_URL) return "/placeholder.png";
    
//     // Remove any existing extension if present
//     const baseImageName = image.replace(/\.(webp|png)$/i, "");
    
//     // Try .webp first, then .png
//     // For simplicity, we assume .webp is preferred, but you can modify this logic
//     const extension = ".webp"; // Default to .webp
//     return `${NEXI_CDN_URL}/industries/${baseImageName}${extension}`;
//   };

//   // Create a circular array for continuous scrolling
//   const getCircularArray = () => {
//     if (industries.length === 0)
//       return Array(visibleCount).fill({
//         name: "Loading...",
//         image: "/placeholder.png",
//       });
//     const displayItems = [...industries];
//     const minItems = Math.max(industries.length, visibleCount + 1);
//     for (let i = 0; i < minItems; i++) {
//       displayItems.push(industries[i % industries.length]);
//     }
//     return displayItems;
//   };

//   const circularItems = getCircularArray();

//   // Framer Motion variants for animations
//   const titleVariants = {
//     hidden: { opacity: 0, x: -100 },
//     visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
//   };

//   const cardVariants = {
//     hidden: { opacity: 0, y: 50 },
//     visible: (i) => ({
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" },
//     }),
//   };

//   const buttonVariants = {
//     hidden: { opacity: 0, scale: 0.8 },
//     visible: { opacity: 1, scale: 1, transition: { duration: 0.4, delay: 0.6, ease: "easeOut" } },
//   };

//   return (
//     <div ref={sectionRef} className="bg-white py-8 px-4 sm:px-6 lg:px-8 mt-[-16vh] md:mt-0">
//       {loading && <div className="py-4 text-center">Loading industries...</div>}
//       {error && <div className="py-4 text-center text-red-500">{error}</div>}
//       {!loading && !error && (
//         <>
//           <motion.div
//             className="mx-auto mt-4 text-3xl font-bold text-center text-gray-800 pb md:text-4xl"
//             initial="hidden"
//             animate={isInView ? "visible" : "hidden"}
//             variants={titleVariants}
//           >
//             Explore Industries
//           </motion.div>
//           <div
//             className="relative mx-auto mt-6 overflow-hidden md:mt-12"
//             style={{ width: `${viewportWidth}px`, maxWidth: "100%" }}
//           >
//             <motion.div
//               className="flex"
//               style={{ gap: `${gap}px` }}
//               animate={isInView ? { x: -(cardWidth + gap) * currentIndex } : { x: 0 }}
//               transition={{ duration: 0.7, ease: "easeInOut" }}
//             >
//               {circularItems.map((category, index) => (
//                 <motion.div
//                   key={`${category.name}-${index}`}
//                   style={{ flex: "0 0 auto", width: `${cardWidth}px` }}
//                   custom={index}
//                   initial="hidden"
//                   animate={isInView ? "visible" : "hidden"}
//                   variants={cardVariants}
//                 >
//                   <Link
//                     href={`/industries/${category.name
//                       .toLowerCase()
//                       .replace(/\s+/g, "-")}`}
//                     className="overflow-hidden bg-black rounded-xl"
//                   >
//                     <div className="relative h-48 md:h-[400px] w-full flex items-center justify-center">
//                       <Image
//                         src={getImageUrl(category.image)}
//                         width={400}
//                         height={400}
//                         alt={`Image for ${category.name}`}
//                         quality={100}
//                         className="object-contain w-full h-full pt-2"
//                         sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
//                         onError={(e) => {
//                           console.error(`Failed to load image: ${getImageUrl(category.image)}`);
//                           // Try .png if .webp fails
//                           if (e.target.src.includes(".webp")) {
//                             e.target.src = getImageUrl(category.image).replace(".webp", ".png");
//                           } else {
//                             e.target.src = "/placeholder.png"; // Final fallback
//                           }
//                         }}
//                       />
//                     </div>
//                     <div className="flex flex-col items-center justify-center mt-2 mx-[22px] text-center">
//                       <div className="w-full px-2 py-1 text-xs font-semibold text-center text-gray-900 truncate transition-all duration-300 bg-[#ffd13e] rounded-lg sm:px-3 sm:py-2 md:text-lg hover:bg-yellow-500">
//                         {category.name}
//                       </div>
//                     </div>
//                   </Link>
//                 </motion.div>
//               ))}
//             </motion.div>
//             {/* Prev Button */}
//             <motion.button
//               onClick={handlePrev}
//               className="absolute left-0 z-10 p-2 -ml-3 transition-all transform -translate-y-1/2 bg-white rounded-full shadow-md top-1/2 bg-opacity-80 hover:bg-opacity-100"
//               aria-label="Previous"
//               initial="hidden"
//               animate={isInView ? "visible" : "hidden"}
//               variants={buttonVariants}
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 className="w-5 h-5"
//               >
//                 <polyline points="15 18 9 12 15 6" />
//               </svg>
//             </motion.button>
//             {/* Next Button */}
//             <motion.button
//               onClick={handleNext}
//               className="absolute right-0 z-10 p-2 -mr-3 transition-all transform -translate-y-1/2 bg-white rounded-full shadow-md top-1/2 bg-opacity-80 hover:bg-opacity-100"
//               aria-label="Next"
//               initial="hidden"
//               animate={isInView ? "visible" : "hidden"}
//               variants={buttonVariants}
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 className="w-5 h-5"
//               >
//                 <polyline points="9 18 15 12 9 6" />
//               </svg>
//             </motion.button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default Industries;










// "use client";
// import React, { useState, useEffect, useRef } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { motion, useInView } from "framer-motion";

// const Industries = () => {
//   const [windowWidth, setWindowWidth] = useState(
//     typeof window !== "undefined" ? window.innerWidth : 1200
//   );
//   const [industries, setIndustries] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const APIURL = process.env.NEXT_PUBLIC_API_URL;
//   // const CDN_URL = process.env.NEXT_PUBLIC_CDN_URL; // No longer needed
//   const NEXI_CDN_URL = process.env.NEXT_NEXIBLES_CDN_URL || "https://cdn.nexibles.com"; // Fallback to known working CDN
//   const sectionRef = useRef(null);
//   const isInView = useInView(sectionRef, {
//     once: true,
//     amount: 0.5,
//     margin: "0px 0px -100px 0px",
//   });

//   // Fetch industries data
//   useEffect(() => {
//     const fetchIndustries = async () => {
//       try {
//         setLoading(true);
//         const res = await fetch(`${APIURL}/api/industries`);
//         if (!res.ok) throw new Error("Failed to fetch industries");
//         const data = await res.json();
//         if (Array.isArray(data)) setIndustries(data);
//         else throw new Error("Invalid data format");
//       } catch (err) {
//         console.error("Failed to fetch industries", err);
//         setError("Failed to load industries. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchIndustries();
//   }, [APIURL]);

//   // Update window width on resize
//   useEffect(() => {
//     const handleResize = () => setWindowWidth(window.innerWidth);
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const isMobile = windowWidth < 768;
//   const desktopCardWidth = 340;
//   const desktopGap = 32;
//   const mobileCardWidth = 200;
//   const mobileGap = 16;

//   const cardWidth = isMobile ? mobileCardWidth : desktopCardWidth;
//   const gap = isMobile ? mobileGap : desktopGap;
//   const visibleCount = 4;
//   const viewportWidth = cardWidth * visibleCount + gap * (visibleCount - 1);

//   // Auto-slide every 3 seconds, but only when in view
//   useEffect(() => {
//     if (industries.length === 0 || !isInView || loading) return;
//     const interval = setInterval(() => {
//       setCurrentIndex((prev) => (prev + 1) % Math.max(industries.length, visibleCount));
//     }, 3000);
//     return () => clearInterval(interval);
//   }, [industries, isInView, loading]);

//   const handlePrev = () => {
//     setCurrentIndex((prev) =>
//       prev === 0 ? Math.max(industries.length, visibleCount) - 1 : prev - 1
//     );
//   };

//   const handleNext = () => {
//     setCurrentIndex((prev) => (prev + 1) % Math.max(industries.length, visibleCount));
//   };

//   // Create a circular array for continuous scrolling
//   const getCircularArray = () => {
//     if (industries.length === 0)
//       return Array(visibleCount).fill({
//         name: "Loading...",
//         image: "/placeholder.png", // Ensure a placeholder image exists in /public
//       });
//     const displayItems = [...industries];
//     const minItems = Math.max(industries.length, visibleCount + 1);
//     for (let i = 0; i < minItems; i++) {
//       displayItems.push(industries[i % industries.length]);
//     }
//     return displayItems;
//   };

//   const circularItems = getCircularArray();

//   // Framer Motion variants for animations
//   const titleVariants = {
//     hidden: { opacity: 0, x: -100 },
//     visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
//   };

//   const cardVariants = {
//     hidden: { opacity: 0, y: 50 },
//     visible: (i) => ({
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" },
//     }),
//   };

//   const buttonVariants = {
//     hidden: { opacity: 0, scale: 0.8 },
//     visible: { opacity: 1, scale: 1, transition: { duration: 0.4, delay: 0.6, ease: "easeOut" } },
//   };

//   return (
//     <div ref={sectionRef} className="bg-white py-8 px-4 sm:px-6 lg:px-8 mt-[-16vh] md:mt-0">
//       {loading && <div className="py-4 text-center">Loading industries...</div>}
//       {error && <div className="py-4 text-center text-red-500">{error}</div>}
//       {!loading && !error && (
//         <>
//           <motion.div
//             className="mx-auto mt-4 text-3xl font-bold text-center text-gray-800 pb md:text-4xl"
//             initial="hidden"
//             animate={isInView ? "visible" : "hidden"}
//             variants={titleVariants}
//           >
//             Explore Industries
//           </motion.div>
//           <div
//             className="relative mx-auto mt-6 overflow-hidden md:mt-12"
//             style={{ width: `${viewportWidth}px`, maxWidth: "100%" }}
//           >
//             <motion.div
//               className="flex"
//               style={{ gap: `${gap}px` }}
//               animate={isInView ? { x: -(cardWidth + gap) * currentIndex } : { x: 0 }}
//               transition={{ duration: 0.7, ease: "easeInOut" }}
//             >
//               {circularItems.map((category, index) => (
//                 <motion.div
//                   key={`${category.name}-${index}`}
//                   style={{ flex: "0 0 auto", width: `${cardWidth}px` }}
//                   custom={index}
//                   initial="hidden"
//                   animate={isInView ? "visible" : "hidden"}
//                   variants={cardVariants}
//                 >
//                   <Link
//                     href={`/industries/${category.name
//                       .toLowerCase()
//                       .replace(/\s+/g, "-")}`}
//                     className="overflow-hidden bg-black rounded-xl"
//                   >
//                     <div className="relative h-48 md:h-[400px] w-full flex items-center justify-center">
//                       <Image
//                         src={
//                           NEXI_CDN_URL && category.image
//                             ? `${NEXI_CDN_URL}/industries/${category.image}`
//                             : "/placeholder.png" // Fallback to placeholder if URL or image is missing
//                         }
//                         width={400}
//                         height={400}
//                         alt={`Image for ${category.name}`}
//                         quality={100}
//                         className="object-contain w-full h-full pt-2"
//                         sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
//                         onError={(e) => {
//                           console.error(
//                             `Failed to load image: ${NEXI_CDN_URL}/industries/${category.image}`
//                           );
//                           e.target.src = "/placeholder.png"; // Fallback on error
//                         }}
//                       />
//                     </div>
//                     <div className="flex flex-col items-center justify-center mt-2 mx-[22px] text-center">
//                       <div className="w-full px-2 py-1 text-xs font-semibold text-center text-gray-900 truncate transition-all duration-300 bg-[#ffd13e] rounded-lg sm:px-3 sm:py-2 md:text-lg hover:bg-yellow-500">
//                         {category.name}
//                       </div>
//                     </div>
//                   </Link>
//                 </motion.div>
//               ))}
//             </motion.div>
//             {/* Prev Button */}
//             <motion.button
//               onClick={handlePrev}
//               className="absolute left-0 z-10 p-2 -ml-3 transition-all transform -translate-y-1/2 bg-white rounded-full shadow-md top-1/2 bg-opacity-80 hover:bg-opacity-100"
//               aria-label="Previous"
//               initial="hidden"
//               animate={isInView ? "visible" : "hidden"}
//               variants={buttonVariants}
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 className="w-5 h-5"
//               >
//                 <polyline points="15 18 9 12 15 6" />
//               </svg>
//             </motion.button>
//             {/* Next Button */}
//             <motion.button
//               onClick={handleNext}
//               className="absolute right-0 z-10 p-2 -mr-3 transition-all transform -translate-y-1/2 bg-white rounded-full shadow-md top-1/2 bg-opacity-80 hover:bg-opacity-100"
//               aria-label="Next"
//               initial="hidden"
//               animate={isInView ? "visible" : "hidden"}
//               variants={buttonVariants}
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 className="w-5 h-5"
//               >
//                 <polyline points="9 18 15 12 9 6" />
//               </svg>
//             </motion.button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default Industries;




// "use client";
// import React, { useState, useEffect, useRef } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { motion, useInView } from "framer-motion";

// const Industries = () => {
//   const [windowWidth, setWindowWidth] = useState(
//     typeof window !== "undefined" ? window.innerWidth : 1200
//   );
//   const [industries, setIndustries] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const APIURL = process.env.NEXT_PUBLIC_API_URL;
//   const CDN_URL = process.env.NEXT_PUBLIC_CDN_URL;
//   const NEXI_CDN_URL = process.env.NEXT_NEXIBLES_CDN_URL
//   const sectionRef = useRef(null);
//   const isInView = useInView(sectionRef, {
//     once: true,
//     amount: 0.5,
//     margin: "0px 0px -100px 0px", // Delay until section is closer to viewport center
//   });

//   // Fetch industries data
//   useEffect(() => {
//     const fetchIndustries = async () => {
//       try {
//         setLoading(true);
//         const res = await fetch(`${APIURL}/api/industries`);
//         if (!res.ok) throw new Error("Failed to fetch industries");
//         const data = await res.json();
//         if (Array.isArray(data)) setIndustries(data);
//         else throw new Error("Invalid data format");
//       } catch (err) {
//         console.error("Failed to fetch industries", err);
//         setError("Failed to load industries. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchIndustries();
//   }, [APIURL]);

//   // Update window width on resize
//   useEffect(() => {
//     const handleResize = () => setWindowWidth(window.innerWidth);
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const isMobile = windowWidth < 768;
//   const desktopCardWidth = 340;
//   const desktopGap = 32;
//   const mobileCardWidth = 200;
//   const mobileGap = 16;

//   const cardWidth = isMobile ? mobileCardWidth : desktopCardWidth;
//   const gap = isMobile ? mobileGap : desktopGap;
//   const visibleCount = 4;
//   const viewportWidth = cardWidth * visibleCount + gap * (visibleCount - 1);

//   // Auto-slide every 3 seconds, but only when in view
//   useEffect(() => {
//     if (industries.length === 0 || !isInView || loading) return;
//     const interval = setInterval(() => {
//       setCurrentIndex((prev) => (prev + 1) % Math.max(industries.length, visibleCount));
//     }, 3000);
//     return () => clearInterval(interval);
//   }, [industries, isInView, loading]);

//   const handlePrev = () => {
//     setCurrentIndex((prev) =>
//       prev === 0 ? Math.max(industries.length, visibleCount) - 1 : prev - 1
//     );
//   };

//   const handleNext = () => {
//     setCurrentIndex((prev) => (prev + 1) % Math.max(industries.length, visibleCount));
//   };

//   // Create a circular array for continuous scrolling
//   const getCircularArray = () => {
//     if (industries.length === 0) return Array(visibleCount).fill({ name: "Loading...", image: "/placeholder.png" });
//     const displayItems = [...industries];
//     const minItems = Math.max(industries.length, visibleCount + 1);
//     for (let i = 0; i < minItems; i++) {
//       displayItems.push(industries[i % industries.length]);
//     }
//     return displayItems;
//   };

//   const circularItems = getCircularArray();

//   // Framer Motion variants for animations
//   const titleVariants = {
//     hidden: { opacity: 0, x: -100 },
//     visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
//   };

//   const cardVariants = {
//     hidden: { opacity: 0, y: 50 },
//     visible: (i) => ({
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" },
//     }),
//   };

//   const buttonVariants = {
//     hidden: { opacity: 0, scale: 0.8 },
//     visible: { opacity: 1, scale: 1, transition: { duration: 0.4, delay: 0.6, ease: "easeOut" } },
//   };

//   return (
//     <div ref={sectionRef} className="bg-white py-8 px-4 sm:px-6 lg:px-8 mt-[-16vh] md:mt-0">
//       {loading && <div className="py-4 text-center">Loading industries...</div>}
//       {error && <div className="py-4 text-center text-red-500">{error}</div>}
//       {!loading && !error && (
//         <>
//           <motion.div
//             className="mx-auto mt-4 text-3xl font-bold text-center text-gray-800 pb md:text-4xl"
//             initial="hidden"
//             animate={isInView ? "visible" : "hidden"}
//             variants={titleVariants}
//           >
//             Explore Industries
//           </motion.div>
//           <div
//             className="relative mx-auto mt-6 overflow-hidden md:mt-12"
//             style={{ width: `${viewportWidth}px`, maxWidth: "100%" }}
//           >
//             <motion.div
//               className="flex"
//               style={{ gap: `${gap}px` }}
//               animate={isInView ? { x: -(cardWidth + gap) * currentIndex } : { x: 0 }}
//               transition={{ duration: 0.7, ease: "easeInOut" }}
//             >
//               {circularItems.map((category, index) => (
//                 <motion.div
//                   key={`${category.name}-${index}`}
//                   style={{ flex: "0 0 auto", width: `${cardWidth}px` }}
//                   custom={index}
//                   initial="hidden"
//                   animate={isInView ? "visible" : "hidden"}
//                   variants={cardVariants}
//                 >
//                   <Link
//                     href={`/industries/${category.name
//                       .toLowerCase()
//                       .replace(/\s+/g, "-")}`}
//                     className=" overflow-hidden bg-black rounded-xl"
//                   >
//                     <div className="relative h-48 md:h-[400px] w-full flex items-center justify-center">
//                       <Image
//                         src={`${CDN_URL}/industries/${category.image}`}
//                         width={400}
//                         height={400}
//                         alt={`Image for ${category.name}`}
//                         quality={100}
//                         className="object-contain w-full h-full pt-2"
//                         sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
//                       />
//                     </div>
//                     <div className="flex flex-col items-center justify-center mt-2 text-center">
//                       <div
//                         className="w-full px-2 py-1 text-xs font-semibold text-center text-gray-900 truncate transition-all duration-300 bg-[#ffd13e] rounded-lg sm:px-3 sm:py-2 md:text-lg hover:bg-yellow-500 ">
//                         {category.name}
//                       </div>
//                     </div>
//                   </Link>
//                 </motion.div>
//               ))}
//             </motion.div>
//             {/* Prev Button */}
//             <motion.button
//               onClick={handlePrev}
//               className="absolute left-0 z-10 p-2 -ml-3 transition-all transform -translate-y-1/2 bg-white rounded-full shadow-md top-1/2 bg-opacity-80 hover:bg-opacity-100"
//               aria-label="Previous"
//               initial="hidden"
//               animate={isInView ? "visible" : "hidden"}
//               variants={buttonVariants}
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 className="w-5 h-5"
//               >
//                 <polyline points="15 18 9 12 15 6" />
//               </svg>
//             </motion.button>
//             {/* Next Button */}
//             <motion.button
//               onClick={handleNext}
//               className="absolute right-0 z-10 p-2 -mr-3 transition-all transform -translate-y-1/2 bg-white rounded-full shadow-md top-1/2 bg-opacity-80 hover:bg-opacity-100"
//               aria-label="Next"
//               initial="hidden"
//               animate={isInView ? "visible" : "hidden"}
//               variants={buttonVariants}
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 className="w-5 h-5"
//               >
//                 <polyline points="9 18 15 12 9 6" />
//               </svg>
//             </motion.button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default Industries;

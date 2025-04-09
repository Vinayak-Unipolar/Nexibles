"use client";
import React, { useState, useEffect } from "react";

const About = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const images = [
    "https://unicdn.barecms.com/neximedia/machine1.png",
    "https://unicdn.barecms.com/neximedia/machine2.png",
    "https://unicdn.barecms.com/neximedia/machine3.png",
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    setIsMounted(true);
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

  return (
    <div className="h-auto px-4 py-16 sm:px-8 md:px-16 lg:px-24">
      <div className="w-full max-w-4xl h-64 sm:h-80 md:h-96 relative overflow-hidden mx-auto mb-8">
        <img
          src={currentImage}
          alt={`Machine ${currentIndex + 1}`}
          className="w-full h-full object-contain"
        />
      </div>
      <h2 className="font-bold text-white text-center text-3xl sm:text-4xl md:text-5xl mb-8">
        About NEXIBLES
      </h2>
      <div className="text-white">
        <p className="mb-4 text-base sm:text-lg md:text-xl">
          Under the brand name - &apos;NEXt generation flexIBLES&apos;, we look
          forward to taking the idea of flexible packaging to the next level by
          bringing in digital printing as a revolutionary alternative to
          conventional processes of producing flexible packaging. We utilize the
          room for experimentation and creativity to help clients with high
          yielding and quick-quality packaging solutions.
        </p>
        <p className="mb-4 text-base sm:text-lg md:text-xl">
          With an efficient team of experts and experienced professionals, we
          provide converters and end-users with a wide range of custom flexible
          packaging solutions, including pouches, shrink sleeves, labels, and
          roll stock. Our broad range of product packaging solutions enables us
          to meet the demands of a diverse range of market segments.
        </p>
        <p className="mb-4 text-base sm:text-lg md:text-xl">
          Our in-house Quality Control lab also ensures that each produced batch
          satisfies the most stringent quality requirements that the industry
          demands and the product deserves.
        </p>
        <p className="mb-4 text-base sm:text-lg md:text-xl">
          A fully equipped in-house pre-press division translates into quality
          of design &amp; layouts, all under the qualified and watchful eyes of
          our team.
        </p>
      </div>
    </div>
  );
};

export default About;
// 'use client';
// import React, { useState, useEffect } from 'react';

// const About = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isMounted, setIsMounted] = useState(false);
//   const images = [
//     "https://unicdn.barecms.com/neximedia/machine1.png",
//     "https://unicdn.barecms.com/neximedia/machine2.png",
//     "https://unicdn.barecms.com/neximedia/machine3.png"
//   ];

//   const nextSlide = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex === images.length - 1 ? 0 : prevIndex + 1
//     );
//   };

//   useEffect(() => {
//     setIsMounted(true);
//   }, []);

//   useEffect(() => {
//     if (!isMounted) return;
//     const interval = setInterval(() => {
//       nextSlide();
//     }, 3000);

//     return () => clearInterval(interval);
//   }, [isMounted]);

//   if (!isMounted) {
//     return null;
//   }

//   const currentImage = images[currentIndex];

//   return (
//     <div className="h-auto  p-16">
//       <div className="w-full max-w-xl h-64 sm:h-80 relative overflow-hidden mx-auto mb-8">
//         <img
//           src={currentImage}
//           alt={`Machine ${currentIndex + 1}`}
//           className="w-full h-full object-contain"
//         />
//       </div>
//       <h2 className="font-bold text-white text-center text-3xl mb-8">
//         About NEXIBLES
//       </h2>
//       <div className="text-white">
//         <p>
//           Under the brand name - &apos;NEXt generation flexIBLES&apos;, we look
//           forward to taking the idea of flexible packaging to the next level by
//           bringing in digital printing as a revolutionary alternative to
//           conventional processes of producing flexible packaging. We utilize the
//           room for experimentation and creativity to help clients with high
//           yielding and quick-quality packaging solutions.
//         </p>
//         <br />
//         <p>
//           With an efficient team of experts and experienced professionals, we
//           provide converters and end-users with a wide range of custom flexible
//           packaging solutions, including pouches, shrink sleeves, labels, and
//           roll stock. Our broad range of product packaging solutions enables us
//           to meet the demands of a diverse range of market segments.
//         </p>
//         <br />
//         <p>
//           Our in-house Quality Control lab also ensures that each produced batch
//           satisfies the most stringent quality requirements that the industry
//           demands and the product deserves.
//         </p>
//         <br />
//         <p>
//           A fully equipped in-house pre-press division translates into quality
//           of design &amp; layouts, all under the qualified and watchful eyes of
//           our team.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default About;

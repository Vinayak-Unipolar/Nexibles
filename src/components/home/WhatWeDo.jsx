"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import WhatWeDoData from "./WhatWeDoData";

const WhatWeDo = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === WhatWeDoData.length - 1 ? 0 : prevIndex + 1
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

  const currentImage = WhatWeDoData[currentIndex];

  return (
    <section className="bg-pink-300 py-8 md:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="flex flex-col md:flex-row ">
          <div className="w-full md:w-1/2 md:pr-8 mb-8 md:mb-0">
            <h2 className="text-3xl font-bold mb-4 text-white">What We Do</h2>
            <p className="text-white">
              Our extensive expertise in plastics and flexible packaging
              solutions enables us to introduce new ideas and superior execution
              to satisfy the demands of our clients.
            </p>
          </div>
          <div className="w-full md:w-1/2 flex items-center justify-center">
            <div className="relative w-full h-64 sm:h-80 md:h-96">
              <Image
                src={currentImage.imageSrc}
                alt={currentImage.alt}
                layout="fill"
                objectFit="contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;

// "use client";
// import React, { useState, useEffect } from "react";
// import Image from "next/image";
// import WhatWeDoData from "./WhatWeDoData";

// const WhatWeDo = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isMounted, setIsMounted] = useState(false);

//   const nextSlide = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex === WhatWeDoData.length - 1 ? 0 : prevIndex + 1
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

//   const currentImage = WhatWeDoData[currentIndex];

//   return (
//     <section className="bg-pink-300 py-4">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
//         <div className="flex flex-col md:flex-row p-8">
//           <div className="w-full md:w-1/2 pr-0 md:pr-8 mb-6 md:mb-0 lg:ml-">
//             <h2 className="text-3xl font-bold mb-4 text-white">What We Do</h2>
//             <p className="text-white">
//               Our extensive expertise in plastics and flexible packaging solutions enables us to introduce new
//               ideas and superior execution to satisfy the demands of our clients.
//             </p>
//           </div>
//           <div className="w-full md:w-1/2 flex items-center justify-center h-[22rem] mt-[-6rem]">
//             <div className="relative w-full h-64 md:h-80">
//               <img
//                 src={currentImage.imageSrc}
//                 alt={currentImage.alt}
//                 width={currentImage.width}
//                 height={currentImage.height}
//                 style={{ objectFit: 'contain', width: '120%', height: '120%' }}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default WhatWeDo;

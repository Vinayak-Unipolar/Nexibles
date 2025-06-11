import React from 'react';

const ImageDescriptionSection = ({ a_plus_content }) => {
  return (
    <div className="bg-gray-50 rounded-xl p-8 mx-auto shadow-sm transition-all duration-300">
      {/* Section Heading */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Product Description</h2>

      {/* A+ Content */}
      <div className="space-y-4">
        {a_plus_content && a_plus_content.trim() ? (
          <p
            className="text-gray-600 leading-6 sm:leading-7 text-sm sm:text-base"
            dangerouslySetInnerHTML={{ __html: a_plus_content.replace(/\n/g, '<br>') }}
          />
        ) : (
          <p className="text-gray-600 text-sm sm:text-base">No description available</p>
        )}
      </div>
    </div>
  );
};

export default ImageDescriptionSection;


















// import React from 'react';
// import { motion, useReducedMotion } from 'framer-motion';

// const ImageDescriptionSection = (a_plus_content) => {
//   const descriptionImages = [
//     {
//       src: 'https://cdn.nexibles.com/Individual-pouch-pages/SUP_Picture_1.webp',
//       alt: 'Organic pouch packaging with high-barrier materials',
//       pointers: [
//         {
//           position: { top: '20%', left: '30%' },
//           data: 'Organic Certified: Made with eco-friendly materials.',
//         },
//         {
//           position: { top: '50%', left: '50%' },
//           data: 'High-Barrier Materials: Protects against moisture and oxygen.',
//         },
//         {
//           position: { top: '80%', left: '40%' },
//           data: 'Resealable Design: Keeps contents fresh for longer.',
//         },
//       ],
//     },
//     {
//       src: 'https://cdn.nexibles.com/Individual-pouch-pages/SUP_Picture_2.webp',
//       alt: 'Motorcycle with VAGARY CNC Aluminum Foldable Brake Clutch Lever',
//       pointers: [],
//     },
//   ];

//   const shouldReduceMotion = useReducedMotion();

//   const waveAnimation = shouldReduceMotion
//     ? {}
//     : {
//         scale: [1, 1.5, 1],
//         opacity: [0.5, 0, 0],
//         transition: {
//           repeat: Infinity,
//           duration: 1.5,
//           ease: 'easeOut',
//         },
//       };

//   return (
//     <div className="bg-gray-50 rounded-xl p-8 mx-auto shadow-sm transition-all duration-300">
//       {/* Section Heading */}
//       <h2 className="text-2xl font-semibold text-gray-800 mb- 6">Product Description</h2>

//       {/* Image Description Content */}
//       <div className="space-y-8">
//         {descriptionImages.map((image, index) => (
//           <div
//             key={index}
//             className="relative overflow-hidden  transition-all duration-300 max-w-md mx-auto"
//           >
//             <img
//               src={image.src}
//               alt={image.alt}
//               className="w-full h-auto"
//             />

//             {/* Pointer Hovers */}
//             {image.pointers.map((pointer, pointerIndex) => (
//               <div
//                 key={pointerIndex}
//                 className="absolute group focus:outline-none"
//                 style={{
//                   top: pointer.position.top,
//                   left: pointer.position.left,
//                   transform: 'translate(-50%, -50%)',
//                 }}
//                 tabIndex={0}
//               >
//                 <div className="relative flex items-center justify-center">
//                   <span className="flex items-center justify-center w-4 h-4 border-[6px] border-white rounded-full bg-transparent">
//                     <span className="w-1.5 h-1.5 bg-transparent rounded-full" />
//                   </span>
//                   <motion.div
//                     className="absolute w-4 h-4 border border-white rounded-full group-hover:opacity-100 opacity-0"
//                     animate={waveAnimation}
//                   />
//                   <motion.div
//                     className="absolute w-6 h-6 border border-white rounded-full group-hover:opacity-100 opacity-0"
//                     animate={{ ...waveAnimation, transition: { ...waveAnimation.transition, delay: 0.3 } }}
//                   />
//                   <motion.div
//                     className="absolute w-8 h-8 border border-white rounded-full group-hover:opacity-100 opacity-0"
//                     animate={{ ...waveAnimation, transition: { ...waveAnimation.transition, delay: 0.6 } }}
//                   />
//                 </div>
//                 <div
//                   className="absolute left-full ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-lg p-2 z-10 w-48"
//                 >
//                   <span className="text-sm text-black">{pointer.data}</span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ImageDescriptionSection;
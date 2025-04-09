// // import { useState, useEffect } from 'react';
// // import { RxHamburgerMenu } from 'react-icons/rx';
// // import Link from 'next/link';

// // const Options = ({ dropdownData }) => {
// //   const [showDrawer, setShowDrawer] = useState(false);

// //   const toggleDrawer = () => {
// //     setShowDrawer(!showDrawer);
// //   };

// //   useEffect(() => {
// //     const handleKeyDown = (event) => {
// //       if (event.key === 'Escape') {
// //         setShowDrawer(false);
// //       }
// //     };

// //     window.addEventListener('keydown', handleKeyDown);
// //     return () => {
// //       window.removeEventListener('keydown', handleKeyDown);
// //     };
// //   }, []);

// //   return (
// //     <div>
// //       <div className="text-center">
// //         <RxHamburgerMenu onClick={toggleDrawer} size={28} className="cursor-pointer" />
// //       </div>

// //       {showDrawer && (
// //         <div
// //           className="fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform -translate-x-0 bg-white w-80 dark:bg-gray-800"
// //           tabIndex="-1"
// //           aria-labelledby="drawer-options-label"
// //         >
// //           <h5 className="text-base font-semibold text-gray-500 uppercase dark:text-gray-400" id="drawer-options-label">
// //             Options
// //           </h5>
// //           <button
// //             type="button"
// //             onClick={toggleDrawer}
// //             className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
// //           >
// //             <svg
// //               className="w-3 h-3"
// //               aria-hidden="true"
// //               xmlns="http://www.w3.org/2000/svg"
// //               fill="none"
// //               viewBox="0 0 14 14"
// //             >
// //               <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
// //             </svg>
// //             <span className="sr-only">Close menu</span>
// //           </button>

// //           <div className="py-4 overflow-y-auto">
// //             <ul className="space-y-2 font-medium">
// //               {dropdownData.map((item, index) => (
// //                 <li key={index}>
// //                   <Link href={`/category/${encodeURIComponent(item.heading.toLowerCase())}`}>
// //                     <p className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group cursor-pointer">
// //                       <span className="flex-1 ms-3">{item.heading}</span>
// //                     </p>
// //                   </Link>
// //                 </li>
// //               ))}
// //             </ul>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default Options;


// import React, { useState } from 'react';
// import dropdownData from './dropdownData'; // Import dropdownData from the new file
// import { RxHamburgerMenu } from 'react-icons/rx';
// import { GrClose } from 'react-icons/gr';

// function Options() {
//   const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);

//   const toggleOffcanvas = () => {
//     setIsOffcanvasOpen(!isOffcanvasOpen);
//   };

//   const handleClose = () => {
//     setIsOffcanvasOpen(false);
//   };

//   // Function to generate links
//   const generateLink = (heading) => {
//     // Modify this function to handle link generation based on your requirements
//     return `/category/${heading}`;
//   };

//   return (
//     <div>
//       <button onClick={toggleOffcanvas} className="text-center">
//         <RxHamburgerMenu size={24} className="cursor-pointer" />
//       </button>

//       {isOffcanvasOpen && (
//         <div className="fixed top-0 left-0 bottom-0 bg-rose-1 w-64 shadow-md p-4 transform transition-transform duration-300 ease-in-out translate-x-0 text-blue-1 overflow-y-auto">
//           <div className="flex justify-end">
//             <button onClick={handleClose} className="text-white">
//               <GrClose size={24} />
//             </button>
//           </div>
//           <h2 className="text-xl font-bold mb-4 px-2 py-4">Categories</h2>
//           <ul>
//             {dropdownData.map((item, index) => (
//               <li key={index} className="mb-4 font-semibold text-white px-2 cursor-pointer">
//                 <a href={generateLink(item.heading)}>{item.heading}</a>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Options;





import React, { useState } from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';
import { GrClose } from 'react-icons/gr';

export default function Options() {

  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
  const toggleOffcanvas = () => {
    setIsOffcanvasOpen(!isOffcanvasOpen);
  };

  const handleClose = () => {
    setIsOffcanvasOpen(false);
  };

  return (
    <div>
      <button className="mt-1">
        <RxHamburgerMenu onClick={toggleOffcanvas} size={28} className="cursor-pointer" />
      </button>
      {isOffcanvasOpen && (
      <div className="fixed top-0 left-0 bottom-0 bg-rose-1 w-64 shadow-md p-4 transform transition-transform duration-300 ease-in-out translate-x-0 text-blue-1 overflow-y-auto">
        <div className="flex justify-end">
          <button onClick={handleClose} className="text-white">
            <GrClose size={24} />
          </button>
        </div>
        <h2 className="text-xl font-bold mb-4 px-2 py-4">Categories</h2>
      </div>
      )}
    </div>
  )
}
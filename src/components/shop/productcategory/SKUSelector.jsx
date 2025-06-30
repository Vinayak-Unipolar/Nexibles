import React from 'react';
import { IoShareSocial } from "react-icons/io5";
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

// Variants for animations
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 }
  }
};

const buttonVariants = {
  hover: {
    scale: 1.05,
    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)"
  },
  tap: { scale: 0.95 }
};

export default function SKUSelector({
    selectedSKU,
    setSelectedSKU,
    numberOfSKUs,
    selectedQuantity,
    minimumQuantity,
    handleAddToCart
}) {
    const router = useRouter();

    const handleSKUChange = (e) => {
        setSelectedSKU(parseInt(e.target.value, 10));
    };

    const handleShare = async () => {
        const shareData = {
            title: 'Check out this product!',
            text: 'I found an awesome product I think you’ll like.',
            url: window.location.href,
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                alert('Share functionality is not supported in your browser. Copy the URL manually: ' + window.location.href);
            }
        } catch (error) {
            console.error('Error sharing:', error);
        }
    };

    const handleContinue = async () => {
        try {
            // Call the existing add to cart function
            await handleAddToCart();
            // Redirect to /my-cart
            router.push('/my-cart');
        } catch (error) {
            console.error('Error processing add to cart:', error);
        }
    };

    const handleBuyNow = async () => {
        try {
            // Call the existing add to cart function
            await handleAddToCart();
            // Redirect to /my-cart
            router.push('/my-cart');
        } catch (error) {
            console.error('Error processing buy now:', error);
        }
    };

    return (
        <motion.div
            className="mt-3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.label
                htmlFor="skuSelect"
                className="block mb-1 text-sm font-medium text-black"
                variants={itemVariants}
            >
                SKUs:
            </motion.label>
            <div className="items-center w-full md:flex">
                <motion.div
                    className="pb-2 md:w-1/6 md:pr-1 md:pb-0"
                    variants={itemVariants}
                >
                    <select
                        id="skuSelect"
                        value={selectedSKU}
                        onChange={handleSKUChange}
                        className="w-full h-10 p-2 text-sm bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                        disabled={numberOfSKUs < 1}
                    >
                        {Array.from({ length: numberOfSKUs }, (_, index) => (
                            <option key={index + minimumQuantity} value={index + minimumQuantity}>
                                {index + minimumQuantity}
                            </option>
                        ))}
                    </select>
                </motion.div>
                <motion.div
                    className="md:w-1/2 md:pl-1 flex gap-4"
                    variants={itemVariants}
                >
                    {(parseInt(selectedQuantity, 10) || 0) >= minimumQuantity ? (
                        <>
                            <motion.button
                                onClick={handleContinue}
                                className="flex items-center justify-center w-full gap-2 px-6 py-2.5 text-md font-medium text-white transition-all duration-200 bg-[#103b60] rounded-md shadow-sm"
                                variants={buttonVariants}
                                whileHover="hover"
                                whileTap="tap"
                            >
                                Continue to Upload Design
                            </motion.button>
                        </>
                    ) : (
                        <>
                            <motion.button
                                onClick={handleContinue}
                                className="w-full md:w-auto bg-[#103b60] rounded-md px-4 py-2 text-white font-medium transition-all duration-200 shadow-sm flex items-center justify-center gap-2 h-10"
                                variants={buttonVariants}
                                whileHover="hover"
                                whileTap="tap"
                            >
                                MOQ: {minimumQuantity}
                            </motion.button>
                        </>
                    )}
                </motion.div>
            </div>
            <motion.div
                className="mt-2 text-center md:text-left"
                variants={itemVariants}
            >
                <motion.button
                    onClick={handleShare}
                    className="inline-flex items-center gap-2 text-sm text-black hover:text-[#252b3d] transition-all duration-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <motion.div
                        whileHover={{ rotate: 20 }}
                        transition={{ duration: 0.2 }}
                    >
                        <IoShareSocial size={35} className='p-2 border border-gray-300 rounded-lg' />
                    </motion.div>
                    Share Product
                </motion.button>
            </motion.div>
        </motion.div>
    );
}












// import React from 'react';
// import { IoShareSocial } from "react-icons/io5";
// import { motion } from 'framer-motion';
// import { useRouter } from 'next/navigation';

// // Variants for animations
// const containerVariants = {
//   hidden: { opacity: 0, y: 20 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       duration: 0.5,
//       when: "beforeChildren",
//       staggerChildren: 0.1
//     }
//   }
// };

// const itemVariants = {
//   hidden: { opacity: 0, y: 10 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.3 }
//   }
// };

// const buttonVariants = {
//   hover: {
//     scale: 1.05,
//     boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)"
//   },
//   tap: { scale: 0.95 }
// };

// export default function SKUSelector({
//     selectedSKU,
//     setSelectedSKU,
//     numberOfSKUs,
//     selectedQuantity,
//     minimumQuantity,
//     handleAddToCart
// }) {
//     const router = useRouter();

//     const handleSKUChange = (e) => {
//         setSelectedSKU(parseInt(e.target.value, 10));
//     };

//     const handleShare = async () => {
//         const shareData = {
//             title: 'Check out this product!',
//             text: 'I found an awesome product I think you’ll like.',
//             url: window.location.href,
//         };

//         try {
//             if (navigator.share) {
//                 await navigator.share(shareData);
//             } else {
//                 alert('Share functionality is not supported in your browser. Copy the URL manually: ' + window.location.href);
//             }
//         } catch (error) {
//             console.error('Error sharing:', error);
//         }
//     };

//     const handleBuyNow = async () => {
//         try {
//             // Call the existing add to cart function
//             await handleAddToCart();
//             // Redirect to /my-cart
//             router.push('/my-cart');
//         } catch (error) {
//             console.error('Error processing buy now:', error);
//         }
//     };

//     return (
//         <motion.div
//             className="mt-3"
//             variants={containerVariants}
//             initial="hidden"
//             animate="visible"
//         >
//             <motion.label
//                 htmlFor="skuSelect"
//                 className="block mb-1 text-sm font-medium text-black"
//                 variants={itemVariants}
//             >
//                 SKUs:
//             </motion.label>
//             <div className="items-center w-full md:flex">
//                 <motion.div
//                     className="pb-2 md:w-1/6 md:pr-1 md:pb-0"
//                     variants={itemVariants}
//                 >
//                     <select
//                         id="skuSelect"
//                         value={selectedSKU}
//                         onChange={handleSKUChange}
//                         className="w-full h-10 p-2 text-sm bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
//                         disabled={numberOfSKUs < 1}
//                     >
//                         {Array.from({ length: numberOfSKUs }, (_, index) => (
//                             <option key={index + 1} value={index + 1}>
//                                 {index + 1}
//                             </option>
//                         ))}
//                     </select>
//                 </motion.div>
//                 <motion.div
//                     className="md:w-1/2 md:pl-1 flex gap-4"
//                     variants={itemVariants}
//                 >
//                     {(parseInt(selectedQuantity, 10) || 0) >= minimumQuantity ? (
//                         <>
//                             <motion.button
//                                 onClick={handleAddToCart}
//                                 className="flex items-center justify-center w-full  gap-2 px-6 py-2.5 text-md font-medium text-white transition-all duration-200 bg-[#103b60] rounded-md shadow-sm "
//                                 variants={buttonVariants}
//                                 whileHover="hover"
//                                 whileTap="tap"
//                             >
//                                 Continue
//                             </motion.button>
//                             {/* <motion.button
//                                 onClick={handleBuyNow}
//                                 className="flex items-center justify-center w-full  gap-2 px-4 py-2.5 text-md font-medium text-black transition-all duration-200 bg-[#ffd13e] hover:bg-yellow-500 rounded-md shadow-sm "
//                                 variants={buttonVariants}
//                                 whileHover="hover"
//                                 whileTap="tap"
//                             >
//                                 Buy Now
//                             </motion.button> */}
//                         </>
//                     ) : (
//                         <>
//                             <motion.button
//                                 onClick={handleAddToCart}
//                                 className="w-full md:w-auto bg-[#103b60] rounded-md px-4 py-2 text-white font-medium transition-all duration-200 shadow-sm flex items-center justify-center gap-2 h-10"
//                                 variants={buttonVariants}
//                                 whileHover="hover"
//                                 whileTap="tap"
//                             >
//                                 Continue
//                             </motion.button>
//                             {/* <motion.button
//                                 onClick={handleBuyNow}
//                                 className="w-full md:w-auto bg-[#ffd13e] rounded-md px-4 py-2 text-white font-medium transition-all duration-200 shadow-sm flex items-center justify-center gap-2 h-10"
//                                 variants={buttonVariants}
//                                 whileHover="hover"
//                                 whileTap="tap"
//                             >
//                                 Buy Now
//                             </motion.button> */}
//                         </>
//                     )}
//                 </motion.div>
//             </div>
//             <motion.div
//                 className="mt-2 text-center md:text-left"
//                 variants={itemVariants}
//             >
//                 {/* Share button remains commented out as in original */}
//             </motion.div>
//         </motion.div>
//     );
// }












// import React from 'react';
// import { IoShareSocial } from "react-icons/io5";
// import { motion } from 'framer-motion';

// // Variants for animations
// const containerVariants = {
//   hidden: { opacity: 0, y: 20 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       duration: 0.5,
//       when: "beforeChildren",
//       staggerChildren: 0.1
//     }
//   }
// };

// const itemVariants = {
//   hidden: { opacity: 0, y: 10 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.3 }
//   }
// };

// const buttonVariants = {
//   hover: {
//     scale: 1.05,
//     boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)"
//   },
//   tap: { scale: 0.95 }
// };

// export default function SKUSelector({
//     selectedSKU,
//     setSelectedSKU,
//     numberOfSKUs,
//     selectedQuantity,
//     minimumQuantity,
//     handleAddToCart
// }) {
//     const handleSKUChange = (e) => {
//         setSelectedSKU(parseInt(e.target.value, 10));
//     };

//     const handleShare = async () => {
//         const shareData = {
//             title: 'Check out this product!',
//             text: 'I found an awesome product I think you’ll like.',
//             url: window.location.href,
//         };

//         try {
//             if (navigator.share) {
//                 await navigator.share(shareData);
//             } else {
//                 alert('Share functionality is not supported in your browser. Copy the URL manually: ' + window.location.href);
//             }
//         } catch (error) {
//             console.error('Error sharing:', error);
//         }
//     };

//     return (
//         <motion.div
//             className="mt-3"
//             variants={containerVariants}
//             initial="hidden"
//             animate="visible"
//         >
//             <motion.label
//                 htmlFor="skuSelect"
//                 className="block mb-1 text-sm font-medium text-black"
//                 variants={itemVariants}
//             >
//                 SKUs:
//             </motion.label>
//             <div className="items-center w-full md:flex">
//                 <motion.div
//                     className="pb-2 md:w-1/6 md:pr-1 md:pb-0"
//                     variants={itemVariants}
//                 >
//                     <select
//                         id="skuSelect"
//                         value={selectedSKU}
//                         onChange={handleSKUChange}
//                         className="w-full h-10 p-2 text-sm bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
//                         disabled={numberOfSKUs < 1}
//                     >
//                         {Array.from({ length: numberOfSKUs }, (_, index) => (
//                             <option key={index + 1} value={index + 1}>
//                                 {index + 1}
//                             </option>
//                         ))}
//                     </select>
//                 </motion.div>
//                 <motion.div
//                     className="md:w-1/2 md:pl-1"
//                     variants={itemVariants}
//                 >
//                     {(parseInt(selectedQuantity, 10) || 0) >= minimumQuantity ? (
//                         <motion.button
//                             onClick={handleAddToCart}
//                             className="flex items-center justify-center w-full h-10 gap-2 px-20 py-2 text-xs font-medium text-white transition-all duration-200 bg-[#103b60] rounded-md shadow-sm md:w-auto"
//                             variants={buttonVariants}
//                             whileHover="hover"
//                             whileTap="tap"
//                         >
//                             {/* <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 width="16"
//                                 height="16"
//                                 viewBox="0 0 24 24"
//                                 fill="none"
//                                 stroke="currentColor"
//                                 strokeWidth="2"
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 className="shrink-0"
//                             >
//                                 <circle cx="9" cy="21" r="1"></circle>
//                                 <circle cx="20" cy="21" r="1"></circle>
//                                 <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
//                             </svg> */}
//                             Add to Cart
//                         </motion.button>
//                     ) : (
//                         <motion.button
//                             onClick={handleAddToCart}
//                             className="w-full md:w-auto bg-[#103b60] rounded-md px-4 py-2 text-white font-medium transition-all duration-200 shadow-sm flex items-center justify-center gap-2 h-10"
//                             variants={buttonVariants}
//                             whileHover="hover"
//                             whileTap="tap"
//                         >
//                             {/* <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 width="16"
//                                 height="16"
//                                 viewBox="0 0 24 24"
//                                 fill="none"
//                                 stroke="currentColor"
//                                 strokeWidth="2"
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 className="shrink-0"
//                             >
//                                 <circle cx="9" cy="21" r="1"></circle>
//                                 <circle cx="20" cy="21" r="1"></circle>
//                                 <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
//                             </svg> */}
//                             Add to Cart
//                         </motion.button>
//                     )}
//                 </motion.div>
//             </div>
//             <motion.div
//                 className="mt-2 text-center md:text-left"
//                 variants={itemVariants}
//             >
//                 {/* <motion.button
//                     onClick={handleShare}
//                     className="inline-flex items-center gap-2 text-sm text-black hover:text-[#252b3d] transition-all duration-200"
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                 >
//                     <motion.div
//                         whileHover={{ rotate: 20 }}
//                         transition={{ duration: 0.2 }}
//                     >
//                         <IoShareSocial size={35} className='p-2 border border-gray-300 rounded-lg' />
//                     </motion.div>
//                     Share Product
//                 </motion.button> */}
//             </motion.div>
//         </motion.div>
//     );
// }
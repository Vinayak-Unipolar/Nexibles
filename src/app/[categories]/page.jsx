'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
      <div className="text-center">
        {/* Optional Image */}


        {/* 404 Message */}
        <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4">
          404 - Page Not Found
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8">
          Oops! The page you&apos;re looking for doesn&apos;t exist.
        </p>

        {/* Back to Home Button */}
        <Link
          href="/"
          className="inline-block bg-[#ffd13e] text-black font-semibold py-3 px-6 rounded-full hover:bg-yellow-500 transition-colors duration-300"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
}














// 'use client';

// import { motion, useReducedMotion } from 'framer-motion';
// import Image from 'next/image';
// import Link from 'next/link';
// import { FaCheck } from 'react-icons/fa';
// import { useState, useEffect } from 'react';
// import { useParams } from 'next/navigation';
// import Footer from '@/components/shop/Footer';
// import Navbar from '@/components/shop/Navbar';
// import AdvantageItem from '@/components/home/AdvantageItem';
// import BrandLogosSection from '@/components/instagramandlogos/BrandLogosSection';
// import Loader from '@/components/comman/Loader';
// import Card from '@/components/shop/productcategory/Card';
// import StatsAndTestimonials from '@/components/StatsAndTestimonials/StatsAndTestimonials';
// import contentData from '@/data/pouches.json';
// import Triangle from '../../../public/Triangle.webp';

// const ProductCategory = () => {
//   const { categories: category } = useParams(); // Match folder name: [categories]
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isHovered, setIsHovered] = useState(false);

//   const APIURL = process.env.NEXT_PUBLIC_API_URL;
//   const token = process.env.NEXT_PUBLIC_API_KEY;

//   const shouldReduceMotion = useReducedMotion();

//   // Get content for the current category
//   const content = contentData.categories?.[category];

//   useEffect(() => {
//     const fetchProducts = async () => {
//       if (!category || !APIURL || !token) {
//         setError('Configuration error: Category, API URL, or token is missing.');
//         setLoading(false);
//         return;
//       }

//       setLoading(true);
//       setError(null);
//       try {
//         const response = await fetch(`${APIURL}/api/product/get_list/${category}`, {
//           method: 'GET',
//           headers: {
//             'Content-type': 'application/json',
//             'API-Key': token,
//           },
//         });
//         const data = await response.json();
//         if (data.status === 'success') {
//           setProducts(data.data);
//         } else {
//           setError('Failed to load products. Please try again.');
//         }
//       } catch (error) {
//         setError('An error occurred while fetching products.');
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProducts();
//   }, [category, APIURL, token]);

//   const fadeInUp = shouldReduceMotion
//     ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
//     : {
//       hidden: { opacity: 0, y: 50 },
//       visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
//     };

//   const staggerChildren = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.2,
//       },
//     },
//   };

//   const waveAnimation = shouldReduceMotion
//     ? {}
//     : {
//       scale: [1, 1.5, 1],
//       opacity: [0.5, 0, 0],
//       transition: {
//         repeat: Infinity,
//         duration: 1.5,
//         ease: 'easeOut',
//       },
//     };

//   const containerAnimation = shouldReduceMotion
//     ? {
//       initial: { opacity: 0, scale: 0.8 },
//       animate: { opacity: 1, scale: 1 },
//       hovered: { scale: 1.05 },
//     }
//     : {
//       initial: { opacity: 0, scale: 0.8 },
//       animate: { opacity: 1, scale: 1, transition: { duration: 0.8 } },
//       hovered: {
//         scale: 1.05,
//         transition: { duration: 0.5, ease: 'easeInOut' },
//       },
//     };

//   const triangleAnimation = shouldReduceMotion
//     ? { rotate: 0 }
//     : {
//       rotate: isHovered ? 45 : 0,
//       transition: { duration: 0.5, ease: 'easeInOut' },
//     };

//   if (!content) {
//     return (
//       <main className="bg-white text-black min-h-screen">
//         <Navbar />
//         <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center">
//           <p className="text-red-500 text-lg mb-4">Category not found.</p>
//           <Link href="/" className="bg-yellow-400 text-black font-bold py-2 px-4 rounded-full hover:scale-105 transition-transform duration-300">
//             Go to Home
//           </Link>
//         </div>
//         <Footer />
//       </main>
//     );
//   }

//   if (loading) {
//     return (
//       <main className="bg-white text-black min-h-screen flex items-center justify-center">
//         <Loader />
//       </main>
//     );
//   }

//   if (error) {
//     return (
//       <main className="bg-white text-black min-h-screen">
//         <Navbar />
//         <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center">
//           <p className="text-red-500 text-lg mb-4">{error}</p>
//           <button
//             onClick={() => fetchProducts()}
//             className="bg-yellow-400 text-black font-bold py-2 px-4 rounded-full hover:scale-105 transition-transform duration-300"
//           >
//             Retry
//           </button>
//         </div>
//         <Footer />
//       </main>
//     );
//   }

//   return (
//     <main className="bg-white text-black">
//       <Navbar />
//       {/* Hero Section */}
//       <section className="py-10">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex flex-col md:flex-row justify-center items-center gap-8">
//             {/* Text Content */}
//             <motion.div
//               className="flex flex-col justify-center max-w-lg"
//               initial="hidden"
//               animate="visible"
//               variants={staggerChildren}
//             >
//               <motion.h1
//                 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 tracking-tight text-black"
//                 variants={fadeInUp}
//               >
//                 {content.hero.title}
//               </motion.h1>
//               <motion.p
//                 className="text-xl sm:text-2xl mb-6 font-semibold text-black"
//                 variants={fadeInUp}
//               >
//                 {content.hero.subtitle}
//               </motion.p>
//               <motion.p
//                 className="text-base sm:text-lg text-black"
//                 variants={fadeInUp}
//               >
//                 {content.hero.description}
//               </motion.p>
//               <motion.div variants={fadeInUp}>
//                 <Link
//                   href={content.hero.cta.href}
//                   className="mt-6 inline-block bg-yellow-400 text-black font-bold py-3 px-8 rounded-full hover:scale-105 transition-transform duration-300 shadow-lg"
//                   aria-label={content.hero.cta.ariaLabel}
//                 >
//                   {content.hero.cta.text}
//                 </Link>
//               </motion.div>
//             </motion.div>

//             {/* Image Section */}
//             <motion.div
//               className="relative w-full max-w-2xl h-[calc(100vh-4rem)] md:h-[calc(100vh-6rem)] flex items-center justify-center"
//               variants={containerAnimation}
//               initial="initial"
//               animate="animate"
//               whileHover="hovered"
//               onHoverStart={() => setIsHovered(true)}
//               onHoverEnd={() => setIsHovered(false)}
//             >
//               <div className="relative w-full h-full">
//                 {/* Background Image */}
//                 <motion.div
//                   className="absolute inset-0 p-4 sm:p-6"
//                   aria-hidden="true"
//                   animate={triangleAnimation}
//                 >
//                   <Image
//                     alt={content.hero.images.background.alt}
//                     className="rounded-lg p-10 w-full h-full object-fit"
//                     src={Triangle}
//                     fill
//                     sizes="(max-width: 768px) 100vw, 50vw"
//                     loading="lazy"
//                     quality={75}
//                   />
//                 </motion.div>
//                 {/* Main Image */}
//                 <div className="relative mt-10 z-10 w-full h-full flex items-center justify-center p-4 sm:p-6">
//                   <Image
//                     alt={content.hero.images.main.alt}
//                     className="rounded-lg w-full h-full p-10 object-contain"
//                     src={content.hero.images.main.src}
//                     fill
//                     sizes="(max-width: 768px) 100vw, 50vw"
//                     loading="lazy"
//                     quality={75}
//                   />
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </section>


//       <section className="py-10 bg-white">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
//             {/* Image Section */}
//             <motion.div
//               className="relative w-full max-w-xl h-[calc(100vh-6rem)] md:h-[calc(100vh-8rem)] flex items-center justify-center"
//               initial={{ opacity: 0, x: -50 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.6 }}
//               viewport={{ once: true }}
//             >
//               <div className="relative w-full h-full">
//                 <Image
//                   alt={content.featuresSection.image.alt}
//                   className="rounded-lg w-full h-full object-contain"
//                   src={content.featuresSection.image.src}
//                   fill
//                   sizes="(max-width: 768px) 100vw, 50vw"
//                   loading="lazy"
//                   quality={75}
//                 />
//                 {content.featuresSection.pointerPositions.map((pointer, index) => (
//                   <div
//                     key={index}
//                     className="absolute group focus:outline-none"
//                     style={{ top: pointer.top, left: pointer.left }}
//                     tabIndex={0}
//                     onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.classList.toggle('group-hover')}
//                   >
//                     <div className="relative flex items-center justify-center">
//                       <span className="flex items-center justify-center w-4 h-4 border-[6px] border-white rounded-full bg-transparent">
//                         <span className="w-1.5 h-1.5 bg-transparent rounded-full" />
//                       </span>
//                       <motion.div
//                         className="absolute w-4 h-4 border border-white rounded-full group-hover:opacity-100 opacity-0 group-focus:opacity-100"
//                         animate={waveAnimation}
//                       />
//                       <motion.div
//                         className="absolute w-6 h-6 border border-white rounded-full group-hover:opacity-100 opacity-0 group-focus:opacity-100"
//                         animate={{ ...waveAnimation, transition: { ...waveAnimation.transition, delay: 0.3 } }}
//                       />
//                       <motion.div
//                         className="absolute w-8 h-8 border border-white rounded-full group-hover:opacity-100 opacity-0 group-focus:opacity-100"
//                         animate={{ ...waveAnimation, transition: { ...waveAnimation.transition, delay: 0.6 } }}
//                       />
//                     </div>
//                     <div className="absolute left-full ml-2 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-lg p-2 z-10 w-48">
//                       <span className="text-sm text-black">{pointer.label}</span>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </motion.div>

//             {/* Text Section */}
//             <motion.div
//               className="space-y-6 max-w-lg"
//               initial="hidden"
//               whileInView="visible"
//               variants={staggerChildren}
//               viewport={{ once: true }}
//             >
//               <motion.h2
//                 className="text-3xl sm:text-4xl font-bold text-black"
//                 variants={fadeInUp}
//               >
//                 {content.featuresSection.title}
//               </motion.h2>
//               <motion.ul
//                 className="space-y-4 text-base sm:text-lg text-black"
//                 variants={staggerChildren}
//               >
//                 {content.featuresSection.features.map((feature, index) => (
//                   <motion.li
//                     className="flex items-center space-x-2 group"
//                     key={index}
//                     variants={fadeInUp}
//                   >
//                     <span className="flex items-center justify-center w-6 h-6 bg-yellow-400 rounded-full group-hover:bg-yellow-500 transition">
//                       <FaCheck className="w-4 h-4 text-white" />
//                     </span>
//                     <span>{feature}</span>
//                   </motion.li>
//                 ))}
//               </motion.ul>
//               <motion.p
//                 className="text-base sm:text-lg text-black"
//                 variants={fadeInUp}
//               >
//                 {content.featuresSection.description}
//               </motion.p>
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       {/* Product List */}
//       {products.length > 0 && (
//         <section className="py-10 bg-white">
//           <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//             <h2 className="text-3xl font-bold text-gray-800 mb-8 tracking-tight text-center">
//               {content.productsSection.title}
//             </h2>
//             <Card product={products} isLoading={loading} />
//           </div>
//         </section>
//       )}

//       <section className="py-10 bg-white">
//         <div>
//           <StatsAndTestimonials />
//         </div>
//       </section>

//       {/* Trusted Brands */}
//       <section className="bg-white">
//         <div className="">
//           <h2 className="text-3xl font-bold text-gray-800 mb-8 tracking-tight text-center">
//             {content.brandsSection.title}
//           </h2>
//           <BrandLogosSection />
//         </div>
//       </section>

//       <AdvantageItem />
//       <Footer />
//     </main>
//   );
// };

// export default ProductCategory;
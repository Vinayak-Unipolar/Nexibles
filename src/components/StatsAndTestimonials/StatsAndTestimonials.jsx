import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function StatsAndTestimonials() {
  const [activeStatCard, setActiveStatCard] = useState('customers');
  const [testimonials, setTestimonials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/testimonial`, {
          headers: {
            'Content-type': 'application/json',
            'API-Key': process.env.NEXT_PUBLIC_API_KEY,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch testimonials');
        }
        const data = await response.json();
        if (data.status === 'success' && Array.isArray(data.data)) {
          const nexiblesTestimonials = data.data.filter(item =>
            item.origin && (item.origin.toLowerCase() === 'nexibles')
          );
          const formattedTestimonials = nexiblesTestimonials.map((item, index) => ({
            id: item.id,
            name: item.name,
            designationcompany: item.profession ?
              (item.company ? `${item.profession} - ${item.company}` : item.profession) :
              (item.company || ""),
            content: item.description,
            image: item.image || "",
            fullDescription: item.fullDescription || item.description,
          }));
          setTestimonials(formattedTestimonials);
        }
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const statsData = [
    {
      id: 'customers',
      bigNumber: '2,108',
      label: 'Customers',
      year: '2025',
      subLabel: "LET'S KEEP GROWING",
    },
    {
      id: 'businesses',
      bigNumber: '9,86,690',
      label: 'Pouches For Businesses',
      year: '2023',
      subLabel: 'JAN 19 - DEC 22',
    },
    {
      id: 'agencies',
      bigNumber: '9.9500',
      label: 'Pouches For Agencies',
      year: '2023',
      subLabel: 'JAN 19 - DEC 22',
    },
    {
      id: 'retailers',
      bigNumber: '343,500',
      label: 'Pouches For Retailers',
      year: '2023',
      subLabel: 'JAN 19 - DEC 22',
    },
  ];

  // Arrow variants for Framer Motion animations
  const arrowVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4, delay: 0.4, ease: "easeOut" } },
  };

  // Custom Arrow Components
  const PrevArrow = ({ onClick }) => {
    return (
      <motion.button
        onClick={onClick}
        className="absolute -left-4 md:left-1 top-1/2 transform -translate-y-1/2 z-10 p-1 transition-all"
        aria-label="Previous testimonial"
        initial="hidden"
        animate="visible"
        variants={arrowVariants}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="black"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </motion.button>
    );
  };

  const NextArrow = ({ onClick }) => {
    return (
      <motion.button
        onClick={onClick}
        className="absolute -right-4 md:right-1 top-1/2 transform -translate-y-1/2 z-10 p-1 transition-all"
        aria-label="Next testimonial"
        initial="hidden"
        animate="visible"
        variants={arrowVariants}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          inin viewBox="0 0 24 24"
          fill="none"
          stroke="black"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </motion.button>
    );
  };

  const sliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
    draggable: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const testimonialCardVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 70,
        delay: i * 0.15,
      },
    }),
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <div className="flex flex-col w-full md:mt-2">
      {/* Testimonials Section */}
      <motion.div
        className="w-full bg-[#ffd13e] md:py-2 px-4 md:px-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h2
          className="text-center font-bold md:text-3xl text-2xl leading-tight tracking-tight mt-8 sm:mt-6 text-black"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Real Stories, Real Impact
        </motion.h2>


        <div className="relative px-4 mx-auto mb-4 max-w-7xl md:px-0">
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <p>Loading testimonials...</p>
            </div>
          ) : (
            <Slider {...sliderSettings}>
              {testimonials.map((testimonial, index) => (
                <div key={testimonial.id} className="px-3 cursor-pointer" onClick={() => setSelectedTestimonial(testimonial)}>
                  <motion.div
                    className="relative md:w-[550px] lg:h-[350px] xl:h-[300px] mx-auto bg-white rounded-lg mt-24 md:mt-18 mb-10 pt-16 pb-6 px-6 shadow-lg"
                    variants={testimonialCardVariants}
                    initial="hidden"
                    animate="visible"
                    custom={index}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
                    }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    {/* Top centered client image */}
                    <div className="absolute top-0 transform -translate-x-1/2 -translate-y-1/2 left-1/2">
                      <div className="p-3 bg-white rounded-full">
                        <Image
                          src={`${process.env.NEXT_PUBLIC_CDN_URL}/testimonials/${testimonial.image}`}
                          alt={testimonial.name}
                          width={120}
                          height={120}
                          className="bg-orange-100 rounded-full shadow-md"
                        />
                      </div>
                    </div>

                    {/* Testimonial content */}
                    <div className="flex flex-col text-center text-gray-700">
                      <p className="mt-4 mb-4 text-left line-clamp-5">{testimonial.content}</p>
                      <p className="text-lg font-semibold text-left text-gray-800">{testimonial.name}</p>
                      <p className="text-sm text-left text-gray-600">{testimonial.designationcompany}</p>
                    </div>

                    {/* Quote icon in bottom right */}
                    <div className="absolute -bottom-[45px] right-4 w-20 h-20">
                      <Image src={`${process.env.NEXT_PUBLIC_CDN_URL}/doublequotes.svg`} alt="quotes" width={70} height={70} />
                    </div>
                    <div className="absolute invisible w-20 h-20 md:visible -top-9 left-7">
                      <Image src={`${process.env.NEXT_PUBLIC_CDN_URL}/flip.svg`} alt="quotes" width={70} height={70} />
                    </div>
                  </motion.div>
                </div>
              ))}
            </Slider>
          )}
        </div>
      </motion.div>

      {/* Testimonial Modal */}
      <AnimatePresence>
        {selectedTestimonial && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedTestimonial(null)}
          >
            <motion.div
              className="relative w-11/12 max-w-2xl p-8 bg-white rounded-2xl shadow-2xl"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
                onClick={() => setSelectedTestimonial(null)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Modal Content */}
              <div className="flex flex-col items-center">
                {/* Client Image */}
                <div className="mb-6">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_CDN_URL}/testimonials/${selectedTestimonial.image}`}
                    alt={selectedTestimonial.name}
                    width={200}
                    height={200}
                    className="rounded-full shadow-lg"
                  />
                </div>

                {/* Client Details */}
                <div className="text-center">
                  <h3 className="mb-2 text-lg font-bold text-gray-800">{selectedTestimonial.name}</h3>
                  <p className="mb-4 text-gray-600">{selectedTestimonial.designationcompany}</p>
                </div>

                {/* Full Testimonial */}
                <div className=" text-center text-gray-700 h-[calc(50vh-120px)] overflow-x-auto">
                  {/* <style>
                    {`
            .overflow-y-auto::-webkit-scrollbar {
              display: none;
            }
            `}
             style={{ scrollbarWidth: "none" }}
                  </style> */}
                  <p className="md:text-sm text-xs leading-relaxed">{selectedTestimonial.fullDescription}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
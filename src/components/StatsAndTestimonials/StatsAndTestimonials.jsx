"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import client1 from "../../../public/client/client1.png";
import client2 from "../../../public/client/client2.png";
import client3 from "../../../public/client/client3.png";
import client4 from "../../../public/client/client4.png";
import client5 from "../../../public/client/client5.png";
import doublequotes from "../../../public/home/doublequotes.svg";
import flip from "../../../public/home/flip.svg";

export default function StatsAndTestimonials() {
  const [activeStatCard, setActiveStatCard] = useState("customers");
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const statsRef = useRef(null);
  const testimonialsRef = useRef(null);
  const isStatsInView = useInView(statsRef, {
    once: true,
    amount: 0.5,
    margin: "0px 0px -100px 0px",
  });
  const isTestimonialsInView = useInView(testimonialsRef, {
    once: true,
    amount: 0.5,
    margin: "0px 0px -100px 0px",
  });

  const statsData = [
    {
      id: "customers",
      bigNumber: "2,108",
      label: "Customers",
      year: "2025",
      subLabel: "LET'S KEEP GROWING",
    },
    {
      id: "businesses",
      bigNumber: "9,86,690",
      label: "Pouches For Businesses",
      year: "2023",
      subLabel: "JAN 19 - DEC 22",
    },
    {
      id: "agencies",
      bigNumber: "9.9500",
      label: "Pouches For Agencies",
      year: "2023",
      subLabel: "JAN 19 - DEC 22",
    },
    {
      id: "retailers",
      bigNumber: "343,500",
      label: "Pouches For Retailers",
      year: "2023",
      subLabel: "JAN 19 - DEC 22",
    },
  ];

  const testimonials = [
    {
      id: 1,
      name: "Mr. Shivanand Jagtap",
      designationcompany: "Director - Raidaar Masale",
      content:
        "Fantastic shop! Great selection, fair prices, and friendly staff. Highly recommended. The quality of the products is exceptional, and the prices are very reasonable!",
      image: client1,
    },
    {
      id: 2,
      name: "Ms. Preethi Dekhne",
      designationcompany: "Tarvoti!",
      content:
        "The first benefit was MOQ, cost effective & very convenient for start-ups, Quick turnaround time, very happy with quality, delivery was as per timeline shared.",
      image: client2,
    },
    {
      id: 3,
      name: "Mr. Arka Narayan De",
      designationcompany: "Business Development Head - Aman Tea Group",
      content:
        "Nexi Standard Sizes have been a game-changer for us at Aman Tea Group. The quality, consistency, and quick turnaround have streamlined our packaging process, helping us maintain efficiency in our tea product launches. Nexibles' reliability and service have made them our go-to packaging partner.",
      image: client3,
    },
    {
      id: 4,
      name: "Mr. Dheeraj Deotarse",
      designationcompany: "",
      content:
        "Nexi Classic sizes have transformed our tea and coffee packaging with cutting-edge digital printing, making it more striking and market-ready. Their precision, quality, and marketing support set them apart. Highly recommended for brands that demand excellence!",
      image: client4,
    },
    {
      id: 5,
      name: "Mr. Tuhin Samanta",
      designationcompany: "Founder - Nutkhut Delight",
      content:
        "Nexi Standard Sizes by Nexibles has been a game-changer for us! Their low MOQ made it easy to launch new products quickly, which is invaluable for an emerging brand like ours. Fast production and excellent customer service are just the cherry on top!",
      image: client5,
    },
  ];

   {/* Function to adjust testimonials mobile and desktop view */}
  function useWindowWidth() {
    const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);

    useEffect(() => {
      const handleResize = () => setWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);
  
    return width;
  };

  const width = useWindowWidth();
  const isMobile = width < 768;
  const visibleTestimonials = testimonials.slice(
    activeTestimonial,
    activeTestimonial + (isMobile ? 1 : 2)
  );

  // Function to go to the next testimonial
  const nextTestimonial = () => {
    setActiveTestimonial((prev) =>
      prev + 1 >= testimonials.length - 2 ? 0 : prev + 1
    );
  };

  // Function to go to the previous testimonial
  const prevTestimonial = () => {
    setActiveTestimonial((prev) =>
      prev - 1 < 0 ? testimonials.length - 3 : prev - 1
    );
  };

  // Auto-scroll effect for the carousel, only when in view
  useEffect(() => {
    if (!isTestimonialsInView) return;
    const interval = setInterval(() => {
      nextTestimonial();
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval);
  }, [isTestimonialsInView]);

  const setActiveCard = (cardId) => {
    setActiveStatCard(cardId);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const statCounterVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, delay: 0.4, ease: "easeOut" },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const testimonialCardVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, delay: i * 0.1 + 0.2, ease: "easeOut" },
    }),
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4, delay: 0.6, ease: "easeOut" } },
  };

  return (
    <div className="flex flex-col w-full">
      {/* ===================== STATS SECTION ===================== */}
      <div ref={statsRef} className="mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8 py-12 px-4 md:px-8">
        {statsData.map((stat) => {
          const isActive = activeStatCard === stat.id;
          return (
            <motion.div
              key={stat.id}
              className={`
                h-64 w-full rounded-2xl p-6
                flex flex-col justify-between
                cursor-pointer overflow-hidden
                ${isActive
                  ? "bg-gradient-to-br from-[#36296C] to-[#5A45AB] text-white"
                  : "bg-white text-[#5A45AB]"}
              `}
              style={{ zIndex: 0 }}
              variants={itemVariants}
              initial="hidden"
              animate={isStatsInView ? "visible" : "hidden"}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              onClick={() => setActiveCard(stat.id)}
            >
              <div>
                <motion.h2
                  className={`
                    text-5xl font-bold leading-none
                    ${isActive ? "text-white" : "text-[#5A45AB]"}
                  `}
                  variants={statCounterVariants}
                  initial="hidden"
                  animate={isStatsInView ? "visible" : "hidden"}
                >
                  {stat.bigNumber}
                </motion.h2>
                <p className={`mt-1 text-xl ${isActive ? "text-white" : "text-[#5A45AB]"}`}>
                  {stat.label}
                </p>
              </div>
              <div className="mt-4">
                <p className={`text-lg font-semibold ${isActive ? "text-teal-300" : "text-[#5A45AB]"}`}>
                  {stat.year}
                </p>
                <p className={`text-sm ${isActive ? "text-white" : "text-[#5A45AB]"}`}>
                  {stat.subLabel}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ===================== TESTIMONIALS SECTION WITH CAROUSEL ===================== */}
<<<<<<< HEAD
      <div ref={testimonialsRef} className="w-full bg-[#ffd13e] py-12 px-4 md:px-8">
        <motion.h2
          className="text-2xl md:text-3xl font-bold text-center text-black mb-24"
          variants={titleVariants}
          initial="hidden"
          animate={isTestimonialsInView ? "visible" : "hidden"}
=======
      <motion.div
        className="w-full bg-[#ffd13e] md:py-12  px-4 md:px-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h2
          className="text-2xl md:text-3xl font-bold text-center text-black mb-12 mt-6 md:mt-0"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
>>>>>>> bc13dc7be0b62d58ae6f607b1793d336ee4d9d13
        >
          What People Are Saying
        </motion.h2>

        {/* Testimonial Carousel */}
        <div className="relative max-w-7xl mx-auto px-4 md:px-0 mb-16">
          {/* Carousel Navigation */}
          <div className="absolute top-1/2 left-0 transform -translate-y-1/2 z-10 w-full flex justify-between">
            <motion.button
              onClick={prevTestimonial}
              className="bg-white bg-opacity-80 rounded-full p-2 md:p-3 hover:bg-opacity-100 shadow-md transition-all -ml-4 md:-ml-8"
              aria-label="Previous testimonial"
              variants={buttonVariants}
              initial="hidden"
              animate={isTestimonialsInView ? "visible" : "hidden"}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-purple-800"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </motion.button>
            <motion.button
              onClick={nextTestimonial}
              className="bg-white bg-opacity-80 rounded-full p-2 md:p-3 hover:bg-opacity-100 shadow-md transition-all -mr-4 md:-mr-8"
              aria-label="Next testimonial"
              variants={buttonVariants}
              initial="hidden"
              animate={isTestimonialsInView ? "visible" : "hidden"}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-purple-800"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </motion.button>
          </div>

          {/* Carousel Content */}
          <div className="flex flex-col mx-10 md:flex-row gap-6 md:gap-6 justify-center">
            {visibleTestimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                className="relative md:w-[550px] lg:h-[350px] xl:h-[300px] mx-auto bg-white rounded-lg mt-20 md:mt-0 pt-16 pb-6 px-6 shadow-lg"
                variants={testimonialCardVariants}
                initial="hidden"
                animate={isTestimonialsInView ? "visible" : "hidden"}
                custom={index}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
                }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                {/* Top centered client image */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="p-3 bg-white rounded-full">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={120}
                      height={120}
                      className="rounded-full bg-orange-100 shadow-md"
                    />
                  </div>
                </div>

                {/* Testimonial content */}
                <div className="flex flex-col text-center text-gray-700">
                  <p className="mt-4 mb-4 line-clamp-5 text-left">{testimonial.content}</p>
                  <p className="text-lg text-left font-semibold text-gray-800">{testimonial.name}</p>
                  <p className="text-sm text-left text-gray-600">{testimonial.designationcompany}</p>
                </div>

                {/* Quote icons */}
                <div className="absolute -bottom-[45px] right-4 w-20 h-20">
                  <Image src={doublequotes} alt="quotes" width={70} height={70} />
                </div>
<<<<<<< HEAD
                <div className="absolute -top-9 left-7 w-20 h-20">
=======
                <div className="absolute  invisible md:visible -top-9 left-7  w-20 h-20">
>>>>>>> bc13dc7be0b62d58ae6f607b1793d336ee4d9d13
                  <Image src={flip} alt="quotes" width={70} height={70} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Carousel Indicators */}
        <div className="flex justify-center space-x-2 mt-2 mb-4">
          {testimonials.slice(0, testimonials.length - 2).map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setActiveTestimonial(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === activeTestimonial ? "w-8 bg-white" : "w-2 bg-white bg-opacity-50"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
              variants={buttonVariants}
              initial="hidden"
              animate={isTestimonialsInView ? "visible" : "hidden"}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

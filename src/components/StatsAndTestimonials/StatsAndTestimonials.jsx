import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import client1 from '../../../public/client/client1.png';

export default function StatsAndTestimonials() {
  // Which stat card is currently active
  const [activeStatCard, setActiveStatCard] = useState('customers');
  // Which group of testimonials is currently shown
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // ===================== STATS DATA =====================
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

  // ===================== TESTIMONIALS DATA =====================
  const testimonials = [
    {
      id: 1,
      name: "Rajesh",
      designationcompany: "Variety Of Styles!",
      content: "Fantastic shop! Great selection, fair prices, and friendly staff. Highly recommended. The quality of the products is exceptional, and the prices are very reasonable!",
      image: client1,
    }, {
      id: 2,
      name: "Rajesh",
      designationcompany: "Variety Of Styles!",
      content: "Fantastic shop! Great selection, fair prices, and friendly staff. Highly recommended. The quality of the products is exceptional, and the prices are very reasonable!",
      image: client1,
    }, {
      id: 3,
      name: "Rajesh",
      designationcompany: "Variety Of Styles!",
      content: "Fantastic shop! Great selection, fair prices, and friendly staff. Highly recommended. The quality of the products is exceptional, and the prices are very reasonable!",
      image: client1,
    }, {
      id: 4,
      name: "Rajesh",
      designationcompany: "Variety Of Styles!",
      content: "Fantastic shop! Great selection, fair prices, and friendly staff. Highly recommended. The quality of the products is exceptional, and the prices are very reasonable!",
      image: client1,
    }, {
      id: 5,
      name: "Rajesh",
      designationcompany: "Variety Of Styles!",
      content: "Fantastic shop! Great selection, fair prices, and friendly staff. Highly recommended. The quality of the products is exceptional, and the prices are very reasonable!",
      image: client1,
    }
  ];

  // ===================== HANDLERS =====================
  const goToTestimonial = (index) => {
    setActiveTestimonial(index);
  };

  const setActiveCard = (cardId) => {
    setActiveStatCard(cardId);
  };

  // ===================== FRAMER MOTION VARIANTS =====================
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 },
    },
  };

  const statCounterVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: 'spring', stiffness: 80, delay: 0.3 },
    },
  };

  const testimonialCardVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 70,
        delay: i * 0.15,
      },
    }),
  };

  // ===================== RENDER =====================
  return (
    <div className="flex flex-col w-full">
      {/* ===================== STATS SECTION ===================== */}
      <motion.div
        className="mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8 py-12 px-4 md:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        {statsData.map((stat) => {
          const isActive = activeStatCard === stat.id;
          return (
            <motion.div
              key={stat.id}
              className={`
                h-64 w-full
                rounded-2xl p-6
                flex flex-col justify-between
                cursor-pointer overflow-hidden
                ${isActive
                  ? 'bg-gradient-to-br from-[#36296C] to-[#5A45AB] text-white'
                  : 'bg-white text-[#5A45AB]'
                }
              `}
              style={{ zIndex: 0 }}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
              onClick={() => setActiveCard(stat.id)}
            >
              {/* Top Portion: Big Number & Label */}
              <div>
                <motion.h2
                  className={`
                    text-5xl font-bold leading-none
                    ${isActive ? 'text-white' : 'text-[#5A45AB]'}
                  `}
                  variants={statCounterVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {stat.bigNumber}
                </motion.h2>
                <p
                  className={`
                    mt-1 text-xl
                    ${isActive ? 'text-white' : 'text-[#5A45AB]'}
                  `}
                >
                  {stat.label}
                </p>
              </div>

              {/* Bottom Portion: Year & Sub-label */}
              <div className="mt-4">
                <p
                  className={`
                    text-lg font-semibold
                    ${isActive ? 'text-teal-300' : 'text-[#5A45AB]'}
                  `}
                >
                  {stat.year}
                </p>
                <p
                  className={`
                    text-sm
                    ${isActive ? 'text-white' : 'text-[#5A45AB]'}
                  `}
                >
                  {stat.subLabel}
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* ===================== TESTIMONIALS SECTION ===================== */}
      <motion.div
        className="w-full bg-gradient-to-r from-emerald-500 to-purple-800 py-12 px-4 md:px-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h2
          className="text-2xl md:text-3xl font-bold text-center text-white mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          What People Are Saying
        </motion.h2>

        {/* 2 Testimonials at a time */}
        <div className="flex flex-col md:flex-row gap-4 justify-center max-w-6xl mx-auto">
          {testimonials.slice(activeTestimonial, activeTestimonial + 2).map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="max-w-md mx-auto bg-white rounded-lg p-6 shadow-lg transform transition-all duration-500 ease-in-out relative"
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
              <div className="absolute top-[110px] -left-6 transform -translate-y-1/2 -translate-x-1/3 p-4">
                <div className="p-2 bg-white rounded-full">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={120}
                    height={120}
                    className="rounded-full bg-orange-100 shadow-md"
                  />
                </div>
              </div>

              <div className="pl-16 text-gray-700">
                {testimonial.content}
                <p className="text-lg font-semibold text-gray-800">{testimonial.name}</p>
                <p className="text-sm text-gray-600">{testimonial.designationcompany}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination Dots */}
        <motion.div
          className="flex justify-center mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          {Array.from({ length: Math.ceil(testimonials.length / 3) }).map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToTestimonial(index * 3)}
              className={`
                h-2 w-2 mx-1 rounded-full
                ${index === Math.floor(activeTestimonial / 3)
                  ? 'bg-white'
                  : 'bg-white bg-opacity-50'
                }
              `}
              aria-label={`Go to testimonial group ${index + 1}`}
              whileHover={{ scale: 1.5 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import client1 from '../../../public/client/client1.png';
import client2 from '../../../public/client/client2.png';
import client3 from '../../../public/client/client3.png';
import client4 from '../../../public/client/client4.png';
import client5 from '../../../public/client/client5.png';
import client6 from '../../../public/client/client6.png';
import client7 from '../../../public/client/client7.png';
import doublequotes from '../../../public/home/doublequotes.svg';
import flip from '../../../public/home/flip.svg';

export default function StatsAndTestimonials() {
  const [activeStatCard, setActiveStatCard] = useState('customers');

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

  const testimonials = [
    {
      id: 1,
      name: "Mr. Shivanand Jagtap",
      designationcompany: "Director - Raidaar Masale",
      content: "Fantastic shop! Great selection, fair prices, and friendly staff. Highly recommended. The quality of the products is exceptional, and the prices are very reasonable!",
      image: client1,
    },
    {
      id: 2,
      name: "Ms. Preethi Dekhne",
      designationcompany: "Tarvoti!",
      content: "The first benefit was MOQ, cost effective & very convenient for start-ups, Quick turnaround time, very happy with quality, delivery was as per timeline shared. ",
      image: client2,
    },
    {
      id: 3,
      name: "Mr. Arka Narayan De",
      designationcompany: "Business Development Head - Aman Tea Group",
      content: "Nexi Standard Sizes have been a game-changer for us at Aman Tea Group. The quality, consistency, and quick turnaround have streamlined our packaging process, helping us maintain efficiency in our tea product launches. Nexibles' reliability and service have made them our go-to packaging partner.",
      image: client3,
    },
    {
      id: 4,
      name: "Mr. Dheeraj  Deotarse",
      designationcompany: "",
      content: "Nexi Classic sizes have transformed our tea and coffee packaging with cutting-edge digital printing, making it more striking and market-ready. Their precision, quality, and marketing support set them apart. Highly recommended for brands that demand excellence!",
      image: client4,
    },
    {
      id: 5,
      name: "Mr. Tuhin Samanta",
      designationcompany: "Founder - Nutkhut Delight",
      content: "Nexi Standard Sizes by Nexibles has been a game-changer for us! Their low MOQ made it easy to launch new products quickly, which is invaluable for an emerging brand like ours. Fast production and excellent customer service are just the cherry on top!",
      image: client5,
    },
    {
      id: 6,
      name: "Mr. Rajiv Raj Jain",
      designationcompany: "Founder, Svasthyaa",
      content: "I met Amol at AAHAR and was really impressed with the standard products he had – they were just right for us to launch our products. As a startup, his innovative approach helped us reduce our launch costs by 50%. His team has always been responsive, supportive, and great to work with. Thanks to them, we were able to scale smoothly.",
      image: client6,
    }, 
    {
      id: 7,
      name: "Mr. Hisham Sunesra",
      designationcompany: "Founder, Cookie Cartel",
      content: "We’ve been working with Nexibles for over 1.5 years now, and they’ve been an incredible partner in our growth journey. From our very first order of just 1,000 standard stand-up pouches to now producing 10,000 fully customized and perfectly sized printed pouches, they’ve been with us every step of the way. The team — including the founders — has been consistently supportive, responsive, and proactive. Their pricing is highly competitive compared to other players in the market. If you’re looking for a reliable partner to scale with, we highly recommend Nexibles.",
      image: client7,
    }
  ];

  const sliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
    drag: true,
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

  const setActiveCard = (cardId) => {
    setActiveStatCard(cardId);
  };

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

  return (
    <div className="flex flex-col w-full">
      {/* ===================== STATS SECTION ===================== */}
      <motion.div
        className="grid grid-cols-1 gap-6 px-4 py-12 mx-auto md:grid-cols-4 md:gap-8 md:px-8"
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
                h-64 w-full rounded-2xl p-6
                flex flex-col justify-between
                cursor-pointer overflow-hidden
                ${isActive
                  ? 'bg-[#103b60] text-white'
                  : 'bg-white text-[#103b60'}
              `}
              style={{ zIndex: 0 }}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
              onClick={() => setActiveCard(stat.id)}
            >
              <div>
                <motion.h2
                  className={`
                    text-5xl font-bold leading-none
                    ${isActive ? 'text-white' : 'text-[#103b60]'}
                  `}
                  variants={statCounterVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {stat.bigNumber}
                </motion.h2>
                <p className={`mt-1 text-xl ${isActive ? 'text-white' : 'text-[#103b60]'}`}>
                  {stat.label}
                </p>
              </div>

              <div className="mt-4">
                <p className={`text-lg font-semibold ${isActive ? 'text-teal-300' : 'text-[#103b60]'}`}>
                  {stat.year}
                </p>
                <p className={`text-sm ${isActive ? 'text-white' : 'text-[#103b60]'}`}>
                  {stat.subLabel}
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* ===================== TESTIMONIALS SECTION WITH CAROUSEL ===================== */}
      <motion.div
        className="w-full bg-[#ffd13e] md:py-12 px-4 md:px-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h2
          className="mt-6 mb-12 text-2xl font-bold text-center text-black md:text-3xl md:mt-0"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          What People Are Saying
        </motion.h2>

        {/* Testimonial Carousel with react-slick */}
        <div className="relative px-4 mx-auto mb-16 max-w-7xl md:px-0">
          <Slider {...sliderSettings}>
            {testimonials.map((testimonial, index) => (
              <div key={testimonial.id} className="px-3">
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
                        src={testimonial.image}
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
                    <Image src={doublequotes} alt="quotes" width={70} height={70} />
                  </div>
                  <div className="absolute invisible w-20 h-20 md:visible -top-9 left-7">
                    <Image src={flip} alt="quotes" width={70} height={70} />
                  </div>
                </motion.div>
              </div>
            ))}
          </Slider>
        </div>
      </motion.div>
    </div>
  );
}
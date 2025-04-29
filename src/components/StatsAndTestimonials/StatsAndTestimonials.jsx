import React, { useState, useEffect } from 'react';
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
  const [testimonials, setTestimonials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // const fallbackImages = [client1, client2, client3, client4, client5, client6, client7];

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
          }));
          setTestimonials( formattedTestimonials);
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
      {/* <motion.div
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
      </motion.div> */}

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
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <p>Loading testimonials...</p>
            </div>
          ) : (
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
          )}
        </div>
      </motion.div>
    </div>
  );
}
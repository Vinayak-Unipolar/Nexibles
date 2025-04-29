"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import client1 from "../../../public/client/client1.png";
import client2 from "../../../public/client/client2.png";
import client3 from "../../../public/client/client3.png";
import client4 from "../../../public/client/client4.png";
import client5 from "../../../public/client/client5.png";
import client6 from "../../../public/client/client6.png";
import client7 from "../../../public/client/client7.png";

import doublequotes from "../../../public/home/doublequotes.svg";
import flip from "../../../public/home/flip.svg";

// -- Custom Arrows --------------------------------------------------
const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute left-0 top-1/2 transform -translate-y-1/2 z-20 bg-white bg-opacity-30 hover:bg-opacity-50 rounded-full p-2 shadow-md"
    aria-label="Previous testimonial"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5 text-black"
    >
      <polyline points="15 18 9 12 15 6" />
    </svg>
  </button>
);

const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute right-0 top-1/2 transform -translate-y-1/2 z-20 bg-white bg-opacity-30 hover:bg-opacity-50 rounded-full p-2 shadow-md"
    aria-label="Next testimonial"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5 text-black"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  </button>
);

// -------------------------------------------------------------------

export default function StatsAndTestimonials() {
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
    {
      id: 6,
      name: "Mr. Rajiv Raj Jain",
      designationcompany: "Founder, Svasthyaa",
      content:
        "I met Amol at AAHAR and was really impressed with the standard products he had – they were just right for us to launch our products. As a startup, his innovative approach helped us reduce our launch costs by 50%. His team has always been responsive, supportive, and great to work with. Thanks to them, we were able to scale smoothly.",
      image: client6,
    },
    {
      id: 7,
      name: "Mr. Hisham Sunesra",
      designationcompany: "Founder, Cookie Cartel",
      content:
        "We’ve been working with Nexibles for over 1.5 years now, and they’ve been an incredible partner in our growth journey. From our very first order of just 1,000 standard stand-up pouches to now producing 10,000 fully customized and perfectly sized printed pouches, they’ve been with us every step of the way. The team — including the founders — has been consistently supportive, responsive, and proactive. Their pricing is highly competitive compared to other players in the market. If you’re looking for a reliable partner to scale with, we highly recommend Nexibles.",
      image: client7,
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

  return (
    <div className="flex flex-col w-full">
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

        <div className="relative px-4 mx-auto mb-16 max-w-7xl md:px-0">
          <Slider {...sliderSettings}>
            {testimonials.map((t, idx) => (
              <div key={t.id} className="px-3">
                <motion.div
                  className="relative mx-auto mt-24 mb-10 bg-white rounded-lg pt-16 pb-6 px-6 shadow-lg md:w-[550px] lg:h-[350px] xl:h-[300px]"
                  variants={testimonialCardVariants}
                  initial="hidden"
                  animate="visible"
                  custom={idx}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
                  }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  {/* Client Image */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="p-3 bg-white rounded-full">
                      <Image
                        src={t.image}
                        alt={t.name}
                        width={120}
                        height={120}
                        className="bg-orange-100 rounded-full shadow-md"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col text-left text-gray-700">
                    <p className="mt-4 mb-4 line-clamp-5">{t.content}</p>
                    <p className="text-lg font-semibold text-gray-800">
                      {t.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      {t.designationcompany}
                    </p>
                  </div>

                  {/* Quote Icons */}
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

"use client";
import React, { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import PouchesHeroSectionData from "./PouchesHeroSectionData";
import Link from "next/link";

const PouchData = [
  {
    name: "Centre Seal Pouch",
    url: "centre-seal-pouch",
  },
  {
    name: "Stand Up Pouch",
    url: "stand-up-pouch",
  },
  {
    name: "Center Seal Side Gusset Pouch",
    url: "center-seal-side-gusset-pouch",
  },
  {
    name: "2 Side Seal Pouch",
    url: "2-side-seal-pouch",
  },
];

const PouchesHeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const backgroundColors = [
    "bg-[#FFBCAC]",
    "bg-[#EAAD9F]",
    "bg-[#85DBCD]",
    "bg-[#AEDB9F]",
    "bg-[#E591B9]",
  ];
  const pouchNames = [
    "Centre Seal Pouch",
    "Stand Up Pouch",
    "Center Seal Side Gusset Pouch",
    "2 Side Seal Pouch",
  ];
  const highlightColors = [
    "bg-[#F39E8A]",
    "bg-[#EC6269]",
    "bg-[#53C2B0]",
    "bg-[#89C375]",
    "bg-[#C65B8E]",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(
        (prevIndex) => (prevIndex + 1) % PouchesHeroSectionData.length
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const currentData = PouchesHeroSectionData[currentIndex];
  const currentBgColor =
    backgroundColors[currentIndex % backgroundColors.length];
  const highlightClass = highlightColors[currentIndex % highlightColors.length];

  return (
    <div
      className={`min-h-screen ${currentBgColor} transition-colors duration-1000 flex flex-col justify-center`}
    >
      <Head>
        <title>Nexibles - {pouchNames[currentIndex]}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 py-8 flex flex-col items-center">
        <h1 className="text-3xl lg:text-5xl font-bold text-white mb-8 mt-8 lg:mt-16 text-center">
          {pouchNames[currentIndex]}
        </h1>

        <div className="relative w-full max-w-3xl aspect-video mb-8">
          <Image
            src={currentData.imgsrc}
            alt={currentData.alt}
            layout="fill"
            objectFit="contain"
          />
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          {PouchData.map((item, index) => (
            <Link
              href={`/category/${item.url}`}
              key={item.name}
              className={`px-4 py-2 rounded-full text-sm md:text-base text-white transition-colors duration-300 ${
                currentIndex === index
                  ? highlightClass
                  : "bg-white bg-opacity-20 hover:bg-opacity-30"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default PouchesHeroSection;

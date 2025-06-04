"use client";
import React, { useState, useEffect, useMemo, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import Image from "next/image";
import { useInView } from "framer-motion";
import { FaLongArrowAltRight } from "react-icons/fa";
const Industries = () => {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );
  const [industries, setIndustries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sliderRef, setSliderRef] = useState(null);
  const APIURL = process.env.NEXT_PUBLIC_API_URL;
  const CDN_URL = process.env.NEXT_PUBLIC_CDN_URL;
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.5,
    margin: "0px 0px -100px 0px",
  });

  useEffect(() => {
    const fetchIndustries = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${APIURL}/api/industries`);
        if (!res.ok) throw new Error("Failed to fetch industries");
        const data = await res.json();
        if (Array.isArray(data)) setIndustries(data);
        else throw new Error("Invalid data format");
      } catch (err) {
        console.error("Failed to fetch industries", err);
        setError("Failed to load industries. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchIndustries();
  }, [APIURL]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 768;
  const desktopCardWidth = 340;
  const desktopGap = 32;
  const mobileCardWidth = 200;
  const mobileGap = 16;

  const cardWidth = isMobile ? mobileCardWidth : desktopCardWidth;
  const gap = isMobile ? mobileGap : desktopGap;
  const visibleCount = isMobile ? 2 : 4;

  const circularItems = useMemo(() => {
    if (industries.length === 0)
      return Array(visibleCount).fill({ name: "Loading...", image: "/placeholder.png" });
    const displayItems = [...industries];
    const minItems = Math.max(industries.length, visibleCount + 1);
    for (let i = 0; i < minItems; i++) {
      displayItems.push(industries[i % industries.length]);
    }
    return displayItems;
  }, [industries, visibleCount]);

  const PrevArrow = ({ onClick }) => {
    return (
      <button
        onClick={onClick}
        className="absolute left-[-10px] md:left-[-30px] top-1/2 transform -translate-y-1/2 z-10 p-2 transition-all"
        aria-label="Previous testimonial"
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
      </button>
    );
  };

  const NextArrow = ({ onClick }) => {
    return (
      <button
        onClick={onClick}
        className="absolute right-[-10px] md:right-[-30px] top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full transition-all"
        aria-label="Next testimonial"
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
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    );
  };

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 700,
    slidesToShow: visibleCount,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    draggable: true,
    swipeToSlide: true,
    cssEase: "ease-in-out",
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          centerMode: false,
        },
      },
    ],
  };

  return (
    <div ref={sectionRef}
      className="bg-white pt-8 pb-4 px-4 max-w-[1400px] mx-auto sm:px-6 lg:px-8 mt-[-16vh] md:mt-0">
      {loading && <div className="py-4 text-center">Loading industries...</div>}
      {error && <div className="py-4 text-center text-red-500">{error}</div>}
      {!loading && !error && (
        <>
          <div
            className="mx-auto mt-4 md:text-3xl text-2xl font-bold text-center text-gray-800"
          >
            Explore Industries
          </div>
          <div className="relative md:mt-4" style={{ maxWidth: "100%" }}>
            <Slider ref={setSliderRef} {...sliderSettings}>
              {circularItems.map((category, index) => (
                <div
                  key={`${category.name}-${index}`}
                  style={{ width: `${cardWidth}px`, padding: `0 ${gap / 2}px` }}
                >
                  <Link
                    href={`/industries/${category.name
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                    className="p-1 pb-1 rounded-xl"
                  >
                    <div className="relative h-48 md:h-[400px] w-full flex items-center justify-center">
                      <Image
                        src={`${CDN_URL}/industries/${category.image}`}
                        width={400}
                        height={400}
                        alt={`Image for ${category.name}`}
                        quality={100}
                        className="object-contain w-full h-full pt-2"
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />
                    </div>
                    <div className="flex flex-col items-center justify-center mt-2 mx-[22px] text-center">
                      <div className="w-full px-2 py-1 text-xs font-semibold text-center text-gray-900 truncate transition-all duration-300 hover:bg-[#ffd13e] rounded-lg sm:px-3 sm:py-2 md:text-lg">
                        {category.name}
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </Slider>
          </div>
          <div className="flex-1 flex justify-center"> {/* Right section with button */}
            <Link href="/all-industry">
              <button className="flex items-center gap-2 md:px-6 md:py-1 p-2 md:text-lg text-xs text-black bg-[#ffd13e] rounded-full hover:bg-[#e6bc35] transition-all">
                Show More
                <FaLongArrowAltRight />
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Industries;
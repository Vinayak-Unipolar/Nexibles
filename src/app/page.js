"use client";
import React, { useEffect, useState } from "react";
import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa"; // Import react-icons
import WhatWeDo from "@/components/home/WhatWeDo";
import Footer from "@/components/shop/Footer";
import GreenPart from "@/components/home/GreenPart";
import AdvantageItem from "@/components/home/AdvantageItem";
import HeaderSection from "@/components/home/HeaderSection";
import Navbar from "@/components/shop/Navbar";
import Trendingproducts from "@/components/shop/trendingproducts/Trendingproducts";
import Productcategory from "@/components/shop/productcategory/Productcategory";
import Popularproducts from "@/components/shop/popularproducts/Popularproducts";
import StatsAndTestimonials from "@/components/StatsAndTestimonials/StatsAndTestimonials";
import ProductSections from "@/components/shop/ProductSections";
import NexiblesInstagramSection from "@/components/home/NexiblesInstagramSection";
import Industries from "@/components/home/Industries";
import Pop_up_image from "../../public/home/pop_up.png"
const Modal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");

  if (!isOpen) return null;

  const handleSubscribe = () => {
    // Placeholder for subscription logic
    console.log("Subscribed with email:", email);
    setEmail("");
    onClose(); // Close modal after subscribing
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl max-w-md w-full mx-4 relative flex flex-col">
        {/* Top Half: Image */}
        <div className="relative w-full h-48">
          <img
            src={Pop_up_image.src} // Using the image from public/home/modal.png
            alt="Modal Banner"
            className="w-full h-full object-cover rounded-t-3xl"
          />
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-white hover:text-gray-300 bg-gray-800 bg-opacity-50 rounded-full p-1"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        {/* Bottom Half: Text, Email Input, Button, and Social Icons */}
        <div className="px-6 pb-3 pt-1 flex flex-col items-center">
          <h2 className="text-gray-600 mb- text-center ">
            Subscribe To Our Newsletter!
          </h2>
          <p className="text-xl font-bold mb-2 text-center">
            Receive Offers your next order, exclusive offers & more!
          </p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full p-2 mb-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
         <button
            onClick={handleSubscribe}
            className="w-full bg-black text-white py-2.5 rounded-full border-2 border-transparent hover:bg-white hover:text-black hover:border-black font-semibold transition-all duration-300"
          >
            SUBSCRIBE
          </button>
          
          {/* <div className="flex gap-4 mt-2">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram className="w-4 h-4 text-gray-600 hover:text-blue-600" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <FaFacebookF className="w-4 h-4 text-gray-600 hover:text-blue-600" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <FaTwitter className="w-4 h-4 text-gray-600 hover:text-blue-600" />
            </a>
          </div> */}
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  const [categoryData, setData] = useState([]);
  const token = process.env.NEXT_PUBLIC_API_KEY;
  const APIURL = process.env.NEXT_PUBLIC_API_URL;
  const [showModal, setShowModal] = useState(false);
  
  useEffect(() => {
    // Modal logic
    const lastShown = localStorage.getItem("modalLastShown");
    const now = new Date().getTime();
    const oneDay = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

    if (!lastShown || now - parseInt(lastShown) > oneDay) {
      setShowModal(true);
      localStorage.setItem("modalLastShown", now.toString());
    }

    // Category fetch logic
    const fetchData = async () => {
      try {
        const response = await fetch(`${APIURL}/api/category_master`, {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            "API-Key": token,
          },
        });
        const data = await response.json();
        if (data.status === "success") {
          const filterCategory = data.data.filter(
            (category) => category.origin?.toLowerCase() === "nexibles"
          );
          setData(filterCategory);
        } else {
          console.error("failed to fetch categories", data.error);
        }
      } catch (error) {
        console.log("Error Fetching Data", error);
      }
    };
    fetchData();
  }, []);

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <Modal isOpen={showModal} onClose={closeModal} />
      <Navbar />
      <HeaderSection />
      <Industries />
      {/* <Productcategory categoryData={categoryData} /> */}
      <Popularproducts />
      <ProductSections />
      {/* <Trendingproducts /> */}
      <AdvantageItem />
      <StatsAndTestimonials />
      <NexiblesInstagramSection />
      <Footer />
    </div>
  );
};

export default Home;
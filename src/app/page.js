"use client";
import React, { useEffect, useState } from "react";
import { FaInstagram, FaFacebookF, FaTwitter, FaPinterestP } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import toastify styles
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
import Pop_up_image from "../../public/home/pop_up.png";

const Modal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const token = process.env.NEXT_PUBLIC_API_KEY;

  if (!isOpen) return null;

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter a valid email.");
      return;
    }
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/subscribe`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "API-Key": token,
        },
        body: JSON.stringify({ email: email, origin: "nexibles" }),
      });
      if (response.ok) {
        toast.success("Successfully subscribed!");
        setEmail("");
        onClose();
      } else {
        toast.error("Subscription failed. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl max-w-md w-full mx-4 relative overflow-hidden">
        {/* Close button (X) */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-black hover:text-gray-700 z-10 bg-white rounded-full p-1"
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

        {/* Top Half: Product Image */}
        <div className="relative w-full h-52">
          <img
            src={Pop_up_image.src}
            alt="Nexibles Product"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Bottom Half: Content */}
        <div className="p-6 flex flex-col items-center">
          <p className="text-gray-500 uppercase text-xs tracking-wide mb-1">
            SUBSCRIBE TO OUR NEWSLETTER!
          </p>
          
          <h2 className="text-xl font-bold mb-6 text-center">
            Receive Offers Your Next Order,<br />
            Exclusive Offers & More!
          </h2>
          
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your e-mail"
            className="w-[80%] p-3 mb-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-gray-400"
          />
          
          <button
            onClick={handleSubscribe}
            className="w-[80%] bg-black text-white py-3 rounded-xl border-2 border-transparent hover:bg-white hover:text-black hover:border-black font-medium transition-all duration-300 uppercase mb-6"
          >
            Subscribe
          </button>
          
          {/* Social Media Icons */}
          <div className="flex space-x-4 justify-center">
            <a href="#" className="text-black hover:text-gray-600">
              <FaFacebookF size={18} />
            </a>
            <a href="#" className="text-black hover:text-gray-600">
              <FaTwitter size={18} />
            </a>
            <a href="#" className="text-black hover:text-gray-600">
              <FaInstagram size={18} />
            </a>
            <a href="#" className="text-black hover:text-gray-600">
              <FaPinterestP size={18} />
            </a>
          </div>
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
      <ToastContainer position="top-right" autoClose={3000} />
      <Modal isOpen={showModal} onClose={closeModal} />
      <Navbar />
      <HeaderSection />
      <Industries />
      <Popularproducts />
      <ProductSections />
      <AdvantageItem />
      <StatsAndTestimonials />
      <NexiblesInstagramSection />
      <Footer />
    </div>
  );
};

export default Home;
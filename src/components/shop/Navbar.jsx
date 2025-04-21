"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  IoCartOutline,
  IoMenuOutline,
  IoCloseOutline,
  IoPersonOutline,
} from "react-icons/io5";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useAuth } from "@/utils/authContext";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [showPersonDropdown, setShowPersonDropdown] = useState(false);
  const { user, logout } = useAuth();
  const [isMobile, setIsMobile] = useState(false);
  const cartItems = useSelector((state) => state.cart.items);
  const cartItemCount = cartItems.length;

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 0);
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const handleToggleOpen = () => setShowPersonDropdown(!showPersonDropdown);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Pouches", path: "/all-category" },
    { name: "Industries", path: "/businesses" },
    { name: "Shop", path: "/shop" },
    { name: "Request Quote", path: "/request-quote" },
    { name: "About Nexibles", path: "/about" },
    { name: "Contact Us", path: "/contact" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          hasScrolled ? "bg-white shadow-xl" : "bg-white"
        }`}
      >
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex-shrink-0">
            <div>
              <Image
                src="/home/nexible.gif"
                alt="Nexibles"
                width={100}
                height={30}
                className="w-[100px] h-[30px] object-contain"
                priority
              />
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            {navItems.slice(1, 5).map((item) => (
              <div key={item.name} className="relative">
                <Link
                  href={item.path}
                  className="text-black text-xs sm:text-md hover:underline"
                >
                  {item.name}
                </Link>
                <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-black transition-all duration-300 hover:w-full mt-1"></span>
              </div>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <div>
              <Link href="/my-cart" className="relative flex items-center text-black">
                <div className="relative">
                  <IoCartOutline size={24} />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-blue-900 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItemCount}
                    </span>
                  )}
                </div>
              </Link>
            </div>

            <div
              className="relative flex items-center cursor-pointer"
              onClick={handleToggleOpen}
            >
              <div>
                <IoPersonOutline size={24} />
              </div>
              {showPersonDropdown && (
                <div className="absolute top-full right-0 mt-2 bg-white text-gray-900 p-4 shadow-md flex flex-col items-center w-40 rounded-md">
                  {user ? (
                    <>
                      <Link
                        href="/my-dashboard"
                        className="text-white text-center px-4 py-2 w-full bg-[#30384E] rounded-md transition duration-300 ease-in-out mb-2"
                      >
                        Profile
                      </Link>
                      <button
                        onClick={logout}
                        className="text-white text-center px-4 py-2 w-full bg-[#30384E] rounded-md transition duration-300 ease-in-out"
                      >
                        Log out
                      </button>
                    </>
                  ) : (
                    <Link
                      href="/login"
                      className="text-white text-center px-4 py-2 w-full bg-[#30384E] rounded-md transition duration-300 ease-in-out"
                    >
                      Sign In
                    </Link>
                  )}
                </div>
              )}
            </div>

            <div className="relative">
              <button
                className="flex items-center text-gray-900 text-sm sm:text-md"
                onClick={toggleDropdown}
              >
                ENGLISH <RiArrowDropDownLine size={24} />
              </button>
              {isDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 bg-white shadow-md rounded-md">
                  {["FRENCH", "SPANISH"].map((lang) => (
                    <div key={lang}>
                      <Link
                        href="#"
                        className="block px-4 py-2 text-gray-900"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        {lang}
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <motion.button
              className="md:hidden text-gray-900 z-50"
              onClick={toggleMenu}
              whileTap={{ scale: 0.95 }}
            >
              {isMenuOpen ? (
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <IoCloseOutline size={24} />
                </motion.div>
              ) : (
                <IoMenuOutline size={24} />
              )}
            </motion.button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-white z-40 flex flex-col"
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ type: "tween", duration: 0.3 }}
          >
            <div className="flex justify-between items-center px-6 py-4 border-b shadow-sm">
              <div className="text-black font-bold text-lg">
                NE<span className="text-red-600">•</span>IBLES
              </div>
              <div className="flex items-center space-x-4">
                <Link href="/my-cart">
                  <IoCartOutline size={24} />
                </Link>
                <div>
                  <IoPersonOutline size={24} />
                </div>
                <div className="flex items-center">
                  ENGLISH <RiArrowDropDownLine size={24} />
                </div>
                <motion.button
                  onClick={toggleMenu}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <IoCloseOutline size={24} />
                  </motion.div>
                </motion.button>
              </div>
            </div>
            
            <div className="flex-1 flex flex-col px-6 py-4">
              <ul className="text-black space-y-5">
                {navItems.map((item, index) => (
                  <li key={item.name}>
                    <Link
                      href={item.path}
                      onClick={toggleMenu}
                      className="block py-2 text-lg font-medium"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-red-500 text-white p-6 space-y-4">
              <div>
                <h3 className="font-bold text-lg mb-2">Meet With US</h3>
                <p>Art NEXT Pvt Ltd,</p>
                <p>A/463, Ground Floor,</p>
                <p>TTC Industrial Area,</p>
                <p>Mahape, MIDC, Navi Mumbai,</p>
                <p>Thane - 400710, MH, India</p>
              </div>
              
              <div>
                <h3 className="font-bold text-lg mb-2">Call US</h3>
                <p>+91 9821045101</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
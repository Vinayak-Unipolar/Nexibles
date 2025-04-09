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
import { useSelector } from 'react-redux';
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

  // Animation variants
  const menuVariants = {
    closed: {
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2
      }
    }
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${hasScrolled ? "bg-white shadow-xl" : "bg-white"}`}
      >
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex-shrink-0">
            <motion.div whileHover={{ scale: 1.05 }}>
              <Image
                src="/home/nexible.gif"
                alt="Nexibles"
                width={100}
                height={30}
                className="w-[100px] h-[30px] object-contain"
                priority
              />
            </motion.div>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            {["Pouches", "Businesses", "Agencies", "Shop", "Request Quote"].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -2 }}
                className="relative"
              >
                <Link
                  href={item === "Request Quote" ? "/request-quote" : "/shop"}
                  className="text-black text-xs sm:text-md hover:underline"
                >
                  {item}
                </Link>
                <span
                  className="absolute left-0 bottom-0 w-0 h-[2px] bg-black transition-all duration-300 hover:w-full mt-1"
                ></span>
              </motion.div>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <motion.div whileHover={{ scale: 1.1 }}>
              <Link href="/my-cart" className="relative flex items-center text-black">
                <div className="relative">
                  <IoCartOutline size={24} />
                  {cartItemCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2 bg-blue-900 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
                    >
                      {cartItemCount}
                    </motion.span>
                  )}
                </div>
              </Link>
            </motion.div>

            <div className="relative flex items-center cursor-pointer" onClick={handleToggleOpen}>
              <motion.div whileHover={{ scale: 1.1 }}>
                <IoPersonOutline size={24} />
              </motion.div>
              <AnimatePresence>
                {showPersonDropdown && (
                  <motion.div
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="absolute top-full right-0 mt-2 bg-white text-gray-900 p-4 shadow-md flex flex-col items-center w-40 rounded-md"
                  >
                    {user ? (
                      <>
                        <Link href="/my-dashboard" className="text-white text-center px-4 py-2 w-full bg-[#30384E] rounded-md transition duration-300 ease-in-out mb-2">
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
                      <Link href="/login" className="text-white text-center px-4 py-2 w-full bg-[#30384E] rounded-md transition duration-300 ease-in-out">
                        Sign In
                      </Link>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="flex items-center text-gray-900 text-sm sm:text-base"
                onClick={toggleDropdown}
              >
                ENGLISH <RiArrowDropDownLine size={24} />
              </motion.button>
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="absolute top-full right-0 mt-2 bg-white shadow-md rounded-md"
                  >
                    {["FRENCH", "SPANISH"].map((lang) => (
                      <motion.div key={lang} whileHover={{ backgroundColor: "#f3f4f6" }}>
                        <Link
                          href="#"
                          className="block px-4 py-2 text-gray-900"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          {lang}
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <motion.button
              whileTap={{ scale: 0.95 }}
              className="md:hidden text-gray-900 z-50"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <IoCloseOutline size={24} /> : <IoMenuOutline size={24} />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 bg-white z-40"
          >
            <div className="flex flex-col h-full p-6">
              <ul className="text-black text-2xl mt-12 space-y-6 text-center">
                {["Home", "Pouches", "Businesses", "Agencies", "Shop", "Request Quote"].map((item, index) => (
                  <motion.li
                    key={item}
                    variants={navItemVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Link
                      href={item === "Home" ? "/" : item === "Request Quote" ? "/request-quote" : "/shop"}
                      onClick={toggleMenu}
                    >
                      {item}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
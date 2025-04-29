"use client";
import React, { useState, useEffect, useRef } from "react";
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
import { motion, AnimatePresence, useInView } from "framer-motion";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [showPersonDropdown, setShowPersonDropdown] = useState(false);
  const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false); // Added dropdown state
  const { user, logout } = useAuth();
  const [isMobile, setIsMobile] = useState(false);
  const cartItems = useSelector((state) => state.cart.items);
  const cartItemCount = cartItems.length;
  const navbarRef = useRef(null);
  const contactRef = useRef(null);
  const isNavbarInView = useInView(navbarRef, { once: true, amount: 0.5 });

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
    {
      name: "Shop",
      path: "#", // Using '#' since Shop is a dropdown
      dropdown: [
        { name: "Standard Pouch", path: "/shop" },
        { name: "Custom Size Pouch", path: "/configuration-tool" },
      ],
    },
    { name: "Request Quote", path: "/request-quote" },
    { name: "Configuration Tool", path: "/configuration-tool" },
    { name: "About Nexibles", path: "/about" },
    { name: "Contact Us", path: "/contact" },
  ];

  // Animation variants
  const logoVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const navLinkVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" },
    }),
  };

  const iconVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, delay: i * 0.1 + 0.4, ease: "easeOut" },
    }),
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
  };

  const mobileMenuVariants = {
    hidden: { y: "-100%" },
    visible: { y: 0, transition: { type: "tween", duration: 0.3, ease: "easeOut" } },
  };

  const mobileLinkVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" },
    }),
  };

  const contactVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: 0.2, ease: "easeOut" },
    },
  };

  return (
    <>
      <nav
        ref={navbarRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          hasScrolled ? "bg-white shadow-xl" : "bg-white"
        }`}
      >
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <motion.div
            initial="hidden"
            animate={isNavbarInView ? "visible" : "hidden"}
            variants={logoVariants}
          >
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/home/nexible.gif"
                alt="Nexibles"
                width={100}
                height={30}
                className="w-[100px] h-[30px] object-contain"
                priority
              />
            </Link>
          </motion.div>

          <div className="hidden md:flex items-center space-x-6">
            {navItems.slice(1, 5).map((item, index) => (
              <motion.div
                key={item.name}
                className="relative"
                custom={index}
                initial="hidden"
                animate={isNavbarInView ? "visible" : "hidden"}
                variants={navLinkVariants}
              >
                {item.dropdown ? (
                  <div className="relative">
                    <button
                      onClick={() => setIsShopDropdownOpen(!isShopDropdownOpen)} // Toggle dropdown
                      className="text-black text-xs sm:text-md flex items-center space-x-1"
                    >
                      {item.name} <RiArrowDropDownLine size={16} />
                    </button>
                    {isShopDropdownOpen && (
                      <motion.div
                        className="absolute left-0 top-full mt-2 bg-white text-gray-900 p-4 shadow-md rounded-md"
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={dropdownVariants}
                      >
                        {item.dropdown.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.name}
                            href={dropdownItem.path}
                            className="block px-4 py-2 text-gray-900 text-sm font-medium whitespace-nowrap"
                            onClick={() => setIsShopDropdownOpen(false)} // Close dropdown on item click
                          >
                            {dropdownItem.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                    
                  </div>
                ) : (
                  <Link href={item.path} className="text-black text-xs sm:text-md hover:underline">
                    {item.name}
                  </Link>
                )}
                
              </motion.div>
            ))}
            
          </div>

          <div className="flex items-center space-x-4">
            <motion.div
              custom={0}
              initial="hidden"
              animate={isNavbarInView ? "visible" : "hidden"}
              variants={iconVariants}
            >
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
            </motion.div>

            <motion.div
              custom={1}
              initial="hidden"
              animate={isNavbarInView ? "visible" : "hidden"}
              variants={iconVariants}
              className="relative flex items-center cursor-pointer"
              onClick={handleToggleOpen}
            >
              <IoPersonOutline size={24} />
              <AnimatePresence>
                {showPersonDropdown && (
                  <motion.div
                    className="absolute top-full right-0 mt-2 bg-white text-gray-900 p-4 shadow-md flex flex-col items-center w-40 rounded-md"
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={dropdownVariants}
                  >
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
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.button
              className="md:hidden text-gray-900 z-50"
              onClick={toggleMenu}
              whileTap={{ scale: 0.95 }}
              custom={3}
              initial="hidden"
              animate={isNavbarInView ? "visible" : "hidden"}
              variants={iconVariants}
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
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={mobileMenuVariants}
          >
            <div className="flex justify-between items-center px-6 py-4 border-b shadow-sm">
              <div className="text-black font-bold text-lg">
                NE<span className="text-red-600">•</span>IBLES
              </div>
              <div className="flex items-center space-x-4">
                <motion.div
                  custom={0}
                  initial="hidden"
                  animate="visible"
                  variants={iconVariants}
                >
                  <Link href="/my-cart">
                    <IoCartOutline size={24} />
                  </Link>
                </motion.div>
              </div>
            </div>

            <div className="px-6">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  variants={mobileLinkVariants}
                >
                  <Link
                    href={item.path}
                    className="block py-4 text-sm font-medium text-gray-800"
                    onClick={toggleMenu}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

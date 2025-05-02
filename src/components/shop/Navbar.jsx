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
import logo from "../../../public/home/Nexibles_Logo.gif";
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [showPersonDropdown, setShowPersonDropdown] = useState(false);
  const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false);
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
      path: "#",
      dropdown: [
        { name: "Nexi Classic", path: "/shop" },
        { name: "Customize Pouch", path: "/configuration-tool" },
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
        <div className="container flex items-center justify-between h-16 px-4 mx-auto">
          <motion.div
            initial="hidden"
            animate={isNavbarInView ? "visible" : "hidden"}
            variants={logoVariants}
          >
            <Link href="/" className="flex-shrink-0">
              <Image
                src={logo}
                alt="Nexibles"
                width={100}
                height={30}
                className="w-[100px] h-[30px] object-contain"
                priority
              />
            </Link>
          </motion.div>

          <div className="items-center hidden space-x-6 md:flex">
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
                      onClick={() => setIsShopDropdownOpen(!isShopDropdownOpen)}
                      className="flex items-center space-x-1 text-xs text-black sm:text-md"
                    >
                      {item.name} <RiArrowDropDownLine size={16} />
                    </button>
                    {isShopDropdownOpen && (
                      <motion.div
                        className="absolute left-0 mt-2 text-gray-900 bg-white rounded-md shadow-md top-full"
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={dropdownVariants}
                      >
                        {item.dropdown.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.name}
                            href={dropdownItem.path}
                            className="block px-4 py-2 text-sm font-medium text-gray-900 whitespace-nowrap"
                            onClick={() => setIsShopDropdownOpen(false)}
                          >
                            {dropdownItem.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                    
                  </div>
                ) : (
                  <Link href={item.path} className="text-xs text-black sm:text-md hover:underline">
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
                    <span className="absolute flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-blue-900 rounded-full -top-2 -right-2">
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
                    className="absolute right-0 flex flex-col items-center w-40 p-4 mt-2 text-gray-900 bg-white rounded-md shadow-md top-full"
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
              className="z-50 text-gray-900 md:hidden"
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
            className="fixed inset-0 z-40 flex flex-col bg-white"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={mobileMenuVariants}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b shadow-sm">
              <div className="text-lg font-bold text-black">
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
                <motion.div
                  custom={1}
                  initial="hidden"
                  animate="visible"
                  variants={iconVariants}
                >
                  <Link href="/login">
                    <IoPersonOutline size={24} />
                  </Link>
                </motion.div>
                <button className="text-black">
                  <span className="text-sm">ENGLISH</span>
                  <RiArrowDropDownLine size={20} className="inline" />
                </button>
                <motion.button onClick={toggleMenu}>
                  <IoCloseOutline size={24} />
                </motion.button>
              </div>
            </div>

            <div className="flex-1 px-6 py-4 overflow-y-auto">
              {[
                { name: "Home", path: "/" },
                { name: "Pouches", path: "/all-category" },
                { name: "Industries", path: "/businesses" },
                { name: "Shop - Nexi Classic", path: "/shop" },
                { name: "Customize Pouch", path: "/configuration-tool" },
                { name: "Request Quote", path: "/request-quote" },
                // { name: "Configuration Tool", path: "/configuration-tool" },
                { name: "About Nexibles", path: "/about" },
                { name: "Contact Us", path: "/contact" },
              ].map((item, index) => (
                <motion.div
                  key={item.name}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  variants={mobileLinkVariants}
                >
                  <Link
                    href={item.path}
                    className={`block py-3 text-2xl font-medium text-gray-800 ${
                      item.indent ? "pl-6" : ""
                    }`}
                    onClick={toggleMenu}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="px-6 py-6 bg-[#30384E] text-white"
              initial="hidden"
              animate="visible"
              variants={contactVariants}
            >
              <h3 className="text-xl font-semibold mb-4">MEET WITH US</h3>
              <p className="text-lg leading-relaxed mb-4">
              Art NEXT Pvt Ltd | Nexibles®, Unit A6C, Lodha Industrial & Logistics Park - II, Usatane Village, Navi Mumbai, Taloja Bypass Road, Palava, Maharashtra - 421306
              </p>
              <h3 className="text-lg font-semibold mb-2">CALL US</h3>
              <p className="text-sm">+91 9821045101</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
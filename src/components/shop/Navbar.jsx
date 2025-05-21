"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();
  const [toggleStates, setToggleStates] = useState({
    isMenuOpen: false,
    isDropdownOpen: false,
    showPersonDropdown: false,
    isShopDropdownOpen: false,
  });
  const [hasScrolled, setHasScrolled] = useState(false);
  const [screenSize, setScreenSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    isMobile: false,
    isTablet: false,
    isIPadPro: false
  });
  const { user, logout } = useAuth();
  const cartItems = useSelector((state) => state.cart.items);
  const cartItemCount = cartItems.length;
  const navbarRef = useRef(null);
  const dropdownRef = useRef(null);
  const isNavbarInView = useInView(navbarRef, { once: true, amount: 0.5 });

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 0);
    };

    const handleResize = () => {
      const width = window.innerWidth;
      const isIPadPro = (width >= 1024 && width <= 1366);
      
      setScreenSize({
        width,
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isIPadPro
      });
      
      if (width >= 1200) {
        setToggleStates((prev) => ({ 
          ...prev, 
          isMenuOpen: false,
          showPersonDropdown: false
        }));
      }
    };

    // Handle clicks outside of dropdown
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setToggleStates(prev => ({
          ...prev,
          showPersonDropdown: false
        }));
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    document.addEventListener("mousedown", handleClickOutside);
    
    // Initialize on mount
    handleResize();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleToggle = (key) => {
    setToggleStates((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const navItems = [
    { name: "Pouches", path: "/all-category" },
    { name: "Industries", path: "/all-industry" },
    { name: "About Us", path: "/about" },
    { name: "Contact Us", path: "/contact" },
    { name: "Request For Sample Kit", path: "/request-sample-kit" },
  ];

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
  
  const isActive = (path) => {
    if (path === "/") {
      return pathname === path;
    }
    return pathname.startsWith(path);
  };

  return (
    <>
      <nav
        ref={navbarRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          hasScrolled ? "bg-white shadow-xl" : "bg-white"
        }`}
      >
        <div className="container flex items-center justify-between h-16 px-4 mx-auto relative">
          <motion.div
            initial="hidden"
            animate={isNavbarInView ? "visible" : "hidden"}
            variants={logoVariants}
          >
            <Link href="/" className="flex-shrink-0">
              <Image
                src={`${process.env.NEXT_PUBLIC_CDN_URL}/Nexibles_Logo.gif`}
                alt="Nexibles"
                width={100}
                height={30}
                className="w-[100px] h-[30px] object-contain"
                priority
              />
            </Link>
          </motion.div>

          {/* Desktop Navigation - Only visible on large screens (1200px and up) */}
          <div className="items-center hidden xl:flex absolute left-1/2 transform -translate-x-1/2 space-x-12">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                className="relative"
                custom={index}
                initial="hidden"
                animate={isNavbarInView ? "visible" : "hidden"}
                variants={navLinkVariants}
              >
                <Link
                  href={item.path}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    isActive(item.path)
                      ? "text-black font-semibold border-b-2 border-black pb-1"
                      : "text-gray-600 hover:text-black"
                  }`}
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Right Nav Items - Desktop Only */}
          <div className="hidden xl:flex items-center space-x-4">
            <motion.div
              custom={0}
              initial="hidden"
              animate={isNavbarInView ? "visible" : "hidden"}
              variants={navLinkVariants}
            >
              <Link
                href="/shop"
                className="inline-block px-6 py-2 text-sm font-medium rounded-full border border-gray-300 text-gray-800 transition duration-300 hover:bg-gray-100"
              >
                Shop Online
              </Link>
            </motion.div>

            <motion.div
              custom={1}
              initial="hidden"
              animate={isNavbarInView ? "visible" : "hidden"}
              variants={navLinkVariants}
            >
              <Link
                href="/request-quote"
                className="inline-block px-6 py-2 text-sm font-medium rounded-full bg-[#ffd13e] hover:bg-yellow-500 text-black transition duration-300"
              >
                Request a Quote
              </Link>
            </motion.div>

            <motion.div
              custom={2}
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
              ref={dropdownRef}
              custom={3}
              initial="hidden"
              animate={isNavbarInView ? "visible" : "hidden"}
              variants={iconVariants}
              className="relative flex items-center cursor-pointer"
              onClick={() => handleToggle("showPersonDropdown")}
            >
              <IoPersonOutline size={24} />
              <AnimatePresence>
                {toggleStates.showPersonDropdown && (
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
          </div>

          {/* Mobile, Tablet, and iPad Pro Navigation */}
          <div className="flex items-center xl:hidden">
            {/* Special iPad Pro Navigation - Shown only at iPad Pro width */}
            {screenSize.isIPadPro && (
              <div className="flex items-center">
                <Link
                  href="/shop"
                  className="inline-block mr-6 px-4 py-1.5 text-sm font-medium rounded-full border border-gray-300 text-gray-800 transition duration-300 hover:bg-gray-100"
                >
                  Shop Online
                </Link>
              </div>
            )}
            
            <motion.div
              custom={0}
              initial="hidden"
              animate={isNavbarInView ? "visible" : "hidden"}
              variants={iconVariants}
              className="mr-6"
            >
              <Link
                href="/request-quote"
                className="inline-block px-4 py-2 text-sm font-medium rounded-full bg-[#ffd13e] hover:bg-yellow-500 text-black transition duration-300 whitespace-nowrap text-center min-w-[140px] max-w-full sm:px-5 sm:text-base"
              >
                Request a Quote
              </Link>

            </motion.div>

            <motion.div
              custom={1}
              initial="hidden"
              animate={isNavbarInView ? "visible" : "hidden"}
              variants={iconVariants}
              className="mr-6"
            >
              <Link href="/my-cart" className="relative flex items-center text-black">
                <div className="relative">
                  <IoCartOutline size={22} />
                  {cartItemCount > 0 && (
                    <span className="absolute flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-blue-900 rounded-full -top-2 -right-2">
                      {cartItemCount}
                    </span>
                  )}
                </div>
              </Link>
            </motion.div>

            <motion.button
              className="z-50 text-gray-900"
              onClick={() => handleToggle("isMenuOpen")}
              whileTap={{ scale: 0.95 }}
              custom={2}
              initial="hidden"
              animate={isNavbarInView ? "visible" : "hidden"}
              variants={iconVariants}
            >
              {toggleStates.isMenuOpen ? (
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

      {/* Mobile/Tablet Menu Overlay */}
      <AnimatePresence>
        {toggleStates.isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col bg-white pt-16 overflow-hidden"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={mobileMenuVariants}
          >
            <div className="flex-1 px-4 sm:px-6 py-6 overflow-y-auto">
              {[
                { name: "Home", path: "/" },
                { name: "Pouches", path: "/all-category" },
                { name: "Industries", path: "/all-industry" },
                { name: "About Us", path: "/about" },
                { name: "Shop Online", path: "/shop" },
                { name: "Customize Pouch", path: "/configuration-tool" },
                { name: "Contact Us", path: "/contact-us" },
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
                    className={`block py-2.5 sm:py-3 text-base sm:text-lg font-medium ${
                      isActive(item.path)
                        ? "text-black font-semibold"
                        : "text-gray-600"
                    }`}
                    onClick={() => handleToggle("isMenuOpen")}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              
              <motion.div
                className="mt-4 sm:mt-6"
                custom={8}
                initial="hidden"
                animate="visible"
                variants={mobileLinkVariants}
              >
                <Link
                  href="/login"
                  className="flex items-center text-base sm:text-lg font-medium text-gray-600"
                  onClick={() => handleToggle("isMenuOpen")}
                >
                  <IoPersonOutline className="mr-2" size={20} /> 
                  {user ? "My Account" : "Sign In"}
                </Link>
              </motion.div>
            </div>

            <motion.div
              className="px-4 sm:px-6 py-4 sm:py-6 bg-[#30384E] text-white"
              initial="hidden"
              animate="visible"
              variants={contactVariants}
            >
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">MEET WITH US</h3>
              <p className="text-sm sm:text-base leading-relaxed mb-3 sm:mb-4">
                Art NEXT Pvt Ltd | Nexibles®, Unit A6C, Lodha Industrial & Logistics Park - II, Usatane Village, Navi Mumbai, Taloja Bypass Road, Palava, Maharashtra - 421306
              </p>
              <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">CALL US</h3>
              <p className="text-xs sm:text-sm">+91 9821045101</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
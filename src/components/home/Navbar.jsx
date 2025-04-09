"use client";
import React, { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdOutlineLogin, MdOutlineLogout } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { CiFolderOn } from "react-icons/ci";
import { IoPersonOutline } from "react-icons/io5";
import { IoCartOutline } from "react-icons/io5";
import Link from "next/link";
import { useAuth } from "@/utils/authContext";

const Navbar = () => {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [showPersonDropdown, setShowPersonDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { user } = useAuth();
  const { logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 0) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleToggleOpen = () => {
    setShowPersonDropdown(!showPersonDropdown);
  };

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
    document.body.classList.add("overflow-hidden");
  };

  const closeMobileMenu = () => {
    setShowMobileMenu(false);
    document.body.classList.remove("overflow-hidden");
  };

  return (
    <nav
      className={`sticky top-0 z-20  bg-white ${hasScrolled ? "shadow-xl" : ""}`}
    >
      <div className="h-20 flex justify-between items-center px-8">
        {/* Company Logo */}
        <Link href="/" className="">
          <img src="https://unicdn.barecms.com/neximedia/nexible.gif" alt="Logo" className="h-6" />
        </Link>

        {/* Mobile Menu Button (Hamburger Icon) */}
        <div className="md:hidden">
          <button
            className="text-black font-semibold text-xl"
            onClick={toggleMobileMenu}
          >
            {showMobileMenu ? <FaBars size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="md:flex space-x-6 hidden mr-40">
          <Link
            href="/all-category"
            className="text-gray-900 font-semibold text-lg"
          >
            Product Catalogue
          </Link>
        </div>

        {/* Desktop Menu Items */}
        <div className="md:flex items-center gap-6 text-blue-1 hidden">
          <Link href="/help-center" className="flex ">
            <IoIosHelpCircleOutline className="cursor-pointer" size={28} />
            <span className="ml-2">Help</span>
          </Link>
          <Link href="/my-cart" className="flex ">
            <IoCartOutline className="cursor-pointer" size={28} />
            <span className="ml-2">My Cart</span>
          </Link>
          {!user ? (
            <div
              className="relative flex items-center"
              onClick={handleToggleOpen}
            >
              <IoPersonOutline className="cursor-pointer" size={24} />
              <span className="ml-2 cursor-pointer">Sign In</span>
              {showPersonDropdown && (
                <div className="absolute mt-0 top-8 right-0 bg-white text-gray-900 p-4 shadow-md flex flex-col items-center w-40 rounded-md">
                  <p className="text-sm mb-2 text-center cursor-pointer">
                    Welcome Guest!
                  </p>
                  <Link
                    href="/login"
                    className="text-white px-2 text-center py-1 w-full bg-[#30384E] rounded-md transition duration-300 ease-in-out "
                  >
                    Sign In
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href="/my-orderhistory" className="flex ">
                <CiFolderOn className="cursor-pointer" size={28} />
                <span className="ml-2">My Orders</span>
              </Link>
              <div className="flex" onClick={handleToggleOpen}>
                <IoPersonOutline className="cursor-pointer" size={24} />
                <span className="cursor-pointer">
                  Hello, {user?.result?.firstName || user?.firstName}
                </span>
                {showPersonDropdown && (
                  <div className="absolute mt-6 top-8 right-8 bg-white text-gray-900 p-4 shadow-md flex flex-col items-center w-40 rounded-md">
                    <Link
                      href="/my-dashboard"
                      className="text-white text-center px-4 py-2 w-full bg-black transition duration-300 ease-in-out rounded-full"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={logout}
                      className="text-white text-center px-4 py-2 mt-2 w-full bg-black transition duration-300 ease-in-out rounded-full"
                    >
                      Log out
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
      {/* Mobile Menu (Off-Canvas) */}
      {showMobileMenu && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 z-20"
          onClick={closeMobileMenu}
        >
          <div className="absolute top-0 left-0 w-80 h-full bg-white">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between py-4 px-4">
                {/* Login */}
                {!user ? (
                  <div className="flex items-center text-gray-900">
                    <MdOutlineLogin className="flex" size={32} />
                    <Link href="/login">
                      <h3 className="ml-2 text-xl font-bold underline">
                        Login
                      </h3>
                    </Link>
                  </div>
                ) : (
                  <div className="flex flex-col">
                    <div className="flex items-center text-gray-900">
                      <MdOutlineLogout className="flex" size={32} />
                      <h3
                        onClick={logout}
                        className="ml-2 text-xl font-bold underline"
                      >
                        Logout
                      </h3>
                    </div>
                    <div className="flex justify-center items-center mt-4">
                      <div>
                        <img
                          src="/login/profile-user.png"
                          alt="profile"
                          className="h-8"
                        />
                      </div>
                      <div>
                        <h2 className="font-semibold ml-2 text-lg">
                          Hello, {user?.result?.firstName || user?.firstName}
                        </h2>
                      </div>
                    </div>
                  </div>
                )}
                {/* Close Icon */}
                <div className="flex justify-center items-center">
                  <button
                    className="text-black font-semibold text-xl"
                    onClick={closeMobileMenu}
                  >
                    <IoMdClose size={32} />
                  </button>
                </div>
              </div>
              <hr />
              <div>
                <ul className="px-4">
                  <li className="text-gray-900 text-xl py-2">
                    <Link href="/my-dashboard">
                      <p>Dashboard</p>
                    </Link>
                  </li>
                  <hr />
                  <li className="text-gray-900 text-xl py-2">
                    <Link href="/">
                      <p>Home</p>
                    </Link>
                  </li>
                  <hr />
                  <li className="text-gray-900 text-xl py-2">
                    <Link href="/all-category">
                      <div className="flex items-center justify-between">
                        <p className="mr-1">Product & Pricing</p>
                        <MdKeyboardArrowRight />
                      </div>
                    </Link>
                  </li>
                  <hr />
                  <li className="text-gray-900 text-xl py-2">
                    <Link href="/my-orderhistory">
                      <p>Orders & History</p>
                    </Link>
                  </li>
                  <hr />
                  <li className="text-gray-900 text-xl py-2">
                    <Link href="/shipping">
                      <p>Shipping</p>
                    </Link>
                  </li>
                  <hr />
                  <li className="text-gray-900 text-xl py-2">
                    <Link href="/faqs">
                      <p>FAQ</p>
                    </Link>
                  </li>
                  <hr />
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

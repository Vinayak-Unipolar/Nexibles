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
      <div className="flex items-center justify-between h-20 px-8">
        <Link href="/" className="">
          <img src="https://unicdn.barecms.com/neximedia/nexible.gif" alt="Logo" className="h-6" />
        </Link>
        <div className="md:hidden">
          <button
            className="text-xl font-semibold text-black"
            onClick={toggleMobileMenu}
          >
            {showMobileMenu ? <FaBars size={24} /> : <FaBars size={24} />}
          </button>
        </div>
        <div className="hidden mr-40 space-x-6 md:flex">
          <Link
            href="/all-category"
            className="text-lg font-semibold text-gray-900"
          >
            Product Catalogue
          </Link>
        </div>

        {/* Desktop Menu Items */}
        <div className="items-center hidden gap-6 md:flex text-blue-1">
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
                <div className="absolute right-0 flex flex-col items-center w-40 p-4 mt-0 text-gray-900 bg-white rounded-md shadow-md top-8">
                  <p className="mb-2 text-sm text-center cursor-pointer">
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
                  <div className="absolute flex flex-col items-center w-40 p-4 mt-6 text-gray-900 bg-white rounded-md shadow-md top-8 right-8">
                    <Link
                      href="/my-dashboard"
                      className="w-full px-4 py-2 text-center text-white transition duration-300 ease-in-out bg-black rounded-full"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={logout}
                      className="w-full px-4 py-2 mt-2 text-center text-white transition duration-300 ease-in-out bg-black rounded-full"
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
          className="fixed inset-0 z-20 bg-black bg-opacity-60"
          onClick={closeMobileMenu}
        >
          <div className="absolute top-0 left-0 h-full bg-white w-80">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between px-4 py-4">
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
                    <div className="flex items-center justify-center mt-4">
                      <div>
                        <img
                          src="/login/profile-user.png"
                          alt="profile"
                          className="h-8"
                        />
                      </div>
                      <div>
                        <h2 className="ml-2 text-lg font-semibold">
                          Hello, {user?.result?.firstName || user?.firstName}
                        </h2>
                      </div>
                    </div>
                  </div>
                )}
                {/* Close Icon */}
                <div className="flex items-center justify-center">
                  <button
                    className="text-xl font-semibold text-black"
                    onClick={closeMobileMenu}
                  >
                    <IoMdClose size={32} />
                  </button>
                </div>
              </div>
              <hr />
              <div>
                <ul className="px-4">
                  <li className="py-2 text-xl text-gray-900">
                    <Link href="/my-dashboard">
                      <p>Dashboard</p>
                    </Link>
                  </li>
                  <hr />
                  <li className="py-2 text-xl text-gray-900">
                    <Link href="/">
                      <p>Home</p>
                    </Link>
                  </li>
                  <hr />
                  <li className="py-2 text-xl text-gray-900">
                    <Link href="/all-category">
                      <div className="flex items-center justify-between">
                        <p className="mr-1">Product & Pricing</p>
                        <MdKeyboardArrowRight />
                      </div>
                    </Link>
                  </li>
                  <hr />
                  <li className="py-2 text-xl text-gray-900">
                    <Link href="/my-orderhistory">
                      <p>Orders & History</p>
                    </Link>
                  </li>
                  <hr />
                  <li className="py-2 text-xl text-gray-900">
                    <Link href="/shipping">
                      <p>Shipping</p>
                    </Link>
                  </li>
                  <hr />
                  <li className="py-2 text-xl text-gray-900">
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

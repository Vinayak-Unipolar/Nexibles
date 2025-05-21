"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IoCartOutline, IoMenuOutline, IoCloseOutline } from "react-icons/io5";
import { RiArrowDropUpLine, RiArrowDropDownLine } from "react-icons/ri";

const HomeNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      <nav className="absolute top-0 left-0 right-0 z-50 bg-transparent">
        <div className=" mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="mr-auto">
            <div className="relative bg-white px-2 sm:px-4 py-2 sm:py-4 rounded-b-lg shadow-md">
              <Image src={nexiblegif} alt="Nexibles" width={100} height={30} className="sm:w-[150px] sm:h-[40px]" priority />
            </div>
          </Link>
          <div className="flex items-center space-x-2 sm:space-x-6">
            <Link href="/shop" className="hidden sm:flex items-center text-white">
              <span className="ml-1 text-sm sm:text-base">Shop</span>
            </Link>
            <Link href="/my-cart" className="flex items-center text-white">
              <IoCartOutline className="cursor-pointer" size={24} />
              <span className="ml-1 text-sm sm:text-base hidden sm:inline">Cart</span>
            </Link>
            <button className="text-white" onClick={toggleMenu}>
              <IoMenuOutline className="cursor-pointer" size={24} />
            </button>
          </div>
        </div>
      </nav>
      {/* Drop-down menu */}
      <div className={`fixed top-0 left-0 w-full h-full z-50 transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="flex flex-col md:flex-row h-full">
          {/* Red half - only visible on larger screens */}
          <div className="hidden md:flex w-2/5 bg-red-700 p-8 flex-col justify-center items-center">
            <div className="text-center">
              <h2 className="text-white text-3xl font-bold mb-4">Meet With Us</h2>
              <p className="text-white text-xl mb-2">Art NEXT Pvt Ltd,</p>
              <p className="text-white text-xl mb-2">A/463, Ground Floor,</p>
              <p className="text-white text-xl mb-2">TTC Industrial Area,</p>
              <p className="text-white text-xl mb-2">Mahape, MIDC, Navi Mumbai,</p>
              <p className="text-white text-xl mb-4">Thane - 400710, MH, India</p>
              <h2 className="text-white text-3xl font-bold mb-2">Call US</h2>
              <p className="text-white text-xl">+91 9821045101</p>
            </div>
          </div>

          {/* White part - full screen on mobile */}
          <div className="w-full md:w-3/5 bg-white p-6 md:p-8 flex md:text-start text-center items-center justify-center min-h-screen">
            <div className="w-full">
              <button onClick={toggleMenu} className="absolute top-4 right-4 text-black">
                <IoCloseOutline size={32} />
              </button>
              <ul className="text-black text-2xl md:text-4xl mt-12 md:mt-0">
                <li className="mb-6">
                  <Link href="/">Home</Link>
                </li>
                <li className="mb-6 relative">
                  <h2 onClick={toggleDropdown} className="flex md:text-start items-center md:justify-start justify-center ">
                    What We Do
                    <span className="ml-2">{isDropdownOpen ? <RiArrowDropUpLine /> : <RiArrowDropDownLine />}</span>
                  </h2>
                  {isDropdownOpen && (
                    <ul className="pl-4 mt-2 space-y-2 text-lg">
                      <li><Link href="/pouches-page">Nexi<sup>TM</sup> Pouches</Link></li>
                      <li><Link href="/sleeves-page">Nexi<sup>TM</sup> Sleeves</Link></li>
                      <li><Link href="/roll-stock-page">Nexi<sup>TM</sup> Roll Stock</Link></li>
                      <li><Link href="labels-page">Nexi<sup>TM</sup> Labels</Link></li>
                    </ul>
                  )}
                </li>
                <li className="mb-6"><Link href="/about">About Nexibles</Link></li>
                <li className="mb-6"><Link href="/contact-us">Contact Us</Link></li>
                <li><Link href="/signin">Sign in</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeNavbar;
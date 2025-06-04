"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { FiUser, FiShoppingBag, FiMapPin, FiGift, FiHelpCircle, FiMenu, FiSettings, FiFileText } from "react-icons/fi";
import { useAuth } from '@/utils/authContext';
import { HiMenuAlt1 } from "react-icons/hi";
export default function MyAccount() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  const { user } = useAuth();
 
  // Check screen size on mount and resize
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 992);
    };
   
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
   
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);
 
  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };
 
  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };
 
  const toggleMobileMenu = () => {
    setHoveredIndex(null); // Reset hover state when toggling
    setShowMobileMenu(!showMobileMenu);
  };
 
  const firstName = user?.result?.firstName || user?.firstName || "User";
  const lastName = user?.result?.lastName || user?.lastName || "";
  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
 
  const menuItems = [
    { name: "Account dashboard", link: "/my-dashboard", icon: <FiUser /> },
    { name: "My orders", link: "/my-orderhistory", icon: <FiShoppingBag /> },
    { name: "My details", link: "/my-details", icon: <FiUser /> },
    { name: "Address book", link: "/manageaddress", icon: <FiMapPin /> },
    { name: "Gift cards & vouchers", link: "/gift-cards", icon: <FiGift /> },
    { name: "Where's my order?", link: "/wheres-my-order", icon: <FiHelpCircle /> },
    { name: "Configuration History", link: "/configuration-history", icon: <FiSettings /> },
    { name: "Request Quote History", link: "/quote-history", icon: <FiFileText /> },
  ];
 
  // Update selectedIndex based on the current route
  useEffect(() => {
    if (pathname) {
      const index = menuItems.findIndex((item) => item.link === pathname);
      setSelectedIndex(index !== -1 ? index : null);
    }
  }, [pathname]);
 
  return (
    <>
      {/* Desktop sidebar menu - only shown on larger screens */}
      {!isMobile && (
        <div className="w-64 h-screen bg-white shadow-md">
          <div className="px-6 py-8">
            <div className="flex items-center mb-8">
              <div className="flex items-center justify-center w-10 h-10 mr-3 font-bold text-white bg-gray-800 rounded-full">
                {initials}
              </div>
              <div>
                <div className="text-sm text-gray-500">Hi,</div>
                <div className="font-semibold">{firstName} {lastName}</div>
              </div>
            </div>
            <ul className="text-gray-700">
              {menuItems.map((item, index) => (
                <Link href={item.link} key={index}>
                  <li
                    className={`cursor-pointer py-2 px-3 rounded-md flex items-center mt-2 ${
                      selectedIndex === index
                        ? "border-l-4 border-[#103b60] bg-blue-50 text-[#103b60] font-semibold"
                        : hoveredIndex === index
                          ? "bg-gray-100"
                          : ""
                    }`}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <span className="mr-3">{item.icon}</span>
                    <span className="text-sm">{item.name}</span>
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        </div>
      )}
 
      {/* Mobile bottom menu - only shown on smaller screens */}
      {isMobile && (
        <div>
          {/* Mobile menu toggle button */}
          <button
            onClick={toggleMobileMenu}
            className="fixed bottom-4 left-4 bg-[#ffd13e] text-black p-4 rounded-full shadow-lg z-50"
          >
           <HiMenuAlt1 size={24} />
          </button>
 
          {/* Bottom drawer menu */}
          <div className={`fixed bottom-0 left-0 right-0 bg-white shadow-lg rounded-t-xl transition-transform duration-300 ease-in-out z-40 ${
            showMobileMenu ? 'translate-y-0' : 'translate-y-full'
          }`}>
            <div className="w-16 h-1 bg-gray-300 rounded-full mx-auto my-3"></div>
           
            <div className="p-4">
              <div className="flex items-center mb-6">
                <div className="flex items-center justify-center w-10 h-10 mr-3 font-bold text-white bg-gray-800 rounded-full">
                  {initials}
                </div>
                <div>
                  <div className="text-sm text-gray-500">Hi,</div>
                  <div className="font-semibold">{firstName} {lastName}</div>
                </div>
              </div>
             
              <ul className="grid grid-cols-3 gap-4 pb-8">
                {menuItems.map((item, index) => (
                  <Link href={item.link} key={index} onClick={() => setShowMobileMenu(false)}>
                    <li className={`flex flex-col items-center justify-center p-3 rounded-lg ${
                      selectedIndex === index ? "bg-blue-50 text-[#103b60]" : ""
                    }`}>
                      <span className="text-2xl mb-1">{item.icon}</span>
                      <span className="text-xs text-center">{item.name}</span>
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
          </div>
         
          {/* Overlay when menu is open */}
          {showMobileMenu && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-30"
              onClick={() => setShowMobileMenu(false)}
            ></div>
          )}
        </div>
      )}
    </>
  );
}
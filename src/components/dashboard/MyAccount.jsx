"use client";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { FiUser, FiShoppingBag, FiLock, FiMapPin, FiCreditCard, FiMessageSquare, FiShare2, FiGift, FiHelpCircle } from "react-icons/fi";
import { useAuth } from '@/utils/authContext';
export default function MyAccount() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const pathname = usePathname();
  const { user } = useAuth();
  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };
  const firstName = user?.result?.firstName || user?.firstName || "User";
  const lastName = user?.result?.lastName || user?.lastName || "";
  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  // Menu items array to map through, including icons and links
  const menuItems = [
    { name: "Account overview", link: "/my-dashboard", icon: <FiUser /> },
    { name: "My orders", link: "/my-orderhistory", icon: <FiShoppingBag /> },
    { name: "My details", link: "/my-details", icon: <FiUser /> },
    { name: "Address book", link: "/manageaddress", icon: <FiMapPin /> },
    { name: "Gift cards & vouchers", link: "/gift-cards", icon: <FiGift /> },
    { name: "Where's my order?", link: "/wheres-my-order", icon: <FiHelpCircle /> },
  ];

  // Update selectedIndex based on the current route
  useEffect(() => {
    if (pathname) {
      const index = menuItems.findIndex((item) => item.link === pathname);
      setSelectedIndex(index !== -1 ? index : null);
    }
  }, [pathname, menuItems]);

  return (
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
                className={`cursor-pointer py-2 px-3 rounded-md flex items-center mt-2 ${selectedIndex === index
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
  );
}
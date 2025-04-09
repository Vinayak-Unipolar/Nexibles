"use client";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";
import React, { useState } from "react";

export default function MyAccount() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const handleSelectItem = (index) => {
    if (selectedIndex === index) {
      setSelectedIndex(null); // Deselect if clicked again
    } else {
      setSelectedIndex(index);
    }
    setHoveredIndex(null); // Reset hoveredIndex when item is clicked
  };

  return (
    <div className="bg-white mt-9">
      <div className="px-10 py-20">
        <h3 className="text-gray-900 font-bold text-xl">My Account</h3>
        <div className="">
          <ul className="text-gray-900 font-bold mt-4 border-r-8 border-gray-900">
            <Link href="/my-dashboard">
              <li
                className={`cursor-pointer p-3 ${
                  hoveredIndex === 0 ? "hover:bg-gray-200" : ""
                }`}
                onMouseEnter={() => handleMouseEnter(0)}
                onMouseLeave={handleMouseLeave}
              >
                <span className="flex items-center">
                  {hoveredIndex === 0 && <FaChevronRight className="mr-2" />}
                  Dashboard
                </span>
              </li>
            </Link>
            {/*<Link href="/my-dashboard">
                            <li
                                className={`cursor-pointer p-3 ${
                                    selectedIndex === 0 ? "bg-gray-200" : ""
                                }`}
                                onMouseEnter={() => handleMouseEnter(0)}
                                onMouseLeave={handleMouseLeave}
                                onClick={() => handleSelectItem(0)}
                            >
                                <span className="flex items-center">
                                    {(hoveredIndex === 0 || selectedIndex === 0) && <FaChevronRight className="mr-2" />}
                                    Dashboard
                                </span>
                            </li>
                        </Link>*/}
            {/* Other list items */}
            {/* <Link href="/my-projects">
                            <li
                                className={`cursor-pointer p-3 ${hoveredIndex === 1 ? "hover:bg-gray-200" : ""
                                    }`}
                                onMouseEnter={() => handleMouseEnter(1)}
                                onMouseLeave={handleMouseLeave}
                            >
                                <span className="flex items-center">
                                    {hoveredIndex === 1 && <FaChevronRight className="mr-2" />}
                                    My Projects
                                </span>
                            </li>
                        </Link> */}
            <Link href="/my-orderhistory">
              <li
                className={`cursor-pointer p-3 ${
                  hoveredIndex === 2 ? "hover:bg-gray-200" : ""
                }`}
                onMouseEnter={() => handleMouseEnter(2)}
                onMouseLeave={handleMouseLeave}
              >
                <span className="flex items-center">
                  {hoveredIndex === 2 && <FaChevronRight className="mr-2" />}
                  Order History & Reorders
                </span>
              </li>
            </Link>
            <Link href="/manageaddress">
              <li
                className={`cursor-pointer p-3 ${
                  hoveredIndex === 3 ? "hover:bg-gray-200" : ""
                }`}
                onMouseEnter={() => handleMouseEnter(3)}
                onMouseLeave={handleMouseLeave}
              >
                <span className="flex items-center">
                  {hoveredIndex === 3 && <FaChevronRight className="mr-2" />}
                  Address
                </span>
              </li>
            </Link>
            {/* <Link href="/my-uploads">
                            <li
                                className={`cursor-pointer p-3 ${hoveredIndex === 4 ? "hover:bg-gray-200" : ""
                                    }`}
                                onMouseEnter={() => handleMouseEnter(4)}
                                onMouseLeave={handleMouseLeave}
                            >
                                <span className="flex items-center">
                                    {hoveredIndex === 4 && <FaChevronRight className="mr-2" />}
                                    My Uploads
                                </span>
                            </li>
                        </Link>
                        <li className="hover:bg-gray-200 cursor-pointer p-3">My Design Services</li>
                        <li className="hover:bg-gray-200 cursor-pointer p-3">Account Settings</li>
                        <li className="hover:bg-gray-200 cursor-pointer p-3">My Subsciption</li>
                        <li className="hover:bg-gray-200 cursor-pointer p-3">Favorite Templates</li> */}
            {/* <li className="hover:bg-gray-200 cursor-pointer p-3">Design Services</li>
                        <li className="hover:bg-gray-200 cursor-pointer p-3">Brand Kit</li> */}
          </ul>
        </div>
      </div>
    </div>
  );
}

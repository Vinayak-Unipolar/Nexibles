"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ProductFeatures from "./ProductFeatures";

const AllCategoryCards = ({ categoryData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const NEXI_CDN_URL = process.env.NEXT_NEXIBLES_CDN_URL || "https://cdn.nexibles.com";
  const PUBLIC_CDN_URL = process.env.NEXT_PUBLIC_CDN_URL || "https://cdn.nexibles.com";

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="h-auto bg-white">
      {/* All Categories Title */}
      <div className="px-4 mb-10 md:px-64">
        <p className="text-center text-[30px] md:text-[40px] font-semibold">
          All Pouches
        </p>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
        {categoryData.map((category) => (
          <div key={category.id} className="flex flex-col items-center">
            <div className="flex flex-col items-center w-full transition-all duration-300 hover:shadow-lg rounded-lg p-4">
              <div className="relative w-full aspect-square flex items-center justify-center overflow-hidden">
                <Image
                  src={
                    category.bg_Img
                      ? `${NEXI_CDN_URL}/category/${category.bg_Img}`
                      : "/placeholder.png"
                  }
                  alt={category.name}
                  width={300}
                  height={300}
                  className="object-contain transition-transform duration-300 hover:scale-105 max-h-full max-w-full"
                />
              </div>
              <div className="mt-3 text-center w-full">
                <p className="text-xs sm:text-sm md:text-sm font-bold tracking-wider text-black mb-2 sm:mb-3 md:mb-4">
                  {category.name}
                </p>
                <div className="flex justify-center space-x-2">
                  <Link 
                    href={`/category/${category.cat_url}`} 
                    className="inline-block px-3 py-1.5 sm:px-4 md:px-6 sm:py-2 text-xs sm:text-sm font-medium rounded-md bg-white border border-black hover:bg-gray-100 text-black transition duration-300 w-24 sm:w-28 md:w-32 text-center"
                  >
                    Details
                  </Link>
                  <button
                    onClick={handleOpenModal}
                    className="inline-block px-3 py-1.5 sm:px-4 md:px-6 sm:py-2 text-xs sm:text-sm font-medium rounded-md bg-[#ffd13e] border border-black hover:bg-yellow-500 text-black transition duration-300 w-24 sm:w-28 md:w-32 text-center"
                  >
                    Get Quote
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <ProductFeatures />
    </div>

    
  );
};

export default AllCategoryCards;
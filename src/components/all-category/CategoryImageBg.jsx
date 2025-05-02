import React from 'react';
import Link from 'next/link'; // Use Next.js Link instead of react-router-dom

function CategoryImageBg() {
  return (
    <Link href="/all-category" className="relative w-full">
      <div className="h-[20vh] md:h-[400px] w-full mt-[4rem]">
        <img src={`${process.env.NEXT_PUBLIC_CDN_URL}/Types_of_pouch.webp`} alt="Category Background" className="object-cover w-full h-full" />
        <div className="absolute bottom-[10%] left-[1%] md:bottom-[10%] md:left-[2%] z-10">
          <div className="px-4 py-2 border-t border-b border-gray-800">
            <h1 className="text-xs md:text-5xl font-medium text-[#231f20]">
              TYPES OF
            </h1>
            <h1 className="text-sm md:text-6xl font-[1000] text-[#231f20] mt-2">
              POUCHES
            </h1>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 flex items-center justify-start">
        {/* Removed empty div - add content if needed */}
      </div>
    </Link>
  );
}

export default CategoryImageBg;
import React from 'react';
import categoryimg from '../../../public/home/Types_of_pouch.webp';

function CategoryImageBg() {
  return (
    <div className="relative w-full">
      <div className="h-[400px] w-full mt-[4rem]">
        <img src={categoryimg.src} alt="Category Background" className="w-full h-full object-cover" />
        <div className="absolute bottom-[10%] left-[2%] z-10">
              <div className="border-b border-t border-gray-800 py-2 px-4">
                <h1 className="text-4xl md:text-5xl font-medium text-[#231f20]">
                  TYPES OF
                </h1>
                <h1 className="text-5xl md:text-6xl font-[1000] text-[#231f20] mt-2">
                  POUCHES
                </h1>
              </div>
            </div>
      </div>
      <div className="absolute inset-0 flex items-center justify-start">
      </div>
    </div>
  );
}

export default CategoryImageBg;
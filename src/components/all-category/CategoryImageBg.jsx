import React from 'react';
import categoryimg from '../../../public/home/Types_of_pouch.webp';

function CategoryImageBg() {
  return (
    <div className="relative w-full">
      <div className="h-[400px] w-full mt-[4rem]">
        <img src={categoryimg.src} alt="Category Background" className="w-full h-full object-cover" />
      </div>
      <div className="absolute inset-0 flex items-center justify-start">
      </div>
    </div>
  );
}

export default CategoryImageBg;
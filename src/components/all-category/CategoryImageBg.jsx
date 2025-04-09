import React from 'react';
import categoryimg from '../../../public/cards/categorybgimg.jpg';

function CategoryImageBg() {
  return (
    <div className="relative w-full">
      <div className="md:h-[25rem] h-[14rem] w-full">
        <img src={categoryimg.src} alt="Category Background" className="w-full h-full object-cover" />
      </div>
      <div className="absolute inset-0 flex items-center justify-start">
        <div className="text-white text-xl md:text-5xl font-bold text-center px-4 md:px-20">
          All Categories
        </div>
      </div>
    </div>
  );
}

export default CategoryImageBg;
import React from 'react';
import ProductStock from '../../../public/home/bgimg2.png';
import Customization from '../../../public/Pictures/Creator.png';

const ProductSections = () => {
  return (
    <div className="mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 h-[450px]">
        <div className="relative flex items-center justify-center text-white text-center overflow-hidden">
          <img
            src={ProductStock.src}
            alt="Stock Products"
            className="absolute inset-0 w-full h-full object-cover z-0 opacity-80"
            style={{ filter: 'grayscale(5%)' }} // Custom gray tint
          />
          <div className="z-10  p-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Stock Products</h2>
            <a href="/all-category" className="hover:underline text-sm md:text-base">Click here</a>
          </div>
        </div>

        <div className="relative flex items-center justify-center text-white text-center overflow-hidden">
          <img src={Customization.src} alt="Customization Tool" className="absolute inset-0 w-full h-full object-cover z-0 opacity-80"  style={{ filter: 'grayscale(5%)' }}  />
          <div className="z-10  p-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Customization Tool</h2>
            <a href="/configuration-tool" className="hover:underline text-sm md:text-base">Click here</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSections;
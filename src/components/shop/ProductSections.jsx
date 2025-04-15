import React from 'react';

const ProductSections = () => {
  return (
    <div className=" mx-auto  px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 h-[400px]">
        <div className="relative bg-[#A0A0A0]  flex items-center justify-center text-white text-center  overflow-hidden">
          <div className="z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Stock Products</h2>
            <a href="#" className="hover:underline text-sm md:text-base">Click here</a>
          </div>
        </div>

        <div className="relative bg-[#A0A0A0] flex items-center justify-center text-white text-center  overflow-hidden">
          <div className="z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Customization Tool</h2>
            <a href="/configuration-tool" className="hover:underline text-sm md:text-base">Click here</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSections;
import React from 'react';

const ProductSections = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {/* Best Sellers Section */}
        <div className="relative bg-[#A0A0A0] h-80 flex items-center justify-center text-white text-center  overflow-hidden">
          <div className="z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Best Sellers</h2>
            <a href="#" className="hover:underline text-sm md:text-base">Shop Now</a>
          </div>
        </div>

        {/* New Arrivals Section */}
        <div className="relative bg-[#A0A0A0] h-80 flex items-center justify-center text-white text-center  overflow-hidden">
          <div className="z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">New Arrivals</h2>
            <a href="#" className="hover:underline text-sm md:text-base">Shop Now</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSections;
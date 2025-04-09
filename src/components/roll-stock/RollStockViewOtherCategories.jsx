// SleevesViewOtherCategories.js

import React from 'react';
import Image from 'next/image';
import { RollStockViewOtherCategoriesData } from './RollStockViewOtherCategoriesData';

const RollStockViewOtherCategories = () => {
  return (
    <section className="bg-[#d285a9] py-16">
      <div className="container mx-auto text-left px-4 lg:px-10">
        <h2 className="text-3xl font-bold text-white mb-4">View Other Categories</h2>
        <p className="text-white mb-8 max-w-2xl lg:max-w-[42%] lg:mx-0 text-lg">
          Whatever your product packaging requirements are,
          we can provide you with practical, striking, and
          distinctive designs.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {RollStockViewOtherCategoriesData.map((category) => (
            <div key={category.id} className="flex flex-col items-center p-4 rounded-lg ">
              <div className="relative w-full h-full mb-4">
                <img
                  src={category.image}
                  alt={category.name}
                  className="rounded-md w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-black">{category.name}</h3>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default RollStockViewOtherCategories;

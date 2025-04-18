import React from 'react';
import ProductStock from '../../../public/home/Reference NexiClassic Banner.webp';
import Customization from '../../../public/home/Reference Customisation Banner.webp';
import Link from 'next/link';

const ProductSections = () => {
  return (
    <div className="">
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-0 gap-2 h-[500px]">
        <Link href="/all-category" className="relative flex items-center justify-center text-white text-center overflow-hidden">
          <img
            src={ProductStock.src}
            alt="Stock Products"
            className="object-contain"
          />
        </Link>
        <Link href="/configuration-tool" className="relative flex items-center justify-center text-white text-center overflow-hidden">
          <img src={Customization.src}
            alt="Customization Tool"
            className="object-contain" />
        </Link>
      </div >
    </div>
  );
};

export default ProductSections;
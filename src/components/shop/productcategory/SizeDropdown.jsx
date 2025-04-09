import React, { useState } from 'react';
import { IoIosArrowDown } from "react-icons/io";

const SizeDropdown = ({ sizes, selectedSize, onSizeChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative mb-4">
      <div
        className="border border-gray-300 rounded-lg px-4 py-2 flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selectedSize ? selectedSize.option_name : 'Select Size'}</span>
        <span><IoIosArrowDown /></span>
      </div>
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
          {sizes.map((size, index) => (
            <div
              key={index}
              className="px-4 py-2 cursor-pointer hover:bg-gray-300"
              onClick={() => {
                onSizeChange(size);
                setIsOpen(false);
              }}
            >
              {size.option_name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SizeDropdown;
import React from 'react';
import { IoIosArrowDown } from "react-icons/io";

const QuantityDropdown = ({ quantityOptions, selectedQuantity, isDropdownOpen, setIsDropdownOpen, setSelectedQuantity }) => {
  const selectedOption = quantityOptions.find(o => o.quantity === selectedQuantity);

  return (
    <div className="relative">
      <div
        className="flex items-center justify-between px-4 py-2 border border-gray-300 rounded-lg cursor-pointer"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <span>Quantity</span>
        <div className='flex items-center justify-between gap-2 cursor-pointer'>
          <span>{selectedQuantity} (₹{selectedOption?.price.toFixed(2)}/unit)</span>
          <span><IoIosArrowDown /></span>
        </div>
      </div>
      {isDropdownOpen && (
        <div className="absolute z-10 w-full mt-1 overflow-auto bg-white border border-gray-300 rounded-lg shadow-lg max-h-60">
          {quantityOptions.map((option, index) => (
            <div
              key={index}
              className={`px-4 py-2 cursor-pointer hover:bg-gray-300`}
              onClick={() => {
                setSelectedQuantity(option.quantity);
                setIsDropdownOpen(false);
              }}
            >
              <div className="flex items-center justify-between">
                <span>{option.quantity} (₹{option.price.toFixed(2)}/unit)</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuantityDropdown;
import React from 'react';
import { IoIosArrowDown } from "react-icons/io";

const QuantitySelector = ({ selectedQuantity, isDropdownOpen, toggleDropdown, setSelectedQuantity, quantityOptions }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Quantity
      </label>
      <div className="relative">
        <div
          className="border border-gray-300 rounded-lg px-4 py-2 flex justify-between items-center cursor-pointer"
          onClick={() => toggleDropdown('quantity')}
        >
          <span>{selectedQuantity || 'Select'}</span>
          <span><IoIosArrowDown /></span>
        </div>
        {isDropdownOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
            {quantityOptions.map((quantity, index) => (
              <div
                key={index}
                className="px-4 py-2 cursor-pointer hover:bg-gray-300"
                onClick={() => {
                  setSelectedQuantity(quantity);
                  toggleDropdown('quantity');
                }}
              >
                {quantity}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuantitySelector;
import React, { useState } from 'react';
import { IoIosArrowDown } from "react-icons/io";

const NameDropdown = ({ names, selectedName, onNameChange, disabled }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative mb-4">
      <div
        className={`border border-gray-300 rounded-lg px-4 py-2 flex justify-between items-center ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'cursor-pointer'}`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <span>{selectedName ? selectedName.option_name : 'Select Name'}</span>
        <span><IoIosArrowDown /></span>
      </div>
      {isOpen && !disabled && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
          {names.map((name, index) => (
            <div
              key={index}
              className="px-4 py-2 cursor-pointer hover:bg-gray-300"
              onClick={() => {
                onNameChange(name);
                setIsOpen(false);
              }}
            >
              {name.option_name} - ₹{parseFloat(name.price).toFixed(2)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NameDropdown;
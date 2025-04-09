import React from 'react';
import { IoIosArrowDown } from "react-icons/io";

const ModifierGroups = ({ modifierGroups, selectedOptions, toggleDropdown, selectOption }) => {
  return (
    <>
      {modifierGroups.map((group, groupIndex) => (
        <div key={groupIndex} className="mb-4">
          <div className="relative">
            <div
              className="border border-gray-300 rounded-lg px-4 py-2 flex justify-between items-center cursor-pointer"
              onClick={() => toggleDropdown(group.name)}
            >
              <span>
                {selectedOptions[group.name]
                  ? JSON.parse(selectedOptions[group.name]).option_name
                  : `Select ${group.name}`}
              </span>
              <span><IoIosArrowDown /></span>
            </div>
            {selectedOptions[`isDropdownOpen_${group.name}`] && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                {group.options.map((option, optionIndex) => (
                  <div
                    key={optionIndex}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-300"
                    onClick={() => selectOption(group.name, option)}
                  >
                    {option.option_name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default ModifierGroups;
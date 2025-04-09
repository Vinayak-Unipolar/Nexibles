'use client'
import React, { useState } from 'react';

export default function FilterTemplates() {
  const [orientationDropdownOpen, setOrientationDropdownOpen] = useState(false);
  const [industryDropdownOpen, setIndustryDropdownOpen] = useState(false);
  const [stylesThemesDropdownOpen, setStylesThemesDropdownOpen] = useState(false);
  const [logoPhotoAreaDropdownOpen, setLogoPhotoAreaDropdownOpen] = useState(false);
  const [designColourDropdownOpen, setDesignColourDropdownOpen] = useState(false);

  const toggleDropdown = (dropdownState, setDropdownState) => {
    setDropdownState(!dropdownState);
  };

  return (
    <div>
      <div className="h-auto bg-white md:py-28 py-10 px-4">
        <div className="flex justify-between text-blue-3 font-semibold mb-4">
          <p>Orientation</p>
          <p onClick={() => toggleDropdown(orientationDropdownOpen, setOrientationDropdownOpen)} className="cursor-pointer">
            {orientationDropdownOpen ? '-' : '+'}
          </p>
        </div>
        {orientationDropdownOpen && (
          <div className='text-blue-3'>
            <ul>
              <li>Option 1</li>
              <li>Option 2</li>
              <li>Option 3</li>
            </ul>
          </div>
        )}
        <hr />
        
        {/* Industry dropdown */}
        <div className="flex justify-between text-blue-3 font-semibold py-4">
          <p>Industry</p>
          <p onClick={() => toggleDropdown(industryDropdownOpen, setIndustryDropdownOpen)} className="cursor-pointer">
            {industryDropdownOpen ? '-' : '+'}
          </p>
        </div>
        {industryDropdownOpen && (
          <div className='text-blue-3'>
            <ul>
              <li>Technology</li>
              <li>Finance</li>
              <li>Healthcare</li>
            </ul>
          </div>
        )}
        <hr />
        
        {/* Styles & Themes dropdown */}
        <div className="flex justify-between text-blue-3 font-semibold py-4">
          <p>Styles & Themes</p>
          <p onClick={() => toggleDropdown(stylesThemesDropdownOpen, setStylesThemesDropdownOpen)} className="cursor-pointer">
            {stylesThemesDropdownOpen ? '-' : '+'}
          </p>
        </div>
        {stylesThemesDropdownOpen && (
          <div className='text-blue-3'>
            <ul>
              <li>Modern</li>
              <li>Classic</li>
              <li>Minimalistic</li>
            </ul>
          </div>
        )}
        <hr />
        
        {/* Logo / Photo Area dropdown */}
        <div className="flex justify-between text-blue-3 font-semibold py-4">
          <p>Logo / Photo Area</p>
          <p onClick={() => toggleDropdown(logoPhotoAreaDropdownOpen, setLogoPhotoAreaDropdownOpen)} className="cursor-pointer">
            {logoPhotoAreaDropdownOpen ? '-' : '+'}
          </p>
        </div>
        {logoPhotoAreaDropdownOpen && (
          <div className='text-blue-3'>
            <ul>
              <li>Show Logo</li>
              <li>Show Photo</li>
              <li>Show Both</li>
            </ul>
          </div>
        )}
        <hr />
        
        {/* Design Colour dropdown */}
        <div className="flex justify-between text-blue-3 font-semibold py-4">
          <p>Design Colour</p>
          <p onClick={() => toggleDropdown(designColourDropdownOpen, setDesignColourDropdownOpen)} className="cursor-pointer">
            {designColourDropdownOpen ? '-' : '+'}
          </p>
        </div>
        {designColourDropdownOpen && (
          <div className='text-blue-3'>
            <ul>
              <li>Red</li>
              <li>Blue</li>
              <li>Green</li>
            </ul>
          </div>
        )}
        <hr />
      </div>
    </div>
  );
}

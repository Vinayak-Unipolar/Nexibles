import React from 'react';
import { FaTruck, FaLeaf, FaBox, FaShieldAlt, FaLayerGroup, FaBan, FaBarcode } from 'react-icons/fa';
import { RiMoneyDollarCircleLine } from 'react-icons/ri';

const AdvantageItem = ({ icon, text }) => (
  <div className="flex flex-col items-center">
    {icon}
    <p className="text-lg mt-2 text-center md:text-base sm:text-xs">{text}</p> {/* Decreased text size for phone view */}
  </div>
);

const Advantages = () => {
  return (
    <div className="bg-white py-12 w-full">
      <h2 className="md:text-4xl text-2xl font-bold text-center mb-8">Our advantages</h2>
      <div className="container mx-auto grid grid-cols-2 gap-8 md:grid-cols-4 sm:grid-cols-1">
        <AdvantageItem icon={<FaTruck size={26} className="md:size-14 sm:size-16" />} text="Speed to market" /> {/* Adjusted icon size */}
        <AdvantageItem icon={<RiMoneyDollarCircleLine size={26} className="md:size-14 sm:size-16" />} text="No cylinder and plate cost" /> {/* Adjusted icon size */}
        <AdvantageItem icon={<FaLeaf size={26} className="md:size-14 sm:size-16" />} text="Sustainable" /> {/* Adjusted icon size */}
        <AdvantageItem icon={<FaBox size={26} className="md:size-14 sm:size-16" />} text="Low inventory" /> {/* Adjusted icon size */}
        <AdvantageItem icon={<FaShieldAlt size={26} className="md:size-14 sm:size-16" />} text="Security printing" /> {/* Adjusted icon size */}
        <AdvantageItem icon={<FaLayerGroup size={26} className="md:size-14 sm:size-16" />} text="Multiple SKUs" /> {/* Adjusted icon size */}
        <AdvantageItem icon={<FaBan size={26} className="md:size-14 sm:size-16" />} text="No MOQ" /> {/* Adjusted icon size */}
        <AdvantageItem icon={<FaBarcode size={26} className="md:size-14 sm:size-16" />} text="Variable data" /> {/* Adjusted icon size */}
      </div>
    </div>
  );
};

export default Advantages;

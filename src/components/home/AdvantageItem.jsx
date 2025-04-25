import React from 'react';
import { FaTruck, FaLeaf, FaBox, FaShieldAlt, FaLayerGroup, FaBan, FaBarcode } from 'react-icons/fa';
import { RiMoneyDollarCircleLine } from 'react-icons/ri';

const AdvantageItem = ({ icon, text }) => (
  <div className="flex flex-col items-center">
    {icon}
    <p className="mt-2 text-lg text-center md:text-base sm:text-xs">{text}</p>
  </div>
);

const Advantages = () => {
  return (
    <div className="w-full mt-6 bg-white">
      <h2 className="mb-8 text-2xl font-bold text-center md:text-4xl">Our Advantages</h2>
      <div className="container grid grid-cols-2 gap-8 mx-auto md:grid-cols-4 sm:grid-cols-1">
        <AdvantageItem icon={<FaBan size={26} className="md:size-14 sm:size-16" />} text="No MOQ" />
        <AdvantageItem icon={<FaLayerGroup size={26} className="md:size-14 sm:size-16" />} text="Multiple SKUs" />
        <AdvantageItem icon={<RiMoneyDollarCircleLine size={26} className="md:size-14 sm:size-16" />} text="No cylinder and plate cost" />
        <AdvantageItem icon={<FaBox size={26} className="md:size-14 sm:size-16" />} text="Low inventory" />
        <AdvantageItem icon={<FaTruck size={26} className="md:size-14 sm:size-16" />} text="Speed to market" />
        <AdvantageItem icon={<FaLeaf size={26} className="md:size-14 sm:size-16" />} text="Sustainable" />
        <AdvantageItem icon={<FaBarcode size={26} className="md:size-14 sm:size-16" />} text="Variable data" />
        <AdvantageItem icon={<FaShieldAlt size={26} className="md:size-14 sm:size-16" />} text="Security printing" />
      </div>
    </div>
  );
};

export default Advantages;
import React from 'react';
import { FaTruck, FaLeaf, FaBox, FaShieldAlt, FaLayerGroup, FaBan, FaBarcode } from 'react-icons/fa';
import { RiMoneyDollarCircleLine } from 'react-icons/ri';

const AdvantageItem = ({ icon, text, hoverText }) => (
  <div className="relative flex flex-col items-center group cursor-pointer">
    {icon}
    <p className="text-lg mt-2 text-center md:text-base sm:text-xs">{text}</p>

    {/* Tooltip on hover */}
    <div className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-sm rounded px-3 py-1 w-56 text-center z-10">
      {hoverText}
    </div>
  </div>
);

const Advantages = () => {
  return (
    <div className="bg-white py-12 w-full">
      <h2 className="md:text-4xl text-2xl font-bold text-center mb-8">Our advantages</h2>
      <div className="container mx-auto grid grid-cols-2 gap-8 md:grid-cols-4 sm:grid-cols-1">
      <AdvantageItem icon={<FaBan size={26} className="md:size-14 sm:size-16" />} text="No MOQ" hoverText="Start small, scale smart — print exactly what you need with zero minimum order quantity." />
      <AdvantageItem icon={<FaLayerGroup size={26} className="md:size-14 sm:size-16" />} text="Multiple SKUs" hoverText="Launch multiple designs in a single run, perfect for product variety and seasonal packs." />
      <AdvantageItem icon={<RiMoneyDollarCircleLine size={26} className="md:size-14 sm:size-16" />} text="No cylinder and plate cost" hoverText="Say goodbye to setup charges — go digital with no tooling costs or delays." />
      <AdvantageItem icon={<FaBox size={26} className="md:size-14 sm:size-16" />} text="Low inventory" hoverText="Print on demand and reduce warehousing stress with lean, just-in-time packaging." />
      <AdvantageItem icon={<FaTruck size={26} className="md:size-14 sm:size-16" />} text="Speed to market" hoverText="From idea to shelf in days — Nexibles accelerates your packaging turnaround." /> 
      <AdvantageItem icon={<FaLeaf size={26} className="md:size-14 sm:size-16" />} text="Sustainable" hoverText="Digital processes designed to reduce waste and carbon footprint." />
      <AdvantageItem icon={<FaBarcode size={26} className="md:size-14 sm:size-16" />} text="Variable data" hoverText="Personalize each pack with unique names, codes, or designs — all in one run." />
      <AdvantageItem icon={<FaShieldAlt size={26} className="md:size-14 sm:size-16" />} text="Security printing" hoverText="Protect your brand with anti-counterfeit features and traceable packaging solutions." />

      </div>
    </div>
  );
};

export default Advantages;
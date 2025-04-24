import React from 'react';
import { FaTruck, FaLeaf, FaBox, FaShieldAlt, FaLayerGroup, FaBan, FaBarcode } from 'react-icons/fa';
import { RiMoneyDollarCircleLine } from 'react-icons/ri';

const AdvantageItem = ({ icon, text }) => (
  <div className="flex flex-col items-center p-4">
    <div className="text-4xl text-black">{icon}</div>
    <p className="text-lg mt-2 text-center text-black md:text-base sm:text-sm">{text}</p>
  </div>
);

const Advantages = () => {
  return (
    <div className="bg-white py-12 w-full">
      <h2 className="md:text-4xl text-2xl font-bold text-center mb-12 text-black">Our Advantages</h2>
      <div className="container mx-auto grid grid-cols-2 gap-8 md:grid-cols-4 sm:grid-cols-1 px-4">
        <AdvantageItem icon={<FaTruck />} text="Fast Delivery" />
        <AdvantageItem icon={<FaLeaf />} text="Eco-Friendly Packaging" />
        <AdvantageItem icon={<FaBox />} text="Compact Packaging" />
        <AdvantageItem icon={<FaShieldAlt />} text="Secure & Safe" />
        <AdvantageItem icon={<FaLayerGroup />} text="Multiple Product Lines" />
        <AdvantageItem icon={<FaBan />} text="No Harmful Additives" />
        <AdvantageItem icon={<FaBarcode />} text="Easy Tracking" />
        <AdvantageItem icon={<RiMoneyDollarCircleLine />} text="Cost-Effective MOQ" />
      </div>
    </div>
  );
};

export default Advantages;
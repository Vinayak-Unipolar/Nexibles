// TempCardPreview.js
'use client'
import { useState } from "react";
import { GrClose } from "react-icons/gr";
import Link from "next/link";

export default function TempCardPreview({ cardData, onClose }) {
  const [showBack, setShowBack] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    onClose();
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex items-center justify-center">
      <div className="md:flex flex h-screen w-screen">
        {/* img section */}
        <div className="w-full h-screen flex flex-col items-center justify-center md:w-2/3 bg-white">
          <div className="h-80 w-[90%] md:w-[550px] bg-white shadow-2xl flex justify-center items-center rounded-lg relative">
            <img
              src={showBack ? '/cards/back_card.png' : '/cards/front_card.png'}
              alt="img"
              className="h-80 w-full object-cover rounded-lg"
            />
          </div>
          {/* Front Back toggle switch button */}
          <div className="mt-4">
            <label htmlFor="toggle" className="flex items-center cursor-pointer">
              <span className="text-gray-700 font-medium mr-2">
                {showBack ? "Show Front" : "Show Back"}
              </span>
              <input
                type="checkbox"
                id="toggle"
                className="sr-only"
                checked={showBack}
                onChange={() => {
                  setShowBack(!showBack);
                }}
              />
              <div className="relative">
                <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
                <div
                  className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${showBack ? 'translate-x-6' : ''
                    }`}
                ></div>
              </div>
            </label>
          </div>
        </div>
        {/* edit button section */}
        <div className="w-full md:w-1/3 bg-gray-200 h-screen px-6 py-10 flex flex-col">
          <div className="md:flex md:justify-end text-black cursor-pointer">
            <GrClose onClick={handleClose} />
          </div>
          <p className="text-gray-700 font-semibold text-lg py-4">100 from ₹190.00</p>
          <p className="text-blue-3 underline text-sm py-4">FREE Shipping</p>
          <div>
            <p className="font-bold text-lg text-blue-3 py-4">Colors</p>
            <ul className="flex flex-row justify-start items-center ml-4 mb-6">
              <li className="mr-4 last:mr-0">
                <span className="block p-1 border-2 border-gray-400 rounded-full transition ease-in duration-300">
                  <a href="#blue" className="block w-5 h-5 bg-blue-800 rounded-full"></a>
                </span>
              </li>
              <li className="mr-4 last:mr-0">
                <span className="block p-1 border-2 border-gray-400 rounded-full transition ease-in duration-300">
                  <a href="#red" className="block w-5 h-5 bg-red-500 rounded-full"></a>
                </span>
              </li>
              <li className="mr-4 last:mr-0">
                <span className="block p-1 border-2 border-gray-400 rounded-full transition ease-in duration-300">
                  <a href="#green" className="block w-5 h-5 bg-green-700 rounded-full"></a>
                </span>
              </li>
              <li className="mr-4 last:mr-0">
                <span className="block p-1 border-2 border-gray-400 rounded-full transition ease-in duration-300">
                  <a href="#yellow" className="block w-5 h-5 bg-yellow-500 rounded-full"></a>
                </span>
              </li>
            </ul>
          </div>
          <div className="flex flex-col">
            <Link href="/studio">
              <button className="bg-blue-3 hover:bg-blue-2 duration-300 text-white px-8 py-2 rounded-full mt-auto">
                Edit Design
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

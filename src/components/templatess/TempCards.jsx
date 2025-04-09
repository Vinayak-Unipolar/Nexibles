'use client'
import React, { useState } from "react";
import { MdOutlineFavoriteBorder, MdOutlineFavorite } from "react-icons/md";
import templateData from "./templateData";
import TempCardPreview from "./TempCardPreview";

export default function TempCards() {
  const [cardsData, setCardsData] = useState(templateData);
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFavoriteClick = (index) => {
    setCardsData((prevCards) =>
      prevCards.map((card, i) => (i === index ? { ...card, isFavorite: !card.isFavorite } : card))
    );
  };

  const handleCardClick = (index) => {
    setSelectedCardIndex(index);
    setIsModalOpen(true);
  };

  const handleClosePreview = () => {
    setSelectedCardIndex(null);
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="h-auto bg-white md:flex flex-wrap md:justify-center md:py-20 py-8 px-4">
        {cardsData.map((card, index) => (
          <div key={index} className="p-4">
            <div className="h-72 w-80 bg-white rounded-lg shadow-2xl py-6 px-8">
              <div className="relative">
                <div onClick={() => handleCardClick(index)}>
                  <img src={card.imageSrc} alt="img" className="h-40 w-64 rounded-lg border-2 border-gray-200 p-1 cursor-pointer" />
                </div>
                <div
                  className="absolute top-0 right-0 -translate-y-1/3 -translate-x-1/3 rounded-full bg-gray-200 h-10 w-10 flex justify-center items-center z-10 cursor-pointer"
                  onClick={() => handleFavoriteClick(index)}
                >
                  {card.isFavorite ? (
                    <MdOutlineFavorite className="text-red-500 z-10" size={20} />
                  ) : (
                    <MdOutlineFavoriteBorder className="text-gray-700 z-10" size={20} />
                  )}
                </div>
                <p className="text-blue-3 font-semibold py-4 px-2">{card.price}</p>
                {/* colors section */}
                <div>
                  <ul className="flex flex-row justify-start items-center ml-4">
                    {/* Replace with your card's color variations */}
                    <li className="mr-4 last:mr-0">
                      <span className="block p-1 border-2 border-gray-400 rounded-full transition ease-in duration-300">
                        <a href="#blue" className="block w-3 h-3 bg-blue-800 rounded-full"></a>
                      </span>
                    </li>
                    <li className="mr-4 last:mr-0">
                      <span className="block p-1 border-2 border-gray-400 rounded-full transition ease-in duration-300">
                        <a href="#red" className="block w-3 h-3 bg-red-500 rounded-full"></a>
                      </span>
                    </li>
                    <li className="mr-4 last:mr-0">
                      <span className="block p-1 border-2 border-gray-400 rounded-full transition ease-in duration-300">
                        <a href="#green" className="block w-3 h-3 bg-green-700 rounded-full"></a>
                      </span>
                    </li>
                    <li className="mr-4 last:mr-0">
                      <span className="block p-1 border-2 border-gray-400 rounded-full transition ease-in duration-300">
                        <a href="#yellow" className="block w-3 h-3 bg-yellow-500 rounded-full"></a>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}

      </div>
      {isModalOpen && (
        <div className="fixed top-0 z-50 left-0 h-full w-full bg-gray-800 bg-opacity-75 flex items-center justify-center">
          <TempCardPreview
            cardData={cardsData[selectedCardIndex]}
            onClose={handleClosePreview}
          />
        </div>
      )}
    </div>
  );
}

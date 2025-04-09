// SleevesHero.jsx
import React from "react";
import LabelsHeroData from "./labelsHeroData";

const LabelsHero = () => {
  const { title, images, backgroundColor } = LabelsHeroData;

  return (
    <div className="flex justify-center items-center min-h-screen" style={{ backgroundColor }}>
      <div className="text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-8 md:mt-14">{title}</h1>
        <div className="flex justify-center gap-8">
          {images.map((image, index) => (
            <img
              key={index}
              src={image.src}
              alt={image.alt}
              className="w-100 h-auto transform hover:scale-105 transition-transform duration-300"             />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LabelsHero;

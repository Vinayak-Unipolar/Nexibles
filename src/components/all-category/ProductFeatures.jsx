import React, { useState } from 'react';
import Image from 'next/image';
import { useSpring, animated } from '@react-spring/web';

const PUBLIC_CDN_URL = process.env.NEXT_PUBLIC_CDN_URL || '';

const ProductFeatureItem = ({ title, image, description }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const { transform, opacity } = useSpring({
    opacity: isFlipped ? 0 : 1,
    transform: `rotateY(${isFlipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });

  return (
    <div
      className="flex flex-col items-center h-52 md:h-72 w-full"
      role="listitem"
      tabIndex={0}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div className="relative w-full h-full perspective-[1000px]">
        {/* Front Side with Image and Title */}
        <animated.div
          className="absolute inset-0 flex flex-col items-center justify-center rounded-lg bg-white"
          style={{
            opacity,
            transform,
            backfaceVisibility: 'hidden',
          }}
        >
          <div className="relative w-20 h-20 mb-3 md:w-56 md:h-56">
            <Image
              src={image}
              alt={title}
              layout="fill"
              objectFit="contain"
            />
          </div>
          <h3 className="text-lg md:text-xl font-semibold text-center text-gray-900">{title}</h3>
        </animated.div>

        {/* Back Side with Description */}
        <animated.div
          className="absolute inset-0 flex flex-col items-center justify-center rounded-lg bg-[#103b60] shadow-md p-4"
          style={{
            opacity: isFlipped ? 1 : 0,
            transform: transform.to(t => `${t} rotateY(180deg)`),
            backfaceVisibility: 'hidden',
          }}
        >
          <h3 className="text-lg md:text-xl font-semibold text-center text-[#ffd13e] mb-2">{title}</h3>
          <p className="text-sm md:text-base text-[#ffd13e] text-center">{description}</p>
        </animated.div>
      </div>
    </div>
  );
};

const ProductFeatures = () => {
  const features = [
    {
      title: "Superior Lamination",
      image: `${PUBLIC_CDN_URL}/product_features/Superior_Lamination.webp`,
      description: "Available in both solventless & solvent-based lamination to suit your product requirements."
    },
    {
      title: "Add Ons",
      image: `${PUBLIC_CDN_URL}/product_features/Add_Ons.webp`,
      description: "Enhance functionality with options such as Euro holes, Hang holes, D pouches, Round corners, Tear Notches, & more."
    },
    {
      title: "Digital Printing",
      image: `${PUBLIC_CDN_URL}/product_features/Digital_Printing.webp`,
      description: "High-quality digital printing on a range of popular substrates, including food-grade polymer & paper."
    },
    {
      title: "Premium Finishes",
      image: `${PUBLIC_CDN_URL}/product_features/Premium_Finishes.webp`,
      description: "Choose from glossy, matte, or soft-touch finishes for a premium look & feel."
    },
    {
      title: "Sealing",
      image: `${PUBLIC_CDN_URL}/product_features/Sealing.webp`,
      description: "Precision heat sealing for pouches of various sizes, including radius & K-seal formats."
    },
    {
      title: "Substrates",
      image: `${PUBLIC_CDN_URL}/product_features/Substrates.webp`,
      description: "All substrates used are food-grade, available in both polymer & paper-based materials."
    },
  ];

  return (
    <div className="px-4 py-2 mt-10 md:px-16 bg-white">
      <h2 className="mb-8 text-2xl font-semibold text-center md:text-3xl">
        Key Product Features
      </h2>
      <div className="flex justify-center">
        <div className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <ProductFeatureItem
              key={index}
              title={feature.title}
              image={feature.image}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductFeatures;
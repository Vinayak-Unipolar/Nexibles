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
      className="w-full h-40 md:h-72"
      role="listitem"
      tabIndex={0}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div className="relative w-full h-full">
        <animated.div
          className="absolute inset-0 flex flex-col items-center justify-center rounded-lg bg-white"
          style={{
            opacity,
            transform,
            backfaceVisibility: 'hidden',
          }}
        >
          <div className="relative w-40 h-64 mb-4 md:w-80 md:h-80">
            <Image
              src={image}
              alt={title}
              layout="fill"
              objectFit="contain"
            />
          </div>
          <h3 className="text-base md:text-lg font-semibold text-center text-gray-900 px-2">{title}</h3>
        </animated.div>
        <animated.div
          className="absolute inset-0 flex flex-col items-center justify-center rounded-lg bg-[#103b60] shadow-md p-6"
          style={{
            opacity: isFlipped ? 1 : 0,
            transform: transform.to(t => `${t} rotateY(180deg)`),
            backfaceVisibility: 'hidden',
          }}
        >
          <h3 className="text-base md:text-lg font-semibold text-center text-[#ffd13e] mb-3">{title}</h3>
          <p className="text-xs md:text-sm text-[#ffd13e] text-center leading-relaxed">{description}</p>
        </animated.div>
      </div>
    </div>
  );
};

const ProductFeatures = () => {
  const features = [
    {
      title: "Digital Printing",
      image: `${PUBLIC_CDN_URL}/product_features/Digital_Printing.webp`,
      description: "High-quality digital printing on a range of popular substrates, including food-grade polymer & paper."
    },
    {
      title: "Add Ons",
      image: `${PUBLIC_CDN_URL}/product_features/Add_Ons.webp`,
      description: "Enhance functionality with options such as Euro holes, Hang holes, D pouches, Round corners, Tear Notches, & more."
    },
    {
      title: "Superior Lamination",
      image: `${PUBLIC_CDN_URL}/product_features/Superior_Lamination.webp`,
      description: "Available in both solventless & solvent-based lamination to suit your product requirements."
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
    <section className="w-full bg-white">
      <div className="px-4 py-12 md:px-8 lg:px-16">
        <h2 className="mb-12 text-2xl font-semibold text-center md:text-3xl text-gray-900">
          Key Product Features
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
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
    </section>
  );
};

export default ProductFeatures;
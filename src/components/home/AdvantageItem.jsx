import React, { useState } from 'react';
import { FaTruck, FaLeaf, FaBox, FaShieldAlt, FaLayerGroup, FaBan, FaBarcode } from 'react-icons/fa';
import { RiMoneyDollarCircleLine } from 'react-icons/ri';
import { useSpring, animated } from '@react-spring/web';

const AdvantageItem = ({ icon, heading, description }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const { transform, opacity } = useSpring({
    opacity: isFlipped ? 0 : 1,
    transform: `rotateY(${isFlipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });

  return (
    <div
      className="h-20 sm:h-24 md:h-28 w-full flex flex-col items-center"
      role="listitem"
      tabIndex={0}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div className="relative w-full h-full perspective-[1000px]">
        {/* Front Side */}
        <animated.div
          className="absolute inset-0 flex flex-col items-center justify-center rounded-lg"
          style={{
            opacity,
            transform,
            backfaceVisibility: 'hidden',
          }}
        >
          {icon}
          <h3 className="mt-1 sm:mt-2 text-base sm:text-lg font-semibold text-center">{heading}</h3>
        </animated.div>
        {/* Back Side */}
        <animated.div
          className="absolute inset-0 flex flex-col items-center justify-center rounded-lg p-2 sm:p-4 text-center"
          style={{
            opacity: isFlipped ? 1 : 0,
            transform: transform.to(t => `${t} rotateY(180deg)`),
            backfaceVisibility: 'hidden',
          }}
        >
          <p className="text-xs sm:text-sm md:text-lg text-gray-700">{description}</p>
        </animated.div>
      </div>
    </div>
  );
};

const Advantages = () => {
  return (
    <div className="w-full mt-4 sm:mt-6 bg-white">
      <h2 className="mb-4 sm:mb-8 text-xl sm:text-2xl md:text-4xl font-bold text-center">Our Advantages</h2>
      <div
        role="list"
        className="container grid grid-cols-1 gap-3 sm:gap-6 md:gap-8 mx-auto sm:grid-cols-2 md:grid-cols-4 px-4 py-4 sm:py-8"
      >
        <AdvantageItem
          icon={<FaBan size={24} className="sm:size-26 md:size-14" />}
          heading="No MOQ"
          description="Start small, scale smart — print exactly what you need with zero minimum order quantity."
        />
        <AdvantageItem
          icon={<FaLayerGroup size={24} className="sm:size-26 md:size-14" />}
          heading="Multiple SKUs"
          description="Launch multiple designs in a single run, perfect for product variety and seasonal packs."
        />
        <AdvantageItem
          icon={<RiMoneyDollarCircleLine size={24} className="sm:size-26 md:size-14" />}
          heading="No cylinder and plate cost"
          description="Say goodbye to setup charges — go digital with no tooling costs or delays."
        />
        <AdvantageItem
          icon={<FaBox size={24} className="sm:size-26 md:size-14" />}
          heading="Low inventory"
          description="Print on demand and reduce warehousing stress with lean, just-in-time packaging."
        />
        <AdvantageItem
          icon={<FaTruck size={24} className="sm:size-26 md:size-14" />}
          heading="Speed to market"
          description="From idea to shelf in days — Nexibles accelerates your packaging turnaround."
        />
        <AdvantageItem
          icon={<FaLeaf size={24} className="sm:size-26 md:size-14" />}
          heading="Sustainable"
          description="Digital processes designed to reduce waste and carbon footprint."
        />
        <AdvantageItem
          icon={<FaBarcode size={24} className="sm:size-26 md:size-14" />}
          heading="Variable data"
          description="Personalize each pack with unique names, codes, or designs — all in one run."
        />
        <AdvantageItem
          icon={<FaShieldAlt size={24} className="sm:size-26 md:size-14" />}
          heading="Security printing"
          description="Protect your brand with anti-counterfeit features and traceable packaging solutions."
        />
      </div>
    </div>
  );
};

export default Advantages;
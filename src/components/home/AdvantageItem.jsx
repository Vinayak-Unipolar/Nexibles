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
      className="h-28 w-full flex flex-col items-center"
      role="listitem"
      tabIndex={0}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div className="relative w-full h-full perspective-[1000px]">
        {/* Front Side */}
        <animated.div
          className="absolute inset-0 flex flex-col items-center justify-center  rounded-lg"
          style={{
            opacity,
            transform,
            backfaceVisibility: 'hidden',
          }}
        >
          {icon}
          <h3 className="mt-2 text-lg font-semibold text-center md:text-base sm:text-xs">{heading}</h3>
        </animated.div>
        {/* Back Side */}
        <animated.div
          className="absolute inset-0 flex flex-col items-center justify-center  rounded-lg p-4 text-center"
          style={{
            opacity: isFlipped ? 1 : 0,
            transform: transform.to(t => `${t} rotateY(180deg)`),
            backfaceVisibility: 'hidden',
          }}
        >
          <p className="text-sm md:text-lg sm:text-xs text-gray-700">{description}</p>
        </animated.div>
      </div>
    </div>
  );
};

const Advantages = () => {
  return (
    <div className="w-full mt-6 bg-white">
      <h2 className="mb-8 text-2xl font-bold text-center md:text-4xl">Our Advantages</h2>
      <div
        role="list"
        className="container grid grid-cols-1 gap-8 mx-auto sm:grid-cols-2 md:grid-cols-4 px-4 py-8"
      >
        <AdvantageItem
          icon={<FaBan size={26} className="md:size-14 sm:size-12" />}
          heading="No MOQ"
          description="Start small, scale smart — print exactly what you need with zero minimum order quantity."
        />
        <AdvantageItem
          icon={<FaLayerGroup size={26} className="md:size-14 sm:size-12" />}
          heading="Multiple SKUs"
          description="Launch multiple designs in a single run, perfect for product variety and seasonal packs."
        />
        <AdvantageItem
          icon={<RiMoneyDollarCircleLine size={26} className="md:size-14 sm:size-12" />}
          heading="No cylinder and plate cost"
          description="Say goodbye to setup charges — go digital with no tooling costs or delays."
        />
        <AdvantageItem
          icon={<FaBox size={26} className="md:size-14 sm:size-12" />}
          heading="Low inventory"
          description="Print on demand and reduce warehousing stress with lean, just-in-time packaging."
        />
        <AdvantageItem
          icon={<FaTruck size={26} className="md:size-14 sm:size-12" />}
          heading="Speed to market"
          description="From idea to shelf in days — Nexibles accelerates your packaging turnaround."
        />
        <AdvantageItem
          icon={<FaLeaf size={26} className="md:size-14 sm:size-12" />}
          heading="Sustainable"
          description="Digital processes designed to reduce waste and carbon footprint."
        />
        <AdvantageItem
          icon={<FaBarcode size={26} className="md:size-14 sm:size-12" />}
          heading="Variable data"
          description="Personalize each pack with unique names, codes, or designs — all in one run."
        />
        <AdvantageItem
          icon={<FaShieldAlt size={26} className="md:size-14 sm:size-12" />}
          heading="Security printing"
          description="Protect your brand with anti-counterfeit features and traceable packaging solutions."
        />
      </div>
    </div>
  );
};

export default Advantages;
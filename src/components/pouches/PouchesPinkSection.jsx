import React from 'react';
import Image from 'next/image';
import PouchesData from './PouchesData';
import Link from 'next/link';
const PouchesPinkSection = () => {
  const { imgsrc, alt, width, height } = PouchesData[0];

  return (
    <section className="bg-[#d285a9] py-24">
      <div className="container mx-auto flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 px-4">
          <h2 className="text-4xl font-bold text-white mb-4 ml-6">Nexi™ Pouches</h2>
          <p className="text-lg text-white font-sans mb-4 ml-6">
            Efficient & versatile pouching solutions to make your product stand out on the shelf.
          </p>
          <p className="text-white font-sans text-lg mb-8 ml-6">
            Nexi™ Pouches have a wide range of applications and may be found in a variety of industries. Stand-up pouches are a common pick among businesses aiming to exhibit a range of products appealingly while reducing shipping and packaging expenses. They are ideal for the marketing of solid, liquid, or powdered items. This compact pouch packaging is also environmentally friendly, producing less waste than a box, carton, and container alternatives.
          </p>
          <Link href="/request-quote">
          <button className="ml-6 bg-[#30384E] rounded-md text-white border-[3px] border-white-2 py-2 px-4">
            Request A Quote
          </button>
          </Link>
        </div>
        <div className="md:w-1/2 flex justify-center mt-8 md:mt-0 px-4">
          <img src={imgsrc} alt={alt} width={width + 100} height={height + 100} />
        </div>
      </div>
    </section>
  );
};

export default PouchesPinkSection;

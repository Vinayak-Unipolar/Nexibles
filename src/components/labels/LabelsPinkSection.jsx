import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
// import LabelsHeroData from './labelsHeroData';
import LabelsData from './LabelsData';
const LabelsPinkSection = () => {
  // Destructure the first item from SleevesData
  const { imgsrc, alt, width, height } = LabelsData[0];

  return (
    <section className="bg-[#d285a9] py-24">
      <div className="container mx-auto flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 px-4">
          <h2 className="text-4xl font-bold text-white mb-4 ml-6">Nexi™ Sleeves</h2>
          <p className="text-lg text-white font-sans mb-4 ml-6">
            An environment-friendly labeling solution for your products.
          </p>
          <p className="text-white font-sans text-lg mb-8 ml-6">
            Our shrink sleeves products, Nexi™ Sleeves, provide the ideal solution for branding your containers with vibrant colors and designs that enhance product visibility. Available in various micron ranges, our sleeves are suitable for both PVC and PET materials, supporting high-speed application processes. Nexi™ shrink sleeve labels wrap around your product like a second skin, offering enhancements such as matte, metallic, twin, holographic, and custom-profile designs in both roll and cut styles. We prioritize environmentally responsible labeling solutions that are not only easy to use but also contribute to sustainable practices.
          </p>
          <Link href="/request-quote">
            <button className="ml-6 bg-[#30384E] rounded-md text-white border-[3px] border-white py-2 px-4">
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

export default LabelsPinkSection;

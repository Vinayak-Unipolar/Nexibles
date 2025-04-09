import React from 'react';
import KeyProductData from './KeyProductData';
import Link from 'next/link';
const KeyProduct = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto text-center px-4 lg:px-8">
        <h2 className="text-3xl font-semibold mb-12">Key Product Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {KeyProductData.map((feature, index) => (
            <div key={index} className="flex flex-col items-center p-4 bg-white rounded-lg">
              <img src={feature.imgsrc} alt={feature.alt} className="mb-4 w-48 h-48 object-cover rounded-full" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-700 text-center">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Size Section */}
      <div className="container mx-auto text-left px-4 lg:px-10 mt-12">
        <h2 className="text-2xl font-semibold mb-6">Size</h2>
        <p className="text-gray-700">Offering sizes varying between 8 cm to 25 cm in width to 12 cm to 35 cm in height with close bottom gusset of 2 cm to 5 cm for Stand-up and 3 side seal.</p>
        <p className="text-gray-700 mb-6">Five panel pouch Size: Offering sizes varying between 10 cm to 30 cm in width to 18 cm to 65* cm in height with close side and bottom gusset of 2.5 cm to 8 cm</p>

        <div className="flex justify-center">
          <Link href="/request-quote">
            <button className="px-6 py-2 bg-[#30384E] rounded-md text-white border-[3px] border-white-2">
              Request A Quote
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default KeyProduct;

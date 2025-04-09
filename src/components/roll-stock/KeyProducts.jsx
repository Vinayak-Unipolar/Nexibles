import React from 'react'
import KeyProductData from '../pouches/KeyProductData'
import Image from 'next/image'
import Link from 'next/link';
const KeyProducts = () => {
  return (
    <section className="py-16">
        <div className="container mx-auto text-center px-4 lg:px-8">
        <h2 className="text-3xl font-semibold mb-12">Key Product Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {KeyProductData.map((feature, index) => (
            <div key={index} className="max-w-sm p-4 m-4 bg-white rounded-lg">
              <div className="flex justify-center mb-4">
                <Image
                  src={feature.imgsrc}
                  alt={feature.alt}
                  width={100}
                  height={100}
                  className="mb-4 w-48 h-48 object-cover rounded-full"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 ">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

       {/* Size Section */}
       <div className="container mx-auto text-left px-4 lg:px-10 mt-12">
        <h2 className="text-2xl font-semibold mb-6">Size</h2>
        <p className="text-gray-700 mb-6">Size offered varies between 4 cm to 32 cm in width to 4 cm to 75 cm in height</p>

        <div className="flex justify-center">
        <Link href="/request-quote">
          <button className="px-6 py-2 bg-[#30384E] rounded-md text-white border-[3px] border-white-2">
            Request A Quote
          </button>
          </Link>
        </div>
      </div>

    </section>
  )
}

export default KeyProducts

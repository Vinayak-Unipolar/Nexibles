import React from 'react';
import Link from "next/link";
import Image from "next/image"; // Using Next.js Image for better performance
import noproduct from '../../../../public/cards/product-not-found.jpg';
import Loading from '../../comman/Loader';

export default function Card({ product, isLoading }) {
  if (isLoading) {
    return <Loading />;
  }

  // Function to encode URL segments properly
  const createProductUrl = (category, name, id) => {
    return `/product/${encodeURIComponent(category.toLowerCase()).replace(/%20/g, '-')}/${encodeURIComponent(name.toLowerCase()).replace(/%20/g, '-')}/${id}`;
  };

  return (
    <section className="bg-white w-full">
      <div className="py-2 md:py-4 mb-6">
        {product && product.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 px-4 md:px-6">
            {product.map(data => (
              <div key={data.id} className="flex justify-center">
                <Link 
                  href={createProductUrl(data.category, data.name, data.id)}
                  className="w-full max-w-xs transition-transform duration-300 hover:scale-105"
                >
                  <div className="h-full bg-gray-100 shadow-md rounded-lg overflow-hidden flex flex-col">
                    <div className="relative h-44 sm:h-64 md:h-72 w-full">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_CDN_URL}/${data.image}`}
                        alt={data.name}
                        layout="fill"
                        objectFit="contain"
                        placeholder="blur"
                        blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iI2YxZjFmMSIvPjwvc3ZnPg=="
                        className="rounded-t-lg"
                      />
                    </div>
                    <div className="py-3 px-4 flex-grow">
                      <h3 className="text-gray-900 font-semibold text-sm md:text-base truncate">
                        {data.name}
                      </h3>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center w-full py-16 md:py-24">
            <div className="relative w-full max-w-xs md:max-w-sm">
              <Image 
                src={noproduct} 
                alt="No Products Found" 
                width={400} 
                height={400} 
                layout="responsive" 
                placeholder="blur"
              />
              <p className="text-center text-gray-500 mt-4">No products found</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
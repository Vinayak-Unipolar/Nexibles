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
    <section className="w-full bg-white">
      <div className="py-2 mb-6 md:py-4">
        {product && product.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 px-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-6 md:px-6">
            {product.map(data => (
              <div key={data.id} className="flex justify-center">
                <Link
                  href={createProductUrl(data.category, data.name, data.id)}
                  className="w-full max-w-xs transition-transform duration-300 hover:scale-105"
                >
                  <div className="flex flex-col h-full overflow-hidden bg-gray-100 rounded-lg shadow-md">
                    <div className="relative w-full h-44 sm:h-64 md:h-72">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_CDNNEW_URL}/product/${data.image}`}
                        alt={data.name}
                        layout="fill"
                        objectFit="contain"
                        placeholder="blur"
                        blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iI2YxZjFmMSIvPjwvc3ZnPg=="
                        className="rounded-t-lg"
                      />
                    </div>
                    <div className="flex-grow px-4 py-3">
                      <h3 className="text-sm font-semibold text-gray-900 truncate md:text-base">
                        {data.name}
                      </h3>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center w-full py-16 md:py-24">
            <div className="relative w-full max-w-xs md:max-w-sm">
              <Image
                src={noproduct}
                alt="No Products Found"
                width={400}
                height={400}
                layout="responsive"
                placeholder="blur"
              />
              <p className="mt-4 text-center text-gray-500">No products found</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
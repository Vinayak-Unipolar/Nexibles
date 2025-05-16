import React from 'react';
import Link from "next/link";
import Image from "next/image";
import Loading from '../../comman/Loader';
import { ShoppingBag, Home } from 'lucide-react';

export default function Card({ product, isLoading }) {
  if (isLoading) {
    return <Loading />;
  }

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
                  <div className="flex flex-col h-full overflow-hidden rounded-lg shadow-md bg-white">
                    <div className="relative w-full h-44 sm:h-64 md:h-72">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_CDN_URL}/product/${data.image}`}
                        alt={data.name}
                        layout="fill"
                        objectFit="contain"
                        placeholder="blur"
                        blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iI2YxZjFmMSIvPjwvc3ZnPg=="
                        className="rounded-t-lg"
                      />
                    </div>
                    <div className="flex-grow px-4 py-3">
                      <h3 className="text-sm font-semibold text-[#231f20] truncate md:text-base">
                        {data.name}
                      </h3>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center w-full min-h-[70vh] px-4 py-16 md:py-20 bg-white text-center">
            {/* Icon */}
            <div className="mb-6">
              <div className="w-24 h-24 md:w-28 md:h-28 bg-[#103b60] rounded-full flex items-center justify-center shadow-md">
                <ShoppingBag className="h-12 w-12 text-white" />
              </div>
            </div>

            {/* Heading */}
            <h2 className="text-2xl md:text-4xl font-bold mb-4 text-[#231f20]">
              No Products Found
            </h2>

            {/* Description */}
            <p className="text-[#231f20] mb-8 max-w-md">
              The products you are looking for might be currently unavailable or have been removed from our catalog.
            </p>

            {/* Return Button */}
            <Link href="/" className="mt-2 group">
              <button className="bg-[#ffd13e] text-[#231f20] font-medium py-3 px-8 rounded-full shadow-md transition-all duration-300 flex items-center justify-center hover:scale-105">
                <Home className="h-5 w-5 mr-2" />
                <span>Return to Homepage</span>
              </button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

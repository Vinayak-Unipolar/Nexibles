'use client'
import React, { useMemo, useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import Link from 'next/link';
import Image from 'next/image';

const RelatedCategory = ({ relatedProducts, currentProductIds = [] }) => {
  const [sliderRef, setSliderRef] = useState(null);
  const products = Array.isArray(relatedProducts) ? relatedProducts.flat() : [];

  const filteredProducts = useMemo(() => {
    const filtered = products.filter(product =>
      !currentProductIds.includes(product.id)
    );
    const uniqueProducts = Array.from(
      new Map(filtered.map(item => [item.id, item])).values()
    );
    return uniqueProducts;
  }, [products, currentProductIds]);

  useEffect(() => {
    if (sliderRef && filteredProducts.length > 0) {
      sliderRef.slickGoTo(0); // Reset to first slide when filteredProducts change
    }
  }, [filteredProducts, sliderRef]);

  if (!relatedProducts || filteredProducts.length === 0) {
    return null;
  }

  const NextArrow = ({ onClick }) => (
    <div className="absolute transform -translate-y-1/2 top-1/2 right-4">
      <button
        className="p-3 bg-white rounded-full shadow-md"
        onClick={onClick}
        aria-label="Next"
      >
        <GrFormNext className="text-2xl text-gray-900 duration-200 hover:text-red-1" size={32} />
      </button>
    </div>
  );

  const PrevArrow = ({ onClick }) => (
    <div className="absolute z-10 transform -translate-y-1/2 top-1/2 left-8">
      <button
        className="p-3 bg-white rounded-full shadow-md"
        onClick={onClick}
        aria-label="Previous"
      >
        <GrFormPrevious className="text-2xl text-gray-900 duration-200 hover:text-red-1" size={32} />
      </button>
    </div>
  );

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 1000,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2100,
    pauseOnHover: true,
    draggable: false,
    swipeToSlide: true,
    cssEase: 'ease-in-out',
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          centerMode: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          centerMode: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          centerMode: false,
        },
      },
    ],
  };

  return (
    <div className='h-auto py-8 bg-white'>
      <div className="flex items-center px-2">
        <hr className="flex-grow mr-4" />
        <h2 className="text-3xl font-bold text-blue-1">Related Products</h2>
        <hr className="flex-grow ml-4" />
      </div>
      <br />
      <div className="relative">
        <Slider ref={setSliderRef} {...sliderSettings}>
          {filteredProducts.map((product) => (
            <div key={product.id} className="ml-1">
              <Link
                href={`/product/${encodeURIComponent(product.category.toLowerCase()).replace(/%20/g, '-')}/${encodeURIComponent(product.name.toLowerCase()).replace(/%20/g, '-')}/${encodeURIComponent(product.id).replace(/%20/g, '-')}`}
                passHref
              >
                <div className="flex items-center justify-center py-2">
                  <div className="bg-gray-50 h-80 w-64 hover:shadow-[0.2px_2px_5px_0.2px_#4a5568] rounded-lg overflow-hidden mb-4">
                    <div>
                      <Image
                        // src={`${process.env.NEXT_PUBLIC_CDN_URL}/product/${product.image}`}
                        src={`${process.env.NEXT_PUBLIC_CDN_URL}/product/${product.image}`}
                        alt={`Image for ${product.name}`}
                        width={256}
                        height={256}
                        className="object-contain w-full h-64 rounded-t-lg"
                      />
                    </div>
                    <div className="flex flex-col items-center justify-center ml-2">
                      <h2 className="text-base font-semibold text-gray-900 line-clamp-1">{product.name}</h2>
                      <div className="mt-1 text-xs text-gray-500 line-clamp-1">
                        <p>({product.material})</p>
                      </div>
                    </div>

                  </div>
                </div>
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default RelatedCategory;
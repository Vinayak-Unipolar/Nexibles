"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Loader from "@/components/comman/Loader";
import { IoChevronForward, IoChevronBack } from "react-icons/io5";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

export default function RelatedProducts({ productDetails }) {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentProductId = productDetails?.product?.id;
  const category = productDetails?.product?.category || "";
  
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const APIURL = process.env.NEXT_PUBLIC_API_URL;
  const CDN_URL = process.env.NEXT_PUBLIC_CDN_URL;

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      if (!category) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(`${APIURL}/api/product/get_list/All`, {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            "API-Key": apiKey,
          },
        });

        const data = await response.json();

        if (data.status === "success" && Array.isArray(data.data)) {
          const filteredProducts = data.data.filter(
            (product) =>
              product.id !== currentProductId && product.origin !== "Nexigifting"
          );
          setRelatedProducts(filteredProducts);
        } else {
          console.error("Failed to fetch related products:", data.error);
        }
      } catch (error) {
        console.error("Error fetching related products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedProducts();
  }, [category, currentProductId, APIURL, apiKey]);

  useEffect(() => {
    if (swiperRef.current && prevRef.current && nextRef.current) {
      const swiper = swiperRef.current.swiper;
      swiper.navigation.update();
    }
  }, []);

  if (loading) {
    return (
      <div className="px-2 sm:px-4 md:px-6 lg:px-8 max-w-screen-xl mx-auto">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4">Related Products</h2>
        <div className="flex justify-center py-6 sm:py-8">
          <Loader />
        </div>
      </div>
    );
  }

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <>
      {relatedProducts && relatedProducts.length > 0 && (
        <>
          <hr className="border-gray-300 my-6 sm:my-8" />
          <section className="px-2 sm:px-4 md:px-6 lg:px-8 pb-6 sm:pb-8 max-w-screen-xl mx-auto relative">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-6">
              Related Products
            </h2>
            <div className="relative">
              <Swiper
                ref={swiperRef}
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={8}
                slidesPerView={2}
                navigation={{
                  prevEl: prevRef.current,
                  nextEl: nextRef.current,
                  enabled: true,
                }}
                onBeforeInit={(swiper) => {
                  swiper.params.navigation.prevEl = prevRef.current;
                  swiper.params.navigation.nextEl = nextRef.current;
                }}
                freeMode={true}
                pagination={{ clickable: true, enabled: false }}
                autoplay={{ delay: 3000, reverseDirection: false }}
                loop={relatedProducts.length > 4}
                breakpoints={{
                  0: {
                    slidesPerView: 2,
                    spaceBetween: 8,
                  },
                  480: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                  },
                  640: {
                    slidesPerView: 3,
                    spaceBetween: 12,
                  },
                  768: {
                    slidesPerView: 4,
                    spaceBetween: 15,
                  },
                  1024: {
                    slidesPerView: 5,
                    spaceBetween: 20,
                  },
                }}
                className="mySwiper"
              >
                {relatedProducts.map((product) => (
                  <SwiperSlide key={product.id}>
                    <div
                      className="text-left p-2 sm:p-3 rounded-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white w-full cursor-pointer border border-gray-200"
                      onClick={() =>
                        (window.location.href = `/product/${encodeURIComponent(
                          product.category.toLowerCase()
                        ).replace(/%20/g, "-")}/${encodeURIComponent(
                          product.name.toLowerCase()
                        ).replace(/%20/g, "-")}/${product.id}`)
                      }
                    >
                      <div className="relative w-full h-28 sm:h-36 md:h-40 lg:h-52 mb-2">
                        <Image
                          src={
                            product.image
                              ? `${CDN_URL}/${product.image}`
                              : "/placeholder-product.png"
                          }
                          alt={product.name}
                          layout="fill"
                          objectFit="contain"
                          className="rounded-md transition-transform duration-300 hover:scale-105"
                        />
                      </div>
                      <h3 className="font-bold text-xs sm:text-sm md:text-base truncate">
                        {product.name}
                      </h3>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Custom navigation buttons */}
              <div
                ref={prevRef}
                className="absolute top-1/2 -left-1 sm:-left-2 md:-left-3 lg:-left-4 transform -translate-y-1/2 z-10 bg-white rounded-full p-1 sm:p-2 shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer hidden sm:block"
                aria-label="Previous"
              >
                <IoChevronBack
                  className="text-black hover:text-red-500 transition-colors duration-200"
                  size={16}
                />
              </div>
              <div
                ref={nextRef}
                className="absolute top-1/2 -right-1 sm:-right-2 md:-right-3 lg:-right-4 transform -translate-y-1/2 z-10 bg-white rounded-full p-1 sm:p-2 shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer hidden sm:block"
                aria-label="Next"
              >
                <IoChevronForward
                  className="text-black hover:text-red-500 transition-colors duration-200"
                  size={16}
                />
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
}
"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Loader from "@/components/comman/Loader";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

// Styles for navigation buttons
const customStyles = {
  ".swiper-button-next, .swiper-button-prev": {
    backgroundColor: "white", // White background for arrows
    borderRadius: "50%",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    color: "#000000", // Black arrow color for contrast
    width: "32px",
    height: "32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // Hide arrows on phone view (below 640px)
    "@media (max-width: 639px)": {
      display: "none", // Explicitly hide arrows for phone view
    },
  },
  ".swiper-button-next:after, .swiper-button-prev:after": {
    fontSize: "16px",
    fontWeight: "bold", // Ensure arrow visibility on larger screens
  },
};

export default function RelatedProducts({ productDetails }) {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentProductId = productDetails?.product?.id;
  const category = productDetails?.product?.category || "";

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

  if (loading) {
    return (
      <div className="px-4 max-w-screen-xl mx-auto">
        <h2 className="text-xl font-bold mb-4">Related Products</h2>
        <div className="flex justify-center py-8">
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
          <hr className="border-gray-300 my-8" />
          <div className="px-4 pb-8 max-w-screen-xl mx-auto">
            <h2 className="text-xl font-bold mb-4">Related Products</h2>
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={10}
              slidesPerView={2}
              navigation={{
                enabled: true,
                // Hide navigation on mobile screens
                hideOnClick: true
              }}
              freeMode={true} // Enable scrollable behavior on mobile
              pagination={{ clickable: true, enabled: false }} // Disable pagination dots
              autoplay={{ delay: 3000, reverseDirection: false }}
              loop={relatedProducts.length > 4}
              breakpoints={{
                0: {
                  slidesPerView: 2,
                  spaceBetween: 10,
                  navigation: {
                    enabled: false, // Explicitly disable navigation for mobile
                  }
                },
                640: {
                  slidesPerView: 3,
                  spaceBetween: 15,
                  navigation: {
                    enabled: true, // Enable navigation for tablets and larger
                  }
                },
                768: {
                  slidesPerView: 4,
                  spaceBetween: 15,
                },
                1024: {
                  slidesPerView: 5,
                  spaceBetween: 20,
                },
                1280: {
                  slidesPerView: 5,
                  spaceBetween: 20,
                },
              }}
              className="mySwiper"
              style={customStyles}
            >
              {relatedProducts.map((product) => (
                <SwiperSlide key={product.id}>
                  <div
                    className="text-left p-2 sm:p-3 rounded-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white w-full sm:w-[15rem] cursor-pointer border border-gray-200"
                    onClick={() =>
                      (window.location.href = `/product/${encodeURIComponent(
                        product.category.toLowerCase()
                      ).replace(/%20/g, "-")}/${encodeURIComponent(
                        product.name.toLowerCase()
                      ).replace(/%20/g, "-")}/${product.id}`)
                    }
                  >
                    <div className="relative w-full h-32 sm:h-40 md:h-52 mb-2">
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
                    {/* <p className="text-gray-600 text-xs sm:text-sm">₹{product.price}</p> */}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </>
      )}
    </>
  );
}
"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import RequestForm from "../../RequestForm";
import { FaLongArrowAltRight } from "react-icons/fa";
export default function PopularProducts() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const APIURL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${APIURL}/api/category_master`, {
          headers: {
            "Content-Type": "application/json",
            "API-Key": apiKey,
          },
        });
        const data = await response.json();

        if (data.status === "success") {
          const nexiblesCategories = data.data.filter(
            (category) => category.origin?.toLowerCase() === "nexibles"
          );
          setCategories(nexiblesCategories);
        } else {
          console.error("Failed to fetch categories:", data.error);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [apiKey, APIURL]);

  const handleOpenModal = (categoryName) => {
    setSelectedCategory(categoryName);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCategory("");
  };

  return (
    <div className="py-1 bg-white md:py-0">
      <div className="container px-4 mx-auto">
        <h2 className="md:text-3xl text-2xl font-bold text-center text-[#333] mb-8 md:mb-6 md:mt-4">
          Explore Custom Pouches
        </h2>

        <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
          {!loading ? (
            categories.map((category) => (
              <div
                key={category.id}
                className="flex flex-col items-center w-full transition-all duration-300 hover:shadow-lg rounded-lg p-4 cursor-pointer"
                onClick={() => window.location.href = `/category/${category.cat_url}`}
              >
                <div className="relative w-full aspect-square flex items-center justify-center overflow-hidden">
                  <Image
                    src={
                      category.bg_Img
                        ? `${process.env.NEXT_PUBLIC_CDN_URL}/category/${category.bg_Img}`
                        : "/placeholder.png"
                    }
                    alt={category.name}
                    width={300}
                    height={300}
                    className="object-contain transition-transform duration-300 hover:scale-105 max-h-full max-w-full"
                  />
                </div>
                <div className="mt-3 text-center w-full">
                  <p className="text-xs sm:text-sm md:text-sm font-bold tracking-wider text-black mb-2 sm:mb-3 md:mb-4">
                    {category.name}
                  </p>
                  <div className="flex justify-center space-x-2">
                    <div className="flex justify-center items-center gap-2 flex-wrap">
                      <Link
                        href={`/category/${category.cat_url}`}
                        onClick={(e) => e.stopPropagation()}
                        className="px-4 py-1.5 text-xs font-medium rounded hover:bg-gray-100 text-black transition duration-300 whitespace-nowrap"
                      >
                        Details
                      </Link>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenModal(category.name);
                        }}
                        className="px-4 py-1.5 text-xs font-medium rounded bg-[#ffd13e] hover:bg-yellow-500 text-black transition duration-300 whitespace-nowrap"
                      >
                        Get Quote
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            Array(8)
              .fill(null)
              .map((_, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center p-6 border border-gray-200 rounded-lg"
                >
                  <div className="relative w-full aspect-square flex items-center justify-center">
                    <div className="w-3/4 h-3/4 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                  <div className="mt-3 text-center w-full">
                    <div className="w-3/4 h-4 mx-auto bg-gray-200 rounded animate-pulse mb-4"></div>
                    <div className="flex justify-center space-x-2">
                      <div className="w-16 h-7 sm:w-20 sm:h-8 bg-white border border-black rounded animate-pulse"></div>
                      <div className="w-16 h-7 sm:w-20 sm:h-8 bg-[#ffd13e] border border-black rounded animate-pulse"></div>
                    </div>
                  </div>
                </div>
              ))
          )}
        </div>
        {/* <div className="flex justify-center md:my-6 my-2">
          <Link href="/all-category" className="items-center">
            <button className="flex items-center gap-2 md:px-6 p-2 md:py-1 md:text-lg text-xs text-black bg-[#ffd13e] rounded-full hover:bg-[#e6bc35] transition-all">
              Show More
              <FaLongArrowAltRight />
            </button>
          </Link>
        </div> */}
      </div>

      <RequestForm
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        initialCategory={selectedCategory}
      />
    </div>
  );
}

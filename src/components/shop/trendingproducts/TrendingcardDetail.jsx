'use client'
import React, { useState } from "react";
import { useParams } from 'next/navigation';
import Link from "next/link";

const CardDetail = () => {
    const [selectedImage, setSelectedImage] = useState("/cards/dummycard.webp");
    const { trendingproductId } = useParams();

    const thumbnailImages = [
        "/cards/dummycard.webp",
        "/cards/standard-card.webp",

        // Add more thumbnail image paths as needed
    ];

    const handleThumbnailClick = (image) => {
        setSelectedImage(image);
    };

    return (
        <div>
            <div className="bg-white-1 h-auto">
                <div className="md:flex lg:mx-20 mx-10 lg:py-16 py-2">
                    {/* Main image section */}
                    <div className="md:w-1/2 w-full py-10 md:mx-20 flex flex-col justify-center items-center">
                        <img src={selectedImage} alt="card" width={400} height={200} onClick={() => handleThumbnailClick("/cards/dummycard.webp")} />

                        {/* Thumbnail image section */}
                        <div className="flex py-12">
                            {thumbnailImages.map((thumbnail, index) => (
                                <img
                                    key={index}
                                    src={thumbnail}
                                    alt={`thumbnail-${index}`}
                                    width={80}
                                    height={40}
                                    className="cursor-pointer mr-2"
                                    onClick={() => handleThumbnailClick(thumbnail)}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="md:w-1/2 w-full py-6">
                        <div className="text-blue-1 font-bold">
                            <h1>Trending Product Details</h1>
                            <p>Product ID: {trendingproductId}</p>
                            {/* Render product details here */}
                        </div>
                        <h2 className="text-blue-1 font-semibold">Standard Visiting Cards</h2>
                        <p className="text-blue-1 font-bold">Personalized cards with a professional look.</p>
                        <div className="text-blue-1">
                            <p>4000+ design options available</p>
                            <ul className="list-disc">
                                <li>Standard glossy or matte paper included</li>
                                <li>Dimension shown on the design page includes bleed area (safety area), the final card size will be 8.9 cm x 5.1 cm</li>
                                <li>Stretch your design up to the Bleed area to avoid white borders appearing around your card. Keep all your information within the safety area.</li>
                                <li>Choose bold fonts size 10 and above when using white text</li>
                                <li>Need help in designing? You can avail our Design Services</li>
                            </ul>
                        </div>
                        <p className="text-blue-1 italic mt-4">Cash on Delivery available</p>
                        <ul className="list-disc text-blue-1 font-bold mt-4">
                            <li>Price below is MRP (inclusive of all taxes)</li>
                        </ul>
                        <p className="text-blue-1 underline mt-2">See Details</p>
                        <div className="mt-4">
                            <select className="border border-blue-1 text-blue-1 rounded px-4 w-full md:w-80 outline-none py-2">
                                <option value="" disabled selected hidden>Corners</option>
                                <option value="option1">Standard</option>
                                <option value="option2">Rounded</option>
                                {/* Add more options as needed */}
                            </select>
                        </div>
                        <div className="mt-4">
                            <select className="border border-blue-1 text-blue-1 rounded px-4 w-full md:w-80 outline-none py-2">
                                <option value="" disabled selected hidden>Quantity</option>
                                <option value="option1">100 RS.190.00</option>
                                <option value="option2">200 RS.320.00</option>
                                {/* Add more options as needed */}
                            </select>
                        </div>

                        <p className="text-blue-1 py-1">100 Starting at Rs.190.00</p>
                        <p className="underline text-blue-1">Free Shipping</p>
                        <div className="py-4 flex flex-col">
                            <div className="mb-4">
                                <Link href="/templatess">
                                    <button className="bg-blue-3 px-4 py-2 w-full md:w-96 text-white">
                                        Browse Design <br />Choose one of our Templates
                                    </button>
                                </Link>
                            </div>
                            <div>
                                <button className="bg-white-2 px-4 py-2 w-full md:w-96 text-blue-1">
                                    Upload Design <br />Have a Design? Upload and edit it
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}
export default CardDetail;
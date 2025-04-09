"use client"
import { useState } from 'react';
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";

export default function FavoriteCategory() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className="bg-white md:mt-28 relative">
            <div className="px-8 py-3">
                <p className="text-black text-lg font-semibold mb-4">All Products</p>
                <div className="flex items-center justify-between">
                    <p className="text-black text-lg font-semibold">My Favorites</p>
                    <div className="relative">
                        {isDropdownOpen ? (
                            <RiArrowUpSLine
                                className="text-black text-lg cursor-pointer"
                                onClick={toggleDropdown}
                            />
                        ) : (
                            <RiArrowDownSLine
                                className="text-black text-lg cursor-pointer"
                                onClick={toggleDropdown}
                            />
                        )}
                    </div>
                </div>
            </div>
            <div className="px-6">
                <hr className="border-gray-300 my-2" />
                {isDropdownOpen && (
                    
                    <div className="px-4 mt-4">
                        <ul className="text-gray-900 space-y-4 text-md font-semibold">
                            <li>Visiting Cards</li>
                            <li>A4 Letter Head</li>
                            <li>Tent Card 150 gsm</li>
                            <li>Tent Card Sunboard</li>
                            <li>Tent Card Cardboard</li>
                            <li>Stand Up Pouch</li>
                            <li>Center Seal Pouch</li>
                            <li>Center Seal Gusset Pouch</li>
                            <li>Center Seal Side Seal Pouch</li>
                            <li>2 Side Seal Pouch</li>
                            <li>Quad Seal</li>

                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}

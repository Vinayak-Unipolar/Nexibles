'use client'
import React, { useState } from 'react';
import { GrClose } from "react-icons/gr";
import Link from 'next/link';

export default function DesignPreview() {
    const [isChecked, setIsChecked] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [showBack, setShowBack] = useState(false);

    const handleClose = () => {
        setIsVisible(false);
    };

    if (!isVisible) {
        return null;
    }

    return (
        <div className="bg-white h-screen">
            <div className="md:flex flex-col md:flex-row">
            <div className="absolute top-0 right-0 mr-4 mt-4 text-black cursor-pointer">
                        <GrClose onClick={handleClose} size={28} />
                    </div>
                <div className="md:w-1/2 w-full py-24 relative">
                    <div className="flex flex-col justify-center items-center">
                        <div>
                            <img
                                src={showBack ? '/cards/dummycard_back.webp' : '/cards/dummycard.webp'}
                                alt="Design Preview"
                                className="h-[449px] w-[449px]"
                            />
                        </div>
                        {/* Front Back toggle switch button */}
                        <div className="mt-4">
                            <label htmlFor="toggle" className="flex items-center cursor-pointer">
                                <span className="text-gray-700 font-medium mr-2">
                                    {showBack ? "Show Front" : "Show Back"}
                                </span>
                                <input
                                    type="checkbox"
                                    id="toggle"
                                    className="sr-only"
                                    checked={showBack}
                                    onChange={() => {
                                        setShowBack(!showBack);
                                    }}
                                />
                                <div className="relative">
                                    <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
                                    <div
                                        className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${showBack ? 'translate-x-6' : ''
                                            }`}
                                    ></div>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
                <div className="md:w-1/2 w-full h-auto px-10 md:py-10">
                    
                    <div className="flex flex-col justify-center items-center md:py-20">
                        <h3 className="text-blue-3 font-bold text-3xl mb-4">Design Review</h3>
                        <p className='text-blue-3 font-semibold text-xl mb-4'>All set? Lets double-check&#58;</p>
                        <ul className='text-xl mb-4'>
                            <li className='text-blue-3 mb-2'><span className='font-semibold'>Text&#58;</span> Is it clear and legible?</li>
                            <li className='text-blue-3 mb-2'><span className='font-semibold'>Margin&#58;</span> Is everything within the space?</li>
                            <li className='text-blue-3 mb-2'><span className='font-semibold'>Info&#58;</span> Everything accurate? Spelled correctly?</li>
                            <li className='text-blue-3 mb-2'><span className='font-semibold'>Images&#58;</span> Is everything clear (no blur)?</li>
                            <li className='text-blue-3 mb-2'>Your design has unedited placeholder text</li>
                        </ul>
                        <div className="flex flex-col space-y-4">
                            <div >
                                <Link href="/studio">
                                    <button className='text-blue-3 rounded-full w-full font-semibold bg-rose-1 px-10 py-3'>Edit my design</button>
                                </Link>
                            </div>
                            <label className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={() => setIsChecked(!isChecked)}
                                />
                                <span className="text-blue-3">I agree to the terms and conditions</span>
                            </label>
                            <div>
                                <Link href="/addtocart">
                                    <button className="text-white rounded-full w-full font-semibold bg-blue-3 px-10 py-3" disabled={!isChecked}>
                                        Continue
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

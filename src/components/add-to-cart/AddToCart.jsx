//AddToCart
"use client"
import { useState } from "react";
import Link from "next/link";
import paperData from "./paperData"; 

export default function AddToCart() {
    const [selectedStep, setSelectedStep] = useState(null);

    const handleStepClick = (stepIndex) => {
        setSelectedStep(stepIndex);
    };

    return (
        <div className="h-auto bg-gray-300 border-t"> 
        {/* sd */}
            <div className="md:flex">
                <div className="md:w-1/2 w-full flex justify-center items-center px-8">
                    <div>
                        <img
                            src="/cards/BusinessCardwithQRcode.jpg"
                            alt="businesscard"
                            className="h-[380px] w-[550px]" />
                    </div>
                </div>
                <div className="md:w-1/2 w-full">
                    <div className="bg-white px-6 py-4">
                        <div>
                            <h2 className="text-gray-900 text-4xl font-bold">Stock/Paper Select</h2>
                        </div>
                        <div className="flex flex-col space-y-4">
                            <p className="text-gray-900">steps</p>
                            {paperData.map((paper, index) => (
                                <div
                                    key={paper.id}
                                    className={`h-40 w-full bg-white border border-gray-600 flex rounded-lg cursor-pointer ${selectedStep === paper.id ? "border-2 border-gray-900" : ""
                                        }`}
                                    onClick={() => handleStepClick(paper.id)}
                                >
                                    <div className="flex justify-center items-center ">
                                        <img src={paper.imagePath} alt="img" className="w-44 h-40 p-2" />
                                    </div>
                                    <div className="flex flex-col mt-2">
                                        <h2 className="text-gray-900 ml-4 font-bold text-xl">{paper.title}</h2>
                                        <ul className="list-disc px-8 mt-4">
                                            {paper.specifications.map((spec, index) => (
                                                <li key={index} className="text-gray-900">{spec}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                            
                        </div>
                    </div>
                    <hr />
                    <div className="h-20 bg-white flex justify-between items-center px-6">
                        <div>
                            <h3 className="text-gray-900 text-3xl font-bold"><span className="mr-1">&#x20B9;</span>200</h3>
                        </div>
                        <div className="space-x-4 ">
                            <select name="" id="" className="px-7 md:py-2 bg-white border-2 border-gray-900 rounded-full text-gray-900">100 QTY
                                <option value="">200 QTY</option>
                                <option value="">300 QTY</option>
                            </select>
                            <Link href="/ordersummary">
                                <button className="bg-[#111B36] text-white px-7 md:py-2 uppercase rounded-full">
                                    add to cart
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

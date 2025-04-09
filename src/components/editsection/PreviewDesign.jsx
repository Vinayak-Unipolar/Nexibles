"use client"
import React, { useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";

export default function PreviewDesign({setShowPreview}) {
    const [showClose, setShowClose] = useState(false);
    const handleClose = (e) => {
        e.preventDefault();
        setShowClose(true);
        setShowPreview(false)
    };

    return (
        <>
        {!showClose && ( 
        <div className="backdrop-filter backdrop-blur-lg fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-75">
            <div className="opacity-30"></div>
            <div className="relative bg-white shadow-inner h-[400px] w-[750px] flex flex-col justify-center items-center">
                
                    <div className="absolute top-0 right-0 m-4">
                        <h3 className="text-gray-900 uppercase font-semibold flex gap-2"> close  <AiFillCloseCircle className="text-gray-900 cursor-pointer" size={24} onClick={handleClose} /> </h3>
                    </div>
                
                <div className="flex flex-col justify-center items-center space-y-4">
                    <img src="/cards/BusinessCardwithQRcode.jpg" alt="card" className="h-[300px] w-[600px]" />
                    <h2 className="text-gray-900 uppercase font-semibold">front</h2>
                </div>
            </div>
        </div>
        )}
        </>
    );
}


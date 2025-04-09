import React, { useState } from 'react';
import { PiArrowUUpRight, PiArrowUUpLeft } from "react-icons/pi";
import { MdDoneOutline } from "react-icons/md";
import { FiPlus, FiMinus } from "react-icons/fi";
import { IoMdEye } from "react-icons/io";
import { MdOutlineFileDownload } from "react-icons/md";
import Link from 'next/link';

const Editfeatures = ({ selectedComponent, onPreviewClick }) => {

    return (
        <div className="h-16 bg-white border-b">
            <div className="flex">
                <div>
                    <p className="text-gray-900 font-semibold text-2xl px-4 py-3">{selectedComponent}</p>
                </div>
                <div className="flex justify-center items-center ml-44 space-x-4">
                    <PiArrowUUpLeft className="text-gray-400 cursor-pointer" size={20} />
                    <PiArrowUUpRight className="text-gray-400 cursor-pointer" size={20} />
                </div>
                <div className="flex justify-center items-center">
                    <div className="h-8 w-0.5 bg-gray-400 mx-4"></div>
                    {/* save button */}
                    <Link href="/design-preview">
                        <div className="bg-gray-100 border border-gray-300 h-8 w-8 p-1 rounded-full text-gray-900 flex items-center justify-center cursor-pointer">
                            <MdDoneOutline />
                        </div>
                    </Link>
                    <div className="h-8 w-0.5 bg-gray-400 mx-4"></div>
                </div>
                <div className="flex justify-center items-center space-x-2 ml-44">
                    <div className="bg-gray-900 h-8 w-8 p-1 rounded-full text-white flex items-center justify-center cursor-pointer">
                        <FiPlus />
                    </div>
                    <h3 className="text-gray-900 uppercase font-semibold cursor-pointer">zoom</h3>
                    <div className="bg-gray-900 h-8 w-8 p-1 rounded-full text-white flex items-center justify-center cursor-pointer">
                        <FiMinus />
                    </div>
                </div>
                <div className="flex justify-end items-center space-x-4 ml-36 mt-2">
                    {/* Preview Button */}
                    <div>
                        <button className="bg-[#30384E] rounded-md px-4 py-2 uppercase flex items-center justify-center space-x-2"
                            onClick={onPreviewClick}>
                            <IoMdEye className="text-white" size={24} />
                            <span className="text-white">Preview</span>
                        </button>
                    </div>
                    {/* Download Button */}
                    <div>
                        <button className="bg-black px-4 py-2 uppercase rounded-full flex items-center justify-center space-x-2">
                            <MdOutlineFileDownload className="text-white" size={24} />
                            <span className="text-white">Download</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Editfeatures;

//howitworks
import React from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import { FaCircleCheck } from "react-icons/fa6";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Howitworks = () => {

    return (
        <div className="bg-white px-10">
            <h2 className="text-gray-900 font-bold text-2xl py-10">How it works...</h2>
            <div className="md:flex">
                <div className="bg-white md:h-auto md:w-[434px] rounded-lg drop-shadow-xl p-4 mb-10">
                    <div className="border-2 p-2 border-gray-900 flex justify-between items-center md:w-[400px]">
                        <p className="text-gray-900 font-bold uppercase text-lg">select product</p>
                        <AiFillPlusCircle className="text-gray-900" size={32} />
                    </div>
                    <div className="flex flex-wrap py-4 gap-4">
                        <div className="h-40 md:w-48 w-full border-2 border-gray-900 bg-gray-200">

                        </div>
                        <div className="h-40 md:w-48 w-full border-2 border-gray-900 bg-gray-200">

                        </div>
                        <div className="h-40 md:w-48 w-full border-2 border-gray-900 bg-gray-200">

                        </div>
                        <div className="h-40 md:w-48 w-full border-2 border-gray-900 bg-gray-200 flex justify-center items-center">
                            <FaCircleCheck className="text-gray-900" size={64} />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col justify-start md:ml-20 md:mt-20">
                    <h3 className="text-gray-900 font-bold text-2xl ">Select</h3>
                    <p className="text-gray-900 py-4">Pick your favourite product from business <br />
                        cards, letterheads, tent cards, stickers and <br />
                        much more...
                    </p>
                    <div className="flex justify-start items-center space-x-4 mt-44">
                        <div className="bg-white cursor-pointer shadow-xl p-2 w-12 rounded-full flex justify-center items-center">
                            <IoIosArrowBack className="text-gray-900" size={28} />
                        </div>
                        <div className="flex space-x-2">
                            <p className="bg-gray-900 md:w-10 p-2 rounded-full text-white flex justify-center items-center cursor-pointer">1</p>
                            <p className="bg-gray-300 md:w-10 p-2 rounded-full text-white flex justify-center items-center cursor-pointer">2</p>
                            <p className="bg-gray-300 md:w-10 p-2 rounded-full text-white flex justify-center items-center cursor-pointer">3</p>
                            <p className="bg-gray-300 md:w-10 p-2 rounded-full text-white flex justify-center items-center cursor-pointer">4</p>
                            <p className="bg-gray-300 md:w-10 p-2 rounded-full text-white flex justify-center items-center cursor-pointer">5</p>
                        </div>
                        <div className="bg-white cursor-pointer shadow-xl p-2 w-12 rounded-full flex justify-center items-center">
                            <IoIosArrowForward className="text-gray-900" size={28} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Howitworks;

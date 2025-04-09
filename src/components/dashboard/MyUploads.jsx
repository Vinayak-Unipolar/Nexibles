import React from 'react'
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import myuploadsData from './myuploadsData';

const MyUploads = () => {
    return (
        <div>
            <div className="bg-white py-8 px-10">
                <h2 className="mb-6 font-bold text-2xl text-gray-900">My Uploads</h2>
                {/* pagination */}
                <div className="text-gray-900 flex md:justify-end items-center mb-4 space-x-2">
                    <FiChevronLeft />
                    <p className="">1 of 2</p>
                    <FiChevronRight />
                    <select name="" id="" className="border-2 border-gray-900 rounded-full md:px-6 py-2 cursor-pointer">
                        <option value="1">5 per page</option>
                        <option value="2">2 per page</option>
                        <option value="3">4 per page</option>
                    </select>
                </div>
                <div className="flex flex-wrap gap-8">
                    {myuploadsData.map ((uploads)=>
                    <div key={uploads.id}>
                    <div className="shadow-[0.2px_2px_5px_0.2px_#4a5568] h-72 w-56 rounded-lg">
                        <img src={uploads.imageUrl} alt="image" className="h-56 w-full object-cover rounded-t-lg" />
                        <div className="px-2 py-3 flex flex-col justify-center items-center">
                            <p className="text-gray-900 text-sm"><span className="font-semibold">File Name :</span> {uploads.Filename}</p>
                            <p className="text-gray-900 text-sm"><span className="font-semibold">Date of Upload :</span> {uploads.date}</p>
                        </div>
                    </div>
                    </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default MyUploads
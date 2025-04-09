"use client"
import React, { useState } from 'react';
import { RiEditBoxFill, RiFileCopyFill } from "react-icons/ri";
import { ImBin } from "react-icons/im";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import myprojectsData from "./myprojectsData";

export default function MyProjects() {

    const [projects, setProjects] = useState(myprojectsData);

    const handleDelete = (projectId) => {
        setProjects(prevProjects => prevProjects.filter(project => project.id !== projectId));
    };

    return (
        <div>
            <div className="bg-white py-8 px-10">
                <h2 className="mb-6 font-bold text-2xl text-gray-900">My Projects</h2>
                {/* pagination */}
                <div className="text-gray-900 flex justify-end items-center mb-4 space-x-2">
                    <FiChevronLeft />
                    <p className="">1 of 2</p>
                    <FiChevronRight />
                    <select name="" id="" className="border-2 border-gray-900 rounded-full px-6 py-2 cursor-pointer">
                        <option value="1">5 per page</option>
                        <option value="2">2 per page</option>
                        <option value="3">4 per page</option>
                    </select>
                </div>
                <div className="space-y-6">
                    {projects.map ((project) => (
                        <div key={project.id}>
                            <div className="w-full h-auto border border-gray-500 rounded-lg">
                                <div className="flex p-6 space-x-10">
                                    <div>
                                        <img src={project.imageUrl} alt="image" className="h-52 w-[350px] object-cover" />
                                    </div>
                                    <div>
                                        <h2 className="text-gray-900 text-xl font-bold">{project.Name}</h2>
                                        <div className="text-gray-900 text-sm">
                                            <p>Finish : {project.finish}</p>
                                            <p>Backside : {project.backside}</p>
                                            <p>Corners : {project.corners} {project.size}</p>
                                            <p>Shape : {project.shape} {project.size}</p>
                                            <p>Product Orientation : {project.orientation}</p>
                                            <p>Stock : {project.stock}</p>
                                            <p>Corners : {project.corners}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-start items-center px-6 py-4">
                                    <div className="space-x-4 flex justify-start items-center">
                                        <button className="bg-[#30384E] rounded-md text-white w-44 px-2 py-1 uppercase">add to cart</button>
                                        <p className="text-gray-900 font-bold">QTY {project.quantity} at &#8377; {project.price}</p>
                                    </div>
                                    <div className="flex items-center justify-center space-x-4 ml-16">
                                        <div className="relative flex">
                                            <p className="text-gray-900 uppercase">edit</p>
                                            <RiEditBoxFill className="text-gray-900 ml-1" size={20} />
                                        </div>
                                        <div className="relative flex">
                                            <p className="text-gray-900 uppercase">copy</p>
                                            <RiFileCopyFill className="text-gray-900 ml-1" size={20} />
                                        </div>
                                        <div className="relative flex" >
                                            <p className="text-gray-900 cursor-pointer uppercase" onClick={() => handleDelete(project.id)} >delete</p>
                                            <ImBin className="text-gray-900 cursor-pointer ml-1" size={20} onClick={() => handleDelete(project.id)} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

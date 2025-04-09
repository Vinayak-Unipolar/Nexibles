'use client'
import { useState } from 'react';

const Toolbox = ({ setSelectedComponent }) => {
    const handleComponentClick = (component) => {
        setSelectedComponent(component);
    };

    return (
        <div className="h-full w-[80px] flex flex-col items-center justify-center">
            <div className="bg-gray-300 h-full w-full flex flex-col items-center space-y-4 py-4">
                <div className="flex flex-col items-center cursor-pointer" onClick={() => handleComponentClick('Edittext')}>
                    <img src="/toolbox/text.png" alt="text" className="h-8 w-8" />
                    {/* Name */}
                    <p className="text-black text-sm">Text</p>
                </div>
                <hr className="w-full border-gray-400" />
                <div className="flex flex-col items-center cursor-pointer" onClick={() => handleComponentClick('Editimage')}>
                    <img src="/toolbox/image.png" alt="image" className="h-8 w-8" />
                    {/* Name */}
                    <p className="text-black text-sm">Image</p>
                </div>
                <hr className="w-full border-gray-400" />
                <div className="flex flex-col items-center cursor-pointer" onClick={() => handleComponentClick('Editshapes')}>
                    <img src="/toolbox/shapes.png" alt="shapes" className="h-8 w-8" />
                    {/* Name */}
                    <p className="text-black text-sm">Shapes</p>
                </div>
                <hr className="w-full border-gray-400" />
                <div className="flex flex-col items-center cursor-pointer" onClick={() => handleComponentClick('Editqr')}>
                    <img src="/toolbox/qr-code.png" alt="qr-code" className="h-8 w-8" />
                    {/* Name */}
                    <p className="text-black text-sm">QR Code</p>
                </div>
                <hr className="w-full border-gray-400" />
                <div className="flex flex-col items-center cursor-pointer" onClick={() => handleComponentClick('Edittable')}>
                    <img src="/toolbox/table.png" alt="table" className="h-8 w-8" />
                    {/* Name */}
                    <p className="text-black text-sm">Table</p>
                </div>
                <hr className="w-full border-gray-400" />
                <div className="flex flex-col items-center cursor-pointer" onClick={() => handleComponentClick('Editcolors')}>
                    <img src="/toolbox/colors.png" alt="colors" className="h-8 w-8" />
                    {/* Name */}
                    <p className="text-black text-sm">Color</p>
                </div>
                <hr className="w-full border-gray-400" />
            </div>
        </div>
    );
};

export default Toolbox;

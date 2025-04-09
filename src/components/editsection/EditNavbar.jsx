// import React, { useState } from 'react';
// import { ImUndo, ImRedo } from 'react-icons/im';
// import Link from 'next/link';
// import { LuPencilLine } from "react-icons/lu";
// import { PiFolderNotchOpenLight } from "react-icons/pi";
// import { VscCopy } from "react-icons/vsc";
// import { GoDownload, GoEye } from "react-icons/go";

// const EditNavbr = () => {
//     const [dropdownOpen, setDropdownOpen] = useState(false);

//     const toggleDropdown = () => {
//         setDropdownOpen(!dropdownOpen);
//     };

//     return (
//         <div className="h-20 bg-white border-b">
//             <div className="py-6 ml-14 flex items-center justify-between">
//                 <div className="flex">
//                     <div>
//                         <img src="/home/nexible.gif" alt="Logo" className="h-6" />
//                     </div>
//                     <div className="relative flex ml-4">
//                         <p className="text-gray-600 cursor-pointer font-semibold">My Projects</p>
//                         <p className="text-gray-600 cursor-pointer ml-4">-</p>
//                         <p className="text-gray-600 cursor-pointer ml-4" onClick={toggleDropdown}>Classic Visiting Card</p>
//                         {dropdownOpen && (
//                             <div className="absolute top-10 right-0 mt-2 bg-white border border-gray-200 rounded shadow-md z-10 text-gray-900">
//                                 <ul className="py-1">
//                                     <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center">
//                                         <PiFolderNotchOpenLight className="mr-2" />
//                                         My Projects
//                                     </li>
//                                     <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center">
//                                         <LuPencilLine className="mr-2" />
//                                         Rename
//                                     </li>
//                                     <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center">
//                                         <VscCopy className="mr-2" />
//                                         Duplicate design
//                                     </li>
//                                     <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center">
//                                         <GoDownload className="mr-2" />
//                                         Download PDF proof
//                                     </li>
//                                 </ul>
//                             </div>
//                         )}
//                         <p className="ml-2 text-gray-900">|</p>
//                         <button className="text-gray-900 ml-4">
//                             save
//                         </button>
//                         <p className="ml-2 text-gray-900">|</p>
//                         <div className="flex items-center px-4">
//                             <button className="text-gray-600 px-2 py-1 rounded-full hover:underline hover:bg-gray-200 duration-300 mr-2">
//                                 <ImUndo />
//                             </button>
//                             <button className="text-gray-600 px-2 py-1 rounded-full hover:underline hover:bg-gray-200 duration-300">
//                                 <ImRedo />
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="ml-8 flex items-center">
//                     <div className="mr-4 flex flex-col items-center cursor-pointer">
//                         <div className="text-gray-900">
//                             <GoEye />
//                         </div>
//                         <div className="text-gray-900 text-sm">
//                             <p>Preview</p>
//                         </div>
//                     </div>
//                     <Link href="/design-preview">
//                         <button className="text-white px-6 py-2 rounded-full bg-red-1 duration-300 mr-4">
//                             Next
//                         </button>
//                     </Link>

//                 </div>
//             </div>
//         </div>
//     );
// };

// export default EditNavbr;
import Link from "next/link"

export default function EditNavbr() {
    return (
        <div>
            <div className="h-20 bg-white border-b border-gray-400">
                <div className="py-6 ml-14 flex items-center justify-between">
                    <Link href="/" className="">
                        <img src="/home/nexible.gif" alt="Logo" className="h-7" />
                    </Link>
                </div>
            </div>
        </div>
    )
}

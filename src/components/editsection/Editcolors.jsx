// const Editcolors = () => {
//     return(
//         <div className="h-auto bg-gray-200 flex justify-start items-center px-4">
//             <div className="w-[360px] h-[450px] overflow-y-auto bg-white shadow-2xl p-6 rounded-lg">
//                 <h3 className="text-black text-2xl font-semibold">Template Colors</h3>
//             </div>
//         </div>
//     )
// }
// export default Editcolors;

// Editcolors.jsx

import React from 'react';
// import { ChromePicker } from 'react-color';

const Editcolors = ({ drawingColor, onColorChange }) => {
  return (
    <div className="">
      {/* <div className="w-[300px] h-[500px] overflow-y-auto bg-white p-6">
        <h3 className="text-black text-2xl font-semibold">Template Colors</h3>
        <ChromePicker color={drawingColor} onChange={onColorChange} />
      </div> */}
    </div>
  );
};

export default Editcolors;
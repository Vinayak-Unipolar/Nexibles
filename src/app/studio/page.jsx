// 'use client'
// import { useState, useEffect } from 'react';
// import Editpage from '@/components/editsection/Editpage';
// import Edittext from '@/components/editsection/Edittext';
// import Toolbox from '@/components/editsection/Toolbox';
// import Editimage from '@/components/editsection/Editimage';
// import Editshapes from '@/components/editsection/Editshapes';
// import Editqrcode from '@/components/editsection/Editqr';
// import Edittables from '@/components/editsection/Edittable';
// import Editcolors from '@/components/editsection/Editcolors';
// import EditNavbar from '@/components/editsection/EditNavbar';
// import Editfeatures from '@/components/editsection/Editfeatures';
// import { useTextInput } from '@/utils/TextInputProvider';


// const App = () => {
//   const [selectedComponent, setSelectedComponent] = useState('Edittext'); // Set 'Edittext' as the default selected component
//   const [inputBoxes, setInputBoxes] = useState([]);
//   const [images,setImages]= useState([]);
//   const [drawingColor, setDrawingColor] = useState('#ffffff');

//   const addInputBox = (label) => {
//     const newBox = {
//       x: 50,
//       y: 50,
//       width: 200,
//       height: 50,
//       color: '#FFFF00',
//       text: label,
//       fontSize: 16,
//     };
//     setInputBoxes((prevBoxes) => [...prevBoxes, newBox]);
//   };


//   const handleInputChange = (index, value) => {
//     const updatedBoxes = [...inputBoxes];
//     updatedBoxes[index].text = value;
//     setInputBoxes(updatedBoxes);
//   };


//   useEffect(() => {
//     setInputBoxes(inputBoxes);
//   }, [inputBoxes]);

//   const handleColorChange = (color) => {
//     setDrawingColor(color.hex);
//   };

//   const addImage = (file) => {
//     const newImage = {
//       img: new Image(),
//       x: 200,
//       y: 200,
//       width: 100,
//       height: 100,
//     };
//     newImage.img.src = URL.createObjectURL(file);
//     setImages((prevImages) => [...prevImages, newImage]);
//   };



//   return (
//     <>
//       <EditNavbar />
//       <div className="flex bg-gray-200 h-screen py-12">
//         <Toolbox setSelectedComponent={setSelectedComponent} />
//         <div>
//           {selectedComponent === 'Edittext' && <Edittext addInputBox={addInputBox} inputBoxes={inputBoxes} setInputBoxes={setInputBoxes} handleInputChange={handleInputChange} />}
//           {selectedComponent === 'Editimage' && <Editimage addImage={addImage}/>}
//           {selectedComponent === 'Editshapes' && <Editshapes />}
//           {selectedComponent === 'Editqr' && <Editqrcode />}
//           {selectedComponent === 'Edittable' && <Edittables />}
//           {selectedComponent === 'Editcolors' && <Editcolors drawingColor={drawingColor} onColorChange={handleColorChange} />}
//         </div>
//         <div className="mx-12">
//           <Editpage inputBoxes={inputBoxes} setInputBoxes={setInputBoxes}  images={images} drawingColor={drawingColor} handleColorChange={handleColorChange}  handleInputChange={handleInputChange} />
//         </div>
//       </div>
//     </>
//   );
// };

// export default App;



'use client'
import { useState, useEffect } from 'react';
import Editpage from '@/components/editsection/Editpage';
import Edittext from '@/components/editsection/Edittext';
import Toolbox from '@/components/editsection/Toolbox';
import Editimage from '@/components/editsection/Editimage';
import Editshapes from '@/components/editsection/Editshapes';
import Editqrcode from '@/components/editsection/Editqr';
import Edittables from '@/components/editsection/Edittable';
import Editcolors from '@/components/editsection/Editcolors';
import EditNavbar from '@/components/editsection/EditNavbar';
import Editfeatures from '@/components/editsection/Editfeatures';
import { useTextInput } from '@/utils/TextInputProvider';
import FrontBackView from '@/components/editsection/FrontBackView';
import PreviewDesign from '@/components/editsection/PreviewDesign';

export default function App() {
  const [selectedComponent, setSelectedComponent] = useState('Edittext');
  const [inputBoxes, setInputBoxes] = useState([]);
  const [images, setImages] = useState([]);
  const [drawingColor, setDrawingColor] = useState('#ffffff');
  const [showPreview, setShowPreview] = useState(false);

  const handlePreviewClick = (e) => {
    e.preventDefault();
    setShowPreview(true);
  };

  const addInputBox = (label) => {
    const newBox = {
      x: 50,
      y: 50,
      width: 200,
      height: 50,
      color: '#FFFF00',
      text: label,
      fontSize: 16,
    };
    setInputBoxes((prevBoxes) => [...prevBoxes, newBox]);
  };

  const handleInputChange = (index, value) => {
    const updatedBoxes = [...inputBoxes];
    updatedBoxes[index].text = value;
    setInputBoxes(updatedBoxes);
  };

  useEffect(() => {
    setInputBoxes(inputBoxes);
  }, [inputBoxes]);

  const handleColorChange = (color) => {
    setDrawingColor(color.hex);
  };

  const addImage = (file) => {
    const newImage = {
      img: new Image(),
      x: 200,
      y: 200,
      width: 100,
      height: 100,
    };
    newImage.img.src = URL.createObjectURL(file);
    setImages((prevImages) => [...prevImages, newImage]);
  };
   useEffect(()=>{
    console.log("handlclick",handlePreviewClick);
   })
  return (
    <div>
      {showPreview && <PreviewDesign setShowPreview={setShowPreview}/>}
      <EditNavbar />
      <div className="bg-gray-200 h-screen flex">
        <div>
          <Toolbox setSelectedComponent={setSelectedComponent} />
        </div>
        <div className="w-full">
          <Editfeatures selectedComponent={selectedComponent} onPreviewClick={handlePreviewClick} />
          <div className="flex">
            <div className="mr-16">
              {selectedComponent === 'Edittext' && (
                <Edittext
                  addInputBox={addInputBox}
                  inputBoxes={inputBoxes}
                  setInputBoxes={setInputBoxes}
                  handleInputChange={handleInputChange}
                />
              )}
              {selectedComponent === 'Editimage' && (
                <Editimage addImage={addImage} />
              )}
              {selectedComponent === 'Editshapes' && <Editshapes />}
              {selectedComponent === 'Editqr' && <Editqrcode />}
              {selectedComponent === 'Edittable' && <Edittables />}
              {selectedComponent === 'Editcolors' && (
                <Editcolors
                  drawingColor={drawingColor}
                  onColorChange={handleColorChange}
                />
              )}
            </div>
            <div className="flex space-x-4 mt-8">
              <Editpage
                inputBoxes={inputBoxes}
                setInputBoxes={setInputBoxes}
                images={images}
                drawingColor={drawingColor}
                handleColorChange={handleColorChange}
                handleInputChange={handleInputChange}
              />
              <FrontBackView />
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}

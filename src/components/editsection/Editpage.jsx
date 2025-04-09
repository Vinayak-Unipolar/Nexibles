'use client'
import React, { useRef, useEffect, useState } from 'react';
// import { Rnd } from 'react-rnd';
// import { ChromePicker } from 'react-color';
// import 'react-quill/dist/quill.snow.css';
const Editpage = ({ inputBoxes, setInputBoxes, images, drawingColor, handleColorChange, handleInputChange }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const borderMargin = 10; // Adjust the margin as needed
    const borderWidth = canvas.width - 2 * borderMargin;
    const borderHeight = canvas.height - 2 * borderMargin;
    const innerMargin = 5; // Adjust the inner margin as needed

    // Clear canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Fill canvas background
    context.fillStyle = 'white'; // Background color
    context.fillRect(0, 0, canvas.width, canvas.height); // Fill canvas with background color

    // Draw border-like shape with dotted border and inner margin
    context.strokeStyle = 'black'; // Border color
    context.lineWidth = 2; // Border width
    context.setLineDash([5, 5]); // Set dash pattern (5px on, 5px off)
    context.strokeRect(borderMargin + innerMargin, borderMargin + innerMargin, borderWidth - 2 * innerMargin, borderHeight - 2 * innerMargin); // Draw rectangle

    // Reset dash pattern to default
    context.setLineDash([]);

    // Fill inner rectangle with drawing color
    context.fillStyle = drawingColor;
    context.fillRect(borderMargin + innerMargin + 2, borderMargin + innerMargin + 2, borderWidth - 2 * innerMargin - 4, borderHeight - 2 * innerMargin - 4);
  }, [drawingColor, images, inputBoxes]);

  return (
    <>
      {/* <div className="py-6">
        <canvas
          ref={canvasRef}
          width={700}
          height={400}
          style={{ border: '2px solid skyblue', backgroundColor: 'white' }}
        ></canvas>

        {images.map((image, index) => (
          <Rnd
            key={index}
            default={{
              x: image.x,
              y: image.y,
              width: image.width,
              height: image.height,
            }}
            bounds="parent"
          >
            <img src={image.img.src} alt={`image-${index}`} style={{ width: '100%', height: '100%' }} />
          </Rnd>
        ))}
        {inputBoxes.map((box, index) => (
          <Rnd
            key={index}
            default={{
              x: box.x,
              y: box.y,
              width: box.width,
              height: box.height,
            }}
            bounds="parent"
            onResize={(e, direction, ref, delta, position) => {
              const newSize = Math.max(ref.offsetWidth, 100);
              const newFontSize = (newSize / 200) * 16;
              ref.querySelector('input').style.fontSize = `${newFontSize}px`;
            }}

          >
            <div>
              <input
                type="text"
                value={box.text}
                onChange={(e) => handleInputChange(index, e.target.value)}
                className={`p-2 w-full h-full z-50 text-black bg-transparent outline-none border-2 ${box.isFocused ? 'border-dashed border-2 border-sky-500' : 'border-transparent'
                  }`}
                style={{
                  fontSize: '16px',
                  overflow: 'hidden',
                }}
                onFocus={() => {
                  const updatedBoxes = [...inputBoxes];
                  updatedBoxes[index].isFocused = true;
                  setInputBoxes(updatedBoxes);
                }}
                onBlur={() => {
                  const updatedBoxes = [...inputBoxes];
                  updatedBoxes[index].isFocused = false;
                  setInputBoxes(updatedBoxes);
                }}
              />
            </div>
          </Rnd>
        ))}

      </div> */}
    </>
  );
};

export default Editpage;
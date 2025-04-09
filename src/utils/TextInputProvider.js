'use client'
import React, { createContext, useContext, useState } from 'react';

const TextInputContext = createContext();

export const useTextInput = () => useContext(TextInputContext);

export const TextInputProvider = ({ children }) => {
  const [inputBoxes, setInputBoxes] = useState([]);

  const addInputBox = (label) => {
    const newBox = {
      x: 50,
      y: 50,
      color: '#FFFFFF',
      text: label,
      fontSize: 16,
    };
    setInputBoxes((prevBoxes) => [...prevBoxes, newBox]);
  };

  return (
    <TextInputContext.Provider value={{ inputBoxes, setInputBoxes, addInputBox }}>
      {children}
    </TextInputContext.Provider>
  );
};



'use client'
import React, { useState, useEffect } from "react";
import { MdDeleteOutline } from "react-icons/md";

const Edittext = ({ addInputBox, inputBoxes, handleInputChange, setInputBoxes }) => {
    const [fields, setFields] = useState([]);

    const addNewField = (event) => {
        event.preventDefault();
        const newField = {
            id: fields.length + 1,
            label: `Field ${fields.length + 1}`,
        };
        setFields([...fields, newField]);
        addInputBox(newField.label); // Call addInputBox function passed from props with the new field label
    };
    useEffect(() => {
    }, [inputBoxes]);

    const deleteField = (index) => {
        const updatedBoxes = inputBoxes.filter((box, i) => i !== index);
        setInputBoxes(updatedBoxes);
    };

    return (
        <div className="">
            <div className="w-[300px] h-[500px] overflow-y-auto bg-white p-6">
                <h3 className="text-black text-2xl font-semibold">Text</h3>
                <p className="text-black mb-4">
                    Edit your text below or click on the field you like to edit directly on your design.
                </p>
                <form className="space-y-7">
                    <div className="flex flex-col">
                        {inputBoxes.map((box, index) => (
                            <div key={index} className="relative mb-2">
                                <input
                                    type="text"
                                    value={box.text}
                                    onChange={(e) => handleInputChange(index, e.target.value)}
                                    className={`p-2 w-full h-full z-50 text-black bg-transparent outline-none border border-gray-500`}
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
                                <div className="absolute right-0 top-0 bottom-0 flex items-center pr-2">
                                    <MdDeleteOutline
                                        className="text-gray-900 cursor-pointer"
                                        onClick={() => deleteField(index)}
                                    />
                                </div>
                            </div>
                        ))}
                        <button className="bg-[#30384E] rounded-md text-white px-4 py-2 mt-4" onClick={addNewField}>
                            New Text Field
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Edittext;

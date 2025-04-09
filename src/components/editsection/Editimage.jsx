import React, { useState } from 'react';

const Editimage = ({ addImage }) => {
    const [selectedImage, setSelectedImage] = useState(null);

    const handleFileUpload = () => {
        const fileInput = document.getElementById('fileInput');
        fileInput.click();
    };

    const handleFileSelected = event => {
        const fileList = event.target.files;
        const selectedFile = fileList[0];
        if (selectedFile) {
            addImage(selectedFile);
        }
    };

    return (
        <div className="">
            <div className="w-[300px] h-[500px] overflow-y-auto bg-white p-6">
                <h3 className="text-black text-2xl font-semibold">Images</h3>
                <div className="flex justify-around mt-4">
                    <p className="text-black cursor-pointer" onClick={handleFileUpload}>
                        Upload
                    </p>
                    <input
                        type="file"
                        id="fileInput"
                        onChange={handleFileSelected}
                        style={{ display: 'none' }}
                        accept=".jpg,.jpeg,.jfif,.bmp,.png,.gif,.heic,.svg,.pdf,.psd,.ai,.eps,.ait,.ppt,.pptx,.tif,.tiff"
                    />
                    <p className="text-black cursor-pointer">Browse</p>
                </div>
                <br />
                <hr />
                <h3 className="text-black py-2 font-semibold">Accepted formats</h3>
                <p className="text-black">
                    .jpg, .jpeg, .jfif, .bmp, .png, .gif, .heic, .svg, .pdf, .psd, .ai, .eps, .ait, .ppt, .pptx, .tif,
                    .tiff
                </p>
                <br />
                <div className="justify-center items-center flex flex-col">
                    <button className="bg-[#30384E] rounded-md text-white px-8 py-2" onClick={handleFileUpload}>
                        Upload Logo or Image
                    </button>
                    <br />
                    <hr />
                    {selectedImage && (
                        <div>
                            <h4 className="text-black font-semibold">Selected Image Preview:</h4>
                            <img src={selectedImage} alt="Selected" className="mt-2 max-w-[200px] max-h-[200px]" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Editimage;

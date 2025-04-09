import { useState, useRef } from 'react';
import QRCode from 'qrcode.react';

const Editqrcode = () => {
    const [url, setUrl] = useState('');
    const [qrCodeValue, setQrCodeValue] = useState('');
    const [isValidUrl, setIsValidUrl] = useState(false);
    const qrCodeRef = useRef(null);

    const handleInputChange = (event) => {
        const inputUrl = event.target.value;
        setUrl(inputUrl);
        const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
        setIsValidUrl(urlRegex.test(inputUrl));
    };

    const generateQRCode = () => {
        setQrCodeValue(url);
    };

    const downloadQRCode = () => {
        const canvas = qrCodeRef.current.children[0];
        const pngUrl = canvas.toDataURL('image/png');

        const downloadLink = document.createElement('a');
        downloadLink.href = pngUrl;
        downloadLink.download = 'QRCode.png';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

    return (
        <div className="">
            <div className="w-[300px] h-[500px] overflow-y-auto bg-white p-6">
                <h3 className="text-black text-2xl font-semibold">QR Code</h3>
                <p className="text-gray-500 text-sm mt-4">Enter a valid URL and click the Generate button.</p>
                <input
                    type="text"
                    value={url}
                    onChange={handleInputChange}
                    placeholder="Enter URL"
                    className="border border-gray-500 rounded-md px-8 py-2 mt-2 text-black outline-none"
                />
                <div className="mt-4 ml-2">
                    <button
                        onClick={generateQRCode}
                        className={`bg-[#30384E] rounded-md text-white px-6 py-2 mt-2 w-full ${
                            !isValidUrl ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                        disabled={!isValidUrl}
                    >
                        Generate
                    </button>
                    <button
                        onClick={downloadQRCode}
                        className={`bg-[#30384E] rounded-md text-white px-6 py-2 mt-2 w-full ${
                            !qrCodeValue ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                        disabled={!qrCodeValue}
                    >
                        Download
                    </button>
                </div>
                {qrCodeValue && (
                    <div className="mt-4" ref={qrCodeRef}>
                        <QRCode value={qrCodeValue} />
                    </div>
                )}
                {!isValidUrl && (
                    <p className="text-red-500 text-sm mt-2">Please enter a valid URL.</p>
                )}
            </div>
        </div>
    );
};

export default Editqrcode;

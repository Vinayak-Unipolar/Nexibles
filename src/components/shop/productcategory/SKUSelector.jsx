import React from 'react';
import { IoShareSocial } from "react-icons/io5";
export default function SKUSelector({
    selectedSKU,
    setSelectedSKU,
    numberOfSKUs,
    selectedQuantity,
    minimumQuantity,
    handleAddToCart
}) {
    const handleSKUChange = (e) => {
        setSelectedSKU(parseInt(e.target.value, 10));
    };

    // Function to handle sharing
    const handleShare = async () => {
        const shareData = {
            title: 'Check out this product!',
            text: 'I found an awesome product I think you’ll like.',
            url: window.location.href, // Current page URL
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
                console.log('Product shared successfully!');
            } else {
                alert('Share functionality is not supported in your browser. Copy the URL manually: ' + window.location.href);
            }
        } catch (error) {
            console.error('Error sharing:', error);
        }
    };

    return (
        <div className="mt-3">
            <label htmlFor="skuSelect" className="block text-sm font-medium text-black mb-1">
                SKUs:
            </label>
            <div className="md:flex w-full items-center">
                <div className="md:w-1/6 md:pr-1 md:pb-0 pb-2">
                    <select
                        id="skuSelect"
                        value={selectedSKU}
                        onChange={handleSKUChange}
                        className="w-full p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-sm bg-gray-200 h-10"
                        disabled={numberOfSKUs < 1}
                    >
                        {Array.from({ length: numberOfSKUs }, (_, index) => (
                            <option key={index + 1} value={index + 1}>
                                {index + 1}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="md:w-1/2 md:pl-1">
                    {(parseInt(selectedQuantity, 10) || 0) >= minimumQuantity ? (
                        <button
                            onClick={handleAddToCart}
                            className="w-full md:w-auto bg-white hover:bg-[#252b3d] rounded-md border border-black px-4 py-2 text-black font-medium transition-all duration-200 shadow-sm hover:shadow flex items-center justify-center gap-2 h-10"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="shrink-0"
                            >
                                <circle cx="9" cy="21" r="1"></circle>
                                <circle cx="20" cy="21" r="1"></circle>
                                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                            </svg>
                            Add to Cart
                        </button>
                    ) : (
                        <button
                            onClick={handleAddToCart}
                            className="w-full md:w-auto bg-[#30384E] hover:bg-[#252b3d] rounded-md px-4 py-2 text-white font-medium transition-all duration-200 shadow-sm hover:shadow flex items-center justify-center gap-2 h-10"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="shrink-0"
                            >
                                <circle cx="9" cy="21" r="1"></circle>
                                <circle cx="20" cy="21" r="1"></circle>
                                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                            </svg>
                            Add to Cart
                        </button>
                    )}
                </div>
            </div>
            {/* Add Share Button */}
            <div className="mt-2 text-center md:text-left">
    <button
        onClick={handleShare}
        className="inline-flex items-center gap-2 text-sm text-black hover:text-[#252b3d] transition-all duration-200"
    >
        <IoShareSocial size={35} className='border border-gray-300 rounded-lg p-2' />
        Share Products
    </button>
</div>
        </div>
    );
}
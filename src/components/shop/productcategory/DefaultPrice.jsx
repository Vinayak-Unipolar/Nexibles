import React from 'react';

const PriceDisplay = ({ price, quantity, setQuantity }) => {
  return (
    <div className="flex items-center justify-between border border-gray-300 rounded-lg px-4 py-2">
      <span className="text-lg font-semibold">₹{price.toFixed(2)}</span>
      <div className="flex items-center">
        <button
          className="px-2 py-1 bg-gray-200 rounded-l"
          onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
        >
          -
        </button>
        <span className="px-4 py-1 bg-gray-100">{quantity}</span>
        <button
          className="px-2 py-1 bg-gray-200 rounded-r"
          onClick={() => setQuantity(prev => prev + 1)}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default PriceDisplay;
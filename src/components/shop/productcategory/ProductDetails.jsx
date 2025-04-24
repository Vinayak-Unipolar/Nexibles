import React from 'react';

const ProductDetails = ({ 
  minimumQuantity,
  priceAfterCalculation,
  handleQuantityInputChange,
  selectedQuantity,
  debouncedIncrease,
  debouncedDecrease,
  productDetails,
  name, 
  description, 
  material,
  productPrice 
}) => {
  return (
    <div className="relative z-20">
      <div className="md:h-auto">
        {/* Product Title */}
        <h2 className="text-gray-900 text-xl md:text-2xl font-bold tracking-tight">
          {name}
        </h2>
        
        {/* Price and Quantity Section */}
        <div className="mt-6">
          {productPrice !== null || productDetails.product.price ? (
            <div className="space-y-4 mb-6">
              {/* Price calculation section */}
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <div className="flex items-center space-x-2">
                  <span className="text-base md:text-lg font-semibold text-gray-800">
                    ₹{productPrice || productDetails.product.price}
                  </span>
                  <span className="text-gray-500 text-base md:text-lg">
                    ×
                  </span>
                </div>
                
                {/* Quantity selector */}
                <div className="flex items-center rounded-md border border-gray-300 bg-white shadow-sm">
                  <button
                    onClick={debouncedDecrease}
                    className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors rounded-l-md disabled:opacity-40 disabled:cursor-not-allowed"
                    disabled={parseInt(selectedQuantity || 0, 10) <= 1}
                    aria-label="Decrease quantity"
                  >
                    <span className="text-lg md:text-xl font-medium">−</span>
                  </button>
                  <input
                    type="text"
                    value={selectedQuantity}
                    onChange={handleQuantityInputChange}
                    className="w-14 h-10 text-center border-none focus:outline-none text-gray-800 font-medium"
                    aria-label="Quantity"
                  />
                  <button
                    onClick={debouncedIncrease}
                    className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors rounded-r-md"
                    aria-label="Increase quantity"
                  >
                    <span className="text-lg md:text-xl font-medium">+</span>
                  </button>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className="text-gray-500 text-base md:text-lg">
                    =
                  </span>
                  <span className="text-lg md:text-xl font-bold text-gray-900">
                    ₹{priceAfterCalculation}
                  </span>
                </div>
              </div>
              
              {/* Minimum quantity note */}
              <div className="flex items-center">
                <span className="text-gray-500 text-sm">
                  Minimum Quantity: <span className="font-medium">{minimumQuantity}</span>
                </span>
              </div>
            </div>
          ) : null}
        </div>

        {/* Product Material and Description */}
        <div className="space-y-6">
          <div className="flex items-center">
            <span className="text-gray-700 font-medium mr-2">Material:</span>
            <span className="text-gray-800">{material}</span>
          </div>
          
          <div className="border-t border-gray-200 pt-4">
            <div 
              className="prose text-sm text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
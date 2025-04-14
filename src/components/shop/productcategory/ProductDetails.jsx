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
        <h2 className="text-gray-900 text-xl font-bold">
          {name}
        </h2>
        
        <div className="mt-4 md:mt-6">
          {productPrice !== null || productDetails.product.price ? (
            <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-4 md:mb-6">
              <span className="text-base md:text-lg font-semibold text-gray-800">
                ₹{productPrice || productDetails.product.price}
              </span>
              <span className="text-gray-500 text-base md:text-lg">
                ×
              </span>
              <div className="flex items-center rounded-md border border-gray-200 bg-white shadow-sm">
                <button
                  onClick={debouncedDecrease}
                  className="w-8 md:w-9 h-8 md:h-9 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors rounded-l-md disabled:opacity-40 disabled:cursor-not-allowed"
                  disabled={parseInt(selectedQuantity || 0, 10) <= 1}
                >
                  <span className="text-lg md:text-xl font-medium">-</span>
                </button>
                <input
                  type="text"
                  value={selectedQuantity}
                  onChange={handleQuantityInputChange}
                  className="w-12 md:w-16 h-8 md:h-9 text-center border-none focus:outline-none text-gray-800 font-medium"
                />
                <button
                  onClick={debouncedIncrease}
                  className="w-8 md:w-9 h-8 md:h-9 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors rounded-r-md"
                >
                  <span className="text-lg md:text-xl font-medium">+</span>
                </button>
              </div>
              <span className="text-gray-500 text-base md:text-lg mx-1 md:mx-2">
                =
              </span>
              <span className="text-base md:text-lg font-bold text-gray-900">
                ₹{priceAfterCalculation}
              </span>
              <span className="text-gray-400 text-xs w-full md:w-auto md:ml-2">
                (Minimum Quantity: {minimumQuantity})
              </span>
            </div>
          ) : null}
        </div>

        <h3 className='text-gray-900 text-sm md:mt-2'>
          Material: {material}
        </h3>
        
        <p 
          className="prose prose-custom-description text-sm md:mt-2"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>
    </div>
  );
};

export default ProductDetails;
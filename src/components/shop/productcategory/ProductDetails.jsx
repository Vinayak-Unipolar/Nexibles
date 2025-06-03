import React from 'react';

const renderStars = (rating) => {
  const stars = [];
  const fullStars = Math.floor(rating); // Full stars (e.g., 4 for 4.8)
  const decimalPart = rating % 1; // Decimal part (e.g., 0.8 for 4.8)



  // Loop through 5 stars
  for (let i = 1; i <= 5; i++) {
    let starStyle = 'text-gray-300'; // Default: empty star
    let clipPath = ''; // For half-filled stars

    if (i <= fullStars) {
      // Full star
      starStyle = 'text-yellow-400';
    } else if (i === fullStars + 1 && decimalPart >= 0.3) {
      // Half star or partial fill
      starStyle = 'text-yellow-400';
      const percentage = decimalPart * 100; // e.g., 0.8 -> 80%
      clipPath = `inset(0 ${100 - percentage}% 0 0)`; // Clip the right side
    }

    stars.push(
      <span
        key={i}
        className={`text-lg ${starStyle}`}
        style={{ clipPath }}
        aria-label={`${i <= rating ? 'filled' : 'empty'} star`}
      >
        ★
      </span>
    );
  }

  return <div className="flex">{stars}</div>;
};


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
  productPrice,
  ratingData = { rating: 4.8, reviewsCount: 156 } // Default prop for ratingData
}) => {


  const { rating = 0, reviewsCount = 0 } = ratingData || {};

  const handleIncrease = () => {
    const newQuantity = parseInt(selectedQuantity || 500, 10) + 500;
    handleQuantityInputChange({ target: { value: newQuantity.toString() } });
  };

  const handleDecrease = () => {
    const newQuantity = parseInt(selectedQuantity || 500, 10) - 500;
    if (newQuantity >= 500) {
      handleQuantityInputChange({ target: { value: newQuantity.toString() } });
    }
  };

  return (
    <div className="relative z-20">
      <div className="md:h-auto">
        {/* Product Title */}
        <h2 className="text-gray-900 text-xl md:text-2xl font-bold tracking-tight">
          {name}
        </h2>
        <div
          className="prose text-sm text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: description }}
        />

        <div className="flex items-center gap-2 mt-4">
          {rating > 0 ? (
            <>
              <div className="flex text-yellow-400 text-lg">
                {renderStars(rating)}
              </div>
              <span className="text-gray-800 font-semibold">
                {rating.toFixed(1)} ({reviewsCount} reviews)
              </span>
            </>
          ) : (
            <span className="text-gray-600 text-sm">No reviews yet</span>
          )}
        </div>


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
                    onClick={handleDecrease}
                    className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors rounded-l-md disabled:opacity-40 disabled:cursor-not-allowed"
                    disabled={parseInt(selectedQuantity || 500, 10) <= 500} 
                    aria-label="Decrease quantity"
                  >
                    <span className="text-lg md:text-xl font-medium">−</span>
                  </button>
                  <input
                    type="text"
                    value={selectedQuantity}
                    onChange={handleQuantityInputChange}
                    disabled
                    className="w-14 h-10 text-center border-none focus:outline-none text-gray-800 font-medium"
                    aria-label="Quantity"
                  />
                  <button
                    onClick={handleIncrease}
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

         
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
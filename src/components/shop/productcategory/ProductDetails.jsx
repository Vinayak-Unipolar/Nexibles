import React, { useState } from 'react';
import { ShoppingCart, Clock, Box } from 'lucide-react';

const renderStars = (rating) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const decimalPart = rating % 1;

  for (let i = 1; i <= 5; i++) {
    let starStyle = 'text-gray-300';
    let clipPath = '';

    if (i <= fullStars) {
      starStyle = 'text-yellow-400';
    } else if (i === fullStars + 1 && decimalPart >= 0.3) {
      starStyle = 'text-yellow-400';
      const percentage = decimalPart * 100;
      clipPath = `inset(0 ${100 - percentage}% 0 0)`;
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
  ratingData = { rating: 4.8, reviewsCount: 156 }
}) => {
  const { rating = 0, reviewsCount = 0 } = ratingData || {};
  const [selectedMaterial, setSelectedMaterial] = useState('PET/AL/PE (High Barrier)');
  const [selectedFinish, setSelectedFinish] = useState('Glossy');
  const [selectedPrintType, setSelectedPrintType] = useState('Digital');
  const [selectedSize, setSelectedSize] = useState('Medium (250g)');
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const materials = [
    'PET/AL/PE (High Barrier)',
    'PET/METPET/PE (Medium Barrier)',
    'PET/PE (Standard)',
    'PAPER/PE (Eco-friendly)',
    'Biodegradable Film',
  ];

  const finishes = ['Glossy', 'Matte', 'Soft-touch'];
  const printTypes = ['Digital', 'Flexographic', 'Rotogravure'];
  const sizes = ['Small (100g)', 'Medium (250g)', 'Large (500g)', 'Extra Large (1kg)', 'Custom Size'];
  const quantities = [500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000];

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleQuantitySelect = (quantity) => {
    handleQuantityInputChange({ target: { value: quantity.toString() } });
    setIsPopupOpen(false);
  };

  return (
    <div className="relative z-20">
      <div className="md:h-auto">
        <h2 className="text-gray-900 text-xl md:text-3xl font-bold tracking-tight">{name}</h2>
        <div
          className="prose text-sm text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: description }}
        />
        <div className="flex items-center gap-2 mt-4">
          {rating > 0 ? (
            <>
              <div className="flex text-yellow-400 text-lg">{renderStars(rating)}</div>
              <span className="text-gray-800 font-semibold">
                {rating.toFixed(1)} ({reviewsCount} reviews)
              </span>
            </>
          ) : (
            <span className="text-gray-600 text-sm">No reviews yet</span>
          )}
        </div>
        <div className="flex flex-row items-center gap-40">
          <div className="flex items-center gap-2">
            <Box className="w-6 h-6 text-yellow-400" />
            <span className="text-gray-500 text-sm">
              MOQ: <span className="font-medium">{minimumQuantity}</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-yellow-200 flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-400" />
            </div>
            <div>
              <div className="text-sm text-gray-500">Lead Time</div>
              <div className="font-semibold text-gray-900">7-10 business days</div>
            </div>
          </div>
        </div>


        
                <div className="">
            {productPrice !== null || productDetails.product.price ? (
              <div className="space-y-4 mb-6">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                  <div className="relative flex flex-col justify-center items-center">
                    <span className="text-sm">Select Quantity</span>
                    <button
                      onClick={togglePopup}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
                    >
                      Quantity: {selectedQuantity || minimumQuantity}
                    </button>
                    {isPopupOpen && (
                      <div className="absolute z-30 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg p-4">
                        <h4 className="text-gray-900 font-semibold mb-2">Select Quantity</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {quantities.map((quantity) => (
                            <label key={quantity} className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                checked={parseInt(selectedQuantity) === quantity}
                                onChange={() => handleQuantitySelect(quantity)}
                                className="h-4 w-4 text-blue-950 focus:ring-blue-950 border-gray-300 rounded"
                              />
                              <span className="text-gray-700">{quantity}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  {/* Price and "per unit" placed to the right of quantity */}
                  <div className="flex items-end pt-5 space-x-2">
                    <span className="text-base md:text-lg font-semibold text-gray-800">
                      ₹{productPrice || productDetails.product.price}
                    </span>
                    <span className="text-black text-base md:text-lg">per unit</span>
                  </div>
                </div>
              </div>
            ) : null}
          </div>




        <div className="space-y-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-gray-900 text-lg font-semibold mb-2">Material</h3>
              <div className="flex flex-wrap gap-2">
                {materials.map((material) => (
                  <button
                    key={material}
                    onClick={() => setSelectedMaterial(material)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedMaterial === material
                        ? 'bg-blue-950 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {material}
                  </button>
                ))}
              </div>
            </div>
            <div className="md:flex">
              <div>
                <h3 className="text-gray-900 text-lg font-semibold mb-2">Finish</h3>
                <div className="flex flex-wrap gap-2">
                  {finishes.map((finish) => (
                    <button
                      key={finish}
                      onClick={() => setSelectedFinish(finish)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        selectedFinish === finish
                          ? 'bg-blue-950 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {finish}
                    </button>
                  ))}
                </div>
              </div>
              <div className="md:ml-6">
                <h3 className="text-gray-900 text-lg font-semibold mb-2 mt-2 md:mt-0">Print Type</h3>
                <div className="flex flex-wrap gap-2">
                  {printTypes.map((printType) => (
                    <button
                      key={printType}
                      onClick={() => setSelectedPrintType(printType)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        selectedPrintType === printType
                          ? 'bg-blue-950 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {printType}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-gray-900 text-lg font-semibold mb-2">Size</h3>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedSize === size
                        ? 'bg-blue-950 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;









// import React, { useState } from 'react';
// import { ShoppingCart, Clock, Box } from 'lucide-react';

// const renderStars = (rating) => {
//   const stars = [];
//   const fullStars = Math.floor(rating); // Full stars (e.g., 4 for 4.8)
//   const decimalPart = rating % 1; // Decimal part (e.g., 0.8 for 4.8)

//   // Loop through 5 stars
//   for (let i = 1; i <= 5; i++) {
//     let starStyle = 'text-gray-300'; // Default: empty star
//     let clipPath = ''; // For half-filled stars

//     if (i <= fullStars) {
//       // Full star
//       starStyle = 'text-yellow-400';
//     } else if (i === fullStars + 1 && decimalPart >= 0.3) {
//       // Half star or partial fill
//       starStyle = 'text-yellow-400';
//       const percentage = decimalPart * 100; // e.g., 0.8 -> 80%
//       clipPath = `inset(0 ${100 - percentage}% 0 0)`; // Clip the right side
//     }

//     stars.push(
//       <span
//         key={i}
//         className={`text-lg ${starStyle}`}
//         style={{ clipPath }}
//         aria-label={`${i <= rating ? 'filled' : 'empty'} star`}
//       >
//         ★
//       </span>
//     );
//   }

//   return <div className="flex">{stars}</div>;
// };

// const ProductDetails = ({
//   minimumQuantity,
//   priceAfterCalculation,
//   handleQuantityInputChange,
//   selectedQuantity,
//   debouncedIncrease,
//   debouncedDecrease,
//   productDetails,
//   name,
//   description,
//   material,
//   productPrice,
//   ratingData = { rating: 4.8, reviewsCount: 156 } // Default prop for ratingData
// }) => {
//   const { rating = 0, reviewsCount = 0 } = ratingData || {};

//   // State for product variants
//   const [selectedMaterial, setSelectedMaterial] = useState('PET/AL/PE (High Barrier)');
//   const [selectedFinish, setSelectedFinish] = useState('Glossy');
//   const [selectedPrintType, setSelectedPrintType] = useState('Digital');
//   const [selectedSize, setSelectedSize] = useState('Medium (250g)');

//   // Dummy data for variant options
//   const materials = [
//     'PET/AL/PE (High Barrier)',
//     'PET/METPET/PE (Medium Barrier)',
//     'PET/PE (Standard)',
//     'PAPER/PE (Eco-friendly)',
//     'Biodegradable Film',
//   ];

//   const finishes = ['Glossy', 'Matte', 'Soft-touch'];

//   const printTypes = ['Digital', 'Flexographic', 'Rotogravure'];

//   const sizes = ['Small (100g)', 'Medium (250g)', 'Large (500g)', 'Extra Large (1kg)', 'Custom Size'];

//   const handleIncrease = () => {
//     const newQuantity = parseInt(selectedQuantity || 500, 10) + 500;
//     handleQuantityInputChange({ target: { value: newQuantity.toString() } });
//   };

//   const handleDecrease = () => {
//     const newQuantity = parseInt(selectedQuantity || 500, 10) - 500;
//     if (newQuantity >= 500) {
//       handleQuantityInputChange({ target: { value: newQuantity.toString() } });
//     }
//   };

//   return (
//     <div className="relative z-20">
//       <div className="md:h-auto">
//         {/* Product Title */}
//         <h2 className="text-gray-900 text-xl md:text-3xl font-bold tracking-tight">
//           {name}
//         </h2>
//         <div
//           className="prose text-sm text-gray-700 leading-relaxed"
//           dangerouslySetInnerHTML={{ __html: description }}
//         />

//         <div className="flex items-center gap-2 mt-4">
//           {rating > 0 ? (
//             <>
//               <div className="flex text-yellow-400 text-lg">
//                 {renderStars(rating)}
//               </div>
//               <span className="text-gray-800 font-semibold">
//                 {rating.toFixed(1)} ({reviewsCount} reviews)
//               </span>
//             </>
//           ) : (
//             <span className="text-gray-600 text-sm">No reviews yet</span>
//           )}
//         </div>

//         {/* Minimum quantity note */}
//         <div className="flex flex-row items-center justify-between">
//           <div className="flex items-center gap-2">
//             <Box className="w-6 h-6 text-yellow-400" />
//             <span className="text-gray-500 text-sm">
//               MOQ: <span className="font-medium">{minimumQuantity}</span>
//             </span>
//           </div>
//           <div className="flex items-center gap-2">
//             <div className="w-6 h-6 rounded-full bg-yellow-200 flex items-center justify-center">
//               <Clock className="w-6 h-6 text-yellow-400" />
//             </div>
//             <div>
//               <div className="text-sm text-gray-500">Lead Time</div>
//               <div className="font-semibold text-gray-900">7-10 business days</div>
//             </div>
//           </div>
//         </div>

//         {/* Price and Quantity Section */}
//         <div className="">
//           {productPrice !== null || productDetails.product.price ? (
//             <div className="space-y-4 mb-6">
//               {/* Price calculation section */}
//               <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
//                 <div className="flex items-center space-x-2">
//                   <span className="text-base md:text-lg font-semibold text-gray-800">
//                     ₹{productPrice || productDetails.product.price}
//                   </span>
//                   <span className="text-black text-base md:text-lg">
//                     per unit
//                   </span>
//                 </div>

//                 {/* Quantity selector */}

//               </div>
//             </div>
//           ) : null}
//         </div>

//         {/* Product Material, Variants, and Description */}
//         <div className="space-y-6">
//           {/* Product Variants Section */}
//           <div className="space-y-6">
//             {/* Material Section */}
//             <div>
//               <h3 className="text-gray-900 text-lg font-semibold mb-2">Material</h3>
//               <div className="flex flex-wrap gap-2">
//                 {materials.map((material) => (
//                   <button
//                     key={material}
//                     onClick={() => setSelectedMaterial(material)}
//                     className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedMaterial === material
//                         ? 'bg-blue-950 text-white'
//                         : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                       }`}
//                   >
//                     {material}
//                   </button>
//                 ))}
//               </div>
//             </div>


//             <div className='md:flex '>
//               {/* Finish Section */}
//               <div>
//                 <h3 className="text-gray-900 text-lg font-semibold mb-2">Finish</h3>
//                 <div className="flex flex-wrap gap-2">
//                   {finishes.map((finish) => (
//                     <button
//                       key={finish}
//                       onClick={() => setSelectedFinish(finish)}
//                       className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedFinish === finish
//                           ? 'bg-blue-950 text-white'
//                           : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                         }`}
//                     >
//                       {finish}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Print Type Section */}
//               <div className='md:ml-6'>
//                 <h3 className="text-gray-900 text-lg font-semibold mb-2 mt-2 md:mt-0">Print Type</h3>
//                 <div className="flex flex-wrap gap-2">
//                   {printTypes.map((printType) => (
//                     <button
//                       key={printType}
//                       onClick={() => setSelectedPrintType(printType)}
//                       className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedPrintType === printType
//                           ? 'bg-blue-950 text-white'
//                           : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                         }`}
//                     >
//                       {printType}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             </div>
//             {/* Size Section */}
//             <div>
//               <h3 className="text-gray-900 text-lg font-semibold mb-2">Size</h3>
//               <div className="flex flex-wrap gap-2">
//                 {sizes.map((size) => (
//                   <button
//                     key={size}
//                     onClick={() => setSelectedSize(size)}
//                     className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedSize === size
//                         ? 'bg-blue-950 text-white'
//                         : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                       }`}
//                   >
//                     {size}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetails;











// import React from 'react';

// const renderStars = (rating) => {
//   const stars = [];
//   const fullStars = Math.floor(rating); // Full stars (e.g., 4 for 4.8)
//   const decimalPart = rating % 1; // Decimal part (e.g., 0.8 for 4.8)



//   // Loop through 5 stars
//   for (let i = 1; i <= 5; i++) {
//     let starStyle = 'text-gray-300'; // Default: empty star
//     let clipPath = ''; // For half-filled stars

//     if (i <= fullStars) {
//       // Full star
//       starStyle = 'text-yellow-400';
//     } else if (i === fullStars + 1 && decimalPart >= 0.3) {
//       // Half star or partial fill
//       starStyle = 'text-yellow-400';
//       const percentage = decimalPart * 100; // e.g., 0.8 -> 80%
//       clipPath = `inset(0 ${100 - percentage}% 0 0)`; // Clip the right side
//     }

//     stars.push(
//       <span
//         key={i}
//         className={`text-lg ${starStyle}`}
//         style={{ clipPath }}
//         aria-label={`${i <= rating ? 'filled' : 'empty'} star`}
//       >
//         ★
//       </span>
//     );
//   }

//   return <div className="flex">{stars}</div>;
// };


// const ProductDetails = ({
//   minimumQuantity,
//   priceAfterCalculation,
//   handleQuantityInputChange,
//   selectedQuantity,
//   debouncedIncrease,
//   debouncedDecrease,
//   productDetails,
//   name,
//   description,
//   material,
//   productPrice,
//   ratingData = { rating: 4.8, reviewsCount: 156 } // Default prop for ratingData
// }) => {


//   const { rating = 0, reviewsCount = 0 } = ratingData || {};

//   const handleIncrease = () => {
//     const newQuantity = parseInt(selectedQuantity || 500, 10) + 500;
//     handleQuantityInputChange({ target: { value: newQuantity.toString() } });
//   };

//   const handleDecrease = () => {
//     const newQuantity = parseInt(selectedQuantity || 500, 10) - 500;
//     if (newQuantity >= 500) {
//       handleQuantityInputChange({ target: { value: newQuantity.toString() } });
//     }
//   };

//   return (
//     <div className="relative z-20">
//       <div className="md:h-auto">
//         {/* Product Title */}
//         <h2 className="text-gray-900 text-xl md:text-2xl font-bold tracking-tight">
//           {name}
//         </h2>
//         <div
//           className="prose text-sm text-gray-700 leading-relaxed"
//           dangerouslySetInnerHTML={{ __html: description }}
//         />

//         <div className="flex items-center gap-2 mt-4">
//           {rating > 0 ? (
//             <>
//               <div className="flex text-yellow-400 text-lg">
//                 {renderStars(rating)}
//               </div>
//               <span className="text-gray-800 font-semibold">
//                 {rating.toFixed(1)} ({reviewsCount} reviews)
//               </span>
//             </>
//           ) : (
//             <span className="text-gray-600 text-sm">No reviews yet</span>
//           )}
//         </div>


//         {/* Price and Quantity Section */}
//         <div className="mt-6">
//           {productPrice !== null || productDetails.product.price ? (
//             <div className="space-y-4 mb-6">
//               {/* Price calculation section */}
//               <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
//                 <div className="flex items-center space-x-2">
//                   <span className="text-base md:text-lg font-semibold text-gray-800">
//                     ₹{productPrice || productDetails.product.price}
//                   </span>
//                   <span className="text-gray-500 text-base md:text-lg">
//                     ×
//                   </span>
//                 </div>

//                 {/* Quantity selector */}
//                 <div className="flex items-center rounded-md border border-gray-300 bg-white shadow-sm">
//                   <button
//                     onClick={handleDecrease}
//                     className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors rounded-l-md disabled:opacity-40 disabled:cursor-not-allowed"
//                     disabled={parseInt(selectedQuantity || 500, 10) <= 500} 
//                     aria-label="Decrease quantity"
//                   >
//                     <span className="text-lg md:text-xl font-medium">−</span>
//                   </button>
//                   <input
//                     type="text"
//                     value={selectedQuantity}
//                     onChange={handleQuantityInputChange}
//                     disabled
//                     className="w-14 h-10 text-center border-none focus:outline-none text-gray-800 font-medium"
//                     aria-label="Quantity"
//                   />
//                   <button
//                     onClick={handleIncrease}
//                     className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors rounded-r-md"
//                     aria-label="Increase quantity"
//                   >
//                     <span className="text-lg md:text-xl font-medium">+</span>
//                   </button>
//                 </div>

//                 <div className="flex items-center space-x-2">
//                   <span className="text-gray-500 text-base md:text-lg">
//                     =
//                   </span>
//                   <span className="text-lg md:text-xl font-bold text-gray-900">
//                     ₹{priceAfterCalculation}
//                   </span>
//                 </div>
//               </div>

//               {/* Minimum quantity note */}
//               <div className="flex items-center">
//                 <span className="text-gray-500 text-sm">
//                   Minimum Quantity: <span className="font-medium">{minimumQuantity}</span>
//                 </span>
//               </div>
//             </div>
//           ) : null}
//         </div>

//         {/* Product Material and Description */}
//         <div className="space-y-6">
//           <div className="flex items-center">
//             <span className="text-gray-700 font-medium mr-2">Material:</span>
//             <span className="text-gray-800">{material}</span>
//           </div>

         
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetails;
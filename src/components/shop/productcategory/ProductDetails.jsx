import React from 'react';

const ProductDetails = ({ name, description,material }) => {
  return (
    <div className="relative z-20">
      <div className="md:h-auto">
        <h2 className="text-gray-900 text-xl font-bold">{name}</h2>
        <h3 className='text-gray-900 md:mt-2'>Material : {material}</h3>
        <p className="prose prose-custom-description md:mt-2" dangerouslySetInnerHTML={{ __html: description }} />
      </div>
      <hr className="border-gray-300 mt-2 md:mt-6" />
      <h2 className="text-gray-900 py-3 font-semibold">Price Below is MRP (Inclusive of all taxes)</h2>
    </div>
  );
};

export default ProductDetails;
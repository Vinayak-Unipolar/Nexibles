import React from 'react';
import Link from 'next/link';

const AddToCartButton = ({ onClick, allOptionsSelected, selectedQuantity, minimumQuantity }) => {
  const qtyToUse = parseInt(selectedQuantity, 10) || 0;
  const isQuantityValid = qtyToUse >= minimumQuantity;

  return (
    <div className="">
      {allOptionsSelected && isQuantityValid ? (
        <Link href="/my-cart">
          <button
            onClick={onClick}
            className="w-full md:w-auto bg-[#30384E] hover:bg-[#252b3d] rounded-md px-8 md:px-24 py-3 text-white font-medium transition-all duration-200 shadow-sm hover:shadow flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            Add to Cart
          </button>
        </Link>
      ) : (
        <button
          onClick={onClick}
          className="w-full md:w-auto bg-[#30384E] hover:bg-[#252b3d] rounded-md px-8 md:px-12 py-3 text-white font-medium transition-all duration-200 shadow-sm hover:shadow flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          Add to Cart
        </button>
      )}
    </div>
  );
};

export default AddToCartButton;
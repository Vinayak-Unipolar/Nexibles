export default function PaymentMethod({ defaultAddress, addresses, totalPrice, makePayment, loading2, isProcessingOrder }) {
  // Check if defaultAddress is null, undefined, or empty
  const isDefaultAddressSaved = !!defaultAddress && Object.keys(defaultAddress).length > 0;

  return (
    <div className="md:w-1/2 w-full px-4 md:px-0 mt-8 md:mt-0">
      <h2 className="text-gray-900 text-2xl font-bold mb-6">Payment Method</h2>
      
      <div className="border border-gray-900 rounded-lg p-4 mb-8 w-full md:w-2/3">
        <div className="flex items-center">
          <input 
            type="radio" 
            id="phonePeRadio" 
            name="paymentMethod" 
            value="phonePe" 
            className="cursor-pointer h-5 w-5" 
            defaultChecked 
          />
          <label htmlFor="phonePeRadio" className="ml-3 flex items-center cursor-pointer">
            <img src="/phonepe.svg" alt="PhonePe Logo" className="h-8 md:h-10 mr-2" />
            {/* <span className="text-gray-800 font-medium">PhonePe</span> */}
          </label>
        </div>
      </div>
      
      <div className="mt-4 mb-8">
        <button
          className={`py-3 rounded-full uppercase w-full transition-all duration-300 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 ${
            isDefaultAddressSaved
              ? 'bg-black text-white hover:bg-gray-800'
              : 'bg-gray-400 text-gray-700 cursor-not-allowed'
          }`}
          onClick={isDefaultAddressSaved ? makePayment : null} // Only trigger makePayment if address is saved
          disabled={!isDefaultAddressSaved || loading2 || isProcessingOrder} // Disable if no default address or processing
        >
          {loading2 || isProcessingOrder ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : isDefaultAddressSaved ? (
            `Pay ₹${totalPrice}`
          ) : (
            'Save Address to make payment'
          )}
        </button>
      </div>
    </div>
  );
}
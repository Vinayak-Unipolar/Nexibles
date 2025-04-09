import React from 'react';
import { motion } from 'framer-motion';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4 }
  }
};

const buttonVariants = {
  hover: { scale: 1.1 },
  tap: { scale: 0.9 }
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
  productPrice 
}) => {
  return (
    <motion.div 
      className="relative z-20"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="md:h-auto">
        <motion.h2 
          className="text-gray-900 text-xl font-bold"
          variants={itemVariants}
        >
          {name}
        </motion.h2>
        
        <motion.div 
          className="mt-4 md:mt-6"
          variants={itemVariants}
        >
          {productPrice !== null || productDetails.product.price ? (
            <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-4 md:mb-6">
              <motion.span 
                className="text-base md:text-lg font-semibold text-gray-800"
                variants={itemVariants}
              >
                ₹{productPrice || productDetails.product.price}
              </motion.span>
              <motion.span 
                className="text-gray-500 text-base md:text-lg"
                variants={itemVariants}
              >
                ×
              </motion.span>
              <motion.div 
                className="flex items-center rounded-md border border-gray-200 bg-white shadow-sm"
                variants={itemVariants}
              >
                <motion.button
                  onClick={debouncedDecrease}
                  className="w-8 md:w-9 h-8 md:h-9 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors rounded-l-md disabled:opacity-40 disabled:cursor-not-allowed"
                  disabled={parseInt(selectedQuantity || 0, 10) <= 1}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <span className="text-lg md:text-xl font-medium">-</span>
                </motion.button>
                <input
                  type="text"
                  value={selectedQuantity}
                  onChange={handleQuantityInputChange}
                  className="w-12 md:w-16 h-8 md:h-9 text-center border-none focus:outline-none text-gray-800 font-medium"
                />
                <motion.button
                  onClick={debouncedIncrease}
                  className="w-8 md:w-9 h-8 md:h-9 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors rounded-r-md"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <span className="text-lg md:text-xl font-medium">+</span>
                </motion.button>
              </motion.div>
              <motion.span 
                className="text-gray-500 text-base md:text-lg mx-1 md:mx-2"
                variants={itemVariants}
              >
                =
              </motion.span>
              <motion.span 
                className="text-base md:text-lg font-bold text-gray-900"
                variants={itemVariants}
              >
                ₹{priceAfterCalculation}
              </motion.span>
              <motion.span 
                className="text-gray-400 text-xs w-full md:w-auto md:ml-2"
                variants={itemVariants}
              >
                (Minimum Quantity: {minimumQuantity})
              </motion.span>
            </div>
          ) : null}
        </motion.div>

        <motion.h3 
          className='text-gray-900 text-sm md:mt-2'
          variants={itemVariants}
        >
          Material: {material}
        </motion.h3>
        
        <motion.p 
          className="prose prose-custom-description text-sm md:mt-2"
          variants={itemVariants}
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>
    </motion.div>
  );
};

export default ProductDetails;
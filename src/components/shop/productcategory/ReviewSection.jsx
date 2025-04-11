import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Animation variants
const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.5,
      when: "beforeChildren",
      staggerChildren: 0.1 
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.4 }
  }
};

const barVariants = {
  hidden: { width: 0 },
  visible: { 
    width: (percentage) => percentage, // Use the percentage string directly
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const buttonVariants = {
  hover: { scale: 1.05 },
  tap: { scale: 0.95 }
};

const ReviewSection = ({ productDetails }) => {
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [showAllReviews, setShowAllReviews] = useState(false);

  const token = process.env.NEXT_PUBLIC_API_KEY;
  const APIURL = process.env.NEXT_PUBLIC_API_URL;
  const productId = productDetails.product?.id;

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`${APIURL}/api/ratings`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'API-Key': token,
          },
        });
        const data = await response.json();
        if (data.status === 'success') {
          const productReviews = data.data.filter(review => review.productid === productId);
          setReviews(productReviews);
          const totalRatings = productReviews.reduce((sum, review) => sum + parseInt(review.rating), 0);
          const newAverageRating = productReviews.length > 0 ? (totalRatings / productReviews.length) : 0;
          setAverageRating(newAverageRating);
        } else {
          setError('Failed to fetch reviews');
        }
      } catch (error) {
        setError('Error fetching reviews');
      } finally {
        setIsLoading(false);
      }
    };

    if (productId) {
      fetchReviews();
    }
  }, [token, productId]);

  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleReviewChange = (e) => setReview(e.target.value);
  const handleRatingChange = (value) => setRating(value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (review.trim() !== '' && name.trim() !== '' && email.trim() !== '' && rating > 0) {
      const newReview = {
        productid: productId,
        item: null,
        user: name,
        email: email,
        rating: rating,
        comment: review
      };

      try {
        const response = await fetch(`${APIURL}/api/ratings`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'API-Key': token,
          },
          body: JSON.stringify(newReview),
        });

        const data = await response.json();
        if (data.status === 'success') {
          setReviews([...reviews, newReview]);
          setReview('');
          setName('');
          setEmail('');
          setRating(0);
        } else {
          setError('Failed to post review');
        }
      } catch (error) {
        setError('Error posting review');
      }
    } else {
      setError('Please fill all fields and select a rating');
    }
  };

  const renderStars = (count) => "★".repeat(count) + "☆".repeat(5 - count);

  const getRatingPercentage = (star) => {
    if (reviews.length === 0) return "0%";
    const count = reviews.filter(review => parseInt(review.rating) === star).length;
    return `${Math.round((count / reviews.length) * 100)}%`;
  };

  const displayedReviews = showAllReviews ? reviews : reviews.slice(-4);

  return (
    <motion.div 
      className="mt-6 mb-8 px-4 sm:px-6 lg:px-8"
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div 
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6"
        variants={itemVariants}
      >
        <h2 className="text-gray-900 font-bold text-xl sm:text-2xl mb-2 sm:mb-0">Customer Review</h2>
      </motion.div>

      <motion.div className="flex flex-col md:flex-row gap-6 mb-8">
        <motion.div className="w-full md:w-1/3" variants={itemVariants}>
          <div className="flex flex-col items-center">
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl font-bold"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              {averageRating.toFixed(1)}
            </motion.h1>
            <motion.div 
              className="flex text-yellow-400 text-lg sm:text-xl my-2"
              variants={itemVariants}
            >
              {"★".repeat(Math.round(averageRating))}
              {"☆".repeat(5 - Math.round(averageRating))}
            </motion.div>
            <motion.p 
              className="text-gray-600 text-sm sm:text-base"
              variants={itemVariants}
            >
              ({reviews.length} Ratings)
            </motion.p>
          </div>
        </motion.div>

        <motion.div className="w-full md:w-2/3" variants={itemVariants}>
          {[5, 4, 3, 2, 1].map(star => (
            <motion.div 
              key={star} 
              className="flex items-center mb-2 text-sm sm:text-base"
              variants={itemVariants}
            >
              <span className="w-6 sm:w-8">{star} ★</span>
              <div className="flex-1 bg-gray-200 rounded-full h-2 mx-2">
                <motion.div
                  className="bg-gray-600 h-2 rounded-full"
                  variants={barVariants}
                  initial="hidden"
                  animate="visible"
                  custom={getRatingPercentage(star)}
                  style={{ minWidth: "0" }} // Prevent collapse
                />
              </div>
              <span className="w-10 sm:w-12 text-right flex-shrink-0">
                {getRatingPercentage(star)}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div className="flex flex-col lg:flex-row gap-6">
        <motion.div className="w-full lg:w-1/2" variants={itemVariants}>
          <h3 className="text-xl sm:text-2xl font-bold mb-4">Leave A Comment</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              variants={itemVariants}
            >
              <input
                type="text"
                placeholder="Your Name*"
                className="w-full sm:w-1/2 p-3 border border-gray-300 rounded text-sm sm:text-base"
                value={name}
                onChange={handleNameChange}
                required
              />
              <input
                type="email"
                placeholder="Your Email*"
                className="w-full p-3 border border-gray-300 rounded text-sm sm:text-base"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rating:</label>
              <div className="flex space-x-1 sm:space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <motion.span
                    key={star}
                    className={`cursor-pointer text-xl sm:text-2xl ${rating >= star ? 'text-yellow-400' : 'text-gray-300'}`}
                    onClick={() => handleRatingChange(star)}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    ★
                  </motion.span>
                ))}
              </div>
            </motion.div>
            <motion.textarea
              placeholder="Your Message*"
              className="w-full p-3 border border-gray-300 rounded min-h-[100px] sm:min-h-[120px] text-sm sm:text-base"
              value={review}
              onChange={handleReviewChange}
              required
              variants={itemVariants}
            />
            <motion.button
              type="submit"
              className="w-full sm:w-auto px-6 sm:px-4 py-2 sm:py-3 bg-white border border-gray-800 text-gray-800 font-medium rounded hover:bg-gray-100 text-sm sm:text-md"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              SUBMIT REVIEWS
            </motion.button>
            <AnimatePresence>
              {error && (
                <motion.p
                  className="text-red-500 text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>
          </form>
        </motion.div>

        <motion.div className="w-full lg:w-1/2" variants={itemVariants}>
          <div className="space-y-4">
            <AnimatePresence>
              {displayedReviews.map((review, index) => (
                <motion.div
                  key={index}
                  className="border-b border-gray-200 py-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex flex-col sm:flex-row justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="text-yellow-400 text-sm sm:text-base">
                        {renderStars(review.rating)}
                      </div>
                    </div>
                  </div>
                  <p className="mt-2 text-sm sm:text-base">{review.comment}</p>
                </motion.div>
              ))}
            </AnimatePresence>
            {reviews.length > 4 && (
              <motion.button
                onClick={() => setShowAllReviews(!showAllReviews)}
                className="mt-4 text-black hover:underline text-sm sm:text-base"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                {showAllReviews ? 'See less' : `See all (${reviews.length} reviews)`}
              </motion.button>
            )}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ReviewSection;
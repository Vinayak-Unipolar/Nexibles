import React, { useState, useEffect } from 'react';

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
    const percentage = (count / reviews.length) * 100;
    return `${Math.round(percentage)}%`;
  };

  const displayedReviews = showAllReviews ? reviews : reviews.slice(-4);

  return (
    <div className="px-4 mt-6 mb-8 sm:px-6 lg:px-8">
      <div className="flex flex-col items-start justify-between mb-6 sm:flex-row sm:items-center">
        <h2 className="mb-2 font-bold text-gray-900 text-md sm:text-2xl sm:mb-0">Customer Review</h2>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 mb-8">
        <div className="w-full lg:w-1/3">
          <div className="flex flex-col items-center">
            <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl">
              {averageRating.toFixed(1)}
            </h1>
            <div className="flex my-2 text-lg text-yellow-400 sm:text-xl">
              {"★".repeat(Math.round(averageRating))}
              {"☆".repeat(5 - Math.round(averageRating))}
            </div>
            <p className="text-sm text-gray-600 sm:text-base">
              ({reviews.length} Ratings)
            </p>
          </div>
          <div className="w-full mt-4">
            {[5, 4, 3, 2, 1].map(star => (
              <div key={star} className="flex items-center mb-2 text-sm sm:text-base">
                <span className="sm:w-8">{star} ★</span>
                <div className="flex-1 h-2 mx-2 bg-gray-200 rounded-full">
                  <div
                    className="h-2 bg-gray-600 rounded-full"
                    style={{ width: getRatingPercentage(star) }}
                  />
                </div>
                <span className="flex-shrink-0 w-10 text-right sm:w-12">
                  {getRatingPercentage(star)}
                </span>
              </div>
            ))}
          </div>
        </div>

       <div className="w-full lg:w-2/3">
          <div className="space-y-4">
            {displayedReviews.map((review, index) => (
              <div
                key={index}
                className="py-3 border-b border-gray-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-800">{review.user}</span>
                    <div className="text-lg text-yellow-400">
                      {renderStars(review.rating)}
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">{new Date(review.time).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })}</span>
                </div>
                <p className="mt-2 text-base text-gray-800">{review.comment}</p>
              </div>
            ))}
            {reviews.length > 4 && (
              <button
                onClick={() => setShowAllReviews(!showAllReviews)}
                className="mt-4 text-sm text-black hover:underline sm:text-base"
              >
                {showAllReviews ? 'See less' : `See all (${reviews.length} reviews)`}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewSection;





















// import React, { useState, useEffect } from 'react';

// const ReviewSection = ({ productDetails }) => {
//   const [review, setReview] = useState('');
//   const [rating, setRating] = useState(0);
//   const [reviews, setReviews] = useState([]);
//   const [averageRating, setAverageRating] = useState(0);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [showAllReviews, setShowAllReviews] = useState(false);

//   const token = process.env.NEXT_PUBLIC_API_KEY;
//   const APIURL = process.env.NEXT_PUBLIC_API_URL;
//   const productId = productDetails.product?.id;

//   useEffect(() => {
//     const fetchReviews = async () => {
//       try {
//         const response = await fetch(`${APIURL}/api/ratings`, {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             'API-Key': token,
//           },
//         });
//         const data = await response.json();
//         if (data.status === 'success') {
//           const productReviews = data.data.filter(review => review.productid === productId);
//           setReviews(productReviews);
//           const totalRatings = productReviews.reduce((sum, review) => sum + parseInt(review.rating), 0);
//           const newAverageRating = productReviews.length > 0 ? (totalRatings / productReviews.length) : 0;
//           setAverageRating(newAverageRating);
//         } else {
//           setError('Failed to fetch reviews');
//         }
//       } catch (error) {
//         setError('Error fetching reviews');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     if (productId) {
//       fetchReviews();
//     }
//   }, [token, productId]);

//   const handleNameChange = (e) => setName(e.target.value);
//   const handleEmailChange = (e) => setEmail(e.target.value);
//   const handleReviewChange = (e) => setReview(e.target.value);
//   const handleRatingChange = (value) => setRating(value);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (review.trim() !== '' && name.trim() !== '' && email.trim() !== '' && rating > 0) {
//       const newReview = {
//         productid: productId,
//         item: null,
//         user: name,
//         email: email,
//         rating: rating,
//         comment: review
//       };

//       try {
//         const response = await fetch(`${APIURL}/api/ratings`, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             'API-Key': token,
//           },
//           body: JSON.stringify(newReview),
//         });

//         const data = await response.json();
//         if (data.status === 'success') {
//           setReviews([...reviews, newReview]);
//           setReview('');
//           setName('');
//           setEmail('');
//           setRating(0);
//         } else {
//           setError('Failed to post review');
//         }
//       } catch (error) {
//         setError('Error posting review');
//       }
//     } else {
//       setError('Please fill all fields and select a rating');
//     }
//   };

//   const renderStars = (count) => "★".repeat(count) + "☆".repeat(5 - count);

//   const getRatingPercentage = (star) => {
//     if (reviews.length === 0) return "0%";
//     const count = reviews.filter(review => parseInt(review.rating) === star).length;
//     const percentage = (count / reviews.length) * 100;
//     return `${Math.round(percentage)}%`; // Ensure percentage doesn't exceed 100%
//   };

//   const displayedReviews = showAllReviews ? reviews : reviews.slice(-4);

//   return (
//     <div className="px-4 mt-6 mb-8 sm:px-6 lg:px-8">
//       <div className="flex flex-col items-start justify-between mb-6 sm:flex-row sm:items-center">
//         <h2 className="mb-2 font-bold text-gray-900 text-md sm:text-2xl sm:mb-0">Customer Review</h2>
//       </div>

//       <div className="flex flex-col gap-6 mb-8 ">
//         <div className="w-full md:w-1/3">
//           <div className="flex flex-col items-center">
//             <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl">
//               {averageRating.toFixed(1)}
//             </h1>
//             <div className="flex my-2 text-lg text-yellow-400 sm:text-xl">
//               {"★".repeat(Math.round(averageRating))}
//               {"☆".repeat(5 - Math.round(averageRating))}
//             </div>
//             <p className="text-sm text-gray-600 sm:text-base">
//               ({reviews.length} Ratings)
//             </p>
//           </div>
//         </div>

//         <div className="w-full md:w-1/3">
//           {[5, 4, 3, 2, 1].map(star => (
//             <div key={star} className="flex items-center mb-2 text-sm sm:text-base">
//               <span className=" sm:w-8">{star} ★</span>
//               <div className="flex-1 h-2 mx-2 bg-gray-200 rounded-full">
//                 <div
//                   className="h-2 bg-gray-600 rounded-full"
//                   style={{ width: getRatingPercentage(star) }}
//                 />
//               </div>
//               <span className="flex-shrink-0 w-10 text-right sm:w-12">
//                 {getRatingPercentage(star)}
//               </span>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="flex flex-col gap-6 lg:flex-row">
//         {/* <div className="w-full lg:w-1/2">
//           <h3 className="mb-4 text-xl font-bold sm:text-2xl">Leave A Comment</h3>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div className="flex flex-col gap-4 sm:flex-row">
//               <input
//                 type="text"
//                 placeholder="Your Name*"
//                 className="w-full p-3 text-sm border border-gray-300 rounded sm:w-1/2 sm:text-base"
//                 value={name}
//                 onChange={handleNameChange}
//                 required
//               />
//               <input
//                 type="email"
//                 placeholder="Your Email*"
//                 className="w-full p-3 text-sm border border-gray-300 rounded sm:text-base"
//                 value={email}
//                 onChange={handleEmailChange}
//                 required
//               />
//             </div>
//             <div>
//               <label className="block mb-1 text-sm font-medium text-gray-700">Rating:</label>
//               <div className="flex space-x-1 sm:space-x-2">
//                 {[1, 2, 3, 4, 5].map((star) => (
//                   <span
//                     key={star}
//                     className={`cursor-pointer text-xl sm:text-2xl ${rating >= star ? 'text-yellow-400' : 'text-gray-300'}`}
//                     onClick={() => handleRatingChange(star)}
//                   >
//                     ★
//                   </span>
//                 ))}
//               </div>
//             </div>
//             <textarea
//               placeholder="Your Message*"
//               className="w-full p-3 border border-gray-300 rounded min-h-[100px] sm:min-h-[120px] text-sm sm:text-base"
//               value={review}
//               onChange={handleReviewChange}
//               required
//             />
//             <button
//               type="submit"
//               className="w-full md:w-auto bg-[#103b60] rounded-md px-4 py-2 text-white font-medium transition-all duration-200 shadow-sm flex items-center justify-center gap-2 h-10"
//             >
//               Submit Review
//             </button>
//             {error && (
//               <p className="text-sm text-red-500">
//                 {error}
//               </p>
//             )}
//           </form>
//         </div> */}

//         <div className="w-full lg:w-1/2">
//           <div className="space-y-4">
//             {displayedReviews.map((review, index) => (
//               <div
//                 key={index}
//                 className="py-3 border-b border-gray-200"
//               >
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-2">
//                   <span className="font-bold text-gray-800">{review.user}</span>
//                     <div className="text-lg text-yellow-400">
//                       {renderStars(review.rating)}
//                     </div>
//                   </div>
//                   <span className="text-sm text-gray-500">{new Date(review.time).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })}</span>
//                 </div>
//                 <p className="mt-2 text-base text-gray-800">{review.comment}</p>
//               </div>
//             ))}
//             {reviews.length > 4 && (
//               <button
//                 onClick={() => setShowAllReviews(!showAllReviews)}
//                 className="mt-4 text-sm text-black hover:underline sm:text-base"
//               >
//                 {showAllReviews ? 'See less' : `See all (${reviews.length} reviews)`}
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ReviewSection;
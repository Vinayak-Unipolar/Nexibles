// import React, { useState, useEffect } from 'react';

// const ReviewSection = ({ productDetails }) => {
//     const [review, setReview] = useState('');
//     const [rating, setRating] = useState(0);
//     const [reviews, setReviews] = useState([]);
//     const [averageRating, setAverageRating] = useState(0);
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState(null);

//     const token = 'irrv211vui9kuwn11efsb4xd4zdkuq'; // Replace with your actual API token
//     const productId = productDetails.product?.id;

//     // Fetch existing reviews based on product id
//     useEffect(() => {
//         const fetchReviews = async () => {
//             try {
//                 const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/ratings`, {
//                     method: 'GET',
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'API-Key': token, // Include API key in headers
//                     },
//                 });
//                 const data = await response.json();
//                 if (data.status === 'success') {
//                     const productReviews = data.data.filter(review => review.productid === productId);
//                     setReviews(productReviews);

//                     const totalRatings = productReviews.reduce((sum, review) => sum + parseInt(review.rating), 0);
//                     const newAverageRating = productReviews.length > 0 ? (totalRatings / productReviews.length) : 0;
//                     setAverageRating(newAverageRating);
//                 } else {
//                     setError('Failed to fetch reviews');
//                 }
//             } catch (error) {
//                 setError('Error fetching reviews');
//             } finally {
//                 setIsLoading(false);
//             }
//         };

//         if (productId) {
//             fetchReviews();
//         }
//     }, [token, productId]);

//     // Handle input change for review text
//     const handleReviewChange = (e) => {
//         setReview(e.target.value);
//     };

//     // Handle star rating change
//     const handleRatingChange = (value) => {
//         setRating(value);
//     };

//     // Handle form submit to post new review
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (review.trim() !== '') {
//             const newReview = { productid: productId, reviewer: 'Static Name', rating, comment: review };
//             try {
//                 const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/ratings`, {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'API-Key': token,
//                     },
//                     body: JSON.stringify(newReview),
//                 });

//                 const data = await response.json();
//                 if (data.status === 'success') {
//                     setReviews([...reviews, newReview]);
//                     setReview('');
//                     setRating(0);
//                 } else {
//                     setError('Failed to post review');
//                 }
//             } catch (error) {
//                 setError('Error posting review');
//             }
//         }
//     };

//     // Render stars for rating
//     const renderStars = (rating, onClick) => {
//         const stars = [];
//         for (let i = 1; i <= 5; i++) {
//             const starClass = i <= Math.round(rating) ? 'text-yellow-500' : 'text-gray-300';
//             stars.push(
//                 <span
//                     key={i}
//                     className={`${starClass} cursor-pointer`}
//                     onClick={() => onClick(i)}
//                 >
//                     &#9733;
//                 </span>
//             );
//         }
//         return stars;
//     };

//     return (
//         <div className=' max-w-7xl px-4 sm:px-6 lg:px-8'>
//             <div className="rounded-md py-4">
//                 <div className="flex justify-between items-center mb-4">
//                     <div className=" items-center ">
//                         {isLoading ? (
//                             <p>Loading...</p>
//                         ) : (
//                             <div className='border border-gray-300 px-[2.4vw] rounded-md py-[2.4vh] mt-[1rem] relative'>
//                                 <div className="absolute top-0 left-0 w-full h-[6px] bg-[#30384E] rounded-t-md shadow"></div>

//                                 <p className='text-gray-600 text-2xl font-semibold '>Reviews</p>
//                                 <div className="text-[#E28141] mt-[1vh] text-3xl font-bold ">
//                                     {averageRating.toFixed(1)}
//                                     <span className='md:ml-[2vw]'>
//                                         {renderStars(averageRating, () => { })}
//                                     </span>
//                                 </div>
//                             </div>
//                         )}
//                         {/* <h2 className="text-lg font-bold  mr-2">Reviews</h2> */}

//                     </div>
//                 </div>
//                 {/* <div className="flex items-center text-2xl font-bold mr-2">
//                     {renderStars(rating, handleRatingChange)}
//                 </div> */}
//                 {/* <form onSubmit={handleSubmit} className="flex items-center mt-[1rem] mb-4">
//                     <input
//                         className="md:w-[30%] w-[70%] mr-2 p-2 border border-gray-300 rounded"
//                         placeholder="Write a review..."
//                         value={review}
//                         onChange={handleReviewChange}
//                     />
//                     <button
//                         type="submit"
//                         className="bg-[#111B36] hover:bg-[#444b5f] text-white font-semibold py-2 md:px-6 px-4 rounded"
//                     >
//                         Post
//                     </button>
//                 </form> */}
//             </div>
//             <div>
//                 {isLoading ? (
//                     <p>Loading reviews...</p>
//                 )
//                     : (
//                         reviews.map((review, index) => (
//                             <div key={index} className="p-4 mb-2">
//                                 <div className="flex items-center mb-2">
//                                     <span className="mr-2 font-bold">{review.reviewer}</span>
//                                     {renderStars(review.rating, () => { })}
//                                 </div>
//                                 <p>{review.comment}</p>
//                             </div>
//                         ))
//                     )}
//             </div>
//         </div>
//     );
// };

// export default ReviewSection;

import React, { useState, useEffect } from 'react';

const ReviewSection = ({ productDetails }) => {
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(0);
    const [reviews, setReviews] = useState([]);
    const [averageRating, setAverageRating] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const token = process.env.NEXT_PUBLIC_API_KEY;
    const APIURL = process.env.NEXT_PUBLIC_API_URL;
    // Replace with your actual API token
    const productId = productDetails.product?.id;

    // Fetch existing reviews based on product id
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetch(`${APIURL}/api/ratings`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'API-Key': token, // Include API key in headers
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

    // Handle input change for review text
    const handleReviewChange = (e) => {
        setReview(e.target.value);
    };

    // Handle star rating change
    const handleRatingChange = (value) => {
        setRating(value);
    };

    // Handle form submit to post new review
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (review.trim() !== '') {
            const newReview = { productid: productId, reviewer: 'Static Name', rating, comment: review };
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
                    setRating(0);
                } else {
                    setError('Failed to post review');
                }
            } catch (error) {
                setError('Error posting review');
            }
        }
    };

    // Render stars for rating
    const renderStars = (rating, onClick) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            const starClass = i <= Math.round(rating) ? 'text-yellow-500' : 'text-gray-300';
            stars.push(
                <span
                    key={i}
                    className={`${starClass} cursor-pointer`}
                    onClick={() => onClick(i)}
                >
                    &#9733;
                </span>
            );
        }
        return stars;
    };

    return (
        <>
            {reviews && reviews.length > 0 && (
                <>
                    <hr className="border-gray-300 " />
                    <div className="max-w-7xl px-4 sm:px-6 lg:px-4">
                        <div className="rounded-md py-2">
                            <div className="flex justify-between items-center mb-4">
                                <div className="items-center">
                                    <div className="border border-gray-300 px-[2.4vw] rounded-md py-[2.4vh] mt-[1rem] relative">
                                        <div className="absolute top-0 left-0 w-full h-[6px] bg-[#30384E] rounded-t-md shadow"></div>
                                        <p className="text-gray-600 text-2xl font-semibold">Reviews</p>
                                        <div className="text-[#E28141] mt-[1vh] text-3xl font-bold">
                                            {averageRating.toFixed(1)}
                                            <span className="md:ml-[2vw]">
                                                {renderStars(averageRating, () => { })}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                {reviews.map((review, index) => (
                                    <div key={index} className="p-1">
                                        <div className="flex items-center mb-2">
                                            <span className="font-bold">{review.reviewer}</span>
                                            {renderStars(review.rating, () => { })}
                                        </div>
                                        <p>{review.comment}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default ReviewSection;


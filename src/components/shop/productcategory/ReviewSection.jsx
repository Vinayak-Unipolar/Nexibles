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
    const [showAllReviews, setShowAllReviews] = useState(false); // State to toggle all reviews

    const token = process.env.NEXT_PUBLIC_API_KEY;
    const APIURL = process.env.NEXT_PUBLIC_API_URL;
    const productId = productDetails.product?.id;

    // Fetch existing reviews based on product id
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

    // Handle input changes
    const handleNameChange = (e) => setName(e.target.value);
    const handleEmailChange = (e) => setEmail(e.target.value);
    const handleReviewChange = (e) => setReview(e.target.value);
    const handleRatingChange = (value) => setRating(value);

    // Handle form submit to post new review
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

    // Determine which reviews to display (recent 4 by default or all if showAllReviews is true)
    const displayedReviews = showAllReviews ? reviews : reviews.slice(-4);

    return (
        <div className="mt-6 mb-8 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                <h2 className="text-gray-900 font-bold text-xl sm:text-2xl mb-2 sm:mb-0">Customer Review</h2>
            </div>

            <div className="flex flex-col md:flex-row gap-6 mb-8">
                <div className="w-full md:w-1/3">
                    <div className="flex flex-col items-center">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold">{averageRating.toFixed(1)}</h1>
                        <div className="flex text-yellow-400 text-lg sm:text-xl my-2">
                            {"★".repeat(Math.round(averageRating))}
                            {"☆".repeat(5 - Math.round(averageRating))}
                        </div>
                        <p className="text-gray-600 text-sm sm:text-base">({reviews.length} Ratings)</p>
                    </div>
                </div>

                <div className="w-full md:w-2/3">
                    {[5, 4, 3, 2, 1].map(star => (
                        <div key={star} className="flex items-center mb-2 text-sm sm:text-base">
                            <span className=" sm:w-8">{star} ★</span>
                            <div className="flex-1 bg-gray-200 rounded-full h-2 mx-2">
                                <div
                                    className="bg-gray-600 h-2 rounded-full"
                                    style={{ width: getRatingPercentage(star) }}
                                ></div>
                            </div>
                            <span className="w-10 sm:w-12 text-right flex-shrink-0">{getRatingPercentage(star)}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                <div className="w-full lg:w-1/2">
                    <h3 className="text-xl sm:text-2xl font-bold mb-4">Leave A Comment</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex flex-col sm:flex-row gap-4">
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
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Rating:</label>
                            <div className="flex space-x-1 sm:space-x-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <span
                                        key={star}
                                        className={`cursor-pointer text-xl sm:text-2xl ${rating >= star ? 'text-yellow-400' : 'text-gray-300'}`}
                                        onClick={() => handleRatingChange(star)}
                                    >
                                        ★
                                    </span>
                                ))}
                            </div>
                        </div>
                        <textarea
                            placeholder="Your Message*"
                            className="w-full p-3 border border-gray-300 rounded min-h-[100px] sm:min-h-[120px] text-sm sm:text-base"
                            value={review}
                            onChange={handleReviewChange}
                            required
                        ></textarea>
                        <button
                            type="submit"
                            className="w-full sm:w-auto px-6 sm:px-4 py-2 sm:py-3 bg-white border border-gray-800 text-gray-800 font-medium rounded hover:bg-gray-100 text-sm sm:text-md"
                        >
                            SUBMIT REVIEWS
                        </button>
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                    </form>
                </div>

                <div className="w-full lg:w-1/2">
                    <div className="space-y-4">
                        {displayedReviews.map((review, index) => (
                            <div key={index} className="border-b border-gray-200 py-3">
                                <div className="flex flex-col sm:flex-row justify-between gap-2">
                                    <div className="flex items-center gap-2">
                                        <div className="text-yellow-400 text-sm sm:text-base">
                                            {renderStars(review.rating)}
                                        </div>
                                    </div>
                                </div>
                                <p className="mt-2 text-sm sm:text-base">{review.comment}</p>
                            </div>
                        ))}
                        {reviews.length > 4 && (
                            <button
                                onClick={() => setShowAllReviews(!showAllReviews)}
                                className="mt-4 text-black hover:underline text-sm sm:text-base"
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
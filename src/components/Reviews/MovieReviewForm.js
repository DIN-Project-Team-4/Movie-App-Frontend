import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import ToastMessage from '../Common/ToastMessage.js';

function MovieReviewForm({ movieId, movieTitle, moviePosterUrl }) {
  const baseUrl = process.env.REACT_APP_API_URL; //for the URL

  const [rating, setRating] = useState(0); // Default no rating
  const [review, setReview] = useState('');
  const [error, setError] = useState('');
  //toast message
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('');
  const [isToastVisible, setIsToastVisible] = useState(false);

  const handleRatingChange = (value) => {
    setRating(value);
    setError(''); // Clear error on valid input
  };

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (rating === 0) {
      showToast('Please provide a rating.', 'warning', false);
      return;
    }

    //check review is written
    if (review === "") {
      showToast('Please provide a review.', 'warning', false);
      return;
    }
    //Review backend connection
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData || !userData.userId) {
      showToast('Please Login before you enter review.', 'warning', false);
      return;
    }

    //send the data to backend
    try {
      const saveDate = {
        movieId: movieId,
        description: review,
        rating: rating,
        reviewedAt: new Date(),
        movieTitle: movieTitle,
        moviePosterUrl: moviePosterUrl,
        userId: userData.userId
      }

      console.log(saveDate)
      // Send POST request to the backend
      const response = await fetch(`${baseUrl}/movie/createReview`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        credentials: 'include', // Ensure credentials (cookies) are sent
        body: JSON.stringify({
          movieId: movieId,
          description: review,
          rating: rating,
          reviewedAt: new Date(),
          movieTitle: movieTitle,
          moviePosterUrl: moviePosterUrl,
          userId: userData.userId
        })
      });
      console.log(response.status);
      // Parse the response
      const data = await response.json();


      if (response.status === 200) {
        showToast('Review successfully submited', 'success', true);
        setRating(0); // Reset the form
        setReview('');
      } else {
        showToast(data.error || 'An error occurred ().', 'warning', false);
      }
    } catch (error) {
      showToast(error.message || 'Error, please try again!', 'warning', false);
    }
  };

  {/* TOAST MESSAGE EDITED TO BOOTSTRAP//WOON */ }
  const showToast = (message, type) => {
    setToastMessage(message);
    setToastType(type);
    setIsToastVisible(true);
     
    setTimeout(() => {
        setIsToastVisible(false);
        setToastMessage('');        
    }, 3000);
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit}>
        {/* Rating Section */}
        <div className="mt-3">
          <h5>
            Rate the movie <span className="text-danger">*</span>
          </h5>
          <div className="d-flex justify-content-start gap-2">
            {[1, 2, 3, 4, 5].map((num) => (
              <span
                key={num}
                role="button"
                style={{
                  fontSize: '2rem',
                  cursor: 'pointer',
                  color: num <= rating ? '#FFD700' : '#ccc',
                }}
                onClick={() => handleRatingChange(num)}
                onKeyDown={(e) => e.key === 'Enter' && handleRatingChange(num)}
                tabIndex={0}
              >
                {num <= rating ? '★' : '☆'}
              </span>
            ))}
          </div>
        </div>

        {/* Review Section */}
        <div className="mt-3">
          <label htmlFor="review" className="form-label">
            Write your review (optional):
          </label>
          <textarea
            id="review"
            className="form-control"
            rows="4"
            placeholder="Type your review here..."
            value={review}
            onChange={handleReviewChange}
          />
        </div>

        {/* Error Message */}
        {error && <div className="text-danger mt-2">{error}</div>}

        {/* Submit Button */}
        <div className="mt-3">
          <button type="submit" className="btn btn-primary">
            Submit Review
          </button>
        </div>
      </form>
      {/* TOAST MESSAGE EDITED TO BOOTSTRAP//WOON */}
      <ToastMessage
        show={isToastVisible} 
        onClose={() => setIsToastVisible(false)} 
        message={toastMessage} 
        toastType={toastType}
      />
    </div>
  );
}

export default MovieReviewForm;

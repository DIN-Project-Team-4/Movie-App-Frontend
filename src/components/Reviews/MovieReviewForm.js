import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { ToastMessage } from '../toast/ToastMessage.js';

function MovieReviewForm(movieID) {
  const baseUrl = process.env.REACT_APP_API_BASE_URL; //for the URL
  const movie_ID = movieID;
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

  const handleSubmit = async(event) => {
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
    if (!userData || !userData.userId ){
      showToast('Please Login before you enter review.' ,'warning', false);
      return;
    }   

    //send the data to backend
    try {
      const response = await axios.post(
          `${baseUrl}/movie/createReview`,
          { "movieId": movie_ID, "description": {review},"rating":{rating},"reviewedAt":Date(),"userId":userData.userId },
          { withCredentials: true }
      );
      
      if (response.status === 200) {          
          showToast('Reviews successfully submited', 'success', true);
      } else {
          showToast('Internal Error', 'warning', false);          
      }
  } catch (error) {
      showToast('Error, please try again!', 'warning', false);}
      // Alert form submission
    //alert(`Review Submitted!\nRating: ${rating} Stars\nReview: ${review || 'No review provided'}`);
    setRating(0); // Reset the form
    setReview('');
  };

  //Show toast
  const showToast = (message, type,) => {
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
       {/* TOAST MESSAGE */}
       {isToastVisible && <ToastMessage toastMessage={toastMessage} toastType={toastType} />}
    </div>
  );
}

export default MovieReviewForm;

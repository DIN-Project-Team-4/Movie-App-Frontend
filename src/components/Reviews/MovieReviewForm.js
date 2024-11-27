import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function MovieReviewForm() {
  const [rating, setRating] = useState(0); // Default no rating
  const [review, setReview] = useState('');
  const [error, setError] = useState('');

  const handleRatingChange = (value) => {
    setRating(value);
    setError(''); // Clear error on valid input
  };

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (rating === 0) {
      setError('Please provide a rating.');
      return;
    }

    // Alert form submission
    alert(`Review Submitted!\nRating: ${rating} Stars\nReview: ${review || 'No review provided'}`);
    setRating(0); // Reset the form
    setReview('');
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
    </div>
  );
}

export default MovieReviewForm;

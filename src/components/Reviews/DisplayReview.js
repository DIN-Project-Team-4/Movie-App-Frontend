import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ToastMessage from '../Common/ToastMessage.js';
import "./DisplayReview.css";

function DisplayReview({ movieId }) {
	const baseUrl = process.env.REACT_APP_API_URL; // Backend API URL

	// Toast message state
	const [toastMessage, setToastMessage] = useState('');
	const [toastType, setToastType] = useState('');
	const [isToastVisible, setIsToastVisible] = useState(false);

	// Review state
	const [enteredReviews, setEnteredReviews] = useState([]);

	movieId = !movieId ? "" : movieId

	// Fetch all reviews
	const handleDisplayReview = async () => {
		try {
			console.log("movieId : " + movieId)
			const response = await fetch(`${baseUrl}/reviews/${movieId?.trim() !== "" ? movieId : ""}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			});

			const data = await response.json();

			if (response.ok) {
				setEnteredReviews(data);
			} else {
				showToast(data.message || 'Failed to load movie reviews.', 'warning');
			}
		} catch (error) {
			showToast('Error loading movie reviews.', 'error');
		}
	};

	// Show toast message
	const showToast = (message, type) => {
		setToastMessage(message);
		setToastType(type);
		setIsToastVisible(true);

		setTimeout(() => {
			setIsToastVisible(false);
			setToastMessage('');
		}, 3000);
	};

	// Fetch reviews on component mount
	useEffect(() => {
		handleDisplayReview();
	}, [movieId]);

	
	return (
		<>
			{/* Display reviews */}
			<div className="mt-3">
				{enteredReviews.length > 0 ? (
					enteredReviews.map((r) => (					
							<div key={r.id} className="review-item">
								<Link to={`/movie/${r.movie_id}`} className="review-item">								
								{!movieId && ( <img
									className="movie-poster"
									src={`https://image.tmdb.org/t/p/w500${r.movie_poster_url}`}
									alt={r.movie_title}
								/>)}</Link>
								<div>
									<div className="star-rating" style={{ fontSize: '1.5rem', color: '#FFD700' }}>
										{!movieId && r.movie_title + " "}
										{[1, 2, 3, 4, 5].map((num) => (
											<span key={num} style={{ color: num <= r.rating ? '#FFD700' : '#ccc' }}>
												{num <= r.rating ? '★' : '☆'}
											</span>
										))}
									</div>
									<strong>Reviewed By:</strong> {r.username}
									<p>{r.description}</p>
								</div>
							</div>
					))
				) : (
					<p>No reviews available.</p>
				)}
			</div>

			{/* TOAST MESSAGE EDITED TO BOOTSTRAP//WOON */}
			<ToastMessage
				show={isToastVisible}
				onClose={() => setIsToastVisible(false)} 
				message={toastMessage} 
				toastType={toastType} 
			/>
		</>
	);
}

export default DisplayReview;

import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import '../index.css';
import './MovieDetails.css';

import { Button } from 'react-bootstrap';
import MovieReviewForm from '../components/Reviews/MovieReviewForm.js';
const backendUrl = process.env.REACT_APP_API_URL;

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/tmdb/movie/${id}`);
        setMovie(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching movie details:', error.message);
        setError('Failed to load movie details');
        setLoading(false);
      }
    };

    const fetchMovieVideos = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/tmdb/movie/${id}/videos`);
        setVideos(response.data.results);
      } catch (error) {
        console.error('Error fetching movie trailer:', error.message);
      }
    };

    fetchMovieDetails();
    fetchMovieVideos();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const trailer = videos.find(video => video.type === 'Trailer' && video.site === 'YouTube');

  return (
    <div className="main-div">
      <div className="div-title">
        <span className="movie-title">{movie.title}</span> <span className="release-year">({new Date(movie.release_date).getFullYear()})</span>
      </div>
      {movie && (
        <>
          <div className="details-trailer-container">
            <div className="details-container">
              <div className="poster-container">
                <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={`${movie.title} Poster`} className="movie-poster" />
              </div>
              <div className="details-info">

                <div className="genres">
                  {movie.genres.map(genre => (
                    <Button key={genre.id} variant="outline-*" className="genre-button" disabled>{genre.name}</Button>
                  ))}
                </div>
                <p><strong>Duration:</strong> {movie.runtime} minutes</p>
                <p className="movie-summary">{movie.overview}</p>
              </div>
            </div>
            {trailer && (
              <div className="trailer">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${trailer.key}`}
                  title="Trailer"
                  allowFullScreen
                ></iframe>
              </div>
            )}
          </div>
          {movie.credits && movie.credits.cast && (
            <div className="cast">
              <div className="cast-container">
                {movie.credits.cast.slice(0, 10).map(actor => (
                  <Card key={actor.id}>
                    <Card.Img variant='top'
                      src={actor.profile_path ? `https://image.tmdb.org/t/p/w185/${actor.profile_path}` : 'https://via.placeholder.com/185x278?text=No+Image'}
                      alt={`${actor.name}`}
                    />
                    <Card.ImgOverlay>
                      <Card.Title>{actor.name}</Card.Title>
                    </Card.ImgOverlay>
                    <Card.Body>
                      <Card.Text>as {actor.character}</Card.Text>
                    </Card.Body>
                  </Card>
                ))}
              </div>
            </div>
          )}
          <div className='review-main'>
            <div className='div-title'>
              <h2>Reviews</h2>
            </div>
            <div className="reviews">
              <MovieReviewForm movieId ={ id }/>

            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MovieDetails;
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

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
    <div className="movie-details">
      {movie && (
        <>
          <h1>{movie.title} ({new Date(movie.release_date).getFullYear()})</h1>
          <div className="details-header">
            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={`${movie.title} Poster`} />
            <div className="details-info">
              <p><strong>Genre:</strong> {movie.genres.map(genre => genre.name).join(', ')}</p>
              <p><strong>Duration:</strong> {movie.runtime} minutes</p>
              <p><strong>Summary:</strong> {movie.overview}</p>
            </div>
          </div>
          {trailer && (
            <div className="trailer">
              <h2>Trailer</h2>
              <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${trailer.key}`}
                title="Trailer"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}
          {movie.credits && movie.credits.cast && (
            <div className="cast">
              <h2>Actors</h2>
              <ul>
                {movie.credits.cast.slice(0, 10).map(actor => (
                  <li key={actor.id}>{actor.name} as {actor.character}</li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MovieDetails;

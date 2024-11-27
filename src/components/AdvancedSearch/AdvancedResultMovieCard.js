import React from 'react'
import posterPlaceholder from '../../assets/image_unavailable.jpg';

export default function AdvancedResultMovieCard({movie}) {
    const mainURL = "https://image.tmdb.org/t/p/w500";
    // Extract year from date
    const year = movie.release_date ? movie.release_date.split('-')[0] : 'N/A'; 
    return (
        <div className="movie-card">
          <img src={movie.poster_path == null ? posterPlaceholder :mainURL + movie.poster_path} alt={movie.title} className="movie-image" />
          <div className="movie-details">
            <h8 className="movie-title-advanced-search">{movie.title}</h8>
            <p className="movie-year">{year}</p>
            <p className="movie-description">{movie.overview}</p>
          </div>
        </div>
      );
}

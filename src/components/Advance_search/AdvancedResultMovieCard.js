import React from 'react'

export default function AdvancedResultMovieCard({movie}) {
    const mainURL = "https://image.tmdb.org/t/p/w500";
    return (
        <div className="movie-card">
          <img src={mainURL + movie.poster_path} alt={movie.title} className="movie-image" />
          <div className="movie-details">
            <h5 className="movie-title">{movie.title}</h5>
            <p className="movie-year">{movie.release_date}</p>
            <p className="movie-description">{movie.overview}</p>
          </div>
        </div>
      );
}

import React from 'react'
import AdvancedResultMovieCard from './AdvancedResultMovieCard.js'

export default function AdvancedResultList({movies}) {
    if (!Array.isArray(movies)) {
        return <div>No movies found or data is invalid.</div>;
      }

  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <AdvancedResultMovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  )
}

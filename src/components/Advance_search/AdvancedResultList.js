import React from 'react'
import AdvancedResultMovieCard from './AdvancedResultMovieCard.js'
import './AdvancedResultList.css'

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

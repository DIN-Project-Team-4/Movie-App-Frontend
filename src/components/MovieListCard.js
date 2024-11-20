import React from 'react'
import MovieCard from './MovieCard'


export default function MovieListCard({searchText, movieDetails, genres, hasSearched}) {
    
  return (
    <div>
      {hasSearched && (
        <h2>
          SEARCH : <span>"{searchText.toUpperCase()}"</span>{' '}
          {movieDetails.length === 0 && 'NOT FOUND'}
        </h2>
      )}
      
      {movieDetails.length !== 0 && (
        <div className='main-movieCard'>
            <ul>
                {movieDetails.map( movie => <MovieCard movieId ={movie.id} movieName={movie.title} poster={movie.poster_path} date={movie.release_date} commonGenres={genres} movieGenres={movie.genre_ids}/>)}
            </ul>
        </div>
      )}

    </div>
    
  )
}

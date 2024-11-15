import React from 'react'
import MovieCard from './MovieCard'


export default function MovieListCard({searchText, movieDetails, genres, hasSearched}) {
    
  return (
    <div>
      {hasSearched && (
        <h1>
          SEARCH : <span>"{searchText.toUpperCase()}"</span>{' '}
          {movieDetails.length === 0 && 'NOT FOUND'}
        </h1>
      )}
      
      {movieDetails.length !== 0 && (
        <div className='main-movieCard'>
            <ol>
                {movieDetails.map( movie => <MovieCard movieId ={movie.id} movieName={movie.title} poster={movie.poster_path} date={movie.release_date} commonGenres={genres} movieGenres={movie.genre_ids}/>)}
            </ol>
        </div>
      )}

    </div>
    
  )
}

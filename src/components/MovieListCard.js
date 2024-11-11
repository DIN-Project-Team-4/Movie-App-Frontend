import React from 'react'
import MovieCard from './MovieCard'


export default function MovieListCard({searchText, movieDetails, genres}) {
    
  return (
    <div>
        <h1>SEARCH : <span>"{searchText.toUpperCase()}"</span></h1>
        <div className='main-movieCard'>
            <ol>
                {movieDetails.map( movie => <MovieCard movieName={movie.title} poster={movie.poster_path} date={movie.release_date} commonGenres={genres} movieGenres={movie.genre_ids}/>)}
            </ol>
        </div>
    </div>
    
  )
}

import React from 'react'
import MovieListCard from './MovieListCard'
import PageChangeButton from './PageChangeButton'
import './SearchResults.css'


export default function SearchResults({searchText, results, genres, hasSearched, prevPage, nextPage, page, totalPages}) {
  return (
    <div>
        {/* Conditionally render the MovieListCard component only after search result available*/}
        <div>
          <MovieListCard searchText = {searchText} movieDetails = {results} genres = {genres} hasSearched={hasSearched}/>
        </div>

      {/* Add next and previous bottons with page number */}
      {results.length>0 ? (
        <div>
          <PageChangeButton prevPage={prevPage} nextPage = {nextPage} page = {page} totalPages ={totalPages}/>
        </div>
      ):<></>}   
    </div>
  )
}

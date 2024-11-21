import React from 'react'
import MovieListCard from './MovieListCard.js'
import PageChangeButton from './PageChangeButton.js'
import './SearchResults.css'


export default function SearchResults({searchText, results, genres, hasSearched, prevPage, nextPage, page, totalPages}) {
  return (
    <div className='main-div'>
      {/* Conditionally render the MovieListCard component only after search result available*/}
      <MovieListCard searchText = {searchText} movieDetails = {results} genres = {genres} hasSearched={hasSearched}/>

      {/* Add next and previous bottons with page number */}
      {results.length>0 ? (
        <PageChangeButton prevPage={prevPage} nextPage = {nextPage} page = {page} totalPages ={totalPages}/>
      ):<></>}   
    </div>
  )
}

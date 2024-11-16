import React, { useState, useEffect } from 'react';
import './Home.css';
import SearchResults from '../components/SearchResults';
import { getGenreName, searchByTitle, searchByYear, searchByGenre } from '../components/API_endpoints.js';
import Header from '../components/Header.js';
import Carousel from '../components/Carousel.js';
import useMovieSearch from '../hooks/useMovieSearch.js';

function Home() {
  const {
    filterMethod,
    setFilterMethod,
    searchText,
    setSearchText,
    results,
    totalPages,
    page,
    genres,
    hasSearched,
    newSearch,
    nextPage,
    prevPage,
  } = useMovieSearch();
  

  return (
    <div>
      <div>
        <Header filterMethod={filterMethod}
          setFilterMethod={setFilterMethod}
          searchText={searchText}
          setSearchText={setSearchText}
          newSearch={newSearch}/>
       
      </div>
      <div>
        {/* Conditionally render SearchResults or Carousel */}
        {results.length > 0 ? (
          <SearchResults
            searchText={searchText}
            results={results}
            genres={genres}
            hasSearched={hasSearched}
            prevPage={prevPage}
            nextPage={nextPage}
            page={page}
            totalPages={totalPages}
          />
        ) : (
          <Carousel />
        )}
      </div>
    </div>
  );
}

export default Home;

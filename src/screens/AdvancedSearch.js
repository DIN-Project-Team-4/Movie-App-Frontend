import React from 'react'
import Header from '../components/Header.js';
import useMovieSearch from '../hooks/useMovieSearch.js';
import Footer from '../components/Footer.js';


export default function AdvancedSearch() {
    const {
        filterMethod,
        setFilterMethod,
        searchText,
        setSearchText,
        newSearch,
      } = useMovieSearch();

  return (
    <div>
        <div className="fixed-top">
            <Header
            filterMethod={filterMethod}
            setFilterMethod={setFilterMethod}
            searchText={searchText}
            setSearchText={setSearchText}
            newSearch={newSearch}
            />
        </div>

        <div className='main-div'>
            <h2>Advanced Title Search</h2>
            <p>
                Easily find movies with our simple search tool. You can combine different filters like genre, release year, rating, and more. Want to find comedies from the 2000s? You can do that! Just enter your preferences below, and hit "Search." At least one filter is required to start. For date ranges, use 'min' for later years and 'max' for earlier ones. Press "Enter" to search.
            </p>            
        </div>

      <Footer />
    </div>
  )
}

import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import SearchResults from '../components/SearchResults.js';
import useMovieSearch from '../hooks/useMovieSearch.js';

const SearchResultsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  //const queryParams = new URLSearchParams(location.search);
  //const initialSearchText = queryParams.get('query') || ''; // Extract the query parameter

  const {
    filterMethod,
    setFilterMethod,
    searchText,
    setSearchText,
    results,
    error,
    totalPages,
    page,
    genres,
    hasSearched,
    newSearch,
    nextPage,
    prevPage,
  } = useMovieSearch();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const searchText = queryParams.get('query');
    const filterSelection = queryParams.get('filter');

    // If the query parameters contain a query field, update searchText with it
    if (searchText) {
      setSearchText(searchText);
    }

    // If the query parameters contain a filter field, update filterSelection with it
    if (filterSelection) {
      setFilterMethod(filterSelection);
    }

    // If both search text and filter selection is available, trigger a new search
    if (searchText && filterSelection) {
      newSearch({ preventDefault: () => {} });
    }
  //}, [location.search, setSearchText, setFilterMethod, newSearch]);
}, [location.search, newSearch]);

  useEffect(() => {
    if (searchText === '') {
      // If search text is empty, clear the URL query parameter
      navigate('/search');
    }
  }, [searchText, navigate]);

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

      <div>
        {results.length > 0 || error ? (
            <SearchResults
              searchText={searchText}
              results={results}
              genres={genres}
              hasSearched={hasSearched}
              prevPage={prevPage}
              nextPage={nextPage}
              page={page}
              totalPages={totalPages}
              setSearchText={setSearchText}
            />
          ) : error ? (
            <h2 className="text-center mt-5">An error occurred. Please try again.</h2>
          ) : (
            <h2 className="text-center mt-5">No Results Found</h2>
          )
        }
          
      </div>

      <Footer />
    </div>
  );
};

export default SearchResultsPage;
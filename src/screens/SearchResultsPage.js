import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SearchResults from '../components/SearchResults.js';
import { useMovieSearchContext } from '../context/MovieSearchContext.js';

const SearchResultsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

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
  } = useMovieSearchContext(); // Use the shared context to get search state

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const searchText = queryParams.get('query');
    const filterSelection = queryParams.get('filter');

    if (searchText) {
      setSearchText(searchText);
    }

    if (filterSelection) {
      setFilterMethod(filterSelection);
    }

    if (searchText && filterSelection) {
      newSearch({ preventDefault: () => {} });
    }
  }, [location.search, newSearch]);

  useEffect(() => {
    if (searchText === '') {
      navigate('/search');
    }
  }, [searchText, navigate]);

  return (
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
      )}
    </div>
  );
};

export default SearchResultsPage;

import React, { useState, useEffect } from 'react';
import './Home.css';
import SearchResults from '../components/SearchResults';
import { getGenreName, searchByTitle, searchByYear, searchByGenre } from '../components/API_endpoints.js';
import Header from '../components/Header.js';

function Home() {
  const [filterMethod, setFilterMethod] = useState('title');
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(1);
  const [results, setResults] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [genres, setGenres] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  // Fetch genres on first render
  useEffect(() => {
    const fetchGenres = async () => {
      const data = await getGenreName();
      if (data) {
        setGenres(data.genres);
      }
    };
    fetchGenres();
  }, []);

  async function searchMovies(e) {
    e.preventDefault();
    let data = [];
    switch (filterMethod) {
      case 'title':
        data = await searchByTitle(searchText, page);
        break;
      case 'release_year':
        data = await searchByYear(searchText, page);
        break;
      case 'genre':
        data = await searchByGenre(searchText, genres, page);
        break;
      default:
        data = { results: [], total_pages: 0 };
        break;
    }

    if (data.results) {
      setTotalPages(data.total_pages);
      setResults(data.results);
    } else {
      setTotalPages(0);
      setResults([]);
    }
  }

  function newSearch(e) {
    e.preventDefault();
    setHasSearched(true);
    setPage(1);
    searchMovies(e);
  }

  useEffect(() => {
    if (searchText) {
      searchMovies({ preventDefault: () => {} });
    }
  }, [page]);

  function nextPage() {
    setPage((currentPage) => Math.min(currentPage + 1, totalPages));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function prevPage() {
    setPage((currentPage) => Math.max(currentPage - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

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
      </div>
    </div>
  );
}

export default Home;

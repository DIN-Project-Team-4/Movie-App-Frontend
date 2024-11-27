import React, { useState, useEffect } from 'react';
import DropdownFilterGenre from './DropdownFilterGenre.js';
import DropdownFilterLanguage from './DropdownFilterLanguage.js';
import useMovieSearch from '../../hooks/useMovieSearch.js';
import useAdvanceMovieSearch from '../../hooks/useAdvanceMovieSearch.js';
import Popcorn from '../../assets/Advanced-search.webp'
import AdvancedResultList from './AdvancedResultList.js';
import PageChangeButton from '../Search/PageChangeButton.js';

const AdvancedSearchFilters = () => {
  const {
    genres,
    language,
    newAdvancedSearch,
    searchForResults,
    results,
    prevPage,
    nextPage,
    page,
    totalPages,
  } = useAdvanceMovieSearch();

  const [movieTitle,setMovieTitle] = useState("")
  const [movieYear,setMovieYear] = useState("")
  const [cast,setCast] = useState("")
  const [genreList, setGenreList] = useState([]);
  const [languageList, setLanguageList] = useState([]);
  const [selectedGenre,setSelectedGenre] = useState("");
  const [selectedLanguage,setSelectedLanguage] = useState("")
  const [searchResults, setSearchResults] = useState([]);

  // Update genreList when genres are fetched
  useEffect(() => {
    if (genres.length > 0) {
      setGenreList(genres.map((gen) => gen)); // Extract names into genreList
    }
  }, [genres]);

  useEffect(() => {
    if (results.length > 0) {
      setSearchResults(results); // Extract names into genreList
    }
  }, [results]);

  // Update language List when language are fetched
  useEffect(() => {
    if (language.length > 0) {
      setLanguageList(language.map((lan) => lan)); // Extract names into genreList
    }
  }, [language]);

  //Function to handle form submit
  function handleAdvanceSearchSubmit(e){
    e.preventDefault()
    // Call searchForResults and update searchResults
    /*
    searchForResults(movieTitle, selectedGenre, cast, movieYear, selectedLanguage).then((results) => {
      setSearchResults(results);
    }).catch((error) => {
      console.error('Error fetching search results:', error);
    });
    */
    newAdvancedSearch(movieTitle, selectedGenre, cast, movieYear, selectedLanguage)
    setSearchResults(results)
  }


  return (
    <div className="advanced-search-container">
      {/* Left Section - Form */}
      <div className="form-section">
        <form onSubmit = {handleAdvanceSearchSubmit}style={{ width: '100%' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>

            {/* Movie Title */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <label htmlFor="movie-title" style={{ flex: 1, fontWeight: 'bold' }}>
                Movie Title:
              </label>
              <input
                id="movie-title"
                onChange={(e) => setMovieTitle(e.target.value)}
                type="text"
                placeholder="Enter title"
                style={{ flex: 2, padding: '5px' }}
              />
            </div>

            {/* Genre */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <label htmlFor="genre" style={{ flex: 1, fontWeight: 'bold' }}>
                Genre:
              </label>
              <DropdownFilterGenre
                id="genre"
                options={genreList.length > 0 ? [{id:null,name:'Select Genre'},...genreList] : ['Loading genres...']}
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)} 
                style={{ flex: 2 }}
              />
            </div>

            {/* Cast Name */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <label htmlFor="cast-name" style={{ flex: 1, fontWeight: 'bold' }}>
                Cast Name:
              </label>
              <input
                id="cast-name"
                onChange={(e) => setCast(e.target.value)}
                type="text"
                placeholder="Enter cast name"
                style={{ flex: 2, padding: '5px' }}
              />
            </div>

            {/* Year */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <label htmlFor="year" style={{ flex: 1, fontWeight: 'bold' }}>
                Year:
              </label>
              <input
                id="year"
                onChange={(e) => setMovieYear(e.target.value)}
                type="text"
                placeholder="Enter year"
                style={{ flex: 2, padding: '5px' }}
              />
            </div>

            {/* Language */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <label htmlFor="language" style={{ flex: 1, fontWeight: 'bold' }}>
                Language:
              </label>
              <DropdownFilterLanguage
                id="language"
                options={languageList.length > 0 ? [{iso_639_1:null,english_name:'Select Language'},...languageList] : ['Loading languages...']}
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)} 
                style={{ flex: 2 }}
              />
            </div>
          </div>

          <button type="submit" style={{ marginTop: '20px', width: '100%' }}>
            Submit
          </button>
        </form>
      </div>
      
  {searchResults?.length === 0 ? (
  <div className="image-section">
    <div className="no-results-message">
    <p>No search performed or no results found. Try adjusting the filters.</p>
    </div>
    <img
      src={Popcorn}
      alt="Popcorn placeholder"
      style={{
        maxWidth: '90%',
        height: 'auto',
        borderRadius: '8px',
        objectFit: 'contain',
      }}
    />
  </div>
) : (
  <div className="results-section">
    <h2>Matching Movies</h2>
    <AdvancedResultList movies={searchResults} />
    {/* Add next and previous bottons with page number */}
    <PageChangeButton prevPage={prevPage} nextPage = {nextPage} page = {page} totalPages ={totalPages}/>
  </div>
)}
    </div>
  );
};

export default AdvancedSearchFilters;
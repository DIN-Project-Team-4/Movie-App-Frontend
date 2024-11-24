import React, { useState, useEffect } from 'react';
import TitleFilter from './TitleFilter.js';
import DropdownFilter from './DropdownFilter.js';
import useMovieSearch from '../../hooks/useMovieSearch.js';
import useAdvanceMovieSearch from '../../hooks/useAdvanceMovieSearch.js';
import Popcorn from '../../assets/Advanced-search.webp'

const AdvancedSearchFilters = () => {
  const [movieTitle,setMovieTitle] = useState("")
  const [movieYear,setMovieYear] = useState("")
  const [cast,setCast] = useState("")
  const {genres,language} = useAdvanceMovieSearch();
  const [genreList, setGenreList] = useState([]);
  const [languageList, setLanguageList] = useState([]);

  // Update genreList when genres are fetched
  useEffect(() => {
    if (genres.length > 0) {
      setGenreList(genres.map((gen) => gen.name)); // Extract names into genreList
    }
  }, [genres]);

  // Update language List when language are fetched
  useEffect(() => {
    if (language.length > 0) {
      setLanguageList(language.map((lan) => lan.english_name)); // Extract names into genreList
    }
  }, [language]);


  return (
    <div className="advanced-search-container">
      {/* Left Section - Form */}
      <div className="form-section">
        <form style={{ width: '100%' }}>
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
              <DropdownFilter
                id="genre"
                options={genreList.length > 0 ? genreList : ['Loading genres...']}
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
              <DropdownFilter
                id="language"
                options={languageList.length > 0 ? languageList : ['Loading languages...']}
                style={{ flex: 2 }}
              />
            </div>
          </div>

          <button type="submit" style={{ marginTop: '20px', width: '100%' }}>
            Submit
          </button>
        </form>
      </div>

      {/* Right Section - Image */}
      <div className="image-section">
        <img
          src={Popcorn}
          alt="Popcorn"
          style={{
            maxWidth: '90%',
            height: 'auto',
            borderRadius: '8px',
            objectFit: 'contain',
          }}
        />
      </div>
    </div>
  );
};

export default AdvancedSearchFilters;
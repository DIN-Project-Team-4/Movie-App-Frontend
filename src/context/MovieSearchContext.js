import React, { createContext, useContext } from 'react';
import useMovieSearch from '../hooks/useMovieSearch.js';

const MovieSearchContext = createContext();

export const MovieSearchProvider = ({ children }) => {
  const movieSearch = useMovieSearch(); 
  return (
    <MovieSearchContext.Provider value={movieSearch}>
      {children}
    </MovieSearchContext.Provider>
  );
};

// Custom hook to use the MovieSearchContext
export const useMovieSearchContext = () => {
  return useContext(MovieSearchContext);
};

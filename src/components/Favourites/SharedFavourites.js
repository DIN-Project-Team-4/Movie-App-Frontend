import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SearchResults from '../Search/SearchResults.js';
import { fetchFavoritesBySharedUserId } from '../Search/searchApi.js';
import MovieListCard from "../Search/MovieListCard.js";
import MovieCard from "../Search/MovieCard.js";

const SharedFavorites = () => {
  const { userId } = useParams();
  const [results, setResults] = useState([]);
  const [genres, setGenres] = useState([]);
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const data = await fetchFavoritesBySharedUserId(userId);
        setResults(data || []);
        setHasFetched(true);
      } catch (error) {
        console.error('Error fetching shared favorites:', error.message);
      }
    };

    fetchFavorites();
  }, [userId]);

  return (
    <div>
      <h2>Shared Favorites</h2>
      {hasFetched ? (
          <div className='main-movieCard'>
            <ul>
              {results.map(movie => <MovieCard movieId={movie.id} movieName={movie.title}
                                                    poster={movie.poster_path} date={movie.release_date}
                                                    commonGenres={genres} movieGenres={movie.genre_ids}/>)}
            </ul>
          </div>
      ) : (
          <p>Loading shared favorites...</p>
      )}
    </div>
  );
};

export default SharedFavorites;

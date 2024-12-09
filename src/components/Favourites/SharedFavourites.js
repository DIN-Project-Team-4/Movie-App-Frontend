import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SearchResults from '../Search/SearchResults.js';
import { fetchFavoritesBySharedUserId } from '../Search/searchApi.js';

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
        <SearchResults
          searchText=""
          results={results}
          genres={genres}
          hasSearched={true}
          prevPage={() => {}}
          nextPage={() => {}}
          page={1}
          totalPages={1}
        />
      ) : (
        <p>Loading shared favorites...</p>
      )}
    </div>
  );
};

export default SharedFavorites;

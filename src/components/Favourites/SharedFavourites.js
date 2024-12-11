import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchFavoritesBySharedUserId } from '../Search/searchApi.js';
import MovieCard from "../Search/MovieCard.js";
import { Button } from "react-bootstrap";
import ToastMessage from "../Common/ToastMessage.js";

const SharedFavorites = () => {
  const { userId } = useParams();
  const [results, setResults] = useState([]);
  const [genres, setGenres] = useState([]);
  const [hasFetched, setHasFetched] = useState(false);
  const [message, setMessage] = useState("");
  const [toastType, setToastType] = useState("");
  const [showToast, setShowToast] = useState(false);

  function handleShareClick() {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl)
    setShowToast(true)
    setMessage("Link for sharing copied to clipboard");
    setToastType("success");
  }

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
      <div className='div-title'>Favourite Movies! <Button variant="outline-secondary" style={{ margin: 10}} onClick={handleShareClick}>Share</Button></div>
      {hasFetched ? (
        <div className='main-movieCard'>
          <ul>
            {results.map(movie => <MovieCard movieId={movie.id} movieName={movie.title}
              poster={movie.poster_path} date={movie.release_date}
              commonGenres={genres} movieGenres={movie.genre_ids} />)}
          </ul>
        </div>
      ) : (
        <p>Loading shared favorites...</p>
      )}
      <ToastMessage
        show={showToast}
        onClose={() => setShowToast(false)}
        message={message}
        toastType={toastType}
      />
    </div>
  );
};

export default SharedFavorites;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Nav } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import MovieCastTab from '../components/MovieTabs/MovieCastTab.js';
import MovieDetailsTab from '../components/MovieTabs/MovieDetailsTab.js';
import MovieShowtimesTab from '../components/MovieTabs/MovieShowtimeTab.js';
import DisplayReview from '../components/Reviews/DisplayReview.js';
import MovieReviewForm from '../components/Reviews/MovieReviewForm.js';
import '../index.css';
import './MovieDetails.css';

const backendUrl = process.env.REACT_APP_API_URL;

const MovieDetails = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [videos, setVideos] = useState([]);
    const [activeTab, setActiveTab] = useState('details');
    const [isFavourite, setIsFavourite] = useState(false); // CHECK IF MOVIE IS ALREADY FAVOURITED BY USER

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await axios.get(`${backendUrl}/api/tmdb/movie/${id}`);
                setMovie(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching movie details:', error.message);
                setError('Failed to load movie details');
                setLoading(false);
            }
        };

        const fetchMovieVideos = async () => {
            try {
                const response = await axios.get(`${backendUrl}/api/tmdb/movie/${id}/videos`);
                setVideos(response.data.results);
            } catch (error) {
                console.error('Error fetching movie trailer:', error.message);
            }
        };

        const fetchFavourites = async () => {
            try {
                const response = await axios.get(`${backendUrl}/favourites`, { withCredentials: true });
                const favourites = response.data;
                //console.log("Favourites array:", favourites); // DEBUGGING

                const isMovieFavourite = favourites.some((fav) => String(fav.id) === String(id));
                setIsFavourite(isMovieFavourite);
                //console.log("Is current movie a favourite?", isMovieFavourite); // DEBUGGING
            } catch (error) {
                console.error('Error fetching favorites:', error.message);
            }
        };


        fetchMovieDetails();
        fetchMovieVideos();
        fetchFavourites();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const trailer = videos.find(video => video.type === 'Trailer' && video.site === 'YouTube');

    return (
        <div className="main-div">
            <div className="div-title">
                {movie.title}
                <span className="movie-details-release-year">
                    ({new Date(movie.release_date).getFullYear()})
                </span>
            </div>
            <Nav className="custom-nav" justify variant="tabs" activeKey={activeTab} onSelect={(selectedKey) => setActiveTab(selectedKey)}>
                <Nav.Item>
                    <Nav.Link eventKey="details">Details</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="cast">Cast</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="showtimes">Showtimes</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="reviews">Reviews</Nav.Link>
                </Nav.Item>
            </Nav>
            <Card className="mt-3 movie-details-card">
                <Card.Body>
                    {activeTab === 'details' && (
                        <MovieDetailsTab
                            movieData={{ ...movie, trailer }}
                            isFavourite={isFavourite}
                            setIsFavourite={setIsFavourite}
                        />

                    )}
                    {activeTab === 'cast' && <MovieCastTab cast={movie.credits?.cast || []} />}
                    {activeTab === 'showtimes' && <MovieShowtimesTab movieTitle={movie.title} />}
                    {activeTab === 'reviews' && (
                        <div className="reviews">
                            <MovieReviewForm movieId={id} movieTitle={movie.title} moviePosterUrl={movie.poster_path} />
                            <DisplayReview movieId={id} />
                        </div>
                    )}
                </Card.Body>
            </Card>
        </div>
    );
};

export default MovieDetails;

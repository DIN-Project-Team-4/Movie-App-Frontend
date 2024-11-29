import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { Card, Nav } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import '../index.css';
import './MovieDetails.css';
import MovieDetailsTab from '../components/MovieTabs/MovieDetailsTab.js';
import MovieCastTab from '../components/MovieTabs/MovieCastTab.js';
import MovieShowtimesTab from '../components/MovieTabs/MovieShowtimeTab.js';
import MovieReviewForm from '../components/Reviews/MovieReviewForm.js';

const backendUrl = process.env.REACT_APP_API_URL;

const MovieDetails = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [videos, setVideos] = useState([]);
    const [activeTab, setActiveTab] = useState('details');

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

        fetchMovieDetails();
        fetchMovieVideos();
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
            <div className='div-title'>{movie.title}</div>
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
                    {activeTab === 'details' && <MovieDetailsTab movieData={{ ...movie, trailer }} />}
                    {activeTab === 'cast' && <MovieCastTab cast={movie.credits?.cast || []} />}
                    {activeTab === 'showtimes' && <MovieShowtimesTab showtimes={[]} />}
                    {activeTab === 'reviews' && (
                        <div className="reviews">
                            <MovieReviewForm movieId={id} />
                        </div>
                    )}
                </Card.Body>
            </Card>
        </div>
    );
};

export default MovieDetails;

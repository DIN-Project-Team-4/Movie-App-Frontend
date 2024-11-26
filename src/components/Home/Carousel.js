import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { getTrendingMovies } from '../Search/searchApi.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Carousel.css'

export default function ImageCarousel() {
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch trending movies on the first render
    useEffect(() => {
        const fetchTrendingMovies = async () => {
            const data = await getTrendingMovies();
            if (data && data.results) {
                setTrendingMovies(data.results);
                setIsLoading(false);
            }
        };
        fetchTrendingMovies();
    }, []);

    return (
        <div className="carousel-main">
            {/* Title Section */}
            <div className="container-title">
                <h2>Trending Movies</h2>
            </div>

            {isLoading ? (
                <p>Loading trending movies...</p>
            ) : (
                <Carousel interval={6000}>
                    {
                        trendingMovies.map((movie) => (
                            <Carousel.Item key={movie.id}>
                                <Link to={`/movie/${movie.id}`}>
                                    {/* Image Section */}
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                                        alt={movie.title}
                                    />

                                    {/* Description Section */}
                                    <Carousel.Caption>
                                        <h3>{movie.title}</h3> <h6 className="release-date">({new Date(movie.release_date).getFullYear()})</h6>
                                        <p className="carousel-summary">{movie.overview}</p>
                                    </Carousel.Caption>
                                </Link>
                            </Carousel.Item>
                        ))
                    }
                </Carousel>
            )}
        </div>
    );
}

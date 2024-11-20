
import React, { useState, useEffect } from 'react';
import { MDBCarousel, MDBCarouselItem } from 'mdb-react-ui-kit';
import { getTrendingMovies } from './API_endpoints.js';

export default function Carousel() {
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
                <MDBCarousel showControls showIndicators={false} interval={5000}>
                    {
                        trendingMovies.map((movie, index) => (
                            <MDBCarouselItem itemId={index + 1} key={movie.id}>
                                <div className='movie-info-container'>
                                    {/* Image Section */}
                                    <div className="img-container">
                                        <img
                                            src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                                            className="img-fluid"
                                            alt={movie.title}
                                        />
                                    </div>

                                    {/* Description Section */}
                                    <div className="description-container">
                                        <h3>{movie.title} <h6 className="release-date">({new Date(movie.release_date).getFullYear()})</h6></h3>
                                        <p className="carousel-summary">{movie.overview}</p>
                                    </div>
                                </div>
                            </MDBCarouselItem>
                        ))
                    }
                </MDBCarousel>
            )
            }
        </div>
    );
}

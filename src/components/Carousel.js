
import React, { useState, useEffect } from 'react';
import { MDBCarousel, MDBCarouselItem} from 'mdb-react-ui-kit';
import './Carousel.css'
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

    console.log(trendingMovies);

    return (
        <div className="mx-4 mx-md-5" id= "carousel_main">
            <h2>Trending Movies: </h2>
            {isLoading ? (
                <p>Loading trending movies...</p>
            ) : (
                <MDBCarousel showControls showIndicators={false} interval={2000} className='trend_container'>
                    {
                    trendingMovies.map((movie, index) => (
                        <MDBCarouselItem itemId={index + 1} key={movie.id}>
                        <div className="d-flex flex-column flex-md-row align-items-center carousel-item-custom" id= 'movie_Info_container'>
                            {/* Image Section */}
                            <div className="w-100 w-md-60 img-container" >
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                                    className="img-fluid"
                                    alt={movie.title}
                                />
                            </div>

                            {/* Description Section */}
                            <div className="w-100 w-md-50 p-3 description-container" id = 'movie_detail_box'>
                                <h5>{movie.title} <h6 className="release-date">({new Date(movie.release_date).getFullYear()})</h6></h5>
                                <p>{movie.overview}</p>
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

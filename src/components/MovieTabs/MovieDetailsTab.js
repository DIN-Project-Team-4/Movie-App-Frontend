import React from 'react';
import { Button } from 'react-bootstrap';

const MovieDetailsTab = ({ movieData }) => {
    if (!movieData) {
        return <p>Loading...</p>;
    }

    return (
        <div className="movie-details-tab">
            <img className='movie-poster' src={`https://image.tmdb.org/t/p/w500/${movieData.poster_path}`} alt={`${movieData.title} poster`} />
            <div className='movie-details'>
                {movieData.trailer && (
                    <div className="movie-trailer">
                        <iframe
                            className='trailer-video'
                            title="YouTube Trailer"
                            src={`https://www.youtube-nocookie.com/embed/${movieData.trailer.key}`}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                )}
                <div className="genres">
                    {movieData.genres.map(genre => (
                        <Button key={genre.id} variant="outline-*" className="genre-button" disabled>
                            {genre.name}
                        </Button>
                    ))}
                </div>
                <p><strong>Duration:</strong> {movieData.runtime} minutes</p>
                <p className="movie-summary">{movieData.overview}</p>
            </div>

        </div>
    );
};

export default MovieDetailsTab;

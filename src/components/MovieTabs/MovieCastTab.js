import React from 'react';
import { Card } from 'react-bootstrap';

const MovieCastTab = ({ cast }) => {
    return (
        <div className="movie-cast-tab">
            {cast.slice(0, 10).map(actor => (
                <Card className='custom-cast-card' key={actor.id}>
                    <Card.Img variant='top'
                        src={actor.profile_path ? `https://image.tmdb.org/t/p/w185/${actor.profile_path}` : 'https://via.placeholder.com/185x278?text=No+Image'}
                        alt={`${actor.name}`}
                    />
                    <Card.ImgOverlay>
                        <Card.Title className='custom-cast-title'>{actor.name}</Card.Title>
                    </Card.ImgOverlay>
                    <Card.Body>
                        <Card.Text>as <br/ > {actor.character}</Card.Text>
                    </Card.Body>
                </Card>
            ))}
        </div>
    );
};

export default MovieCastTab;

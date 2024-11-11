import { useState,useEffect } from 'react';
import posterPlaceholder from '../assets/image_unavailable.jpg'

export default function MovieCard({movieName, poster, date, commonGenres, movieGenres}) {
    const mainURL = "https://image.tmdb.org/t/p/w500";
    const [genreName,setGenreName] = useState([])

        useEffect(() => {
            // Map genre IDs to names once when `commonGenres` or `movieGenres` change
            const names = movieGenres.map(id => {
                const genre = commonGenres.find(item => item.id === id);
                return genre ? genre.name : null;
            }).filter(Boolean); // filter out null values
            setGenreName(names);
        }, [commonGenres, movieGenres]);


    return (
      <li className='movieLiTag'>
        <img src={poster == null ? posterPlaceholder : mainURL+poster}/>
        <div className='movieDetails'>
            <h3>{movieName}</h3>
            {date}<br/>
            {genreName.join(", ")}                             
        </div>        
      </li>
    )
}


import { useState, useEffect } from 'react';
import { getGenreName } from '../components/Search/searchApi.js';
import { getLanguageName, getCastIDs, searchAdvanced } from '../components/AdvancedSearch/AdvanceSearchApi.js';

function useAdvanceMovieSearch(){
    const [genres, setGenres] = useState([]);
    const [language, setLanguage] = useState([]);

    // Fetch genres on first render
    useEffect(() => {
        const fetchGenres = async () => {
        const data = await getGenreName();
        if (data) {
            setGenres(data.genres);
        }
        };
        fetchGenres();
    }, []);

    // Fetch languages on first render
    useEffect(() => {
        const fetchLanguage = async () => {
        const data = await getLanguageName();
        if (data) {
            setLanguage(data);
        }
        };
        fetchLanguage();
    }, []);

    //
    async function searchForResults(title, genre, cast, year, language) {
        const data = await getCastIDs(cast)
        const castIds = data.castIds
        const castIdstring = castIds.join('|')

        const genreNames = await getGenreName()
        const movieData = await searchAdvanced(title, genre, castIdstring, year, language, 1)
        const totalPages = (movieData.total_pages > 500) ? 500 : movieData.total_pages // tmdb only provides 10000 results (500 pages) from any given endpoint
        const movies = movieData.results
        
        let matchingMovies = filterMoviesByName(title, movies)

        for (let page=2; page<totalPages; page++) {
            const pageData = await searchAdvanced(title, genre, castIdstring, year, language, page)
            const pageMovies = pageData.results
            const movies = filterMoviesByName(title, pageMovies)
            matchingMovies.push(...movies)
        }

        return matchingMovies
    }

    function filterMoviesByName(name, movies) {
        let matchingMovies = []
        for (let movie=0; movie<movies.length; movie++) {
            let movieName = movies[movie].title
            if (movieName.toLowerCase().includes(name.toLowerCase())) {
                matchingMovies.push(movies[movie])
            }
        }
        return matchingMovies
    }

    return {        
        genres,
        language,
        searchForResults,        
      };
}



export default useAdvanceMovieSearch;
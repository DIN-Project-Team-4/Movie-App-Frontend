import { useState, useEffect } from 'react';
import { getGenreName } from '../components/Search/searchApi.js';
import { getLanguageName, getCastIDs, searchAdvanced } from '../components/AdvancedSearch/AdvanceSearchApi.js';

function useAdvanceMovieSearch(){
    const [genres, setGenres] = useState([]);
    const [language, setLanguage] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [results, setResults] = useState([]);
    // title, genre, cast, year, language
    const [title, setTitle] = useState("")
    const [cast, setCast] = useState("")
    const [year, setYear] = useState("")
    const [genre, setGenre] = useState("")
    const [lang, setLang] = useState("")

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

    async function newAdvancedSearch(title, genre, cast, year, language) {
        setTitle(title)
        setCast(cast)
        setYear(year)
        await searchForResults(title, genre, cast, year, language)
    }

    //
    async function searchForResults(title, genre, cast, year, lang) {
        setTitle(title)
        setCast(cast)
        setYear(year)
        setGenre(genre)
        setLang(lang)

        const resultsPerPage = 20
        const data = await getCastIDs(cast)
        const castIds = data.castIds
        const castIdstring = castIds.join('|')
        let matchingMovies = []

        const genreNames = await getGenreName()
        let tmdbPage = 1
        const movieData = await searchAdvanced(title, genre, castIdstring, year, lang, tmdbPage)
        const totalPagesNow = (movieData.total_pages > 500) ? 500 : movieData.total_pages // tmdb only provides 10000 results (500 pages) from any given endpoint
        setTotalPages(totalPagesNow)
        const movies = movieData.results
        
        matchingMovies = filterMoviesByName(title, movies)
        let displayMovies = []

        while (matchingMovies.length < page*resultsPerPage && tmdbPage < totalPagesNow) {
            tmdbPage++
            const pageData = await searchAdvanced(title, genre, castIdstring, year, lang, page)
            const pageMovies = pageData.results
            const movies = filterMoviesByName(title, pageMovies)
            matchingMovies.push(...movies)
        }

        const displayStartIndex = (page-1)*resultsPerPage
        const displayEndIndex = Math.min(matchingMovies.length, page*resultsPerPage)
        displayMovies = matchingMovies.slice(displayStartIndex, displayEndIndex)
        
        setResults(displayMovies)

        return displayMovies
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

    useEffect(() => {
        // Refetch results when the page changes
        if (title || genre || cast || year || lang) {
            searchForResults(title, genre, cast, year, lang);
        }
    }, [page]);

    function nextPage() {
        setPage((currentPage) => Math.min(currentPage + 1, totalPages));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function prevPage() {
        setPage((currentPage) => Math.max(currentPage - 1, 1));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    return {        
        genres,
        language,
        newAdvancedSearch,
        searchForResults,
        results,
        prevPage,
        nextPage,
        page,
        totalPages,
      };
}

export default useAdvanceMovieSearch;

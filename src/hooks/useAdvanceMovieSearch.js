import { useState, useEffect } from 'react';
import { getGenreName } from '../components/searchApi.js';
import { getLanguageName } from '../components/Advance_search/AdvanceSearchApi.js';

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


    return {        
        genres,
        language        
      };
}

export default useAdvanceMovieSearch;
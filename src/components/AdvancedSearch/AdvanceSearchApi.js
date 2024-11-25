import axios from 'axios'

const url = process.env.REACT_APP_API_URL

// Function to get the list of languages from backend
async function getLanguageName() {
  try {
    const response = await axios.get(`${url}/api/tmdb/language`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Language:', error.message);
    return null;
  }
}

// Function to get the list of possible cast member IDs from backend
async function getCastIDs(castName) {
  try {
    const response = await axios.get(`${url}/api/tmdb/cast`, {
      params: {
        castName
      },
    });
    return response.data
  } catch (error) {
    console.error('Error fetching possible cast member IDs:', error.message);
    return null;
  }
}

// Function to get the list of movies by advance search from backend
async function searchAdvanced(title, genre, cast, year, language, page) {
  try {
    const response = await axios.get(`${url}/api/tmdb/search/advance`, {
      params: {
        title,
        genre,
        cast,
        year,
        language,
        page,
      },
    });
    return response.data
  } catch (error) {
    console.error('Error fetching movies by advance search:', error.message);
    return null;
  }
}

export { getLanguageName, getCastIDs, searchAdvanced }

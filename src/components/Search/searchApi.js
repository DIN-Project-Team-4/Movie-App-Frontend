import axios from 'axios'

const url = process.env.REACT_APP_API_URL

// Function to get trending movies from backend
async function getTrendingMovies() {
  try {
    const response = await axios.get(`${url}/api/tmdb/trendingmovies`);
    return response.data;
  } catch (error) {
    console.error('Error fetching trending movies:', error.message);
    return null;
  }
}

// Function to get the list of genres from backend
async function getGenreName() {
  try {
    const response = await axios.get(`${url}/api/tmdb/genres`);
    return response.data;
  } catch (error) {
    console.error('Error fetching genres:', error.message);
    return null;
  }
}

// Function to search movies by title
async function searchByTitle(searchText, page) {
  try {
    const response = await axios.get(`${url}/api/tmdb/search/bytitle`, {
      params: {
        searchText,
        page,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching movies by title:', error.message);
    return null;
  }
}

// Function to search movies by year
async function searchByYear(searchText, page) {
  
  const year = Number(searchText);

  if (isNaN(year) || !Number.isInteger(year)) {
      return { error: 'Invalid year: must be a valid number' };
  }
  
  const currentYear = new Date().getFullYear();

  if (searchText > currentYear || searchText < 1885) {
      return { error: 'Invalid year' };
  }

  try {
    const response = await axios.get(`${url}/api/tmdb/search/byyear`, {
      params: {
        searchText,
        page,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching movies by year:', error.message);
    return null;
  }
}


// Function to search movies by genre
async function searchByGenre(searchText, genres, page) {
  const genreIds = [];

  genres.forEach((item) => {
    if (searchText.toLowerCase().includes(item.name.toLowerCase())) {
      genreIds.push(item.id); // Push matching genre IDs to the genreIds array
    }
  });

  const genreIdsConcat = genreIds.join()

  if (genreIds.length === 0) {
    return { error: 'Invalid genre' }
  }

  try {
    const response = await axios.get(`${url}/api/tmdb/search/bygenre`, {
      params: {
        genreIdsConcat,
        page,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching movies by genre:', error.message);
    return null;
  }
}

// Function to get trending celebrities from backend
async function getTrendingCelebrities() {
  try {
    const response = await axios.get(`${url}/api/tmdb/trendingcelebrities`);
    return response.data;
  } catch (error) {
    console.error('Error fetching trending celebrities:', error.message);
    return null;
  }
}

// Function to fetch favorites list for a shared user ID
async function fetchFavoritesBySharedUserId(userId) {
  try {
    const response = await axios.get(`${url}/favourites/share/${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching favorites for user ${userId}:`, error.message);
    return null;
  }
}

export { getGenreName, searchByTitle, searchByYear, searchByGenre, getTrendingMovies, getTrendingCelebrities, fetchFavoritesBySharedUserId  }

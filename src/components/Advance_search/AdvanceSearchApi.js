import axios from 'axios'

const url = process.env.REACT_APP_API_URL

// Function to get the list of genres from backend
async function getLanguageName() {
  try {
    const response = await axios.get(`${url}/api/tmdb/language`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Language:', error.message);
    return null;
  }
}


export { getLanguageName }

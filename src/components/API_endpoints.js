const API_KEY = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZDQ1ZjdkZTdjNGUzYmY5NzQ3MGM5MWYwYWE4ZWI2MyIsIm5iZiI6MTczMTE4ODEwNi45OTM1ODU2LCJzdWIiOiI2NzJiYjU5YmFkY2EzMDc5MjUxNDQ5NmQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.RBOeIqSXtek2lgYSvqI6QsewM_GwhaToeeNRVLAYClc';

//to get trending movies API endpoint
async function getTrendingMovies() {
  const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: API_KEY
      }
    };
    
      try {
          const response = await fetch(
            `https://api.themoviedb.org/3/trending/movie/day?language=en-US`,
            options
          );
          const data = await response.json();
          return data;
        } catch (error) {
          console.error(error);
          return null;
        }
}
//to search by year API endpoint

async function getGenreName() {
  const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: API_KEY
      }
    };
    
      try {
          const response = await fetch(
            `https://api.themoviedb.org/3/genre/movie/list?language=en`,
            options
          );
          const data = await response.json();
          return data;
        } catch (error) {
          console.error(error);
          return null;
        }
}


//to search by title API endpoint
async function searchByTitle(searchText, page) {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: API_KEY
    }
  };

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${searchText}&include_adult=false&language=en-US&page=${page}`,
      options
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}


//to search by year API endpoint

async function searchByYear(searchText, page) {
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: API_KEY
        }
      };
      
        try {
            const response = await fetch(
              `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&primary_release_year=${searchText}&sort_by=popularity.desc`,
              options
            );
            const data = await response.json();
            return data;
          } catch (error) {
            console.error(error);
            return null;
          }
}


//to search by genre API endpoint

async function searchByGenre(searchText, genres, page) {
  const genreIds = [];

  genres.filter((item) => {
    if (searchText.toLowerCase().includes(item.name.toLowerCase())) {
      genreIds.push(item.id); // Push matching genre IDs to the genreIds array
    }
  });

  if (genreIds.length === 0) {
    return {
      total_pages: 0,
      results: []
    };
  }

  const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: API_KEY
      }
    };
    
      try {
          const response = await fetch(
            `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genreIds.join()}`,
            options
          );
          const data = await response.json();
          return data;
        } catch (error) {
          console.error(error);
          return null;
        }
}




export { getGenreName, searchByTitle, searchByYear, searchByGenre, getTrendingMovies }
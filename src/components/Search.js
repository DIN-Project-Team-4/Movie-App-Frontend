import React, { useState,useEffect } from 'react'
import MovieListCard from './MovieListCard'
import PageChangeButton from './PageChangeButton'

export default function Search() {
  const [filterMethod, setFilterMethod] = useState('all')
  const [searchText, setSearchText] = useState('')
  const [page, setPage] = useState(1)
  const [results, setResults] = useState([])
  const [totalPages,setTotalPages] = useState(0)
  const [genres,setGenres] = useState([])

  //fetch genres details when first render and assign to variable
  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZDQ1ZjdkZTdjNGUzYmY5NzQ3MGM5MWYwYWE4ZWI2MyIsIm5iZiI6MTczMTE4ODEwNi45OTM1ODU2LCJzdWIiOiI2NzJiYjU5YmFkY2EzMDc5MjUxNDQ5NmQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.RBOeIqSXtek2lgYSvqI6QsewM_GwhaToeeNRVLAYClc'
      }
    };
    
    fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options)
      .then(res => res.json())
      .then(data => setGenres(data.genres))
      .catch(err => console.error(err));
  }, []);

  function searchMovies(e){
      e.preventDefault()
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZDQ1ZjdkZTdjNGUzYmY5NzQ3MGM5MWYwYWE4ZWI2MyIsIm5iZiI6MTczMTE4ODEwNi45OTM1ODU2LCJzdWIiOiI2NzJiYjU5YmFkY2EzMDc5MjUxNDQ5NmQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.RBOeIqSXtek2lgYSvqI6QsewM_GwhaToeeNRVLAYClc'
        }
      };
      
      fetch(`https://api.themoviedb.org/3/search/movie?query=${searchText}&include_adult=false&language=en-US&page=${page}`, options)
        .then(res => res.json())
        .then(data => {
          setTotalPages(data.total_pages)
          setResults(data.results)
          console.log(data.results)
        })
        .then(res => console.log(res))
        .catch(err => console.error(err));
        
  }

  //function for new search click. page number resets when it calls
  function newSearch(e){
    e.preventDefault();
    setPage(1)
    searchMovies(e)
  }

  

  React.useEffect(() => {
    if (searchText) {
        searchMovies({ preventDefault: () => {} });
    }
  }, [page]);

  //function to go to next page
  function nextPage() {
    setPage(currentPage => Math.min(currentPage + 1, totalPages)) // Prevent going exceed total pages
  }

  //function to go to previous page
  function prevPage() {
      setPage(currentPage => Math.max(currentPage - 1, 1)) // Prevent going below page 1
  }


  return (
    <div>

      {/* Search bar */}
      <form className='form-container'>
          <select onChange={(e)=>setFilterMethod(e.target.value)} id='filter_methods'>
              <option value="title"> Title </option>
              <option value="release_year"> Year </option>
              <option value="genre"> Genre </option>
          </select>
          <input onChange = {(e) => setSearchText(e.target.value)} type='text' placeholder='Search here'/>
          <button onClick={newSearch}>Search</button>
      </form>
      
      {/* Conditionally render the MovieListCard component only after search result available*/}
      {results.length>0 ? (
        <div>
          <MovieListCard searchText = {searchText} movieDetails = {results} genres = {genres}/>
        </div>
      ):<></>}

      {/* Add next and previous bottons with page number */}
      <PageChangeButton prevPage={prevPage} nextPage = {nextPage} page = {page} totalPages ={totalPages}/>

    </div>
  )
}

import { useState,useEffect } from 'react'
import MovieListCard from './MovieListCard'
import PageChangeButton from './PageChangeButton'
import {getGenreName, searchByTitle, searchByYear, searchByGenre} from './API_endpoints.js'

export default function Search() {
  const [filterMethod, setFilterMethod] = useState('title')
  const [searchText, setSearchText] = useState('')
  const [page, setPage] = useState(1)
  const [results, setResults] = useState([])
  const [totalPages,setTotalPages] = useState(0)
  const [genres,setGenres] = useState([])
  const [hasSearched, setHasSearched] = useState(false);

  //fetch genres details when first render and assign to variable
  useEffect(() => {
    const fetchGenres = async () => {
      const data = await getGenreName();
      if (data) {
        setGenres(data.genres);
      }
    };
    fetchGenres();
  }, []);

  async function searchMovies(e){
    e.preventDefault()
    console.log(filterMethod)
    let data = []
    switch (filterMethod){
      case 'title': data = await searchByTitle(searchText, page)
      break;

      case 'release_year': data = await searchByYear(searchText, page)
      break;

      case 'genre': data = await searchByGenre(searchText, genres, page)
      break;

      default:data = { results: [], total_pages: 0 }; // Default action in case filterMethod has an unexpected value
      break;
    }
      
    if(data.results){
      setTotalPages(data.total_pages)
      setResults(data.results)
    }
    else {
      setTotalPages(0);
      setResults([]); // Set results to an empty array if no data or results
    }
  }
    

  //function for new search click. page number resets when it calls
  function newSearch(e){
    e.preventDefault();
    setHasSearched(true); // Mark that a search has been performed
    setPage(1)
    searchMovies(e)
  }

  

  useEffect(() => {
    if (searchText) {
        searchMovies({ preventDefault: () => {} });
    }
  },[page]);

  //function to go to next page
  function nextPage() {
    setPage(currentPage => Math.min(currentPage + 1, totalPages)) // Prevent going exceed total pages
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Smooth scroll to top
  }

  //function to go to previous page
  function prevPage() {
      setPage(currentPage => Math.max(currentPage - 1, 1)) // Prevent going below page 1
      window.scrollTo({ top: 0, behavior: 'smooth' }); // Smooth scroll to top
  }


  return (
    <div>

      {/* Search bar */}
      <form className='form-container'>
          <select onChange={(e)=>{setFilterMethod(e.target.value)
            console.log('Selected filter:', e.target.value);
          }} id='filter_methods' value={filterMethod} >
              <option value="title"> Title </option>
              <option value="release_year"> Year </option>
              <option value="genre"> Genre </option>
          </select>
          <input onChange = {(e) => setSearchText(e.target.value)} type='text' placeholder='Search here'/>
          <button onClick={newSearch}>Search</button>
      </form>
      
      {/* Conditionally render the MovieListCard component only after search result available*/}
        <div>
          <MovieListCard searchText = {searchText} movieDetails = {results} genres = {genres} hasSearched={hasSearched}/>
        </div>

      {/* Add next and previous bottons with page number */}
      {results.length>0 ? (
        <div>
          <PageChangeButton prevPage={prevPage} nextPage = {nextPage} page = {page} totalPages ={totalPages}/>
        </div>
      ):<></>}     

    </div>
  )
}

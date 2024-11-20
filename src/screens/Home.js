import SearchResults from '../components/SearchResults';
import Header from '../components/Header.js';
import Carousel from '../components/Carousel.js';
import useMovieSearch from '../hooks/useMovieSearch.js';
import Celebrities from '../components/Celebrities.js'
import Footer from '../components/Footer.js';


function Home() {
  const {
    filterMethod,
    setFilterMethod,
    searchText,
    setSearchText,
    results,
    totalPages,
    page,
    genres,
    hasSearched,
    newSearch,
    nextPage,
    prevPage,
  } = useMovieSearch();
  

  return (
    <div>
      <div class="fixed-top">
        <Header filterMethod={filterMethod}
          setFilterMethod={setFilterMethod}
          searchText={searchText}
          setSearchText={setSearchText}
          newSearch={newSearch}
        />       
      </div>

      <div>
        {/* Conditionally render SearchResults or Carousel */}
        {results.length > 0 ? (
          <SearchResults
            searchText={searchText}
            results={results}
            genres={genres}
            hasSearched={hasSearched}
            prevPage={prevPage}
            nextPage={nextPage}
            page={page}
            totalPages={totalPages}
          />
        ) : (
          <div className='main-div'>
            <Carousel />
            <Celebrities/>
          </div>
        )}
      </div>

      <Footer/>

    </div>
  );
}

export default Home;

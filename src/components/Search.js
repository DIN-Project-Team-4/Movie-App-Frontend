import React from 'react';

export default function Search({ filterMethod, setFilterMethod, searchText, setSearchText, newSearch }) {
  return (
    <div>
      <form className='form-container'>
        <select 
          onChange={(e) => {
            setFilterMethod(e.target.value);
          }}
          id='filter_methods'
          value={filterMethod}
        >
          <option class="dropdown-item" value="title">Title</option>
          <option class="dropdown-item" value="release_year">Year</option>
          <option class="dropdown-item" value="genre">Genre</option>
        </select>
        <input
          onChange={(e) => setSearchText(e.target.value)}
          value={searchText}
          type='text'
          placeholder='Search here'
        />
        <button onClick={newSearch}>Search</button>
      </form>
    </div>
  );
}
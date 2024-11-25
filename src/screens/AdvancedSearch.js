import React from 'react';
import './AdvancedSearch.css';
import AdvancedSearchFilters from '../components/Advance_search/AdvancedSearchFilters.js';

export default function AdvancedSearch() {
  return (

    <div className='main-div'>
      <h2>Advanced Title Search</h2>
      <p>
        Easily find movies with our simple search tool. You can combine different filters like genre, release year, cast, and more. Want to find comedies from the 2000s? You can do that! Just enter your preferences below, and hit "Search." At least one filter is required to start. Press "Enter" to search.
      </p>
      <div>
        <AdvancedSearchFilters />
      </div>
    </div>

  );
}

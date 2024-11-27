import React from 'react';
import { Form, FormControl, Button, InputGroup, Dropdown, DropdownButton } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


export default function Search({ filterMethod, setFilterMethod, searchText, setSearchText, newSearch }) {
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    newSearch(e);
    if (searchText.trim() === '') {
      // If search text is empty, navigate without the query parameter
      navigate('/search');
    } else {
      // Otherwise, include the search term and filter method in the query parameter
      navigate(`/search?query=${encodeURIComponent(searchText)}&filter=${encodeURIComponent(filterMethod)}`);
    }
  };

  //Handle advanced search dropdown option
  const handleAdvancedSearch = () => {    
    navigate('/advanced-search');// Navigate to the advanced search page
  };

  return (
    <Form onSubmit={handleSearch}>
      <InputGroup>
        <DropdownButton
          as={InputGroup.Prepend}
          title={filterMethod === "title" ? "Title" : filterMethod === "release_year" ? "Year" : "Genre"}
          id="filter_methods"
          onSelect={(eventKey) => setFilterMethod(eventKey)}
          variant="outline-*"
        >
          <Dropdown.Item eventKey="title">
            <i className="fas fa-film" style={{ marginRight: '9px' }}></i>
            Title
          </Dropdown.Item>
          <Dropdown.Item eventKey="release_year">
            <i className="fas fa-calendar-alt" style={{ marginRight: '9px' }}></i>
            Year
          </Dropdown.Item>
          <Dropdown.Item eventKey="genre">
            <i className="fas fa-theater-masks" style={{ marginRight: '8px' }}></i>
            Genre
          </Dropdown.Item>
          <Dropdown.Item onClick={handleAdvancedSearch}>
            <i className="fas fa-search" style={{ marginRight: '9px' }}></i>
            Advanced Search 
            <span className="arrow" style={{ marginLeft: '8px' }}>›</span>
          </Dropdown.Item> 
        </DropdownButton>

        <FormControl
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search here"
        />

        <Button type="submit" variant="outline-*">Search</Button>
      </InputGroup>
    </Form>
  );
}

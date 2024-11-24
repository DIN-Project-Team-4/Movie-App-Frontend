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

  return (
    <Form onSubmit={handleSearch}>
      <InputGroup>
        <DropdownButton
          as={InputGroup.Prepend}
          title={filterMethod === "title" ? "Title" : filterMethod === "release_year" ? "Year" : "Genre"}
          id="filter_methods"
          onSelect={(eventKey) => setFilterMethod(eventKey)}
          variant="outline-dark"
        >
          <Dropdown.Item eventKey="title">Title</Dropdown.Item>
          <Dropdown.Item eventKey="release_year">Year</Dropdown.Item>
          <Dropdown.Item eventKey="genre">Genre</Dropdown.Item>
        </DropdownButton>

        <FormControl
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search here"
        />

        <Button type="submit" variant="outline-dark">Search</Button>
      </InputGroup>
    </Form>
  );
}

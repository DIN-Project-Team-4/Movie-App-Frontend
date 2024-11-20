import React from 'react';
import { Form, FormControl, Button, InputGroup, Dropdown, DropdownButton } from 'react-bootstrap';

export default function Search({ filterMethod, setFilterMethod, searchText, setSearchText, newSearch }) {
  return (
    <Form onSubmit={(e) => { e.preventDefault(); newSearch(e); }}>
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

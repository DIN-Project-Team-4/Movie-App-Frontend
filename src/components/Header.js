import React from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Logo from '../assets/logo_full.png';
import Search from './Search.js';

const Header = ({
  filterMethod,
  setFilterMethod,
  searchText,
  setSearchText,
  newSearch,
  showSearchBox = true,
  showDropdownMenu = true,
}) => {

  /* THIS CONTROLS THE NAV LINKS, ONLY CHANGE THIS FOR ADDING A PAGE*/
  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/reviews', label: 'Reviews' },
    //{ href: '/', label: 'Test' }, //This is an example, uncomment to use
    //{ href: '/', label: 'Test' }, //This is an example, uncomment to use
    { href: '/groups', label: 'Groups' }
    ,
  ];

  /* THIS CONTROLS THE USER SETTINGS MENU, ONLY CHANGE THIS FOR ADDING SETTINGS*/
  const dropdownItems = [
    { href: '/mygroups', label: 'My Groups' },
    { href: '/profile', label: 'My Profile' },
    { href: '/settings', label: 'Settings' },
  ];

  /* DO NOT TOUCH ANYTHING BELOW, UNLESS YOU KNOW WHAT YOU'RE DOING!!! */
  return (
    <Navbar fixed="top" expand="md" style={{ fontSize: '1.2rem' }}>
      <Container fluid>
        {/*CineScope Logo always visible*/}
        <Navbar.Brand href="/">
          <img src={Logo} alt="logo" className="navbar-logo" />
        </Navbar.Brand>
        
          <Nav variant="underline" className="w-100">

            {/*When navbar gets small, this triggers*/}
            <Navbar.Toggle aria-controls="cinescope-navbar" />

            <Nav className="me-auto">
              <Navbar.Collapse id="cinescope-navbar">
              {/*Nav menu link*/}
                {navLinks.map((link) => (
                  <Nav.Link href={link.href}>
                    {link.label}
                  </Nav.Link>
                ))}
              </Navbar.Collapse>
            </Nav>

            {/*Searchbar*/}
            {showSearchBox && (
              <Nav className="mx-auto">
                <Nav.Item>
                  <Search
                    filterMethod={filterMethod}
                    setFilterMethod={setFilterMethod}
                    searchText={searchText}
                    setSearchText={setSearchText}
                    newSearch={newSearch}
                  />
                </Nav.Item>
              </Nav>
            )}

            <Nav className="ms-auto">
              <Nav.Item>
                <Nav.Link href="/login">Sign In</Nav.Link>
              </Nav.Item>

              {showDropdownMenu && (
                <NavDropdown align="end" title={<i className="bi bi-person-circle" />}>
                  {dropdownItems.map((item) => (
                    <NavDropdown.Item href={item.href} key={item.href}>
                      {item.label}
                    </NavDropdown.Item>
                  ))}
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/logout" key="/logout">
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Nav>
        </Container>
    </Navbar>
  );
};

export default Header;

import 'bootstrap-icons/font/bootstrap-icons.css';
import React, { useState } from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/logo_full.png';
import { useMovieSearchContext } from '../context/MovieSearchContext.js';
import './Header.css';
import Search from './Search/Search.js';
import SignInModal from './Sign-In/SignInModal.js';

const Header = ({ showSearchBox = true, showDropdownMenu = true }) => {
  const navigate = useNavigate();
  const {
    filterMethod,
    setFilterMethod,
    searchText,
    setSearchText,
    newSearch,
  } = useMovieSearchContext();

  const [showSignInModal, setShowSignInModal] = useState(false);
  const handleSignInShow = () => setShowSignInModal(true);
  const handleSignInClose = () => setShowSignInModal(false);

  // Handle LogOut
  const handleLogout = () => {
    localStorage.clear();
    document.cookie.split(';').forEach((cookie) => {
      const tokens = cookie.split('=')[0].trim();
      document.cookie = `${tokens}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    });
    navigate('/');
  };

  // Retrieve user data from local storage
  const userData = JSON.parse(localStorage.getItem('userData'));

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/reviews', label: 'Reviews' },
    { href: '/groups', label: 'Groups' },
  ];

  const dropdownItems = userData
    ? [
        { href: '/profile', label: 'My Profile' },
        { href: '/groups/mygroups', label: 'My Groups' },
        { href: `/share-favourites/${userData.userId}`, label: 'My Favorites' },
      ]
    : [];

  return (
    <>
      <Navbar className="custom-navbar" fixed="top">
        <Container fluid>
          <Navbar.Brand href="/">
            <img src={Logo} alt="logo" className="navbar-logo" />
          </Navbar.Brand>
          <Nav variant="underline" className="w-100 d-flex align-items-center">
            {navLinks.map((link) => (
              <Nav.Link href={link.href} key={link.href}>
                {link.label}
              </Nav.Link>
            ))}
            {showSearchBox && (
              <div className="ms-auto custom-searchbox">
                <Search
                  filterMethod={filterMethod}
                  setFilterMethod={setFilterMethod}
                  searchText={searchText}
                  setSearchText={setSearchText}
                  newSearch={newSearch}
                />
              </div>
            )}
            <div className="ms-auto d-flex align-items-center">
              {userData ? (
                <>
                  <span className="me-3">
                    Welcome,
                    <br /> {userData.username}!
                  </span>
                  {showDropdownMenu && (
                    <NavDropdown align="end" title={<i className="bi bi-person-circle" />} menuVariant="dark">
                      {dropdownItems.map((item) => (
                        <NavDropdown.Item href={item.href} key={item.href}>
                          {item.label}
                        </NavDropdown.Item>
                      ))}
                      <NavDropdown.Divider />
                      <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                    </NavDropdown>
                  )}
                </>
              ) : (
                <Nav.Link onClick={handleSignInShow}>Sign In</Nav.Link>
              )}
            </div>
          </Nav>
        </Container>
      </Navbar>

      {/* SignIn modal */}
      <SignInModal show={showSignInModal} handleClose={handleSignInClose} />
    </>
  );
};

export default Header;

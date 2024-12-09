import 'bootstrap-icons/font/bootstrap-icons.css';
import React, { useState } from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/logo_full.png';
import { useMovieSearchContext } from '../context/MovieSearchContext.js';
import './Header.css';
import Search from './Search/Search.js';
import SignInModal from './Sign-In/SignInModal.js';
import ToastMessage from "./Common/ToastMessage.js";

const Header = ({ showSearchBox = true, showDropdownMenu = true }) => {
  const navigate = useNavigate(); // Initialize navigate hook
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
  const [loginstatus, setLoginstatus] = useState(true);

  // LOG OUT STATES
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");

  //Shared favourites link
  const [sharedFavorites, setSharedFavorites] = useState([]);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/reviews', label: 'Reviews' },
    { href: '/groups', label: 'Groups' },
  ];

  const dropdownItems = [
    { href: 'groups/mygroups', label: 'My Groups' },
    { href: '/profile', label: 'My Profile' },
    // Removed "Settings" and replaced with "Share List"
  ];

  // Handle Logout
  const handleLogout = () => {
    localStorage.clear();
    setLoginstatus(true);
    document.cookie.split(";").forEach((cookie) => {
      const tokens = cookie.split("=")[0].trim();
      document.cookie = `${tokens}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    });

    setToastMessage("You have successfully logged out.");
    setToastType("success");
    setShowToast(true);
    navigate("/");
  };

  // Retrieve user data
  const userData = JSON.parse(localStorage.getItem("userData"));

  // Copy the shareable link
  const handleShareList = async () => {
    if (!userData || !userData.userId) {
      setToastMessage('You must be logged in to share your list.');
      setToastType('warning');
      setShowToast(true);
      return;
    }

    // Copy the share link
    const shareUrl = `http://localhost:3000/share-favourites/${userData.userId}`;
    navigator.clipboard.writeText(shareUrl);
    setToastMessage('Share link copied to clipboard!');
    setToastType('success');
    setShowToast(true);

    // Fetch the user's favorites
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/favourites`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      const data = await response.json();
      setSharedFavorites(data); // Store the favorites
    } catch (error) {
      console.error('Error fetching favorites:', error);
      setToastMessage('Failed to fetch favorites.');
      setToastType('danger');
      setShowToast(true);
    }
  };


  return (
    <>
      <Navbar className="navbar-style" fixed="top" expand="md" style={{ fontSize: '1.2rem' }}>
        <Container fluid>
          <Navbar.Brand href="/">
            <img src={Logo} alt="logo" className="navbar-logo" />
          </Navbar.Brand>
          <Nav variant="underline" className="w-100">
            <Navbar.Toggle aria-controls="cinescope-navbar" />
            <Nav className="me-auto">
              <Navbar.Collapse id="cinescope-navbar">
                {navLinks.map((link) => (
                  <Nav.Link href={link.href} key={link.href}>
                    {link.label}
                  </Nav.Link>
                ))}
              </Navbar.Collapse>
            </Nav>
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
              {userData ? (
                <>
                  <Nav.Item>
                    <span>Welcome, {userData.username}!</span>
                  </Nav.Item>
                  {showDropdownMenu && (
                    <NavDropdown align="end" title={<i className="bi bi-person-circle" />}>
                      {dropdownItems.map((item) => (
                        <NavDropdown.Item href={item.href} key={item.href}>
                          {item.label}
                        </NavDropdown.Item>
                      ))}
                      <NavDropdown.Item onClick={handleShareList}>
                        Share List
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item onClick={handleLogout}>
                        Logout
                      </NavDropdown.Item>
                    </NavDropdown>
                  )}
                </>
              ) : (
                loginstatus && (
                  <Nav.Item>
                    <Nav.Link onClick={handleSignInShow}>Sign In!</Nav.Link>
                  </Nav.Item>
                )
              )}
            </Nav>
          </Nav>
        </Container>
      </Navbar>

      <SignInModal show={showSignInModal} handleClose={handleSignInClose} />

      <ToastMessage
        show={showToast}
        onClose={() => setShowToast(false)}
        message={toastMessage}
        toastType={toastType}
      />
    </>
  );
};

export default Header;

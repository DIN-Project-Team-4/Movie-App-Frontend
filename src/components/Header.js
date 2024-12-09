import 'bootstrap-icons/font/bootstrap-icons.css';
import React, { useState } from 'react';
import { Container, Nav, Navbar, NavDropdown, Modal, Button } from 'react-bootstrap';
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
  const [showDeleteAccount, setShowDeleteAccount] = useState(false); 

  // Handle LogOut
  const handleLogout = () => {
    localStorage.clear();
    document.cookie.split(';').forEach((cookie) => {
      const tokens = cookie.split('=')[0].trim();
      document.cookie = `${tokens}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    });
    navigate('/');
  };

  // Callback after account deletion
  const handleAccountDeleted = () => {
    localStorage.clear();
    navigate('/'); // Redirect to the home page
  };

  // Retrieve user data from local storage
  const userData = JSON.parse(localStorage.getItem('userData'));

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/reviews', label: 'Reviews' },
    { href: '/groups', label: 'Groups' },
  ];

  const dropdownItems = [
    { href: '/groups/mygroups', label: 'My Groups' },
    { href: '/profile', label: 'My Profile' },
    { href: '/settings', label: 'Settings' },
  ];

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
                    <span>
                      Welcome,
                      <br /> {userData.username}!
                    </span>
                  </Nav.Item>
                  {showDropdownMenu && (
                    <NavDropdown align="end" title={<i className="bi bi-person-circle" />}>
                      {dropdownItems.map((item) => (
                        <NavDropdown.Item href={item.href} key={item.href}>
                          {item.label}
                        </NavDropdown.Item>
                      ))}
                      {/* Delete Account button only appears when user is logged in */}
                      <NavDropdown.Item
                        onClick={() => setShowDeleteAccount(true)}
                        style={{ color: 'red' }}
                      >
                        Delete Account
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                    </NavDropdown>
                  )}
                </>
              ) : (
                <Nav.Item>
                  <Nav.Link onClick={handleSignInShow}>Sign In</Nav.Link>
                </Nav.Item>
              )}
            </Nav>
          </Nav>
        </Container>
      </Navbar>

      {/* Delete Account Confirmation Modal */}
      <Modal show={showDeleteAccount} onHide={() => setShowDeleteAccount(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Account Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete your account? This action is irreversible.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteAccount(false)}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              handleAccountDeleted();
              setShowDeleteAccount(false);
            }}
          >
            Delete Account
          </Button>
        </Modal.Footer>
      </Modal>

      {/* SignIn modal */}
      <SignInModal show={showSignInModal} handleClose={handleSignInClose} />
    </>
  );
};

export default Header;

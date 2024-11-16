import React from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import Logo from '../assets/logo.webp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import Search from './Search';
import './Header.css';


const Header = ({filterMethod,
    setFilterMethod,
    searchText,
    setSearchText,
    newSearch}) => {
  return (
    <header>
        <Navbar collapseOnSelect expand="lg" className="navbar navbar-expand-lg bg-dark custom-navbar" data-bs-theme="dark">
            <Container fluid>
                {/* Flex container for logo and navigation */}
                <div className="d-flex justify-content-between w-100 align-items-center">
                    <Navbar.Brand href="/">
                        <img src={Logo} alt='logo' className='navbar-logo'/>
                    </Navbar.Brand>
                    <Nav className="d-flex flex-row justify-content-center">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="#groups">Groups</Nav.Link>
                    </Nav>
                
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                </div>

                <Navbar.Collapse id="responsive-navbar-nav">                    
                    <div className="d-flex flex-lg-row flex-column align-items-center justify-content-end w-auto search_div">
                        <Nav className="w-100 mb-lg-0 mb-3 d-flex justify-content-end"> 
                            <Nav.Link href="#search" className="w-100">
                                {<Search 
                                    filterMethod={filterMethod}
                                    setFilterMethod={setFilterMethod}
                                    searchText={searchText}
                                    setSearchText={setSearchText}
                                    newSearch={newSearch}/>}
                            </Nav.Link>
                        </Nav>
                    
                        <Nav className='navbar-profile d-flex flex-row align-items-center'>
                            <Nav.Link eventKey={2} href="#login" className="signIn-link mb-lg-0 mb-2">SignIn</Nav.Link>
                            <div className="d-flex align-items-center justify-content-center flex-row profile-container">
                                <FontAwesomeIcon icon={faUserCircle}  className='profile-icon'/>
                                <NavDropdown id="collapsible-nav-dropdown" className='profile-dropdown'>
                                    <NavDropdown.Item href="#myGroups/3.1">My Groups</NavDropdown.Item>
                                    <NavDropdown.Item href="#myProfile/3.2">My Profile</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="#settings/3.4">Settings</NavDropdown.Item>
                                </NavDropdown>
                            </div>               
                        </Nav>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
  )
}

export default Header

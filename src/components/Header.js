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
            <Container>
                <Navbar.Brand href="#home">
                    <img src={Logo} alt='logo' className='navbar-logo'/>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#groups">Groups</Nav.Link>
                        
                    </Nav>
                    
                    <Nav>
                        <Nav.Link href="#search">{<Search 
                            filterMethod={filterMethod}
                            setFilterMethod={setFilterMethod}
                            searchText={searchText}
                            setSearchText={setSearchText}
                            newSearch={newSearch}/>}
                        </Nav.Link>
                    </Nav>
                    
                    <Nav className='navbar-profile'>
                        <Nav.Link eventKey={2} href="#login" className="signIn-link">SignIn</Nav.Link>
                        <div className="profile-container">
                            <FontAwesomeIcon icon={faUserCircle}  className='profile-icon'/>
                            <NavDropdown id="collapsible-nav-dropdown" className='profile-dropdown'>
                                <NavDropdown.Item href="#myGroups/3.1">My Groups</NavDropdown.Item>
                                <NavDropdown.Item href="#myProfile/3.2">My Profile</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#settings/3.4">Settings</NavDropdown.Item>
                            </NavDropdown>
                        </div>                 
                        
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
  )
}

export default Header
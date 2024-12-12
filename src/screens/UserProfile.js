import React, { useEffect, useState } from 'react';
import '../index.css'
import './UserProfile.css';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import SharedFavorites from "../components/Favourites/SharedFavourites.js";

const UserProfile = () => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const { userId } = userData
    // State to store the user data fetched from the API
    const [user, setUser] = useState(null);

    // State to store any errors during data fetching
    const [error, setError] = useState('');

    // DELETE LOGIC
    const [showDeleteAccount, setShowDeleteAccount] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Function to fetch user data from the backend
        const fetchUserData = async () => {
            try {
                // Make a GET request to the API endpoint
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/user/${userId}`);

                // Check if the response is successful
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                // Parse the response JSON and update the user state
                const data = await response.json();
                setUser(data);
            } catch (err) {
                // Handle errors and update the error state
                setError('Failed to load user data');
                console.error("Error fetching user data:", err.message);
            }
        };

        // Call the fetch function when the component mounts
        fetchUserData();
    }, []); // Empty dependency array ensures this runs only once

    // If there's an error, display the error message
    if (error) {
        return <div className="user-profile-error-message">{error}</div>;
    }

    // If the user data is still loading, show a loading message
    if (!user) {
        return <div className="user-profile-loading">Loading...</div>;
    }

    /* DELETE ACCOUNT LOGIC */




    // Callback after account deletion
    const handleAccountDeleted = async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/delete/${userId}`,
            { withCredentials: true }
        );
        localStorage.clear();
        navigate('/'); // Redirect to the home page
    };





    // Render the user's profile information once data is fetched
    return (
        <div className="main-div">
            <div className='div-title'>{user.username}'s Profile</div>

            {/* Section containing user information */}
            <div className="user-profile-div d-flex">
                <div className='user-information-div'>
                    {/* Display user email */}
                    <p className="user-profile-info-item">
                        <strong className="user-profile-label">Email:</strong> {user.userEmail}
                    </p>

                    {/* Display when the user account was created */}
                    <p className="user-profile-info-item">
                        <strong className="user-profile-label">Member Since:</strong> {new Date(user.createDate).toLocaleDateString()}
                    </p>

                    {/* Display the user's last login date */}
                    <p className="user-profile-info-item">
                        <strong className="user-profile-label">Last Login:</strong> {new Date(user.lastLoginDate).toLocaleDateString()}
                    </p>
                </div>

                <div className='user-favourite-div'>
                    <SharedFavorites userId={userId} />
                </div>
            </div>

            <Button onClick={() => setShowDeleteAccount(true)} variant="danger">Delete User</Button>

            {/* Delete Account Confirmation Modal */}
            <Modal show={showDeleteAccount} onHide={() => setShowDeleteAccount(false)} className='delete-user-modal'>
                <Modal.Body>
                    <div className='custom-modal'>
                        <div className='div-title'>Confirm Deletion</div>
                        <div>Are you sure you want to delete your account? {<br />} This action is irreversible.</div>
                        <div className='delete-account-buttons'>
                            <Button variant="outline-dark" onClick={() => setShowDeleteAccount(false)}>
                                Cancel
                            </Button>
                            <Button
                                variant="danger"
                                onClick={async () => {
                                    await handleAccountDeleted();
                                    setShowDeleteAccount(false);
                                }}
                            >
                                Delete Account
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default UserProfile;

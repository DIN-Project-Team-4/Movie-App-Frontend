import React, { useEffect, useState } from 'react';

const UserProfile = () => {
    // State to store the user data fetched from the API
    const [user, setUser] = useState(null);

    // State to store any errors during data fetching
    const [error, setError] = useState('');

    useEffect(() => {
        // Function to fetch user data from the backend
        const fetchUserData = async () => {
            try {
                // Make a GET request to the API endpoint
                const response = await fetch('http://localhost:3001/api/test-findOneUser');
                
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

    // Render the user's profile information once data is fetched
    return (
        <div className="user-profile-container">
            {/* Header displaying the username */}
            <h1 className="user-profile-header">{user.username}'s Profile</h1>
            
            {/* Section containing user information */}
            <div className="user-profile-info">
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
        </div>
    );
};

export default UserProfile;

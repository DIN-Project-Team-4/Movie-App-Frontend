import React, { useEffect, useState } from 'react';
import axios from 'axios';


const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/api/users/me', {
          withCredentials: true, // Ensures cookies are sent with the request
        });
        setUser(response.data);
      } catch (err) {
        setError('Failed to load user data');
      }
    };

    fetchUserData();
  }, []);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user-profile">
      <h1>{user.username}'s Profile</h1>
      <div className="profile-info">
        <p><strong>Email:</strong> {user.userEmail}</p>
        <p><strong>Member Since:</strong> {new Date(user.createDate).toLocaleDateString()}</p>
        <p><strong>Last Login:</strong> {new Date(user.lastLoginDate).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default UserProfile;

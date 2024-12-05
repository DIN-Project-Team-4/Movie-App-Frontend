import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../index.css';

const backendUrl = process.env.REACT_APP_API_URL;

const ProfilePage = () => {
    const id = 22 // TODO: WOON //useParams();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getProfile = async () => {
            try {
                const response = await axios.get(`${backendUrl}/profile/${id}`,
                    { withCredentials: true }
                );
                setProfile(response.data);
            } catch (error) {
                console.error('Error fetching profile details:', error.message);
                setError('Failed to load profile details');
            } finally {
                setLoading(false);
            }
        }

        getProfile()
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="main-div">
            { JSON.stringify(profile) }
        </div>
    );
};

export default ProfilePage;

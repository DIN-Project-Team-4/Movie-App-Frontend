import React, { useState } from 'react';
import axios from 'axios';
import { ToastMessage } from '../toast/ToastMessage.js'; 

const DeleteAccount = ({ userId, token, onAccountDeleted }) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState('');
    const [isToastVisible, setIsToastVisible] = useState(false);
    const baseUrl = process.env.REACT_APP_API_BASE_URL;

    // Function to display Toast messages
    const showToast = (message, type) => {
        setToastMessage(message);
        setToastType(type);
        setIsToastVisible(true);
        setTimeout(() => {
            setIsToastVisible(false);
            setToastMessage('');
        }, 3000); // Hide the Toast after 3 seconds
    };

    const handleDeleteAccount = async () => {
        // Check if userId or token is missing
        if (!userId || !token) {
            showToast('User information missing. Please log in again.', 'warning');
            return;
        }

        setIsDeleting(true);
        try {
            const response = await axios.delete(`${baseUrl}/users/${userId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.status === 200) {
                // Successfully deleted the account, clear local storage
                localStorage.removeItem('authToken');
                localStorage.removeItem('userData');
                showToast('Account deleted successfully!', 'success');
                if (onAccountDeleted) onAccountDeleted(); // Notify parent component
            } else {
                showToast('Failed to delete account. Please try again.', 'error');
            }
        } catch (error) {
            const errorMessage = error.response?.data?.error || 'An error occurred. Please try again.';
            showToast(errorMessage, 'error');
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="delete-account-container">
            <h3>Delete Account</h3>
            <p>Deleting your account will erase all data permanently. Are you sure?</p>
            <button 
                onClick={handleDeleteAccount} 
                disabled={isDeleting} 
                className="btn btn-danger"
            >
                {isDeleting ? 'Deleting...' : 'Delete Account'}
            </button>

            {/* Render ToastMessage when toast is visible */}
            {isToastVisible && <ToastMessage toastMessage={toastMessage} toastType={toastType} />}
        </div>
    );
};

export default DeleteAccount;

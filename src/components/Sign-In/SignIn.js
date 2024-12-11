import React, { useState } from 'react';
import axios from 'axios';
import ToastMessage from '../Common/ToastMessage.js';
import '../../index.css'
import './SignIn.css';
import { Button } from 'react-bootstrap';

const SignIn = ({ setSignInOpen, isSignUp, setIsSignUp }) => {
    const baseUrl = process.env.REACT_APP_API_BASE_URL;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [signUpEmail, setSignUpEmail] = useState('');
    const [signUpUsername, setSignUpUsername] = useState('');
    const [signUpPassword, setSignUpPassword] = useState('');
    const [signUpConfirmPassword, setSignUpConfirmPassword] = useState('');
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState('');
    const [isToastVisible, setIsToastVisible] = useState(false);
    const [signDisabled, setSignDisabled] = useState(false);

    const handleSignIn = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            showToast('Please fill in both fields.', 'warning');
            return;
        }

        setSignDisabled(true);
        try {
            const response = await axios.post(
                `${baseUrl}/sign-in`,
                { userEmail: email, password: password },
                { withCredentials: true }
            );

            if (response.status === 200) {
                localStorage.setItem('userData', JSON.stringify(response.data));
                showToast('Login Successful!', 'success', true);
            } else {
                showToast('Invalid credentials, please try again!', 'warning');
            }
        } catch (error) {
            showToast('Invalid credentials, please try again!', 'warning');
        } finally {
            setSignDisabled(false);
        }
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        if (!signUpEmail || !signUpUsername || !signUpPassword || !signUpConfirmPassword) {
            showToast('Please fill in all fields.', 'warning');
            return;
        }

        if (signUpPassword !== signUpConfirmPassword) {
            showToast('Passwords do not match!', 'warning');
            return;
        }

        setSignDisabled(true);
        try {
            const response = await axios.post(
                `${baseUrl}/users`,
                { userEmail: signUpEmail, username: signUpUsername, password: signUpPassword }
            );

            if (response.status === 200) {
                showToast('Account created successfully!', 'success');
                setIsSignUp(false);
            } else {
                showToast(`Failed to create account: ${response.data.message}`, 'warning');
            }
        } catch (error) {
            showToast(`Failed to create account: ${error.message}`, 'warning');
        } finally {
            setSignDisabled(false);
        }
    };

    const showToast = (message, type, closeModal = false) => {
        setToastMessage(message);
        setToastType(type);
        setIsToastVisible(true);
        setTimeout(() => {
            setIsToastVisible(false);
            if (closeModal) setSignInOpen(false);
        }, 3000);
    };

    return (
        <div className='custom-modal'>
            <div className='div-title'>{isSignUp ? 'Sign Up' : 'Sign In'}</div>

            {isSignUp ? (
                <form onSubmit={handleSignUp}>
                    <div className="form-group">
                        <label>E-mail</label>
                        <input
                            type="email"
                            className="form-control"
                            value={signUpEmail}
                            onChange={(e) => setSignUpEmail(e.target.value)}
                            disabled={signDisabled}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Username</label>
                        <input
                            type="text"
                            className="form-control"
                            value={signUpUsername}
                            onChange={(e) => setSignUpUsername(e.target.value)}
                            disabled={signDisabled}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control"
                            value={signUpPassword}
                            onChange={(e) => setSignUpPassword(e.target.value)}
                            disabled={signDisabled}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input
                            type="password"
                            className="form-control"
                            value={signUpConfirmPassword}
                            onChange={(e) => setSignUpConfirmPassword(e.target.value)}
                            disabled={signDisabled}
                            required
                        />
                    </div>
                    <Button type="submit" variant="dark" disabled={signDisabled}>
                        Sign Up
                    </Button>
                    <Button
                        variant="outline-dark"
                        onClick={() => setSignInOpen(false)}
                        className="ms-2"
                    >
                        Close
                    </Button>
                    <div className='custom-signin-signup'>
                        Already have an account?{<br />}
                        <Button variant="dark" onClick={() => setIsSignUp(false)}>
                            Sign In
                        </Button>
                    </div>
                </form>
            ) : (
                <form onSubmit={handleSignIn}>
                    <div className="form-group">
                        <label>E-mail</label>
                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={signDisabled}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={signDisabled}
                            required
                        />
                    </div>
                    <Button type="submit" variant="dark" disabled={signDisabled}>
                        Sign In
                    </Button>
                    <Button
                        variant="outline-dark"
                        onClick={() => setSignInOpen(false)}
                        className="ms-2"
                    >
                        Close
                    </Button>
                    <div className='custom-signin-signup'>
                        Don't have an account?{<br />}
                        <Button
                            type="Button"
                            variant="dark"
                            onClick={() => setIsSignUp(true)}
                        >
                            Sign Up
                        </Button>
                    </div>
                </form>
            )}
            <ToastMessage
                show={isToastVisible}
                onClose={() => setIsToastVisible(false)}
                message={toastMessage}
                toastType={toastType}
            />
        </div>
    );
};

export default SignIn;

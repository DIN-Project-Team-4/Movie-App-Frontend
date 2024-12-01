/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import "./SignIn.css";
import logo from '../../assets/logo.jpg';
import axios from 'axios';
import { ToastMessage } from '../toast/ToastMessage.js';
import DeleteAccount from './DeleteAccount.js';

const SignIn = ({ setSignInOpen }) => {

    const baseUrl = process.env.REACT_APP_API_BASE_URL;
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [signUpEmail, setSignUpEmail] = useState('');
    const [signUpUsername, setSignUpUsername] = useState('');
    const [signUpPassword, setSignUpPassword] = useState('');
    const [signUpConfirmPassword, setSignUpConfirmPassword] = useState('');
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState('');
    const [signDisabled, setSignDisabled] = useState(false);
    const [isToastVisible, setIsToastVisible] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);

    const inputStyle = {
        backgroundColor: 'black',
        color: 'white'
    };

    const handleSignIn = async (e) => {
        e.preventDefault();
        setSignDisabled(true);
        if (!email || !password) {
            showToast('Please fill in both fields.', 'warning', false);
            setSignDisabled(false);
            return;
        }

        try {
            const response = await axios.post(
                `${baseUrl}/sign-in`,
                { "userEmail": email, "password": password },
                { withCredentials: true }
            );
            if (response.status === 200) {
                await addToLocalStore(response.data);
                showToast('Login Successful!', 'success', true);
            } else {
                showToast('Invalid credentials, please try again!', 'warning', false);
                setSignDisabled(false);
            }
        } catch (error) {
            showToast('Invalid credentials, please try again!', 'warning', false);
            setSignDisabled(false);
        }
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        setSignDisabled(true);
        if (!signUpEmail || !signUpPassword || !signUpConfirmPassword) {
            showToast('Please fill in all fields.', 'warning', false);
            setSignDisabled(false);
            return;
        }

        if (signUpPassword !== signUpConfirmPassword) {
            showToast('Passwords do not match!', 'warning', false);
            setSignDisabled(false);
            return;
        }

        await axios.post(
            `${baseUrl}/users`,
            { "userEmail": signUpEmail, "password": signUpPassword, "username": signUpUsername }
        ).then((response) => {
            if (response.status === 200) {
                showToast('Account created successfully!', 'success', false);
                setEmail(signUpEmail);
                setIsSignUp(false);
                resetSignUpData();
                setSignDisabled(false)
            } else {
                showToast(`Failed to create account (${response.data.message}). Try again!`, 'warning', false);
                setSignDisabled(false);
            }
        }).catch((error) => {
            showToast(`Failed to create account (${error.response.data.message}) Try again!`, 'warning', false);
            setSignDisabled(false);
        })
    }

    const resetSignUpData = () => {
        setSignUpEmail("");
        setSignUpUsername("");
        setSignUpPassword("");
        setSignUpConfirmPassword("");
    }

    const addToLocalStore = async (data) => {
        localStorage.setItem('userData', JSON.stringify(data));
    };

    const showToast = (message, type, closeModal) => {
        setToastMessage(message);
        setToastType(type);
        setIsToastVisible(true);
        setTimeout(() => {
            setIsToastVisible(false);
            setToastMessage('');
            // Optionally close the modal if needed
            if (closeModal) setSignInOpen(false);
        }, 3000);
    };

    return (
        <div className='form-container'>
            <div className='signin-modal-container'>
                <div className='signin-modal'>
                    <div className='signin-modal-header'>
                        <p className='signin-close' onClick={() => setSignInOpen(false)}>&times;</p>
                    </div>
                    <div className='signin-modal-content'>
                        <div className="signin-container">
                            {!isSignUp && (
                                <div className="signin-left-column">
                                    <img
                                        src={logo}
                                        alt="cineScope"
                                        className="signin-left-column-image"
                                    />
                                </div>
                            )}
                            <div className="signin-right-column">
                                <h2>{isSignUp ? "Sign Up" : "Sign In"}</h2>

                                {/* SignIn Form */}
                                {isSignUp ? (
                                    <form onSubmit={(e) => handleSignUp(e)}>
                                        <div className="form-group">
                                            <label htmlFor="signUpEmail">Email</label>
                                            <input
                                                type="email"
                                                id="signUpEmail"
                                                maxLength={45}
                                                value={signUpEmail}
                                                onChange={(e) => setSignUpEmail(e.target.value)}
                                                placeholder="Enter your email"
                                                style={inputStyle}
                                                disabled={signDisabled}
                                                required
                                                className='input-field'
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="signUpUsername">Username</label>
                                            <input
                                                type="text"
                                                id="signUpUsername"
                                                maxLength={45}
                                                value={signUpUsername}
                                                onChange={(e) => setSignUpUsername(e.target.value)}
                                                placeholder="Enter your username"
                                                style={inputStyle}
                                                disabled={signDisabled}
                                                required
                                                className='input-field'
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="signUpPassword">Password</label>
                                            <input
                                                type="password"
                                                id="signUpPassword"
                                                maxLength={30}
                                                value={signUpPassword}
                                                onChange={(e) => setSignUpPassword(e.target.value)}
                                                placeholder="Enter your password"
                                                style={inputStyle}
                                                disabled={signDisabled}
                                                required
                                                className='input-field'
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="signUpConfirmPassword">Confirm Password</label>
                                            <input
                                                type="password"
                                                id="signUpConfirmPassword"
                                                maxLength={30}
                                                value={signUpConfirmPassword}
                                                onChange={(e) => setSignUpConfirmPassword(e.target.value)}
                                                placeholder="Confirm password"
                                                style={inputStyle}
                                                disabled={signDisabled}
                                                required
                                                className='input-field'
                                            />
                                        </div>
                                        <div className="form-group" style={{ textAlign: 'right' }}>
                                            Already have an account? <a href="#" onClick={() => { setIsSignUp(false); setSignDisabled(false) }}>Sign In</a>
                                        </div>
                                        <div className='signin-modal-footer'>
                                            <button className='btn' disabled={signDisabled}>
                                                Sign Up
                                            </button>
                                        </div>
                                    </form>
                                ) : (
                                    // SignIn Form
                                    <form onSubmit={(e) => handleSignIn(e)}>
                                        <div className="form-group">
                                            <label htmlFor="signInEmail">Email</label>
                                            <input
                                                type="email"
                                                id="signInEmail"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="Enter your email"
                                                style={inputStyle}
                                                disabled={signDisabled}
                                                required
                                                className='input-field'
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="signInPassword">Password</label>
                                            <input
                                                type="password"
                                                id="signInPassword"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                placeholder="Enter your password"
                                                style={inputStyle}
                                                disabled={signDisabled}
                                                required
                                                className='input-field'
                                            />
                                        </div>
                                        <div className="form-group" style={{ textAlign: 'right' }}>
                                            Already have an account? <a href="#" onClick={() => { setIsSignUp(true); setSignDisabled(false); }}>Sign Up</a>
                                        </div>
                                        <div className='signin-modal-footer'>
                                            <button className='btn' disabled={signDisabled}>
                                                Sign In
                                            </button>
                                        </div>
                                    </form>
                                )}
                                {/* If the user is logged in, the Delete account component is displayed */}
                                {localStorage.getItem('userData') && (
                                    <DeleteAccount setSignInOpen={setSignInOpen} />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* TOAST MESSAGE */}
            {isToastVisible && <ToastMessage toastMessage={toastMessage} toastType={toastType} />}
        </div>
    );
};

export default SignIn;
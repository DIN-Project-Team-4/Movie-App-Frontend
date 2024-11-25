import React, { useState } from 'react'
import "./SignIn.css"
import logo from '../../assets/logo.jpg'
import axios from 'axios';
import { ToastMessage } from '../toast/ToastMessage';

export const SignIn = ({ setSignInOpen }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState('');
    const [signDisabled, setSignDisabled] = useState(false);
    const [isToastVisible, setIsToastVisible] = useState(false);

    const inputStyle = {
        backgroundColor: 'black',
        color: 'white'
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setSignDisabled(true);
        try {
            const baseUrl = process.env.REACT_APP_API_BASE_URL;
            const response = await axios.post(`${baseUrl}/sign-in`, { "userEmail": email, "password": password }, { withCredentials: true });
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

    const addToLocalStore = async (data) => {
        localStorage.setItem('userData', JSON.stringify(data));
    }

    const showToast = (message, type, closeModal) => {
        setToastMessage(message);
        setToastType(type);
        setIsToastVisible(true)
        setTimeout(() => {
            setIsToastVisible(false);
            setToastMessage('');
            console.log(closeModal)
            //close sign-in modal 
            setSignInOpen(!closeModal);
        }, 2000);
    };

    return (
        <>
            <form className='form-container' onSubmit={(e) => handleLogin(e)}>
                <div className='signin-modal-container'>
                    <div className='signin-modal'>
                        <div className='signin-modal-header'>
                            <p className='signin-close' onClick={() => setSignInOpen(false)}>&times;</p>
                        </div>
                        <div className='signin-modal-content'>
                            <div className="signin-container">
                                <div className="signin-left-column">
                                    <img
                                        src={logo}
                                        alt="cineScope"
                                        className="signin-left-column-image"
                                    />                        </div>
                                <div className="signin-right-column">
                                    <h2>Sign-in</h2>
                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input
                                            type="email"
                                            id="email"
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
                                        <label htmlFor="password">Password</label>
                                        <input
                                            type="password"
                                            id="password"
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
                                        Still not a member ? <a href="#">SignUp</a> here
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='signin-modal-footer'>
                            <button className='btn'
                                disabled={signDisabled}>
                                Sign-in
                            </button>
                        </div>
                    </div>
                </div>
            </form>
            {/* Toast message */}
            {isToastVisible && (<ToastMessage toastMessage={toastMessage} toastType={toastType} />)}
        </>
    )
}

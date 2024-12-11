import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import SignIn from './SignIn.js';

const SignInModal = ({ show, handleClose }) => {
    const [isSignUp, setIsSignUp] = useState(false);

    return (
        <Modal show={show} onHide={handleClose} centered dialogClassName="signin-modal-dialog">
            <Modal.Body>
                <SignIn
                    setSignInOpen={handleClose}
                    isSignUp={isSignUp}
                    setIsSignUp={setIsSignUp}
                />
            </Modal.Body>
        </Modal>
    );
};

export default SignInModal;

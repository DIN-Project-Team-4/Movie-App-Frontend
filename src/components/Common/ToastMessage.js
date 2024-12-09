import React from "react";
import { Toast, ToastContainer } from "react-bootstrap";

/*                      IN ORDER TO USE READ HERE

    1: implement this component in your file
        Most likely something like this: 
        import ToastMessage from "../Common/ToastMessage.js";
            
    2: Import UseState: 
        import React, { useState } from "react";

    3: Declare these 3 useStates:
        const [showToast, setShowToast] = useState(false);
        const [message, setMessage] = useState("");
        const [toastType, setToastType] = useState("info");

        First controls visibility
        Second controls the message shown to the user
        Third sets the type of ToastMessage shown - choose between 'success', 'danger' and 'warning'

        See /Favourites/FavouriteButton.js for example

*/

const ToastMessage = ({ show, onClose, message, toastType }) => {
    return (
        <ToastContainer position="top-center">
            <Toast
                onClose={onClose}
                show={show}
                delay={2000}
                autohide
                bg={toastType}
            >
                <Toast.Body className="custom-toast-body">{message}</Toast.Body>
            </Toast>
        </ToastContainer>
    );
};

export default ToastMessage;

import React, { useState } from "react";
import axios from "axios";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import ToastMessage from "../Common/ToastMessage.js";

const FavouriteButton = ({ movieId, movieName, isFavourite: parentIsFavourite, setIsFavourite }) => {
    const [message, setMessage] = useState("");
    const [toastType, setToastType] = useState(""); // LET THE TOAST BEGIN
    const [showToast, setShowToast] = useState(false);

    const toggleFavourite = async () => {
        // Check if the user is logged in
        const userData = JSON.parse(localStorage.getItem("userData"));
        if (!userData || !userData.userId) {
            // If not logged in, show error message
            setMessage("Please log in to favourite a movie.");
            setToastType("warning");
            setShowToast(true);
            return;
        }

        // Proceed with the API call if the user is logged in
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/favourites/toggle`,
                { movieId, movieName },
                { withCredentials: true }
            );

            if (response.data.added) {
                setIsFavourite(true);
                setMessage("Movie added to favourites");
                setToastType("success");
            } else if (response.data.removed) {
                setIsFavourite(false);
                setMessage("Movie removed from favourites");
                setToastType("warning");
            }
            setShowToast(true);
        } catch (error) {
            console.error("Error toggling favourite:", error);
            setMessage("An error occurred. Please try again.");
            setToastType("danger");
            setShowToast(true);
        }
    };

    return (
        <>
            <button
                onClick={toggleFavourite}
                className="btn btn-link p-0"
                style={{ fontSize: "24px" }}
            >
                {parentIsFavourite ? <BsHeartFill /> : <BsHeart />}
            </button>

            <ToastMessage
                show={showToast}
                onClose={() => setShowToast(false)}
                message={message}
                toastType={toastType}
            />
        </>
    );
};

export default FavouriteButton;

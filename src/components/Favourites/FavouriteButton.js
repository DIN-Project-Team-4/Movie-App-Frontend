import React, { useState } from "react";
import axios from "axios";
import { BsHeart, BsHeartFill } from "react-icons/bs"; // Bootstrap icons

const FavouriteButton = ({ movieId, movieName, isFavourite: parentIsFavourite, setIsFavourite }) => {
    const [message, setMessage] = useState("");

    const toggleFavourite = async () => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/favourites/toggle`, // Use REACT_APP_API_URL
                { movieId, movieName },
                { withCredentials: true }
            );

            if (response.data.added) {
                setIsFavourite(true); // Update parent state
                setMessage("Movie added to favourites");
            } else if (response.data.removed) {
                setIsFavourite(false); // Update parent state
                setMessage("Movie removed from favourites");
            }
        } catch (error) {
            console.error("Error toggling favourite:", error);
            setMessage("An error occurred. Please try again.");
        }
    };

    return (
        <div>
            <button
                onClick={toggleFavourite}
                className="btn btn-link p-0"
                style={{ fontSize: "24px", color: parentIsFavourite ? "red" : "black" }}
            >
                {parentIsFavourite ? <BsHeartFill /> : <BsHeart />}
            </button>
            {message && <p className="text-muted mt-2">{message}</p>}
        </div>
    );
};

export default FavouriteButton;

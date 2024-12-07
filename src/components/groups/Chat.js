import React, { useState, useEffect } from 'react';
import { ListGroup, Form, Button, Modal } from 'react-bootstrap';
import './Chat.css';
import { searchByTitle } from '../Search/searchApi.js'; // Adjust the import path as necessary

const Chat = ({ groupId }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [movieResults, setMovieResults] = useState([]);
    const userData = JSON.parse(localStorage.getItem('userData'));

    useEffect(() => {
        fetchMessages();

    }, [groupId]);

    const fetchMessages = async () => {
        try {
            const response = await fetch(`http://localhost:3001/groups/${groupId}/messages`);
            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                throw new Error(`Expected JSON, but received: ${contentType}`);
            }
            const data = await response.json();
            console.log('Received messages:', data);
            setMessages(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const sendMessage = async () => {
        if (newMessage.trim()) {
            const messagePayload = {
                groupId: groupId,
                senderId: userData.userId,
                message: newMessage,
            };

            console.log('Sending message payload:', messagePayload);

            try {
                const response = await fetch(`http://localhost:3001/groups/${groupId}/messages`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(messagePayload),
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    console.error('Failed to send message:', response.status, errorText);
                    throw new Error(`Failed to send message: ${response.statusText}`);
                }

                const savedMessage = await response.json();
                setMessages([...messages, savedMessage]);
                setNewMessage('');
                fetchMessages(); // Fetch the latest messages after sending a new message

            } catch (error) {
                console.error('Error sending message:', error);
            }
        }
    };

    const searchMovies = async () => {
        if (!searchQuery.trim()) {
            alert('Please enter a movie title to search.');
            return;
        }
        try {
            const data = await searchByTitle(searchQuery, 1); // Assuming page 1 for simplicity
            if (data) {
                setMovieResults(data.results || []);
            } else {
                throw new Error('No data returned from search');
            }
        } catch (error) {
            console.error('Error searching movies:', error);
            alert(`Failed to search for movies. Error: ${error.message}`);
        }
    };

    const selectMovie = async (movie) => {
        const movieSuggestion = {
            groupId: groupId,
            senderId: userData.userId,
            movieId: movie.id,
            movieTitle: movie.title,
            posterPath: `https://image.tmdb.org/t/p/w200${movie.poster_path}`,
        };

        try {
            const response = await fetch(`http://localhost:3001/groups/${groupId}/movies`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(movieSuggestion),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Failed to save movie suggestion:', response.status, errorText);
                throw new Error(`Failed to save movie suggestion: ${response.statusText}`);
            }

            const savedSuggestion = await response.json();
            setMessages([...messages, savedSuggestion.suggestion]);
            setShowModal(false);
        } catch (error) {
            console.error('Error saving movie suggestion:', error);
        }
    };

    const voteForMessage = async (messageId, currentVote) => {
        const newVote = currentVote === 1 ? 0 : 1; // Toggle vote
        try {
            const response = await fetch(`http://localhost:3001/groups/${groupId}/messages/update`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ groupId, messageId, userId: userData.userId, vote: newVote }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Failed to update vote:', response.status, errorText);
                throw new Error(`Failed to update vote: ${response.statusText}`);
            }

            const { updatedVote, totalVotes } = await response.json();

            setMessages(messages.map(msg =>
                msg.message_id === messageId
                    ? { ...msg, votes: updatedVote.votes, total_votes: totalVotes }
                    : msg
            ));

            // Fetch all messages again to update the state
            fetchMessages();


        } catch (error) {
            console.error('Error updating vote:', error);
        }
    };

    return (
        <div className="chat-container">
            <ListGroup className="chat-messages">
                {messages.map((msg, index) => (
                    <ListGroup.Item key={index}>
                        {msg.type === 'movie' ? (
                            <div>
                                <img
                                    src={`https://image.tmdb.org/t/p/w200${msg.poster_path}`}
                                    alt={msg.movieTitle}
                                    style={{ width: '50px', marginRight: '10px' }}
                                />
                                <strong>{msg.message}</strong>
                                <Button
                                    className="vote-button"
                                    size="sm"
                                    onClick={() => voteForMessage(msg.message_id, msg.votes)}
                                >
                                    👍 {msg.total_votes || 0}
                                </Button>
                            </div>
                        ) : (
                            <span>
                                <strong>{msg.senderName || msg.sender_name}</strong>: {msg.message || msg.text}
                                <Button
                                    className="vote-button"
                                    size="sm"
                                    onClick={() => voteForMessage(msg.message_id, msg.votes)}
                                >
                                    👍 {msg.total_votes || 0}
                                </Button>
                            </span>
                        )}
                    </ListGroup.Item>
                ))}
            </ListGroup>

            <Form className="chat-input">
                <Form.Control
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                />
                <Button variant="primary" onClick={() => setShowModal(true)}>
                    Suggest Movie
                </Button>
                <Button variant="success" onClick={sendMessage}>
                    Send
                </Button>
            </Form>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Search for a Movie</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Control
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Enter a movie title..."
                    />
                    <Button onClick={searchMovies} style={{ marginTop: '10px' }}>
                        Search
                    </Button>
                    <ListGroup style={{ marginTop: '20px' }}>
                        {movieResults.map((movie) => (
                            <ListGroup.Item
                                key={movie.id}
                                onClick={() => selectMovie(movie)}
                                style={{ cursor: 'pointer' }}
                            >
                                <img
                                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                                    alt={movie.title}
                                    style={{ width: '50px', marginRight: '10px' }}
                                />
                                {movie.title}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default Chat;
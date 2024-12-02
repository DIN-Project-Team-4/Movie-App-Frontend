import React, { useState, useEffect } from 'react';
import { ListGroup, Form, Button, Modal } from 'react-bootstrap';
import './Chat.css';

const Chat = ({ groupId, userId, username }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [votes, setVotes] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [movieResults, setMovieResults] = useState([]);

    useEffect(() => {
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

        fetchMessages();
    }, [groupId]);

    const sendMessage = async () => {
        if (newMessage.trim()) {
            const messagePayload = {
                senderId: userId,
                senderName: username,
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
            const url = `/search?query=${encodeURIComponent(searchQuery)}&filter=title`;
            const response = await fetch(url);

            const contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                throw new Error(`Expected JSON, but received: ${contentType}`);
            }

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Search failed:', response.status, errorText);
                throw new Error(`Failed to search for movies: ${response.statusText}`);
            }

            const data = await response.json();
            setMovieResults(data.results || []);
        } catch (error) {
            console.error('Error searching movies:', error);
            alert(`Failed to search for movies. Error: ${error.message}`);
        }
    };

    const selectMovie = (movie) => {
        const movieSuggestion = {
            text: movie.title,
            type: 'movie',
            votes: 0,
            posterPath: `https://image.tmdb.org/t/p/w200${movie.poster_path}`,
        };
        setMessages([...messages, movieSuggestion]);
        setVotes({ ...votes, [movie.title]: [] });
        setShowModal(false);
    };

    const voteForMovie = (movieName) => {
        if (!votes[movieName]?.includes(userId)) {
            setVotes({
                ...votes,
                [movieName]: [...(votes[movieName] || []), userId],
            });
        } else {
            setVotes({
                ...votes,
                [movieName]: votes[movieName].filter(id => id !== userId),
            });
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
                                    src={msg.posterPath}
                                    alt={msg.text}
                                    style={{ width: '50px', marginRight: '10px' }}
                                />
                                <strong>🎥 {msg.text}</strong>
                                <Button
                                    className="vote-button"
                                    size="sm"
                                    onClick={() => voteForMovie(msg.text)}
                                    disabled={votes[msg.text]?.includes(userId)}
                                >
                                    👍 {votes[msg.text]?.length || 0}
                                </Button>
                            </div>
                        ) : (
                            <span>
                                <strong>{msg.senderName || msg.sender_name}</strong>: {msg.message || msg.text}
                                <Button
                                    className="vote-button"
                                    size="sm"
                                    onClick={() => voteForMovie(msg.message || msg.text)}
                                    disabled={votes[msg.message || msg.text]?.includes(userId)}
                                >
                                    👍 {votes[msg.message || msg.text]?.length || 0}
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
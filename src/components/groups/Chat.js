import React, { useState, useEffect } from 'react';
import { ListGroup, Form, Button } from 'react-bootstrap';
import './Chat.css';

const Chat = ({ groupId }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [votes, setVotes] = useState({});

    useEffect(() => {
        // Fetch existing messages from the backend
        fetch(`/api/v1/groups/${groupId}/messages`)
            .then((response) => response.json())
            .then((data) => setMessages(data));
    }, [groupId]);

    const sendMessage = async () => {
        if (newMessage.trim()) {
            const messagePayload = {
                groupId,
                senderId: 1,
                message: newMessage
            };

            try {
                const response = await fetch(`/groups/${groupId}/messages`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(messagePayload)
                });

                if (!response.ok) throw new Error('Failed to send message');

                const savedMessage = await response.json();
                setMessages([...messages, savedMessage]); // Neue Nachricht hinzufügen
                setNewMessage('');
            } catch (error) {
                console.error('Error sending message:', error);
            }
        }
    };
    useEffect(() => {
        fetchMessages();
    }, [groupId]);

    const fetchMessages = async () => {
        try {
            const response = await fetch(`/api/v1/groups/${groupId}/messages`); // Korrekte API-URL
            if (!response.ok) throw new Error('Failed to fetch messages');
            const data = await response.json();
            setMessages(data);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };


    const suggestMovie = (movieName) => {
        if (movieName.trim()) {
            const suggestion = { text: movieName, type: 'movie', votes: 0 };
            setMessages([...messages, suggestion]);
            setVotes({ ...votes, [movieName]: 0 });
            setNewMessage('');
            // Optionally, send the suggestion to the backend
        }
    };

    const voteForMovie = (movieName) => {
        const updatedVotes = { ...votes, [movieName]: (votes[movieName] || 0) + 1 };
        setVotes(updatedVotes);
        // Optionally, send the vote update to the backend
    };

    return (
        <div className="chat-container">
            <ListGroup className="chat-messages">
                {messages.map((msg, index) => (
                    <ListGroup.Item key={index}>
                        {msg.type === 'movie' ? (
                            <div>
                                <strong>🎥 {msg.text}</strong>
                                <Button
                                    className="vote-button"
                                    size="sm"
                                    onClick={() => voteForMovie(msg.text)}
                                >
                                    👍 {votes[msg.text] || 0}
                                </Button>
                            </div>
                        ) : (
                            <span>{msg.sender}: {msg.text}</span>
                        )}
                    </ListGroup.Item>
                ))}
            </ListGroup>
            <Form className="chat-input">
                <Form.Control
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message or suggest a movie..."
                />
                <Button
                    variant="primary"
                    onClick={() => suggestMovie(newMessage)}
                >
                    Suggest Movie
                </Button>
                <Button
                    variant="success"
                    onClick={sendMessage}
                >
                    Send
                </Button>
            </Form>
        </div>
    );
};

export default Chat;

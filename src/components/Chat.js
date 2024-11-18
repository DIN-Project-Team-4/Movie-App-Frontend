import React, { useState } from 'react';
import { Form, Button, ListGroup } from 'react-bootstrap';
import './Chat.css';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');

    const handleSendMessage = () => {
        if (message.trim()) {
            setMessages([...messages, message]);
            setMessage('');
        }
    };

    return (
        <div><h2>Chat</h2>
    <div className="chat-container">
            <h2>Chat</h2>
            <ListGroup className="chat-messages">
                {messages.map((msg, index) => (
                    <ListGroup.Item key={index}>{msg}</ListGroup.Item>
                ))}
            </ListGroup>
            <Form className="chat-form">
                <Form.Control
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message"
                />
                <Button onClick={handleSendMessage}>Send</Button>
            </Form>
        </div>
        </div>
    );
};

export default Chat;
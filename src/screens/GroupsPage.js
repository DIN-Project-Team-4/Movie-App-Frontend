import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, ListGroup } from 'react-bootstrap';
import './GroupsPage.css';
import GroupCreation from '../components/groups/GroupCreation.js';
import GroupJoin from '../components/groups/GroupJoin.js';


const GroupsPage = ({ groupId }) => {
    const [group, setGroup] = useState([]);
    const [members, setMembers] = useState([]);
    const [movie, setMovie] = useState('');
    const [showtime, setShowtime] = useState('');
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        // Fetch group details from the backend
        fetch(`/groups/${groupId}`)

        // Fetch groups from the backend
        fetch('/groups/all')
            .then((response) => response.json())
            .then((data) => setGroup(data));
        // Fetch members from the backend
        fetch(`/groups/${groupId}/members`)
            .then((response) => response.json())
            .then((data) => setMembers(data));
        // Fetch posts from the backend
        fetch(`/groups/${groupId}/posts`)
            .then((response) => response.json())
            .then((data) => setPosts(data));
    }, [groupId]);

    const handlePost = () => {
        if (movie.trim() && showtime.trim()) {
            const newPost = { movie, showtime };
            setPosts([...posts, newPost]);
            setMovie('');
            setShowtime('');
            // Optionally, send the new post to the backend
        }
    };

    if (!group) return <div>Loading...</div>;

    return (
        <div>
            <Container fluid>
                <Row className="d-flex justify-content-between align-items-center">

                        <Col>
                            <h2 className="my-4">Suggested Groups</h2>
                        </Col>

                    <Col className="text-end">
                        <GroupCreation />
                    </Col>
                </Row>

                <Row>
                    {group.map((group) => (
                        <Col md={4} key={group.id} className="mb-4">
                            <Card>
                                <Card.Body>
                                    <Card.Title>{group.name}</Card.Title>
                                    <Card.Text>{group.description}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>



                <Row>
                    <Col md={4} className="text-start">
                        <GroupJoin />
                    </Col>
                </Row>

            </Container>
        </div>
    );
};

export default GroupsPage;
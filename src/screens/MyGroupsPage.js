import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import './MyGroupsPage.css';
import GroupCreation from '../components/groups/GroupCreation.js';

const MyGroupsPage = ({ groupId }) => {
    const [joinedGroups, setJoinedGroups] = useState([]);
    const userData = JSON.parse(localStorage.getItem('userData'));
    const navigate = useNavigate();

    // Function to direct the page when click on the joined group card
    const handleGroupClick = (group) => {
        navigate(`/groups/${group.group_id}`);
    };

    useEffect(() => {
        // Fetch joined groups from the backend
        fetch(`${process.env.REACT_APP_API_URL}/groups/users/${userData.userId}/yourgroups`)
            .then((response) => response.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setJoinedGroups(data);
                } else {
                    setJoinedGroups([]);
                }
            })
            .catch((error) => {
                console.error('Error fetching joined groups:', error);
                setJoinedGroups([]);
            });
    }, [groupId, userData.userId]);

    return (
        <div>
            <Container fluid>
                <Row className="d-flex justify-content-between align-items-center">
                    <Col>
                        <h2 className="my-4">Your Groups</h2>
                    </Col>
                    <Col className="text-end">
                        <GroupCreation />
                    </Col>
                </Row>

                <Row>
                    {joinedGroups.length === 0 ? (
                        <Col>
                            <p>You have not joined any groups yet.</p>
                        </Col>
                    ) : (
                        joinedGroups.map((group) => (
                            <Col md={4} key={group.group_id} className="mb-4">
                                <Card onClick={() => handleGroupClick(group)} style={{ cursor: 'pointer' }}>
                                    <Card.Body>
                                        <Card.Title>{group.name}</Card.Title>
                                        <Card.Text>{group.group_description}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    )}
                </Row>
            </Container>
        </div>
    );
};

export default MyGroupsPage;
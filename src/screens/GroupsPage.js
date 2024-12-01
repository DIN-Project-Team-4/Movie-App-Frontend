import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Modal, Form, Button, ListGroup } from 'react-bootstrap';
import './GroupsPage.css';
import GroupCreation from '../components/groups/GroupCreation.js';
import GroupManagement from '../components/groups/GroupUserManagement.js';

const GroupsPage = ({ groupId }) => {
    const [group, setGroup] = useState([]);
    const [joinedGroups, setJoinedGroups] = useState([]);
    const [members, setMembers] = useState([]);
    const [movie, setMovie] = useState('');
    const [showtime, setShowtime] = useState('');
    const [posts, setPosts] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState(null); // Holds the currently selected group
    const [showModal, setShowModal] = useState(false); // Controls modal visibility

    const userData = JSON.parse(localStorage.getItem('userData')); 

    const handleCardClick = (group) => {
        setSelectedGroup(group);
        setShowModal(true);
    };

    // Function to close the modal
    const handleCloseModal = () => {
        setSelectedGroup(null);
        setShowModal(false);
    }; 

    // Function to handle joining a group
    const handleJoinGroup = () => {
        if (selectedGroup) {
            fetch(`http://localhost:3001/groups/${selectedGroup.group_id}/addMember/${userData.userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    membershipId: "member"
                 }),
            })
                .then((response) => {
                    if (response.ok) {
                        alert(`Successfully joined group: ${selectedGroup.name}`);
                    } else {
                        alert('Failed to join group');
                    }
                })
                .catch((error) => {
                    console.error('Error joining group:', error);
                    alert('An error occurred while joining the group.');
                });
        }
        handleCloseModal();
    };

    useEffect(() => {
        // Fetch group details from the backend
        fetch(`/groups/${groupId}`)

        // Fetch groups from the backend
        fetch(`${process.env.REACT_APP_API_URL}/groups/all`)
            .then((response) => response.json())
            .then((data) => setGroup(data));
        // Fetch joined groups from the backend
        fetch(`${process.env.REACT_APP_API_URL}/groups/users/${userData.userId}/yourgroups`)
            .then((response) => response.json())
            .then((data) => setJoinedGroups(data));
        // Fetch members from the backend
        // fetch(`${process.env.REACT_APP_API_URL}/groups/${groupId}/members`)
        //     .then((response) => response.json())
        //     .then((data) => setMembers(data));
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
                        <h2 className="my-4">Your Groups</h2>
                    </Col>
                    <Col className="text-end">
                        <GroupCreation />
                    </Col>
                </Row>

                <Row>
                    {joinedGroups.map((group) => (
                        <Col md={4} key={group.id} className="mb-4">
                            <Card style={{ cursor: 'pointer' }}>
                                <Card.Body>
                                    <Card.Title>{group.name}</Card.Title>
                                    <Card.Text>{group.group_description}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>

                <Row className="d-flex justify-content-between align-items-center">

                    <Col>
                        <h2 className="my-4">All Groups</h2>
                    </Col>
                </Row>

                <Row>
                    {group.map((group) => (
                        <Col md={4} key={group.id} className="mb-4">
                            <Card onClick={() => handleCardClick(group)} style={{ cursor: 'pointer' }}>
                                <Card.Body>
                                    <Card.Title>{group.name}</Card.Title>
                                    <Card.Text>{group.group_description}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>

                {/* <Row>
                    <Col>
                        <GroupManagement/>
                    </Col>
                </Row> */}

                {/* Modal for group details */}
            {selectedGroup && (
                <Modal show={showModal} onHide={handleCloseModal} className='dark_modal'>
                    <Modal.Header className='bg-dark text-white' closeButton>
                        <Modal.Title>{selectedGroup.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='bg-dark text-white'>
                        <p>{selectedGroup.description}</p>
                        <Button variant="outline-light" onClick={handleJoinGroup}>
                            Join Group
                        </Button>
                    </Modal.Body>
                </Modal>
            )}

            </Container>
        </div>
    );
};

export default GroupsPage;
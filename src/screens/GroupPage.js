import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import './GroupPage.css';
import MemberList from '../components/groups/MemberList.js';
import Chat from '../components/groups/Chat.js';
import GroupManagement from '../components/groups/GroupUserManagement.js';

const GroupPage = () => {
    const { groupId } = useParams();
    const navigate = useNavigate();
    const [groupName, setGroupName] = useState('');
    const [owner, setOwner] = useState(null);
    const [members, setMembers] = useState([]);
    const [messages, setMessages] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showLeaveModal, setShowLeaveModal] = useState(false);
    const userData = JSON.parse(localStorage.getItem('userData'));

    useEffect(() => {
        if (!groupId) {
            console.error('Group ID is undefined');
            return;
        }

        // Fetch group name
        fetch(`http://localhost:3001/groups/${groupId}/name`)
            .then((response) => response.json())
            .then((data) => setGroupName(data.name))
            .catch((error) => console.error('Error fetching group details:', error));

        // Fetch group members
        fetch(`http://localhost:3001/groups/${groupId}/members`)
            .then((response) => response.json())
            .then((data) => {
                const owner = data.find(member => member.is_owner);
                const members = data.filter(member => !member.is_owner);
                setOwner(owner);
                setMembers(members);
            })
            .catch((error) => console.error('Error fetching group members:', error));

        // Fetch group messages
        fetch(`http://localhost:3001/groups/${groupId}/messages`)
            .then((response) => response.json())
            .then((data) => setMessages(data))
            .catch((error) => console.error('Error fetching group messages:', error));
    }, [groupId]);

    const handleDeleteGroup = async () => {
        try {
            const response = await fetch(`http://localhost:3001/groups/delete/${groupId}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                navigate('/groups');
            } else {
                console.error('Failed to delete group');
            }
        } catch (error) {
            console.error('Error deleting group:', error);
        }
    };

    const handleLeaveGroup = async () => {
        try {
            const response = await fetch(`http://localhost:3001/groups/${groupId}/leave/${userData.userId}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                navigate('/groups');
            } else {
                console.error('Failed to leave group');
            }
        } catch (error) {
            console.error('Error leaving group:', error);
        }
    };

    return (
        <div>
            <Container fluid>
                <Row className="align-items-center">
                    <Col>
                        <div className="group-header">
                            <h2 className="group-name">{groupName}</h2>
                            {owner && owner.user_id === userData.userId && (
                                <Button variant="danger" onClick={() => setShowDeleteModal(true)}>
                                    Delete Group
                                </Button>
                            )}
                            {owner && owner.user_id !== userData.userId && (
                                <Button variant="warning" onClick={() => setShowLeaveModal(true)}>
                                    Leave Group
                                </Button>
                            )}
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={8}>
                        <Chat groupId={groupId} messages={messages} />
                    </Col>
                    <Col md={4}>
                        <MemberList owner={owner} members={members} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <GroupManagement groupId={groupId} />
                    </Col>
                </Row>
            </Container>

            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this group?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDeleteGroup}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showLeaveModal} onHide={() => setShowLeaveModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Leave</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to leave this group?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowLeaveModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="warning" onClick={handleLeaveGroup}>
                        Leave
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default GroupPage;
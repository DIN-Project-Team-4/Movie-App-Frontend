// src/pages/GroupPage.js
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

        // Fetch group members and check if user is in the group
        fetch(`${process.env.REACT_APP_API_URL}/groups/${groupId}/members`)
            .then((response) => response.json())
            .then((data) => {
                const isMember = data.some(member => member.user_id === userData.userId);
                if (!isMember) {
                    navigate('/groups');
                } else {
                    const owner = data.find(member => member.is_owner);
                    const members = data.filter(member => !member.is_owner);
                    setOwner(owner);
                    setMembers(members);
                }
            })
            .catch((error) => console.error('Error fetching group members:', error));

        // Fetch group name
        fetch(`${process.env.REACT_APP_API_URL}/groups/${groupId}/name`)
            .then((response) => response.json())
            .then((data) => setGroupName(data.name))
            .catch((error) => console.error('Error fetching group details:', error));

        // Fetch group messages
        fetch(`${process.env.REACT_APP_API_URL}/${groupId}/messages`)
            .then((response) => response.json())
            .then((data) => setMessages(data))
            .catch((error) => console.error('Error fetching group messages:', error));
    }, [groupId, navigate, userData.userId]);

    const handleDeleteGroup = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/groups/delete/${groupId}`, {
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
            const response = await fetch(`${process.env.REACT_APP_API_URL}/${groupId}/leave/${userData.userId}`, {
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

    const handleRemoveMember = async (memberId) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/${groupId}/leave/${memberId}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setMembers(members.filter(member => member.id !== memberId));
            } else {
                console.error('Failed to remove member');
            }
        } catch (error) {
            console.error('Error removing member:', error);
        }
    };

    return (
        <div className='main-div'>
            <Container fluid>
                <Row className="align-items-center">
                    <Col>
                        <div className="group-header">
                            <div className='div-title'>{groupName}</div>
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
                        <MemberList owner={owner} members={members} currentUser={userData} onRemoveMember={handleRemoveMember} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <GroupManagement groupId={groupId} owner={owner} currentUser={userData} />
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
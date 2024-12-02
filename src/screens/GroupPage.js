import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import './GroupPage.css';
import MemberList from '../components/groups/MemberList.js';
import Chat from '../components/groups/Chat.js';

const GroupPage = () => {
    const { groupId } = useParams();
    const [groupName, setGroupName] = useState('');
    const [members, setMembers] = useState([]);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (!groupId) {
            console.error('Group ID is undefined');
            return;
        }

        // Fetch group details
        fetch(`http://localhost:3001/groups/${groupId}/name`)
            .then((response) => response.json())
            .then((data) => setGroupName(data.name))
            .catch((error) => console.error('Error fetching group details:', error));

        // Fetch group members
        fetch(`http://localhost:3001/groups/${groupId}/members`)
            .then((response) => response.json())
            .then((data) => setMembers(Array.isArray(data) ? data : []))
            .catch((error) => console.error('Error fetching group members:', error));

        // Fetch group messages
        fetch(`http://localhost:3001/groups/${groupId}/messages`)
            .then((response) => response.json())
            .then((data) => setMessages(data))
            .catch((error) => console.error('Error fetching group messages:', error));
    }, [groupId]);

    return (
        <div>
            <Container fluid>
                <Row>
                    <Col>
                        <h2 className="group-name">{groupName}</h2>
                    </Col>
                </Row>
                <Row>
                    <Col md={8}>
                        <Chat groupId={groupId} messages={messages} />
                    </Col>
                    <Col md={4}>
                        <MemberList members={members} />
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default GroupPage;
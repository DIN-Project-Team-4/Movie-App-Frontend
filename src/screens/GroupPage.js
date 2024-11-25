import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './GroupPage.css';
import MemberList from '../components/groups/MemberList.js'
import Chat from '../components/groups/Chat.js'

const GroupPage = ({ groupId }) => {
    const [groupName, setGroupName] = useState('');
    const [members, setMembers] = useState([]);

    useEffect(() => {
        // Fetch group details
        fetch(`/groups/${groupId}`)
            .then((response) => response.json())
            .then((data) => setGroupName(data.name));

        // Fetch group members
        fetch(`/groups/${groupId}/members`)
            .then((response) => response.json())
            .then((data) => setMembers(data));
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
                        <Chat groupId={groupId} />
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

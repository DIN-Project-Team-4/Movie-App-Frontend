import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import './GroupsPage.css';
import Header from "../components/Header";
import Chat from '../components/Chat';
import MemberList from '../components/MemberList';

const GroupsPage = () => {
    const [groups, setGroups] = useState([]);
    const [members, setMembers] = useState([]);

    useEffect(() => {
        // Fetch groups from the backend
        fetch('/groups')
            .then((response) => response.json())
            .then((data) => setGroups(data));
        // Fetch members from the backend
        fetch('/members')
            .then((response) => response.json())
            .then((data) => setMembers(data));
    }, []);

    return (
        <div>
            <Header />
            <Container>
                <Row>
                    <Col>
                        <h1 className="my-4">Groups</h1>
                    </Col>
                </Row>
                <Row>
                    {groups.map((group) => (
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
                    <Col md={8}>
                        <Chat />
                    </Col>
                    <Col md={4}>
                        <MemberList members={members} />
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default GroupsPage;
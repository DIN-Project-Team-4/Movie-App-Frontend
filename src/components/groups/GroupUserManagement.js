import React, { useState, useEffect } from 'react';
import { Container, Table, Spinner, Alert } from 'react-bootstrap';
import { Row, Col, Card, Button } from 'react-bootstrap';

const GroupUserManagement = ({ groupId }) => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    //const userData = JSON.parse(localStorage.getItem('userData'));
    useEffect(() => {
        // Fetch applications for the specified group
        const fetchApplications = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/groups/${groupId}/applications`);
                if (!response.ok) {
                    setApplications([]);
                    return;
                }

                const data = await response.json();
                setApplications(data.applications || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchApplications();
    }, [groupId]);

        const handleAccept = async (applicant_id) => {
            console.log(applicant_id);
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/groups/${groupId}/addmember/${applicant_id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ 
                        membershipId : "member"
                     })
                });
    
                if (!response.ok) {
                    throw new Error(`Error accepting member: ${response.statusText}`);
                }
    
                const data = await response.json();
                console.log('Member accepted:', data);
                alert('Member has been accepted into the group.');
            } catch (error) {
                console.error('Error accepting member:', error);
                alert('Failed to accept the member.');
            }
        };
    
        const handleReject = async (applicant_id) => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/groups/${groupId}/reject/${applicant_id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
    
                if (!response.ok) {
                    throw new Error(`Error rejecting member: ${response.statusText}`);
                }
    
                const data = await response.json();
                console.log('Member rejected:', data);
                alert('Application has been rejected.');
            } catch (error) {
                console.error('Error rejecting member:', error);
                alert('Failed to reject the application.');
            }
        };

    if (loading) {
        return (
            <Container className="text-center mt-5">
                <Spinner animation="border" variant="primary" />
                <p>Loading applications...</p>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="mt-5">
                <Alert variant="danger">
                    <strong>Error:</strong> {error}
                </Alert>
            </Container>
        );
    }

    return (
        <Container className="mt-4">
            <h2>Group Applications</h2>
            <Row className="mt-4">
                {applications.map((application) => (
                    <Col md={4} key={application.application_id} className="mb-4">
                        <Card>
                            <Card.Body>
                                {console.log(application)}
                                <Card.Title>Application #{application.application_id}</Card.Title>
                                <Card.Text>
                                    <strong>Applicant Name:</strong> {application.applicant_name}
                                </Card.Text>
                                <Card.Text>
                                    <strong>Status:</strong> {application.status}
                                </Card.Text>
                                <div className="d-flex justify-content-between">
                                    <Button
                                        variant="success"
                                        onClick={() => handleAccept(application.applicant_id)}
                                        //disabled={application.status !== 'pending'}
                                    >
                                        Accept
                                    </Button>
                                    <Button
                                        variant="danger"
                                        onClick={() => handleReject(application.applicant_id)}
                                        //disabled={application.status !== 'pending'}
                                    >
                                        Reject
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
                {applications.length === 0 && (
                    <Col>
                        <p>No applications yet.</p>
                    </Col>)}
            </Row>
        </Container>
    );
};

export default GroupUserManagement;

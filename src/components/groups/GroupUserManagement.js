import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Alert } from 'react-bootstrap';

const GroupManagement = ({ groupId }) => {
    const [applications, setApplications] = useState([]);
    const [members, setMembers] = useState([]);
    const [notification, setNotification] = useState(null);

    // Fetch applications and members when component loads
    useEffect(() => {
        fetchPendingApplications();
        fetchGroupMembers();
    }, [groupId]);

    const fetchPendingApplications = async () => {
        try {
            const response = await fetch(`/groups/${groupId}/applications`);
            const data = await response.json();
            setApplications(data);
        } catch (error) {
            console.error('Error fetching applications:', error);
        }
    };

    const fetchGroupMembers = async () => {
        try {
            const response = await fetch(`/groups/${groupId}/members`);
            const data = await response.json();
            setMembers(data);
        } catch (error) {
            console.error('Error fetching members:', error);
        }
    };

    const handleAcceptApplication = async (applicationId) => {
        try {
            await fetch(`/groups/${groupId}/applications/${applicationId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: 'accepted' }),
            });
            setNotification('Application accepted.');
            fetchPendingApplications();
            fetchGroupMembers();
        } catch (error) {
            console.error('Error accepting application:', error);
        }
    };

    const handleRejectApplication = async (applicationId) => {
        try {
            await fetch(`/groups/${groupId}/applications/${applicationId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: 'rejected' }),
            });
            setNotification('Application rejected.');
            fetchPendingApplications();
        } catch (error) {
            console.error('Error rejecting application:', error);
        }
    };

    const handleRemoveMember = async (memberId) => {
        try {
            await fetch(`/groups/${groupId}/members/${memberId}`, { method: 'DELETE' });
            setNotification('Member removed from group.');
            fetchGroupMembers();
        } catch (error) {
            console.error('Error removing member:', error);
        }
    };

    return (
        <div>
            <h2>Manage Group</h2>
            {notification && <Alert variant="info">{notification}</Alert>}

            <h3>Pending Applications</h3>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>User</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {applications.map((app) => (
                        <tr key={app.id}>
                            <td>{app.username}</td>
                            <td>
                                <Button
                                    variant="success"
                                    onClick={() => handleAcceptApplication(app.id)}
                                >
                                    Accept
                                </Button>{' '}
                                <Button
                                    variant="danger"
                                    onClick={() => handleRejectApplication(app.id)}
                                >
                                    Reject
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <h3>Current Members</h3>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Member</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {members.map((member) => (
                        <tr key={member.id}>
                            <td>{member.username}</td>
                            <td>
                                <Button
                                    variant="danger"
                                    onClick={() => handleRemoveMember(member.id)}
                                >
                                    Remove
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default GroupManagement;

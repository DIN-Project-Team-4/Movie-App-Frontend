// src/components/groups/MemberList.js
import React from 'react';
import { ListGroup, Button } from 'react-bootstrap';
import './MemberList.css';
import { v4 as uuidv4 } from 'uuid';

const MemberList = ({ owner, members, onRemoveMember, currentUser }) => {
    return (
        <div>
            <h2>Owner</h2>
            <div className="member-list-container">
                <ListGroup>
                    {owner && <ListGroup.Item key={owner.id || uuidv4()} className="owner-item">{owner.username}</ListGroup.Item>}
                </ListGroup>
            </div>

            <h2>Members</h2>
            <div className="member-list-container">
                <ListGroup>
                    {members.map((member) => (
                        <ListGroup.Item key={member.id || uuidv4()} className="d-flex justify-content-between align-items-center">
                            {member.username}
                            {currentUser.userId === owner.user_id && (
                                <Button variant="danger" size="sm" onClick={() => {
                                    console.log(`user_id: ${member.user_id}, owner_id: ${owner.user_id}`);
                                    onRemoveMember(member.user_id);
                                    window.location.reload();
                                }}>
                                    Remove
                                </Button>
                            )}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </div>
        </div>
    );
};

export default MemberList;
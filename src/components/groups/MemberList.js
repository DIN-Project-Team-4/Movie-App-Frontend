import React from 'react';
import { ListGroup } from 'react-bootstrap';
import './MemberList.css';
import { v4 as uuidv4 } from 'uuid';

const MemberList = ({ owner, members }) => {
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
                        <ListGroup.Item key={member.id || uuidv4()}>{member.username}</ListGroup.Item>
                    ))}
                </ListGroup>
            </div>
        </div>
    );
};

export default MemberList;
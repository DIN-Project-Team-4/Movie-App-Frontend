import React from 'react';
import { ListGroup } from 'react-bootstrap';
import './MemberList.css';

const MemberList = ({ members }) => {
    return (
        <div><h2>Members</h2>

    <div className="member-list-container">

            <ListGroup>
                {members.map((member, index) => (
                    <ListGroup.Item key={index}>{member.name}</ListGroup.Item>
                ))}
            </ListGroup>
        </div>
</div>
    );
};

export default MemberList;
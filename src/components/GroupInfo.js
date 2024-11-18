/*import React, { useState, useEffect } from 'react';

const GroupInfo = ({ group, user }) => {
    const [isMember, setIsMember] = useState(false);

    useEffect(() => {
        // Check if the user is a member of the group
        setIsMember(group.members.includes(user.id));
    }, [group, user]);

    const handleJoinGroup = () => {
        // Logic to join the group (e.g., send a request to the backend)
        setIsMember(true);
    };

    return (
        <div>
            <h2>{group.name}</h2>
            <p>Owner: {group.owner}</p>
            <h3>Members:</h3>
            <ul>
                {group.members.map((member) => (
                    <li key={member.id}>{member.name}</li>
                ))}
            </ul>
            {!isMember && (
                <button onClick={handleJoinGroup}>Join Group</button>
            )}
        </div>
    );
};*/
export default GroupInfo;
/*import React, { useState, useEffect } from 'react';
import GroupInfo from './GroupInfo';
import './Header.css';

const Groups = ({ user }) => {
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        // Fetch groups from the backend
        fetch('/api/groups')
            .then((response) => response.json())
            .then((data) => setGroups(data));
    }, []);

    return (
        <div>
            <h1>Groups</h1>
            {groups.map((group) => (
                <GroupInfo key={group.id} group={group} user={user} />
            ))}
        </div>
    );
};*/

export default Groups;
import React, { useState } from "react";
import './GroupJoin.css'; // Custom CSS for styling

// Component to display individual group item
function GroupItem({ groupName, onJoin }) {
  return (
    <div className="list-group-item group-item d-flex justify-content-between align-items-center">
      <span className="group-name">{groupName}</span>
      <button className="btn btn-outline-primary btn-sm" onClick={() => onJoin(groupName)}>
        Request to Join
      </button>
    </div>
  );
}

// Main component for Suggested Groups page
function GroupJoin() {
  const [groups] = useState([
    "MCU Group",
    "Nolan Fans",
    "Anime Lovers",
  ]);

  // Handle join request logic
  const handleJoinRequest = (groupName) => {
    alert(`You have requested to join the group: ${groupName}`);
  };

  return (
    <div className="group-join-container">

      {/* Suggested Groups List */}
      <div className="group-list">
        <h2>Suggested Groups</h2>
        <div className="list-group">
          {groups.map((groupName, index) => (
            <GroupItem
              key={index}
              groupName={groupName}
              onJoin={handleJoinRequest}
            />
          ))}
        </div>
      </div>

    </div>
  );
}

export default GroupJoin;

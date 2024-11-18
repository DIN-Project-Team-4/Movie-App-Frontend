import React, { useState } from "react";

// Component to display individual group item
function GroupItem({ groupName, onJoin }) {
  return (
    <div className="list-group-item d-flex justify-content-between align-items-center">
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
    <div>

      {/* Main Content */}
      <main className="container mt-4">
        <div className="row">
          <div className="col-md-8">
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
      </main>

    </div>
  );
}

export default GroupJoin;

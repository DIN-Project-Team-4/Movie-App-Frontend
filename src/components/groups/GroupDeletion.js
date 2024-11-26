// DeleteButton.js
import React from 'react';
import { Button } from 'react-bootstrap';

function DeleteButton({ groupId, onDelete }) {
  // Handle delete request
  const handleDelete = async () => {
    // Confirm before sending the delete request
    if (window.confirm('Are you sure you want to delete this group?')) {
      try {
        const response = await fetch(`http://localhost:3001/groups/delete/${groupId}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete the group');
        }

        // Call the parent onDelete function to update the groups state
        onDelete(groupId);
      } catch (error) {
        console.error('Error deleting group:', error);
      }
    }
  };

  return (
    <Button variant="danger" onClick={handleDelete}>
      Delete
    </Button>
  );
}

export default DeleteButton;

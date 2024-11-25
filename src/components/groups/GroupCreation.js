import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

function GroupCreation() {
  // State to control the visibility of the modal
  const [showModal, setShowModal] = useState(false);

  // Form state to handle input values
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');

  // Function to open the modal
  const handleShow = () => setShowModal(true);

  // Function to close the modal
  const handleClose = () => setShowModal(false);

  // Handle form submission
  const handleCreateGroup = (e) => {
    e.preventDefault();
    console.log('Group Created:', { groupName, groupDescription });
    // Add logic to create the group, such as an API call
    setShowModal(false); // Close the modal after submission
  };

  return (
    <div>
      {/* Button to trigger the modal */}
      <Button variant="primary" onClick={handleShow}>
        Create Group
      </Button>

      {/* Modal for group creation */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create a New Group</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleCreateGroup}>
            <Form.Group controlId="formGroupName">
              <Form.Label>Group Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter group name"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formGroupDescription" className="mt-3">
              <Form.Label>Group Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter group description"
                value={groupDescription}
                onChange={(e) => setGroupDescription(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
              Create
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default GroupCreation;

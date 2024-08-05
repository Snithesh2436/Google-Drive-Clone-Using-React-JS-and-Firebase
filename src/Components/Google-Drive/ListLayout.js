import React, { useState } from 'react';
import { Dropdown, Modal, Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import './ListLayout.css';

const ListLayout = ({ items, isFolder, onRename, onDelete }) => {
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [newName, setNewName] = useState('');

  const handleRename = (item) => {
    setCurrentItem(item);
    setNewName(item.name);
    setShowRenameModal(true);
  };

  const handleDelete = (item) => {
    if (window.confirm(`Are you sure you want to delete "${item.name}"?`)) {
      onDelete(item.id);
    }
  };

  const handleModalClose = () => setShowRenameModal(false);

  const handleRenameSubmit = async (e) => {
    e.preventDefault();
    await onRename(currentItem.id, newName);
    handleModalClose();
  };

  return (
    <div className="list-container">
      <div className="list-header">
        <div className="list-item name">Name</div>
        <div className="list-item modified">Last Modified</div>
        <div className="list-item actions">Actions</div>
      </div>
      {items.map(item => (
        <div key={item.id} className="list-row">
          <div className="list-item name">
            {isFolder ? (
              <a href={`/folder/${item.id}`}>{item.name}</a>
            ) : (
              item.name
            )}
          </div>
          <div className="list-item modified">
            {item.createdAt ? item.createdAt.toDate().toLocaleDateString() : "N/A"}
          </div>
          <div className="list-item actions">
            <Dropdown>
              <Dropdown.Toggle variant="link" id="dropdown-basic">
                <FontAwesomeIcon icon={faEllipsisV} />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {isFolder ? (
                  <Dropdown.Item href={`/folder/${item.id}`}>Open</Dropdown.Item>
                ) : (
                  <Dropdown.Item href={item.url} target="_blank" rel="noopener noreferrer">Open</Dropdown.Item>
                )}
                <Dropdown.Item onClick={() => handleRename(item)}>Rename</Dropdown.Item>
                <Dropdown.Item onClick={() => handleDelete(item)}>Delete</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      ))}

      {/* Rename Modal */}
      {currentItem && (
        <Modal show={showRenameModal} onHide={handleModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Rename {isFolder ? "Folder" : "File"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleRenameSubmit}>
              <Form.Group controlId="formNewName">
                <Form.Label>New Name</Form.Label>
                <Form.Control
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Rename
              </Button>
              <Button variant="secondary" onClick={handleModalClose}>
                Cancel
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};

export default ListLayout;

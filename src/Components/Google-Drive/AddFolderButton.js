import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { useAuth } from '../../Contexts/AuthContext';
import { database } from '../../firebase';
import { ROOT_FOLDER } from '../../hooks/useFolder';

export default function AddFolderButton({ currentFolder, onClose }) {
  const [name, setName] = useState('');
  const { currentUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentFolder == null) return;

    const path = [...currentFolder.path];
    if (currentFolder !== ROOT_FOLDER) {
      path.push({ name: currentFolder.name, id: currentFolder.id });
    }

    try {
      await database.addDoc(database.folders, {
        name: name,
        parentId: currentFolder.id,
        userId: currentUser.uid,
        path: path,
        createdAt: database.getCurrentTimestamp(),
      });
      setName('');
      onClose(); // Close the modal
    } catch (error) {
      console.error('Error adding folder: ', error);
    }
  };

  return (
    <Modal show onHide={onClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Folder Name</Form.Label>
            <Form.Control
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button variant="success" type="submit">
            Add Folder
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

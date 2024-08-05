import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import AddFolderButton from './AddFolderButton'; // Import your AddFolderButton
import AddFileButton from './AddFileButton';     // Import your AddFileButton
import Sidebar from './Sidebar'; // Import your Sidebar component

export default function AddButton({ currentFolder }) {
  const [showAddFolderModal, setShowAddFolderModal] = useState(false);
  const [showAddFileModal, setShowAddFileModal] = useState(false);

  const handleAddFolderClick = () => {
    setShowAddFolderModal(true);
  };

  const handleAddFileClick = () => {
    setShowAddFileModal(true);
  };

  return (
    <>
      <div className="add-button-container">
        <Dropdown>
          <Dropdown.Toggle 
            variant="success" 
            id="dropdown-basic" 
            className="add-button"
          >
            <FontAwesomeIcon icon={faPlus} size="lg" /> 
            <span className="ms-2">New</span>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={handleAddFolderClick}>
              Add Folder
            </Dropdown.Item>
            <Dropdown.Item onClick={handleAddFileClick}>
              Add File
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      {/* Conditionally render the modals based on state */}
      {showAddFolderModal && (
        <AddFolderButton 
          show={showAddFolderModal} 
          onClose={() => setShowAddFolderModal(false)} 
          currentFolder={currentFolder}
        />
      )}
      {showAddFileModal && (
        <AddFileButton 
          show={showAddFileModal} 
          onClose={() => setShowAddFileModal(false)} 
          currentFolder={currentFolder}
        />
      )}

      {/* Add the sidebar component */}
      <Sidebar />
    </>
  );
}

import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faFile } from '@fortawesome/free-solid-svg-icons';

const CombinedButton = ({ showFolders, onToggle }) => {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="primary" id="dropdown-basic">
        {showFolders ? 'Folders' : 'Files'}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => onToggle(true)}>
          <FontAwesomeIcon icon={faFolder} /> Folders
        </Dropdown.Item>
        <Dropdown.Item onClick={() => onToggle(false)}>
          <FontAwesomeIcon icon={faFile} /> Files
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default CombinedButton;

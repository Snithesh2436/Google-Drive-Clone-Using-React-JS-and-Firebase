import React from 'react';
import { Dropdown } from 'react-bootstrap';

export default function ThreeDotMenu({ onOpen, onRename, onDelete }) {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="secondary" id="dropdown-basic">
        ...
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={onOpen}>Open</Dropdown.Item>
        <Dropdown.Item onClick={onRename}>Rename</Dropdown.Item>
        <Dropdown.Item onClick={onDelete}>Delete</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

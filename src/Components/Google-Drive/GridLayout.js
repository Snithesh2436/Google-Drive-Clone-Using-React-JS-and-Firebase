import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import './GridLayout.css';

const GridLayout = ({ items, isFolder, onRename, onDelete }) => {
  const handleRename = (item) => {
    if (onRename) {
      const newName = prompt("Enter new name:", item.name);
      if (newName) onRename(item.id, newName);
    }
  };

  const handleDelete = (item) => {
    if (onDelete) {
      if (window.confirm("Are you sure you want to delete this item?")) {
        onDelete(item.id);
      }
    }
  };

  return (
    <div className="grid-layout">
      {items.map(item => (
        <div key={item.id} className="grid-item">
          <div className="grid-item-content">
            <div className="grid-item-name">
              {isFolder ? (
                <a href={`/folder/${item.id}`}>{item.name}</a>
              ) : (
                item.name
              )}
            </div>
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
    </div>
  );
};

export default GridLayout;

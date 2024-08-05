import React, { useState } from 'react';
import { Card, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';

const File = ({ file, layout }) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleMenuToggle = () => setShowMenu(!showMenu);

  return (
    <div style={{ width: '100%', margin: '10px' }}>
      {layout === "list" ? (
        <div className="d-flex justify-content-between align-items-center p-2 border-bottom">
          <a href={file.url} target="_blank" rel="noopener noreferrer" className="text-decoration-none flex-grow-1">
            {file.name}
          </a>
          <span>{file.createdAt ? file.createdAt.toDate().toLocaleDateString() : "N/A"}</span>
          <Dropdown show={showMenu} align="end">
            <Dropdown.Toggle variant="link" id="dropdown-custom-components" onClick={handleMenuToggle}>
              <FontAwesomeIcon icon={faEllipsisV} />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => {/* Handle delete */}}>Delete</Dropdown.Item>
              <Dropdown.Item onClick={() => {/* Handle add to bin */}}>Add to Bin</Dropdown.Item>
              <Dropdown.Item onClick={() => {/* Handle rename */}}>Rename</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      ) : (
        <Card>
          <Card.Body>
            <Card.Title>
              <a href={file.url} target="_blank" rel="noopener noreferrer">{file.name}</a>
            </Card.Title>
            <Dropdown show={showMenu} align="end">
              <Dropdown.Toggle variant="link" id="dropdown-custom-components" onClick={handleMenuToggle}>
                <FontAwesomeIcon icon={faEllipsisV} />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => {/* Handle delete */}}>Delete</Dropdown.Item>
                <Dropdown.Item onClick={() => {/* Handle add to bin */}}>Add to Bin</Dropdown.Item>
                <Dropdown.Item onClick={() => {/* Handle rename */}}>Rename</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default File;

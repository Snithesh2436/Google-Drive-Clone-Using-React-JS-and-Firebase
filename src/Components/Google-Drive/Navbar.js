import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import ProfileButton from "../Authentication/ProfileButton"; // Import your ProfileButton component
import { useAuth } from '../../Contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogleDrive } from '@fortawesome/free-brands-svg-icons'; // Correct import

export default function NavbarComponent() {
  const { currentUser } = useAuth();
  const location = useLocation();
  const isProfilePage = location.pathname === '/user';

  return (
    <Navbar bg="light" expand="sm">
      <Navbar.Brand as={Link} to="/" style={{ paddingLeft: '20px' }}>
        <FontAwesomeIcon icon={faGoogleDrive} size="2x" color='#4285F4'/>
      </Navbar.Brand>
      <Nav className="ms-auto"> {/* Aligns nav items to the right */}
        {!isProfilePage && (
          <Nav.Item>
            <ProfileButton email={currentUser?.email} />
          </Nav.Item>
        )}
      </Nav>
    </Navbar>
  );
}

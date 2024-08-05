import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faClock, faTrash } from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css';

export default function Sidebar() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-item" onClick={() => handleNavigation('/')}>
        <FontAwesomeIcon icon={faHome} className="sidebar-item-icon" />
        <span className="sidebar-item-text">Home</span>
      </div>
      <div className="sidebar-item" onClick={() => handleNavigation('/recent-files')}>
        <FontAwesomeIcon icon={faClock} className="sidebar-item-icon" />
        <span className="sidebar-item-text">Recent Files</span>
      </div>
      <div className="sidebar-item" onClick={() => handleNavigation('/bin')}>
        <FontAwesomeIcon icon={faTrash} className="sidebar-item-icon" />
        <span className="sidebar-item-text">Bin</span>
      </div>
    </div>
  );
}

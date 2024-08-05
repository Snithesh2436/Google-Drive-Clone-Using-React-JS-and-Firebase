import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function ProfileButton({ email }) {
  const navigate = useNavigate();

  const getInitials = (email) => {
    if (!email) return '??'; // Default initials if email is not available
    const initials = email
      .split('@')[0]
      .split('')
      .slice(0, 2)
      .join('')
      .toUpperCase();
    return initials;
  };

  const initials = getInitials(email);

  const handleClick = () => {
    console.log('ProfileButton clicked');
    navigate('/user'); // Navigate to the profile page
  };

  return (
    <Button
      variant="primary"
      style={{
        width: '45px',
        height: '45px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '18px',
        color: '#fff',
        backgroundColor: '#4285F4',
        border: 'none'
      }}
      onClick={handleClick}
    >
      {initials}
    </Button>
  );
}

ProfileButton.propTypes = {
  email: PropTypes.string,
};

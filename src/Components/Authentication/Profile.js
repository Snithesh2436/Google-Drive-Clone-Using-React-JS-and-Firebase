import React from "react";
import { Card, Button } from "react-bootstrap";
import { useAuth } from "../../Contexts/AuthContext";
import { Link } from "react-router-dom";
import ContainerCentered from "./ContainerCentered";

export default function Profile() {
  const { currentUser, logout } = useAuth();

  return (
    <ContainerCentered>
      <Card style={{ maxWidth: '500px', width: '100%' }}>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          <strong>Email:</strong> {currentUser?.email}
          <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
            Update Profile
          </Link>
          <Button onClick={logout} className="btn btn-secondary w-100 mt-3">
            Log Out
          </Button>
        </Card.Body>
      </Card>
    </ContainerCentered>
  );
}

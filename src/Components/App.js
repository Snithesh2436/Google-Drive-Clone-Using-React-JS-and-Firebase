import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./Authentication/Signup";
import { AuthProvider } from "../Contexts/AuthContext";
import Profile from "./Authentication/Profile";
import Login from "./Authentication/Login";
import ForgotPassword from "./Authentication/ForgotPassword";
import UpdateProfile from "./Authentication/UpdateProfile";
import Dashboard from "./Google-Drive/Dashboard";
import PrivateRoute from "./Authentication/PrivateRoute"

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/folder/:folderId" element={<Dashboard />} />
            <Route path="/user" element={<Profile />} />
            <Route path="/update-profile" element={<UpdateProfile />} />
          </Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;

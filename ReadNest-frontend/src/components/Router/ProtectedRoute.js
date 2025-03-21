import React from 'react';
import { jwtDecode } from 'jwt-decode';
import { getAuthToken } from '../../utils/authentication';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const token = getAuthToken();
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" />;
  }

  try {
    const decoded = jwtDecode(token);
    const userRole = decoded.role; // Ensure this matches the claim in your JWT

    // ✅ If adminOnly is true, only allow admins
    if (adminOnly && userRole !== 'ADMIN') {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold text-red-600">FORBIDDEN ACCESS</h1>
          <p className="text-lg">You do not have permission to access this page.</p>
        </div>
      );
    }

    // ✅ Allow all logged-in users to access non-admin routes
    return children;

  } catch (error) {
    console.error('Failed to decode token:', error);
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;

import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from '../Home/Home';
import DeniedLocationPermission from '../DeniedLocationPermission/DeniedLocationPermission';
import StartupChecker from '../StartupChecker/StartupChecker';
import ServerDown from '../ServerDown/ServerDown';
import { checkBackendHealth } from '../../utils/healthCheck';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import ForgotLogin from '../ForgotLogin/ForgotLogin';
import ResetPassword from '../PasswordResetPage/PasswordResetPage';
import ProtectedRoute from './ProtectedRoute';
import UserManagement from '../UserManagement/UserManagemet';
import BookingManagement from '../BookingManagement/BookingManagement';
import HotelManagement from '../HotelManagement/HotelManagement';
import AdminDashboard from '../AdminDashboard/AdminDashboard';
import HotelDetailsPage from '../HotelDetailsPage/HotelDetails';
import MyBookings from '../MyBookings/MyBookings';
import HotelDetails from '../HotelDetails/HotelDetails';

function RouterComponent() {
  const [backendUp, setBackendUp] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    checkBackendHealth().then((isUp) => {
      setBackendUp(isUp);
    });
  }, []);

  const HomeGuard = () => {
    if (backendUp === false) {
      navigate('/server-down');
      return null;
    }
    return <Home />;
  };

  const ServerDownGuard = () => {
    if (backendUp === true) {
      navigate('/home');
      return null;
    }
    return <ServerDown />;
  };

  if (backendUp === null) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/" element={<StartupChecker><HomeGuard /></StartupChecker>} />
      <Route path="/home" element={<HomeGuard />} />
      <Route path="/denied-location" element={<DeniedLocationPermission />} />
      <Route path="/server-down" element={<ServerDownGuard />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-login" element={<ForgotLogin />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/hotel/:id" element={<HotelDetails />} />

      {/* ✅ Any logged-in user can access My Bookings */}
      <Route 
        path="/my-bookings" 
        element={
          <ProtectedRoute>
            <MyBookings />
          </ProtectedRoute>
        } 
      />

      {/* ✅ Admin-only routes */}
      <Route 
        path="/admin-dashboard" 
        element={
          <ProtectedRoute adminOnly={true}>
            <AdminDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin-dashboard/hotels" 
        element={
          <ProtectedRoute adminOnly={true}>
            <HotelManagement />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin-dashboard/bookings" 
        element={
          <ProtectedRoute adminOnly={true}>
            <BookingManagement />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
}

export default RouterComponent;

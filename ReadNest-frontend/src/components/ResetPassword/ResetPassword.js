import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const token = new URLSearchParams(location.search).get('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      await axios.post('localhost:8080/api/v1/users/reset-password', { token, newPassword });
      setMessage("Password has been reset successfully.");
      navigate('/login');
    } catch (error) {
      setMessage("Failed to reset password. The link may have expired.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 text-black">
      <form onSubmit={handleSubmit} className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl text-center mb-6">Reset Password</h1>

        <div className="relative w-full mb-4">
          <input 
            type="password" 
            placeholder="New Password" 
            className="w-full p-4 bg-transparent outline-none border-2 border-solid border-black/20 rounded-full placeholder-black"
            value={newPassword} 
            onChange={(e) => setNewPassword(e.target.value)} 
            required 
          />
        </div>

        <div className="relative w-full mb-6">
          <input 
            type="password" 
            placeholder="Confirm Password" 
            className="w-full p-4 bg-transparent outline-none border-2 border-solid border-black/20 rounded-full placeholder-black"
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            required 
          />
        </div>

        {message && <p className="text-red-500 text-center mb-4">{message}</p>}

        <button type="submit" className="w-full p-4 bg-yellow-500 rounded-full hover:bg-yellow-400 transition font-bold">
          Reset Password
        </button>
      </form>
    </div>
  );
}

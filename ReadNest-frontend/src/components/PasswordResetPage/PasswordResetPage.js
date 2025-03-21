import React, { useState } from 'react';
import { TiLockClosedOutline } from 'react-icons/ti';
import { useParams, useNavigate } from 'react-router-dom';
import { resetPassword } from '../../services/authService';
import HotelSeekerLogo from '../../assets/images/HotelSeekerNoText.png';

export default function ResetPassword() {
    const { token } = useParams();
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await resetPassword(newPassword, token);
            setMessage("Password reset successful!");
            setError('');
            setTimeout(() => navigate("/login"), 2000);
        } catch (error) {
            setError("Password reset failed. Try again.");
            setMessage('');
        }
    }

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100 text-black'>
      <form onSubmit={handleSubmit} className='w-full max-w-md p-8 bg-white rounded-lg shadow-lg'>
        <a href="/home" className="flex justify-center mb-6">
          <img src={HotelSeekerLogo} alt="HotelSeeker Logo" className="h-16 w-auto" />
        </a>
        <h1 className='text-3xl text-center mb-6'>Reset Password</h1>

        <div className="relative w-full mb-6">
          <input
            className='w-full p-4 bg-transparent outline-none border-2 border-solid border-black/20 rounded-full placeholder-black pr-12'
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <TiLockClosedOutline className='absolute right-[20px] top-1/2 -translate-y-1/2 text-2xl' />
        </div>


        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {message && <p className="text-green-500 text-center mb-4">{message}</p>}

        <button type="submit" className='w-full p-4 bg-yellow-500 rounded-full hover:bg-yellow-400 transition font-bold'>
          Change Password
        </button>
      </form>
    </div>
  );
}
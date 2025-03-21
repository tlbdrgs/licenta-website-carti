import React, { useState } from 'react';
import { sendForgotPasswordRequest } from '../../services/authService';
import { TiMail } from 'react-icons/ti';
import HotelSeekerLogo from '../../assets/images/HotelSeekerNoText.png';

export default function ForgotLogin() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await sendForgotPasswordRequest(email);
      setMessage("A password reset link has been sent to your email.");
      setError('');
    } catch (error) {
      setError("No email found in the database.");
      setMessage('');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 text-black">
      <form onSubmit={handleSubmit} className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <a href="/home" className="flex justify-center mb-6">
          <img src={HotelSeekerLogo} alt="HotelSeeker Logo" className="h-16 w-auto" />
        </a>
        <h1 className="text-3xl text-center mb-6">Forgot Login Information</h1>
        <div className="relative w-full mb-6">
          <input 
            type="email" 
            placeholder="Enter your email" 
            className="w-full p-4 bg-transparent outline-none border-2 border-solid border-black/20 rounded-full placeholder-black"
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          <TiMail className='absolute right-[20px] top-1/2 -translate-y-1/2 text-2xl' />
        </div>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {message && <p className="text-green-500 text-center mb-4">{message}</p>}

        <button type="submit" className="w-full p-4 bg-yellow-500 rounded-full hover:bg-yellow-400 transition font-bold">
          Submit
        </button>
      </form>
    </div>
  );
}

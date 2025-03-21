import React, { useState } from 'react';
import { TiUser, TiLockClosed, TiMail } from "react-icons/ti";
import { registerUser } from '../../services/authService';
import HotelSeekerLogo from '../../assets/images/HotelSeekerNoText.png';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      await registerUser(username, email, password);
      alert("Registration successful!");
      window.location.href = '/login';
    } catch (error) {
      setError("Registration failed. Try again.");
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100 text-black relative'>
      <a href="/home" className="absolute top-4 left-4">
        <img src={HotelSeekerLogo} alt="HotelSeeker Logo" className="h-16 w-auto" />
      </a>

      <form onSubmit={handleRegister} className='w-full max-w-md p-8 bg-white rounded-lg shadow-lg'>
        <h1 className='text-3xl text-center mb-6'>Sign Up</h1>
        
        <div className="relative w-full mb-4">
          <input 
            className='w-full p-4 bg-transparent outline-none border-2 border-solid border-black/20 rounded-full placeholder-black pr-12' 
            type="text" 
            placeholder="Username" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required 
          />
          <TiUser className='absolute right-[20px] top-1/2 -translate-y-1/2 text-2xl' />
        </div>

        <div className="relative w-full mb-4">
          <input 
            className='w-full p-4 bg-transparent outline-none border-2 border-solid border-black/20 rounded-full placeholder-black pr-12' 
            type="email" 
            placeholder="Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
          <TiMail className='absolute right-[20px] top-1/2 -translate-y-1/2 text-2xl' />
        </div>

        <div className="relative w-full mb-6">
          <input 
            className='w-full p-4 bg-transparent outline-none border-2 border-solid border-black/20 rounded-full placeholder-black pr-12' 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
          <TiLockClosed className='absolute right-[20px] top-1/2 -translate-y-1/2 text-2xl' />
        </div>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <button type="submit" className='w-full p-4 bg-yellow-500 rounded-full hover:bg-yellow-400 transition font-bold'>
          Sign Up
        </button>

        <div className='text-center mt-6'>
          <p>Already have an account? <a href="/login" className='text-yellow-500 hover:underline'>Login</a></p>
        </div>
      </form>
    </div>
  );
}

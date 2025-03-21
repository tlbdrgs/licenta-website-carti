import React, { useState } from 'react';
import { TiUser, TiLockClosed } from "react-icons/ti";
import { loginUser } from '../../services/authService';
import HotelSeekerLogo from '../../assets/images/HotelSeekerNoText.png';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await loginUser(username, password);
      alert("Login successful!");
      window.location.href = '/home';
    } catch (error) {
      setError("Invalid username or password.");
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100 text-black'>
      <form onSubmit={handleLogin} className='w-full max-w-md p-8 bg-white rounded-lg shadow-lg'>
        <a href="/home" className="flex justify-center mb-6">
          <img src={HotelSeekerLogo} alt="HotelSeeker Logo" className="h-16 w-auto" />
        </a>
        <h1 className='text-3xl text-center mb-6'>Login</h1>

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
          Login
        </button>

        <div className='text-center mt-6'>
          <p>
            Don't have an account? <a href="/register" className='text-yellow-500 hover:underline'>Sign up</a>
          </p>
          <p className='mt-2'>
            Forgot login information? <a href="/forgot-login" className='text-yellow-500 hover:underline'>Click here</a>
          </p>
        </div>
      </form>
    </div>
  );
}

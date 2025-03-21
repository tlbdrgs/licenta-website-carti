import React, { useEffect, useState } from 'react';
import HotelSeekerLogo from '../../assets/images/HotelSeekerLogo.svg';
import { jwtDecode } from "jwt-decode";
import { getAuthToken } from '../../utils/authentication';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [role, setRole] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = getAuthToken();
        console.log("Retrieved token:", token);

        if (token) {
            try {
                const decoded = jwtDecode(token);
                console.log("Decoded token:", decoded);
                setUsername(decoded.sub);
                setRole(decoded.role);
                setIsLoggedIn(true);
            } catch (error) {
                console.error("Failed to decode token:", error);
                setIsLoggedIn(false);
            }
        }
    }, []);

    const handleLogout = () => {
        document.cookie = "Token=; Max-Age=0; path=/";
        setIsLoggedIn(false);
        window.location.href = '/home';
    };

    return (
        <nav className="bg-white">
            <div className="container mx-auto py-4 px-8 flex justify-between items-center max-w-screen-lg">
                <img src={HotelSeekerLogo} alt="HotelSeek Logo" className="h-24 w-auto p-0" />
                {isLoggedIn ? (
                    <div className="flex items-center space-x-4">
                        <span>Hello, {username}</span>
                        {role === 'USER' && (
                            <span className='text-yellow-500 cursor-pointer hover:underline'
                            onClick={() => navigate('/my-bookings')}
                            >
                            My Bookings
                        </span>
                        )}
                        {role === 'ADMIN' && (
                            <span
                                className='text-yellow-500 cursor-pointer hover:underline'
                                onClick={() => navigate('/admin-dashboard')}
                        >
                            Dashboard
                        </span>
                        )}
                        <button
                            className='bg-black text-white px-6 py-2 rounded-lg transition-transform duration-200 transform hover:scale-105 hover:bg-gray-900 shadow-md hover:shadow-lg'
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <button
                        className="bg-black text-white px-6 py-2 rounded-lg transition-transform duration-200 transform hover:scale-105 hover:bg-gray-900 shadow-md hover:shadow-lg"
                        onClick={() => window.location.href = `/login`}
                    >
                        Login
                    </button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;

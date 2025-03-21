import React from 'react';
import { useNavigate } from 'react-router-dom';
import ReadNestLogo from '../assets/images/ReadNestLogo.svg';

const Navbar = () => {
    const navigate = useNavigate();

    const isLoggedIn = false;

    const handleLogout = () => {
        navigate('/home');
    };

    return (
        <nav className="shadow-md h-24 overflow-hidden" style={{ backgroundColor: '#f2aefe' }}>
            <div className="container mx-auto px-8 flex justify-between items-center max-w-screen-lg h-full">
                <img
                    src={ReadNestLogo}
                    alt="ReadNest Logo"
                    className="h-[130px] w-auto cursor-pointer"
                    onClick={() => navigate('/home')}
                />
                {isLoggedIn ? (
                    <button
                        className="bg-black text-white px-6 py-2 rounded-lg transition-transform duration-200 transform hover:scale-105 hover:bg-gray-900 shadow-md hover:shadow-lg"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                ) : (
                    <button
                        className="bg-black text-white px-6 py-2 rounded-lg transition-transform duration-200 transform hover:scale-105 hover:bg-gray-900 shadow-md hover:shadow-lg"
                        onClick={() => navigate('/login')}
                    >
                        Login
                    </button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;

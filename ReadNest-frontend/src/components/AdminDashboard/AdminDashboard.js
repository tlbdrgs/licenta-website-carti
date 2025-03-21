import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const navigate = useNavigate();

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
            <div className="space-y-4">
                <p 
                    className="text-blue-500 cursor-pointer hover:underline" 
                    onClick={() => navigate('/admin-dashboard/hotels')}
                >
                    Manage Hotels
                </p>
                <p 
                    className="text-blue-500 cursor-pointer hover:underline" 
                    onClick={() => navigate('/admin-dashboard/bookings')}
                >
                    Manage Bookings
                </p>
            </div>
        </div>
    );
};

export default AdminDashboard;

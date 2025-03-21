import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getAuthToken } from '../../utils/authentication';
import { jwtDecode } from 'jwt-decode';
import Navbar from '../Navbar/Navbar';

const API_URL = "http://localhost:8080/api/v1/bookings/my-bookings";

const MyBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        setLoading(true);
        setError(null);

        try {
            const token = getAuthToken();
            if (!token) {
                setError("User is not authenticated.");
                setLoading(false);
                return;
            }

            const decodedToken = jwtDecode(token);
            const username = decodedToken.username || decodedToken.sub;

            if (!username) {
                setError("Username not found in token.");
                setLoading(false);
                return;
            }

            const response = await axios.get(`${API_URL}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                params: { username }
            });

            console.log("Backend response:", response.data); 
            setBookings(response.data);
        } catch (err) {
            console.error("Error fetching bookings:", err);
            setError("Failed to fetch bookings.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div>Loading bookings...</div>;
    }

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="container mx-auto p-6">
                <h2 className="text-2xl font-bold mb-4">My Bookings</h2>
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border px-4 py-2">Hotel Name</th>
                            <th className="border px-4 py-2">Room Number</th>
                            <th className="border px-4 py-2">Start Date</th>
                            <th className="border px-4 py-2">End Date</th>
                            <th className="border px-4 py-2">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="text-center py-4">No bookings found.</td>
                            </tr>
                        ) : (
                            bookings.map((booking) => (
                                <tr key={booking.id} className="hover:bg-gray-100">
                                    <td className="border px-4 py-2">{booking.hotelName || "N/A"}</td> {/* ✅ Show Hotel Name */}
                                    <td className="border px-4 py-2">{booking.roomNumber || "N/A"}</td> {/* ✅ Show Room Number */}
                                    <td className="border px-4 py-2">
                                        {booking.bookingStartDate 
                                            ? new Date(booking.bookingStartDate).toLocaleString() 
                                            : "Invalid Date"}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {booking.bookingEndDate 
                                            ? new Date(booking.bookingEndDate).toLocaleString() 
                                            : "Invalid Date"}
                                    </td>
                                    <td className="border px-4 py-2">{booking.status}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyBookings;

import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";

const API_URL = "http://localhost:8080/api/v1/bookings/all";

const BookingManagement = () => {
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
            const response = await axios.get(API_URL);
            setBookings(response.data);
        } catch (err) {
            setError("Failed to fetch bookings.");
            console.error("Error fetching bookings:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="container mx-auto p-6">
                <h2 className="text-2xl font-bold mb-4">Booking Management</h2>
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : (
                    <table className="table-auto w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border px-4 py-2">ID</th>
                                <th className="border px-4 py-2">User</th>
                                <th className="border px-4 py-2">Hotel</th>
                                <th className="border px-4 py-2">Room</th>
                                <th className="border px-4 py-2">Start Date</th>
                                <th className="border px-4 py-2">End Date</th>
                                <th className="border px-4 py-2">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="text-center py-4">No bookings found.</td>
                                </tr>
                            ) : (
                                bookings.map((booking) => (
                                    <tr key={booking.id} className="hover:bg-gray-100">
                                        <td className="border px-4 py-2">{booking.id}</td>
                                        <td className="border px-4 py-2">{booking.username}</td>
                                        <td className="border px-4 py-2">{booking.hotelName}</td>
                                        <td className="border px-4 py-2">{booking.roomNumber}</td>
                                        <td className="border px-4 py-2">
                                            {new Date(booking.bookingStartDate).toLocaleString()}
                                        </td>
                                        <td className="border px-4 py-2">
                                            {new Date(booking.bookingEndDate).toLocaleString()}
                                        </td>
                                        <td className="border px-4 py-2">{booking.status}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default BookingManagement;

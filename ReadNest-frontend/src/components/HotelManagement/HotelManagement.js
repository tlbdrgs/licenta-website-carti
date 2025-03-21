import React, { useEffect, useState } from "react";
import axios from "axios";
import { getAuthToken } from "../../utils/authentication"; // Ensure you have authentication utils
import { jwtDecode } from "jwt-decode";
import Navbar from "../Navbar/Navbar";

const API_URL = "http://localhost:8080/api/v1/hotels"; // Backend API URL

const HotelManagement = () => {
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editHotel, setEditHotel] = useState(null); // Hotel being edited
    const [newHotel, setNewHotel] = useState({ name: "", description: "", latitude: "", longitude: "" });

    useEffect(() => {
        fetchHotels();
    }, []);

    const fetchHotels = async () => {
        setLoading(true);
        setError(null);
        try {
            const token = getAuthToken();
            const response = await axios.get(`${API_URL}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setHotels(response.data);
        } catch (err) {
            setError("Failed to fetch hotels.");
            console.error("Error fetching hotels:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (hotel) => {
        setEditHotel(hotel);
    };

    const handleSaveEdit = async () => {
        if (!editHotel) return;
        try {
            const token = getAuthToken();
            await axios.put(`${API_URL}/${editHotel.id}`, editHotel, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            setEditHotel(null);
            fetchHotels();
        } catch (err) {
            console.error("Error updating hotel:", err);
        }
    };

    const handleDelete = async (hotelId) => {
        if (!window.confirm("Are you sure you want to delete this hotel?")) return;
        try {
            const token = getAuthToken();
            await axios.delete(`${API_URL}/${hotelId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            fetchHotels();
        } catch (err) {
            console.error("Error deleting hotel:", err);
        }
    };

    const handleAddHotel = async () => {
        if (!newHotel.name || !newHotel.latitude || !newHotel.longitude) {
            alert("Please fill in all fields.");
            return;
        }
        try {
            const token = getAuthToken();
            await axios.post(API_URL, newHotel, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            setNewHotel({ name: "", description: "", latitude: "", longitude: "" });
            fetchHotels();
        } catch (err) {
            console.error("Error adding hotel:", err);
        }
    };

    if (loading) return <div>Loading hotels...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="container mx-auto p-6">
                <h2 className="text-2xl font-bold mb-4">Hotel Management</h2>

                {/* Add New Hotel Form */}
                <div className="bg-white p-4 mb-4 rounded shadow">
                    <h3 className="text-lg font-semibold">Add New Hotel</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            type="text"
                            placeholder="Hotel Name"
                            className="border p-2 rounded"
                            value={newHotel.name}
                            onChange={(e) => setNewHotel({ ...newHotel, name: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Description"
                            className="border p-2 rounded"
                            value={newHotel.description}
                            onChange={(e) => setNewHotel({ ...newHotel, description: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Latitude"
                            className="border p-2 rounded"
                            value={newHotel.latitude}
                            onChange={(e) => setNewHotel({ ...newHotel, latitude: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Longitude"
                            className="border p-2 rounded"
                            value={newHotel.longitude}
                            onChange={(e) => setNewHotel({ ...newHotel, longitude: e.target.value })}
                        />
                    </div>
                    <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-400" onClick={handleAddHotel}>
                        Add Hotel
                    </button>
                </div>

                {/* Hotel Table */}
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border px-4 py-2">ID</th>
                            <th className="border px-4 py-2">Name</th>
                            <th className="border px-4 py-2">Description</th>
                            <th className="border px-4 py-2">Latitude</th>
                            <th className="border px-4 py-2">Longitude</th>
                            <th className="border px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {hotels.map((hotel) => (
                            <tr key={hotel.id} className="hover:bg-gray-100">
                                <td className="border px-4 py-2">{hotel.id}</td>
                                <td className="border px-4 py-2">
                                    {editHotel?.id === hotel.id ? (
                                        <input type="text" value={editHotel.name} onChange={(e) => setEditHotel({ ...editHotel, name: e.target.value })} />
                                    ) : (
                                        hotel.name
                                    )}
                                </td>
                                <td className="border px-4 py-2">{hotel.description}</td>
                                <td className="border px-4 py-2">{hotel.latitude}</td>
                                <td className="border px-4 py-2">{hotel.longitude}</td>
                                <td className="border px-4 py-2">
                                    {editHotel?.id === hotel.id ? (
                                        <button className="bg-blue-500 text-white px-2 py-1 rounded" onClick={handleSaveEdit}>
                                            Save
                                        </button>
                                    ) : (
                                        <button className="bg-yellow-500 text-black px-2 py-1 rounded" onClick={() => handleEdit(hotel)}>
                                            Edit
                                        </button>
                                    )}
                                    <button className="bg-red-500 text-white px-2 py-1 rounded ml-2" onClick={() => handleDelete(hotel.id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default HotelManagement;

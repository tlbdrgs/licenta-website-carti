import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { getAuthToken } from "../../utils/authentication";
import Navbar from "../Navbar/Navbar";

const API_URL = "http://localhost:8080/api/v1";

const HotelDetails = () => {
    const { id } = useParams();
    const [hotel, setHotel] = useState(null);
    const [rooms, setRooms] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [unavailableDates, setUnavailableDates] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetchHotelDetails();
    }, []);

    const fetchHotelDetails = async () => {
        try {
            const response = await axios.get(`${API_URL}/hotels/${id}`);
            setHotel(response.data);
            setRooms(response.data.rooms);
        } catch (error) {
            console.error("Error fetching hotel details:", error);
            setMessage("Failed to load hotel details.");
        }
    };

    const fetchUnavailableDates = async () => {
        if (!selectedRoom) return;
        try {
            const response = await axios.get(`${API_URL}/bookings/unavailable-dates`, {
                params: {
                    hotelId: id,
                    roomNumber: selectedRoom.roomNumber,
                },
            });
            setUnavailableDates(response.data);
        } catch (error) {
            console.error("Error fetching unavailable dates:", error);
        }
    };

    const handleBooking = async () => {
        const token = getAuthToken();

        if (!selectedRoom) {
            setMessage("Please select a room first.");
            return;
        }

        if (!startDate || !endDate) {
            setMessage("Please select a valid start and end date.");
            return;
        }

        if (startDate >= endDate) {
            setMessage("End date must be after start date.");
            return;
        }

        const decodedToken = jwtDecode(token);
        const username = decodedToken.username || decodedToken.sub;

        if (!username) {
            setMessage("User not authenticated.");
            return;
        }

        const bookingData = {
            hotelId: id,
            roomNumber: selectedRoom.roomNumber,
            username: username,
            startDate: new Date(startDate).toISOString(),
            endDate: new Date(endDate).toISOString(),
        };

        try {
            const response = await axios.post(`${API_URL}/bookings/create`, bookingData, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });

            console.log("Booking successful:", response.data);
            setMessage("Booking successful!");
            fetchUnavailableDates();
        } catch (error) {
            console.error("Error booking room:", error.response ? error.response.data : error);
            setMessage("Error booking room. Please try again later.");
        }
    };

    const today = new Date().toISOString().split("T")[0];

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="container mx-auto p-6">
                {hotel ? (
                    <div className="bg-white shadow-lg rounded-lg p-6 border border-yellow-400">
                        <h2 className="text-3xl font-bold text-yellow-500">{hotel.name}</h2>
                        <p className="text-lg text-gray-600 mt-2">
                            Location: {hotel.latitude}, {hotel.longitude}
                        </p>

                        <h3 className="text-2xl font-semibold mt-6">Available Rooms</h3>
                        <div className="grid grid-cols-3 gap-6 mt-4">
                            {rooms.map((room) => (
                                <div
                                    key={room.roomNumber}
                                    className={`p-4 rounded-lg shadow-md transition duration-200 ${
                                        selectedRoom === room ? "border-4 border-yellow-500 bg-yellow-100" : "border border-gray-300 bg-white"
                                    }`}
                                >
                                    <h4 className="text-xl font-bold">Room {room.roomNumber}</h4>
                                    <button
                                        className={`mt-3 px-4 py-2 rounded-lg shadow-md w-full ${
                                            selectedRoom === room
                                                ? "bg-yellow-500 text-white"
                                                : "bg-gray-200 hover:bg-gray-300"
                                        }`}
                                        onClick={() => {
                                            setSelectedRoom(room);
                                            fetchUnavailableDates();
                                            setStartDate(""); // Reset dates when changing rooms
                                            setEndDate("");
                                        }}
                                    >
                                        {selectedRoom === room ? "Selected" : "Select Room"}
                                    </button>
                                </div>
                            ))}
                        </div>

                        {selectedRoom && (
                            <div className="mt-6 p-6 bg-gray-100 rounded-lg">
                                <h3 className="text-2xl font-semibold text-yellow-500">Book Room {selectedRoom.roomNumber}</h3>
                                
                                <div className="mt-4">
                                    <label className="block font-semibold">Start Date:</label>
                                    <input
                                        type="date"
                                        className="w-full p-2 border border-gray-300 rounded-lg shadow-sm"
                                        value={startDate}
                                        min={today} // Prevents selecting past dates
                                        onChange={(e) => setStartDate(e.target.value)}
                                    />
                                </div>

                                <div className="mt-4">
                                    <label className="block font-semibold">End Date:</label>
                                    <input
                                        type="date"
                                        className="w-full p-2 border border-gray-300 rounded-lg shadow-sm"
                                        value={endDate}
                                        min={startDate || today} // Prevents selecting a date before the start date
                                        onChange={(e) => setEndDate(e.target.value)}
                                    />
                                </div>

                                <button
                                    className="mt-6 bg-yellow-500 text-white px-6 py-2 rounded-lg w-full hover:bg-yellow-400 shadow-md"
                                    onClick={handleBooking}
                                >
                                    Confirm Booking
                                </button>

                                {message && <p className="mt-4 text-lg font-semibold text-red-500">{message}</p>}
                            </div>
                        )}
                    </div>
                ) : (
                    <p className="text-lg text-gray-600">Loading hotel details...</p>
                )}
            </div>
        </div>
    );
};

export default HotelDetails;

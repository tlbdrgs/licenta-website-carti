import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';

const HotelDetailsPage = () => {
    const {id} = useParams();
    const [hotel, setHotel] = useState(null);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [StartDate, setStartDate] = useState('');
    const [EndDate, setEndDate] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:8080/api/hotels/${id}`)
            .then(response => {
                setHotel(response.data);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            });
    }, [id]);

    const handleRoomSelect = (room) => {
        setSelectedRoom(room);
        setMessage('');
    }

    const handleBooking = async () => {
        if(!StartDate || !EndDate) {
            setMessage('Please select a start and end date');
            return;
        }

        try {
            axios.post('http://localhost:8080/api/bookings', {
                hotelId: id,
                roomId: selectedRoom.id,
                startDate: StartDate,
                endDate: EndDate
            });
            setMessage('Booking successful!');
        }
        catch (error) {
            console.error('Error booking room: ', error);
            setMessage('Error booking room. Please try again later.');
        }
    }

    if(!hotel) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50">
          {/* Include the Navbar */}
          <Navbar />
    
          <div className="container mx-auto px-4 py-8">
            {/* Hotel Info */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold">{hotel.name}</h1>
              <p className="text-sm text-gray-600">Location: {hotel.latitude}, {hotel.longitude}</p>
              <p className="text-sm text-gray-600">{hotel.description || 'No description available.'}</p>
            </div>
    
            {/* Rooms List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hotel.rooms.map((room) => (
                <div key={room.roomNumber} className="border p-4 rounded-lg shadow-lg">
                  <h2 className="text-xl font-semibold">{room.type}</h2>
                  <p className="text-sm">Price: ${room.price} per night</p>
                  <p className="text-sm">Availability: {room.isAvailable ? 'Available' : 'Booked'}</p>
                  <button
                    className="mt-4 bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-300 transition duration-200"
                    disabled={!room.isAvailable}
                    onClick={() => handleRoomSelect(room)}
                  >
                    {room.isAvailable ? 'Book Now' : 'Unavailable'}
                  </button>
                </div>
              ))}
            </div>
    
            {/* Booking Form */}
            {selectedRoom && (
              <div className="mt-8 border p-4 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold">Booking Room: {selectedRoom.roomNumber}</h2>
                <p>Type: {selectedRoom.type}</p>
                <p>Price: ${selectedRoom.price} per night</p>
                <div className="mt-4">
                  <label className="block text-sm mb-2">Start Date</label>
                  <input
                    type="date"
                    value={StartDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="border p-2 rounded w-full"
                  />
                </div>
                <div className="mt-4">
                  <label className="block text-sm mb-2">End Date</label>
                  <input
                    type="date"
                    value={EndDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="border p-2 rounded w-full"
                  />
                </div>
                <button
                  className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-400 transition duration-200"
                  onClick={handleBooking}
                >
                  Confirm Booking
                </button>
                <p className="mt-4 text-red-500">{message}</p>
              </div>
            )}
          </div>
        </div>
      );
    };

export default HotelDetailsPage;
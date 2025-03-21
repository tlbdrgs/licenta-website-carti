import React from 'react';
import { calculateDistance } from '../../utils/distanceCalculator';

const HotelCard = ({ hotel, userLocation }) => {
  const { latitude: userLat, longitude: userLon } = userLocation || {};
  const distance = userLat && userLon ? calculateDistance(userLat, userLon, hotel.latitude, hotel.longitude) : null;

  return (
    <div className="w-72 h-56 flex flex-col justify-between border border-yellow-400 bg-white text-black rounded shadow-lg">
      <div className="p-4">
        <h2 className="text-xl font-semibold">{hotel.name}</h2>
        <p className="text-sm">
          {distance ? `Distance: ${distance} km` : 'Distance not available'}
        </p>
        <p className="text-sm">Rooms: {hotel.rooms.length}</p>
      </div>
      <div className="px-4 pb-4">
        <button
          className="bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-300 transition duration-200 rounded-lg shadow-lg"
          onClick={() => window.location.href = `/hotel/${hotel.id}`}
        >
          Hotel Details
        </button>
      </div>
    </div>
  );
};

export default HotelCard;

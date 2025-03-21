import React from 'react';
import HotelCard from '../HotelCard/HotelCard';

const HotelList = ({ hotels, userLocation }) => {
  return (
    <div className="max-w-screen-lg mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {hotels.map((hotel) => (
        <div key={hotel.id} className="flex justify-center">
          <HotelCard hotel={hotel} userLocation={userLocation} />
        </div>
      ))}
    </div>
  );
};

export default HotelList;

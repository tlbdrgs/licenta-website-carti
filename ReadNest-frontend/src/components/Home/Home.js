import React, { useState, useEffect } from 'react';
import { getGeolocation } from '../../utils/geolocationRetrieval';
import SearchBar from '../SearchBar/SearchBar';
import HotelList from '../HotelList/HotelList';
import useHotelData from '../../hooks/useHotelData';
import Navbar from '../Navbar/Navbar';
import { reverseGeocode } from '../../utils/reverseGeocode';

const Home = () => {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const { hotels, handleSearch } = useHotelData(location);
  const [cityName, setCityName] = useState('');

  useEffect(() => {
    getGeolocation()
      .then((coords) => {
        setLocation(coords);
        reverseGeocode(coords.latitude, coords.longitude)
        .then((city) => setCityName(`Your Location: ${city}`))
        .catch((error) => {
          console.error(error);
          setCityName("Unable to determine location");
      })
      .catch((err) => console.error(err));
  })
  .catch((error) => {
    console.error(error);
    setCityName("Unable to retrieve coordinates");
  });
  },
   []);

  return (
    <div className="min-h-screen bg-gray-150">
      <Navbar />
      <div className="flex flex-col items-center justify-center">
        <p className='text-xl'>{cityName}</p>
        <SearchBar onSearch={handleSearch} />
        <HotelList hotels={hotels} userLocation={location} />
      </div>
    </div>
  );
};

export default Home;

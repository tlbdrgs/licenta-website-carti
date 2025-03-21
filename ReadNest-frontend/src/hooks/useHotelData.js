import { useEffect, useState } from 'react';
import { fetchAllHotels, fetchNearbyHotels } from '../services/hotelService';

const useHotelData = (location) => {
  const [hotels, setHotels] = useState([]);
  const [error, setError] = useState('');

  const fetchAllHotelsData = async () => {
    try {
      const allHotels = await fetchAllHotels();
      setHotels(allHotels);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    if (location.latitude && location.longitude) {
      fetchAllHotelsData();
    }
  }, [location]);

  const handleSearch = async (radius) => {
    if (!location.latitude || !location.longitude) {
      return;
    }

    if (radius) {
      try {
        const nearbyHotels = await fetchNearbyHotels(location.latitude, location.longitude, radius);
        setHotels(nearbyHotels);
      } catch (err) {
        setError(err.message);
      }
    } else {
      fetchAllHotelsData();
    }
  };

  return { hotels, error, handleSearch };
};

export default useHotelData;

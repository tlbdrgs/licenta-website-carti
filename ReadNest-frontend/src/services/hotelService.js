import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/v1/hotels';

export const fetchAllHotels = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching hotels:", error);
    throw new Error("Failed to retrieve hotels.");
  }
};

export const fetchNearbyHotels = async (latitude, longitude, radius) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/nearby`, {
      params: { latitude, longitude, radius },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching nearby hotels:", error);
    throw new Error("Failed to retrieve nearby hotels.");
  }
};

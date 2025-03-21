export const reverseGeocode = async (latitude, longitude) => {
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
    if (!response.ok) {
        throw new Error('Failed to fetch location data');
    }
    const data = await response.json();
    return data.address.city || data.address.town || data.address.village || "Unknown location";
};
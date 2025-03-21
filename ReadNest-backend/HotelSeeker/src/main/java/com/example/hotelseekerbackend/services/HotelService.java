package com.example.hotelseekerbackend.services;

import com.example.hotelseekerbackend.entities.Hotel;
import com.example.hotelseekerbackend.repositories.HotelRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class HotelService {

    private final HotelRepository hotelRepository;

    public List<Hotel> getAllHotels() {
        return hotelRepository.findAll();
    }

    public Hotel getHotelById(Long id) {
        return hotelRepository.findById((long) Math.toIntExact(id))
                .orElseThrow(() -> new RuntimeException("Hotel not found with ID: " + id));
    }

    public Hotel createHotel(Hotel hotel) {
        return hotelRepository.save(hotel);
    }

    public List<Hotel> getNearbyHotels(double latitude, double longitude, double radius) {
        return hotelRepository.findHotelsWithinRadius(latitude, longitude, radius);
    }

    public Hotel updateHotel(Long id, Map<String, Object> updates) {
        Hotel hotel = hotelRepository.findById((long) Math.toIntExact(id))
                .orElseThrow(() -> new RuntimeException("Hotel not found with ID: " + id));

        updates.forEach((key, value) -> {
            switch (key) {
                case "name" -> hotel.setName((String) value);
                case "latitude" -> hotel.setLatitude(Double.parseDouble(value.toString()));
                case "longitude" -> hotel.setLongitude(Double.parseDouble(value.toString()));
            }
        });

        return hotelRepository.save(hotel);
    }

    public void deleteHotel(Long id) {
        if (!hotelRepository.existsById((long) Math.toIntExact(id))) {
            throw new RuntimeException("Hotel with ID: " + id + " not found.");
        }
        hotelRepository.deleteById((long) Math.toIntExact(id));
    }
}

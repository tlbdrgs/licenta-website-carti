package com.example.hotelseekerbackend.controllers;

import com.example.hotelseekerbackend.entities.Hotel;
import com.example.hotelseekerbackend.services.HotelService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/hotels")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class HotelController {

    private final HotelService hotelService;

    @GetMapping
    public ResponseEntity<?> getHotels() {
        try {
            return ResponseEntity.ok(hotelService.getAllHotels());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Could not retrieve hotels.");
        }
    }

    @GetMapping("/nearby")
    public ResponseEntity<?> getNearbyHotels(@RequestParam double latitude,
                                             @RequestParam double longitude,
                                             @RequestParam double radius) {
        try {
            return ResponseEntity.ok(hotelService.getNearbyHotels(latitude, longitude, radius));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Could not retrieve nearby hotels.");
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getHotelById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(hotelService.getHotelById(id));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Could not retrieve hotel with ID: " + id);
        }
    }

    @PostMapping
    public ResponseEntity<?> createHotel(@RequestBody Hotel hotel) {
        try {
            return ResponseEntity.ok(hotelService.createHotel(hotel));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to create hotel: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateHotel(@PathVariable Long id, @RequestBody Map<String, Object> updates) {
        try {
            return ResponseEntity.ok(hotelService.updateHotel(id, updates));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to update hotel: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteHotel(@PathVariable Long id) {
        try {
            hotelService.deleteHotel(id);
            return ResponseEntity.ok("Hotel deleted successfully.");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Failed to delete hotel: " + e.getMessage());
        }
    }
}

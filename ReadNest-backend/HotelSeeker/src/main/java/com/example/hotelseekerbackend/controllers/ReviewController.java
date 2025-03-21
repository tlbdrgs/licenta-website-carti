package com.example.hotelseekerbackend.controllers;

import com.example.hotelseekerbackend.entities.Hotel;
import com.example.hotelseekerbackend.entities.Review;
import com.example.hotelseekerbackend.repositories.HotelRepository;
import com.example.hotelseekerbackend.services.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/hotels")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class ReviewController {
    private final ReviewService reviewService;
    private final HotelRepository hotelRepository;


    // ✅ Publish a review for a hotel
    @PostMapping("/{hotelId}/reviews")
    public ResponseEntity<?> addReview(@PathVariable Long hotelId, @RequestBody Review review) {
        try {
            // ✅ Find the hotel by ID
            Optional<Hotel> hotel = hotelRepository.findById((long) Math.toIntExact(hotelId));
            if (hotel.isEmpty()) {
                return ResponseEntity.badRequest().body("Hotel not found");
            }

            review.setHotel(hotel.get());
            reviewService.addReview(review);
            return ResponseEntity.ok().build();
        } catch (Exception exception) {
            return ResponseEntity.internalServerError().body("Could not save review");
        }
    }

}

package com.example.hotelseekerbackend.controllers;

import com.example.hotelseekerbackend.entities.Booking;
import com.example.hotelseekerbackend.services.BookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/bookings")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class BookingController {
    private final BookingService bookingService;

    /**
     * ✅ Get all bookings (Admin only)
     */
    @GetMapping("/all")
    public ResponseEntity<?> getAllBookings() {
        try {
            return ResponseEntity.ok(bookingService.getAllBookings());
        } catch (Exception e) {
            return ResponseEntity.status(400).body("Error: " + e.getMessage());
        }
    }

    /**
     * ✅ Get bookings for a specific user
     */
    @GetMapping("/my-bookings")
    public ResponseEntity<?> getUserBookings(@RequestParam String username) {
        try {
            return ResponseEntity.ok(bookingService.getBookingsByUsername(username));
        } catch (Exception e) {
            return ResponseEntity.status(400).body("Error: " + e.getMessage());
        }
    }

    /**
     * ✅ Create a new booking
     */
    @PostMapping("/create")
    public ResponseEntity<?> bookRoom(@RequestBody Map<String, Object> requestData) {
        try {
            if (!requestData.containsKey("hotelId") || !requestData.containsKey("roomNumber") ||
                    !requestData.containsKey("username") || !requestData.containsKey("startDate") ||
                    !requestData.containsKey("endDate")) {
                return ResponseEntity.badRequest().body("Missing required fields");
            }

            Long hotelId = Long.parseLong(requestData.get("hotelId").toString());
            String roomNumber = requestData.get("roomNumber").toString();
            String username = requestData.get("username").toString();
            Instant startInstant = Instant.parse(requestData.get("startDate").toString());
            Instant endInstant = Instant.parse(requestData.get("endDate").toString());

            LocalDateTime startDate = LocalDateTime.ofInstant(startInstant, ZoneOffset.UTC);
            LocalDateTime endDate = LocalDateTime.ofInstant(endInstant, ZoneOffset.UTC);

            Booking booking = bookingService.bookRoom(hotelId, roomNumber, username, startDate, endDate);
            return ResponseEntity.ok(booking);
        } catch (Exception e) {
            return ResponseEntity.status(400).body("Error: " + e.getMessage());
        }
    }

    /**
     * ✅ Update booking status (Admin only)
     */
    @PutMapping("/{bookingId}/status")
    public ResponseEntity<?> updateBookingStatus(@PathVariable Long bookingId, @RequestParam String status) {
        try {
            Booking updatedBooking = bookingService.updateBookingStatus(bookingId, status);
            return ResponseEntity.ok(updatedBooking);
        } catch (Exception e) {
            return ResponseEntity.status(400).body("Error: " + e.getMessage());
        }
    }

    /**
     * ✅ Delete a booking (Admin only)
     */
    @DeleteMapping("/{bookingId}")
    public ResponseEntity<?> deleteBooking(@PathVariable Long bookingId) {
        try {
            bookingService.deleteBooking(bookingId);
            return ResponseEntity.ok("Booking deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(400).body("Error: " + e.getMessage());
        }
    }
}

package com.example.hotelseekerbackend.services;

import com.example.hotelseekerbackend.entities.Booking;
import com.example.hotelseekerbackend.entities.Room;
import com.example.hotelseekerbackend.entities.RoomId;
import com.example.hotelseekerbackend.repositories.BookingRepository;
import com.example.hotelseekerbackend.repositories.RoomRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BookingService {

    private final BookingRepository bookingRepository;
    private final RoomRepository roomRepository;

    /**
     * ✅ Fetch all bookings (Admin access)
     */
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    /**
     * ✅ Fetch bookings for a specific user
     */
    public List<Booking> getBookingsByUsername(String username) {
        return bookingRepository.findByUsername(username);
    }

    /**
     * ✅ Create a new booking
     */
    @Transactional
    public Booking bookRoom(Long hotelId, String roomNumber, String username, LocalDateTime startDate, LocalDateTime endDate) {
        // Check if room exists
        RoomId roomId = new RoomId(roomNumber, hotelId);
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new IllegalArgumentException("Room not found"));

        // Check room availability
        boolean isAvailable = bookingRepository.isRoomAvailable(hotelId, roomNumber, startDate, endDate);
        if (!isAvailable) {
            throw new RuntimeException("Room is not available for the selected dates.");
        }

        // Create booking
        Booking booking = Booking.builder()
                .room(room)
                .username(username)
                .bookingStartDate(startDate)
                .bookingEndDate(endDate)
                .status("confirmed")
                .build();

        return bookingRepository.save(booking);
    }

    /**
     * ✅ Update booking status (Admin use only)
     */
    @Transactional
    public Booking updateBookingStatus(Long bookingId, String newStatus) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        booking.setStatus(newStatus);
        return bookingRepository.save(booking);
    }

    /**
     * ✅ Delete a booking (Admin use only)
     */
    @Transactional
    public void deleteBooking(Long bookingId) {
        Optional<Booking> booking = bookingRepository.findById(bookingId);
        if (booking.isPresent()) {
            bookingRepository.deleteById(bookingId);
        } else {
            throw new RuntimeException("Booking not found");
        }
    }
}

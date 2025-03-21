package com.example.hotelseekerbackend.repositories;

import com.example.hotelseekerbackend.entities.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {

    @Query("SELECT b FROM Booking b WHERE b.username = :username")
    List<Booking> findByUsername(@Param("username") String username);

    @Query("SELECT count(b) = 0 FROM Booking b WHERE b.room.hotel.id = :hotelId AND b.room.roomNumber = :roomNumber " +
            "AND b.bookingStartDate < :endDate AND b.bookingEndDate > :startDate")
    boolean isRoomAvailable(@Param("hotelId") Long hotelId,
                            @Param("roomNumber") String roomNumber,
                            @Param("startDate") LocalDateTime startDate,
                            @Param("endDate") LocalDateTime endDate);
}


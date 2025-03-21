package com.example.hotelseekerbackend.repositories;

import com.example.hotelseekerbackend.entities.Room;
import com.example.hotelseekerbackend.entities.RoomId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface RoomRepository extends JpaRepository<Room, RoomId> {
    @Query("SELECT r FROM Room r WHERE r.hotel.id = :hotelId " +
            "AND r.roomNumber NOT IN (SELECT b.room.roomNumber FROM Booking b " +
            "WHERE b.bookingStartDate < :endDate " +
            "AND b.bookingEndDate > :startDate)")
    List<Room> findAvailableRooms(@Param("hotelId") long hotelId,
                                  @Param("startDate") LocalDateTime startDate,
                                  @Param("endDate") LocalDateTime endDate);


    Room findByRoomNumber(String roomNumber);

    List<Room> findByHotelId(long hotelId);

    @Query("SELECT r FROM Room r WHERE r.hotel.id = :hotelId AND r.roomNumber = :roomNumber")
    Room findByHotelIdAndRoomNumber(@Param("hotelId") Long hotelId, @Param("roomNumber") String roomNumber);
}
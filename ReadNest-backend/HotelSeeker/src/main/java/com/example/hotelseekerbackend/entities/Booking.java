package com.example.hotelseekerbackend.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "booking")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumns({
            @JoinColumn(name = "hotel_id", referencedColumnName = "hotel_id", nullable = false),
            @JoinColumn(name = "room_number", referencedColumnName = "room_number", nullable = false)
    })
    @JsonIgnore // ✅ Prevents serialization issues
    private Room room;


    @Column(name = "username", nullable = false)
    private String username;

    @Column(name = "booking_start_date", nullable = false)
    private LocalDateTime bookingStartDate;

    @Column(name = "booking_end_date", nullable = false)
    private LocalDateTime bookingEndDate;

    @Column(name = "status", length = 50, nullable = false)
    private String status;

    // ✅ New method to return hotel name
    public String getHotelName() {
        return (room != null && room.getHotel() != null) ? room.getHotel().getName() : "N/A";
    }

    // ✅ New method to return room number
    public String getRoomNumber() {
        return (room != null) ? room.getRoomNumber() : "N/A";
    }
}

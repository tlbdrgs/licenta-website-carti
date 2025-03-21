package com.example.hotelseekerbackend.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@IdClass(RoomId.class)
@Table(name = "room")
public class Room {

    @Id
    @Column(name = "room_number", nullable = false)
    private String roomNumber;

    @Id
    @ManyToOne
    @JoinColumn(name = "hotel_id", nullable = false)
    @JsonBackReference  // ✅ Prevents infinite recursion
    private Hotel hotel;

    @Column(name = "type", nullable = false)
    private String type;

    private int price;

    @OneToMany(mappedBy = "room", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore  // ✅ Prevents recursion when fetching bookings
    private List<Booking> bookings;
}

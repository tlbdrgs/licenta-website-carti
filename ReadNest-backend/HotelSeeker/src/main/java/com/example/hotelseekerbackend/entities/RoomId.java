package com.example.hotelseekerbackend.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Objects;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RoomId implements Serializable {

    private String roomNumber;
    private Long hotel;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        RoomId roomId = (RoomId) o;
        return Objects.equals(roomNumber, roomId.roomNumber) && Objects.equals(hotel, roomId.hotel);
    }

    @Override
    public int hashCode() {
        return Objects.hash(roomNumber, hotel);
    }
}

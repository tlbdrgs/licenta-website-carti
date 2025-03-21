package com.example.hotelseekerbackend.controllers;

import com.example.hotelseekerbackend.entities.Room;
import com.example.hotelseekerbackend.services.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class RoomController {
    private final RoomService roomService;

    @GetMapping("/rooms")
    public ResponseEntity<?> getRooms() {
        try{
            return ResponseEntity.ok().body(roomService.getAllRooms());
        } catch (Exception exception) {
            return ResponseEntity.internalServerError().body("Could not get rooms");
        }
    }

    @GetMapping("/roomsByHotel")
    public ResponseEntity<?> getRoomsByHotelId(@RequestParam int hotel_id) {
        try{
            return ResponseEntity.ok().body(roomService.getRoomsByHotelId(hotel_id));
        } catch (Exception exception) {
            return ResponseEntity.internalServerError().body("Could not get rooms by hotel " + hotel_id);
        }
    }

    @PostMapping("/bookRoom/{roomNumber}")
    public ResponseEntity<?> addBooking(@PathVariable("roomNumber") String roomNumber) {
        try {
            Room room = roomService.getRoomByNumber(roomNumber);
//            roomService.markBooking(room);
            return ResponseEntity.ok().body("Room availability updated successfully");
        } catch (Exception exception) {
            return ResponseEntity.internalServerError().body("Failed to update room availability");
        }
    }

}

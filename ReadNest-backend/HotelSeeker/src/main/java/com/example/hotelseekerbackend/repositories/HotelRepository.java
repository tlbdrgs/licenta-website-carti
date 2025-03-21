package com.example.hotelseekerbackend.repositories;

import com.example.hotelseekerbackend.entities.Hotel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface HotelRepository extends JpaRepository<Hotel, Long> {

    @Query("SELECT h FROM Hotel h WHERE h.name = :name")
    Hotel getHotelByName(@Param("name") String name);

    @Query(value = "SELECT h FROM Hotel h WHERE " +
            "(6371 * acos(cos(radians(:latitude)) * cos(radians(h.latitude)) * cos(radians(h.longitude) - radians(:longitude)) + sin(radians(:latitude)) * sin(radians(h.latitude)))) < :radius")
    List<Hotel> findHotelsWithinRadius(@Param("latitude") double latitude,
                                       @Param("longitude") double longitude,
                                       @Param("radius") double radius);
}

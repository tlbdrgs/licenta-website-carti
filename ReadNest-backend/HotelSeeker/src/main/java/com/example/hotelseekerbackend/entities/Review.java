package com.example.hotelseekerbackend.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@Entity
@Table(name = "Review")
public class Review {

    @Id
    private Long id;
    private String message;

    @ManyToOne()
    @JoinColumn(name = "hotel_id")
    @JsonBackReference
    private Hotel hotel;
}

package com.example.mindEase.exercise;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Arrays;
import java.util.List;

@Entity
@Table(name = "exercises")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Exercise {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(nullable = false)
    private String title;

    @NotNull
    @Column(nullable = false)
    private String duration;

    @NotNull
    @Column(columnDefinition = "TEXT", nullable = false)
    private String description;

    @NotNull
    @Column(nullable = false)
    private String benefits;

    @NotNull
    @Column(nullable = false)
    private String type;

    private String image;

    @Transient
    public List<String> getDescription() {
        if (description == null || description.isBlank()) {
            return List.of();
        }
        return Arrays.stream(description.split(","))
                .map(String::trim)
                .toList();
    }
}
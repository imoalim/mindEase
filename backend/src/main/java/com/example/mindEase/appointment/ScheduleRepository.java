package com.example.mindEase.appointment;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Repository
public interface ScheduleRepository extends JpaRepository<Schedule, Long> {

    // 1. Verfügbare Slots für einen Therapeuten abrufen
    @Query("SELECT s FROM Schedule s WHERE s.therapist.id = :therapistId AND s.isAvailable = true")
    List<Schedule> findAvailableSlotsByTherapist(@Param("therapistId") Long therapistId);

    // 2. Prüfung auf Doppelbuchung
    @Query("SELECT COUNT(s) > 0 FROM Schedule s " +
            "WHERE s.therapist.id = :therapistId " +
            "AND s.date = :date " +
            "AND s.startTime = :startTime " +
            "AND s.isAvailable = true")
    boolean existsByTherapistIdAndDateAndStartTime(
            @Param("therapistId") Long therapistId,
            @Param("date") LocalDate date,
            @Param("startTime") LocalTime startTime
    );
}

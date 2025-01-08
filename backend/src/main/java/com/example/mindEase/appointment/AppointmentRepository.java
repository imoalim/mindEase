package com.example.mindEase.appointment;

import jakarta.validation.constraints.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    // Finde alle Termine eines bestimmten Benutzers
    List<Appointment> findByUserId(Long userId);

    // Finde alle Termine eines bestimmten Therapeuten
    List<Appointment> findByTherapistId(Long therapistId);

    // Finde alle Termine, die zu einer bestimmten Zeit beginnen
    List<Appointment> findByAppointmentDateTime(LocalDateTime appointmentDateTime);

    @Query("SELECT a FROM Appointment a WHERE a.appointmentDateTime BETWEEN :startDateTime AND :endDateTime AND a.therapist.id = :therapistId")
    List<Appointment> findAllByAppointmentDateTimeBetweenAndTherapistId(
            @Param("startDateTime") LocalDateTime startDateTime,
            @Param("endDateTime") LocalDateTime endDateTime,
            @Param("therapistId") Long therapistId
    );

    //List<Appointment> findAllByAppointmentDateTimeAndTherapistId(LocalDate appointmentDateTime, Long therapist_id);
}

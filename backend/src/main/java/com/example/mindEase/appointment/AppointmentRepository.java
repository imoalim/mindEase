package com.example.mindEase.appointment;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

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
}

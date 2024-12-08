package com.example.mindEase.service;

import com.example.mindEase.appointment.Appointment;
import com.example.mindEase.appointment.AppointmentRepository;
import com.example.mindEase.user.User;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;

    public AppointmentService(AppointmentRepository appointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }

    // Einen neuen Termin speichern
    public Appointment saveAppointment(Appointment appointment) {
        if (appointment.getAppointmentDateTime().isBefore(LocalDateTime.now())) {
            throw new IllegalArgumentException("Appointment time cannot be in the past");
        }
        return appointmentRepository.save(appointment);
    }

    // Alle Termine eines Benutzers abrufen
    public List<Appointment> getAppointmentsByUser(Long userId) {
        return appointmentRepository.findByUserId(userId);
    }

    // Alle Termine eines Therapeuten abrufen
    public List<Appointment> getAppointmentsByTherapist(Long therapistId) {
        return appointmentRepository.findByTherapistId(therapistId);
    }


    // Termin nach ID abrufen
    public Optional<Appointment> getAppointmentById(Long id) {
        return appointmentRepository.findById(id);
    }

    // Termin löschen
    public void deleteAppointment(Long id) {
        appointmentRepository.deleteById(id);
    }
}

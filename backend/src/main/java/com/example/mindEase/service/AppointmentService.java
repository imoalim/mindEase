package com.example.mindEase.service;

import com.example.mindEase.appointment.Appointment;
import com.example.mindEase.appointment.AppointmentRepository;
import com.example.mindEase.user.User;
import org.hibernate.ObjectNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

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

    public Appointment updateAppointment(Appointment appointment) {
        if (!appointmentRepository.existsById(appointment.getId())) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "The appointment does not exist");
        }
        return appointmentRepository.save(appointment);
    }
}

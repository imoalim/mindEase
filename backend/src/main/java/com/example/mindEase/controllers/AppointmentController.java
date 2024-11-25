package com.example.mindEase.controllers;

import com.example.mindEase.appointment.Appointment;
import com.example.mindEase.service.AppointmentService;
import com.example.mindEase.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    // Einen neuen Termin erstellen
    @PostMapping
    public Appointment createAppointment(@RequestBody Appointment appointment) {
        return appointmentService.saveAppointment(appointment);
    }

    // Alle Termine eines Benutzers abrufen
    @GetMapping("/user/{userId}")
    public List<Appointment> getAppointmentsByUser(@PathVariable Long userId) {
        return appointmentService.getAppointmentsByUser(userId);
    }

    @GetMapping("/therapist/{therapistId}")
    public List<Appointment> getAppointmentsByTherapist(@PathVariable Long therapistId) {
        return appointmentService.getAppointmentsByTherapist(therapistId);
    }


    // Termin nach ID abrufen
    @GetMapping("/{id}")
    public Appointment getAppointmentById(@PathVariable Long id) {
        return appointmentService.getAppointmentById(id).orElse(null);
    }

    // Termin löschen
    @DeleteMapping("/{id}")
    public void deleteAppointment(@PathVariable Long id) {
        appointmentService.deleteAppointment(id);
    }
}

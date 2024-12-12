package com.example.mindEase.controllers;

import com.example.mindEase.appointment.Appointment;
import com.example.mindEase.service.AppointmentService;
import com.example.mindEase.user.User;
import org.hibernate.ObjectNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    @GetMapping
    public List<Appointment> getAppointments(@AuthenticationPrincipal OAuth2User principal) {
        return appointmentService.getAppointmentsByUser(1L);
    }

    // Einen neuen Termin erstellen
    @PostMapping
    public Appointment createAppointment(@RequestBody Appointment appointment) {
//        ZonedDateTime zonedDateTime = appointment.getAppointmentDateTime().withZoneSameInstant(ZoneOffset.UTC);
//        appointment.setAppointmentDateTime(zonedDateTime);

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

    @PutMapping("/{id}")
    public ResponseEntity<Appointment> updateAppointment(@RequestBody Appointment appointment) {
//        ZonedDateTime zonedDateTime = appointment.getAppointmentDateTime().withZoneSameInstant(ZoneOffset.UTC);
//        appointment.setAppointmentDateTime(zonedDateTime);

        Appointment updatedAppointment = appointmentService.updateAppointment(appointment);
        return ResponseEntity.ok(updatedAppointment);
    }
}

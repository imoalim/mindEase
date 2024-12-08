package com.example.mindEase.controllers;

import com.example.mindEase.appointment.Appointment;
import com.example.mindEase.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/appointments")
@CrossOrigin(origins = "http://localhost:5175")  // CORS für den gesamten Controller aktivieren
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    // Alle Termine eines Benutzers abrufen
    @GetMapping
    @CrossOrigin(origins = "http://localhost:5175")  // Optional: CORS für diesen Endpunkt aktivieren
    public List<Appointment> getAppointments(@AuthenticationPrincipal OAuth2User principal) {
        Long userId = getUserIdFromOAuth(principal); // Hier eine Methode, die den Benutzer aus dem OAuth2-Token extrahiert
        return appointmentService.getAppointmentsByUser(userId);
    }

    private Long getUserIdFromOAuth(OAuth2User principal) {
        // Google OAuth2 speichert die Benutzer-ID normalerweise im "sub"-Attribut
        return Long.parseLong(principal.getAttribute("sub"));
    }

    // Einen neuen Termin erstellen
    @PostMapping
    @CrossOrigin(origins = "http://localhost:5173")  // CORS für diesen Endpunkt aktivieren
    public ResponseEntity<Appointment> createAppointment(@RequestBody Appointment appointment) {
        if (appointment == null || appointment.getAppointmentDateTime() == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        Appointment savedAppointment = appointmentService.saveAppointment(appointment);
        return new ResponseEntity<>(savedAppointment, HttpStatus.CREATED);
    }

    // Alle Termine eines Benutzers abrufen
    @GetMapping("/user/{userId}")
    @CrossOrigin(origins = "http://localhost:5173")  // CORS für diesen Endpunkt aktivieren
    public List<Appointment> getAppointmentsByUser(@PathVariable Long userId) {
        return appointmentService.getAppointmentsByUser(userId);
    }

    // Alle Termine eines Therapeuten abrufen
    @GetMapping("/therapist/{therapistId}")
    @CrossOrigin(origins = "http://localhost:5173")  // CORS für diesen Endpunkt aktivieren
    public List<Appointment> getAppointmentsByTherapist(@PathVariable Long therapistId) {
        return appointmentService.getAppointmentsByTherapist(therapistId);
    }

    // Termin nach ID abrufen
    @GetMapping("/{id}")
    @CrossOrigin(origins = "http://localhost:5173")  // CORS für diesen Endpunkt aktivieren
    public ResponseEntity<Appointment> getAppointmentById(@PathVariable Long id) {
        try {
            Appointment appointment = appointmentService.getAppointmentById(id).orElse(null);
            if (appointment == null) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(appointment, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Termin löschen
    @DeleteMapping("/{id}")
    @CrossOrigin(origins = "http://localhost:5173")  // CORS für diesen Endpunkt aktivieren
    public ResponseEntity<Void> deleteAppointment(@PathVariable Long id) {
        try {
            appointmentService.deleteAppointment(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);  // Erfolgreiches Löschen
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);  // Fehlerfall
        }
    }
}

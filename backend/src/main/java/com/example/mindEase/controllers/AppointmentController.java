// src/main/java/com/example/mindEase/controllers/AppointmentController.java
package com.example.mindEase.controllers;

import com.example.mindEase.appointment.Appointment;
import com.example.mindEase.dto.UnavailableTimeslotsRequest;
import com.example.mindEase.service.AppointmentService;
import com.example.mindEase.user.User;
import jakarta.annotation.security.RolesAllowed;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/appointments")
@AllArgsConstructor
public class AppointmentController {

    private final AppointmentService appointmentService;

    @GetMapping
    public List<Appointment> getAppointments() {
        return appointmentService.getAppointmentsByUser(1L);
    }

    @PostMapping
    public ResponseEntity<Appointment> createAppointment(@RequestBody Appointment appointment) {
        Appointment savedAppointment = appointmentService.saveAppointment(appointment);
        return ResponseEntity.ok(savedAppointment);
    }

    @GetMapping("/user/{userId}")
    public List<Appointment> getAppointmentsByUser(@PathVariable Long userId) {
        return appointmentService.getAppointmentsByUser(userId);
    }

    @GetMapping("/therapist/{therapistId}")
    public List<Appointment> getAppointmentsByTherapist(@PathVariable Long therapistId) {
        return appointmentService.getAppointmentsByTherapist(therapistId);
    }

    @GetMapping("/{id}")
    public Appointment getAppointmentById(@PathVariable Long id) {
        return appointmentService.getAppointmentById(id).orElse(null);
    }

    @DeleteMapping("/{id}")
    public void deleteAppointment(@PathVariable Long id) {
        appointmentService.deleteAppointment(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Appointment> updateAppointment(@RequestBody Appointment appointment) {
        Appointment updatedAppointment = appointmentService.updateAppointment(appointment);
        return ResponseEntity.ok(updatedAppointment);
    }

    @GetMapping("/therapist-unavailable")
    public List<LocalDateTime> getUnavailableHoursForTherapist(@RequestParam String dateToCheck, @RequestParam Long therapistId) {
        UnavailableTimeslotsRequest request = new UnavailableTimeslotsRequest(dateToCheck, therapistId);
        return appointmentService.getUnavailableHoursForTherapist(request);
    }
}
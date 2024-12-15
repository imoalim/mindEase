// src/main/java/com/example/mindEase/controllers/AppointmentController.java
package com.example.mindEase.controllers;

import com.example.mindEase.appointment.Appointment;
import com.example.mindEase.service.AppointmentService;
import com.example.mindEase.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

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
}
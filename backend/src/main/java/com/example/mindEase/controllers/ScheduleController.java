package com.example.mindEase.controllers;

import com.example.mindEase.appointment.Schedule;
import com.example.mindEase.service.ScheduleService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/schedule")
public class ScheduleController {

    private final ScheduleService scheduleService;

    @Autowired
    public ScheduleController(ScheduleService scheduleService) {
        this.scheduleService = scheduleService;
    }

    // GET: Verfügbare Zeitslots für einen bestimmten Therapeuten
    @GetMapping("/therapist/{therapistId}/available")
    public ResponseEntity<?> getAvailableSlotsByTherapist(@PathVariable Long therapistId) {
        List<Schedule> availableSlots = scheduleService.getAvailableSlotsByTherapist(therapistId);
        if (availableSlots.isEmpty()) {
            return ResponseEntity.status(404).body("No available slots found for therapist with ID: " + therapistId);
        }
        return ResponseEntity.ok(availableSlots);
    }

    // GET: Einzelnen Zeitslot für Testzwecke
    @GetMapping("/{id}")
    public ResponseEntity<Schedule> getScheduleById(@PathVariable Long id) {
        Schedule schedule = scheduleService.getScheduleById(id);
        if (schedule != null) {
            return ResponseEntity.ok(schedule);
        } else {
            return ResponseEntity.status(404).body(null);
        }
    }

    // POST: Ein neues Zeitslot hinzufügen
    @PostMapping
    public ResponseEntity<Schedule> addSchedule(@Valid @RequestBody Schedule schedule) {
        Schedule newSchedule = scheduleService.addSchedule(schedule);
        return ResponseEntity.ok(newSchedule);
    }
}

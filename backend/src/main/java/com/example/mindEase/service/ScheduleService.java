package com.example.mindEase.service;

import com.example.mindEase.appointment.Schedule;
import com.example.mindEase.appointment.ScheduleRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ScheduleService {

    private static final Logger logger = LoggerFactory.getLogger(ScheduleService.class);
    private final ScheduleRepository scheduleRepository;

    @Autowired
    public ScheduleService(ScheduleRepository scheduleRepository) {
        this.scheduleRepository = scheduleRepository;
    }

    // Verfügbare Slots für einen Therapeuten abrufen
    public List<Schedule> getAvailableSlotsByTherapist(Long therapistId) {
        logger.info("Fetching available slots for therapist ID: {}", therapistId);
        List<Schedule> availableSlots = scheduleRepository.findAvailableSlotsByTherapist(therapistId);
        if (availableSlots.isEmpty()) {
            logger.warn("No available slots found for therapist ID: {}", therapistId);
        }
        return availableSlots;
    }

    // Zeitslot anhand der ID abrufen
    public Schedule getScheduleById(Long id) {
        logger.info("Fetching schedule by ID: {}", id);
        Optional<Schedule> scheduleOptional = scheduleRepository.findById(id);
        if (scheduleOptional.isEmpty()) {
            logger.warn("No schedule found with ID: {}", id);
            throw new IllegalStateException("No schedule found with the provided ID.");
        }
        return scheduleOptional.get();
    }

    @Transactional
    public Schedule addSchedule(Schedule schedule) {
        if (schedule == null || schedule.getTherapist() == null || schedule.getDate() == null || schedule.getStartTime() == null) {
            logger.error("Invalid schedule data: {}", schedule);
            throw new IllegalArgumentException("Schedule or mandatory fields cannot be null");
        }

        // Prüfe auf Doppelbuchung
        boolean exists = scheduleRepository.existsByTherapistIdAndDateAndStartTime(
                schedule.getTherapist().getId(),
                schedule.getDate(),
                schedule.getStartTime()
        );

        if (exists) {
            logger.warn("Double booking detected for therapist ID: {} at {} on {}",
                    schedule.getTherapist().getId(), schedule.getStartTime(), schedule.getDate());
            throw new IllegalStateException("A schedule already exists for this date and time.");
        }

        logger.info("Adding new schedule: {}", schedule);
        return scheduleRepository.save(schedule);
    }
}

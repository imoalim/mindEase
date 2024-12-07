package com.example.mindEase.service;

import com.example.mindEase.exercise.Exercise;
import com.example.mindEase.exercise.ExerciseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ExerciseService {
    private final ExerciseRepository exerciseRepository;

    // Save a new exercise
    public Exercise saveExercise(Exercise exercise) {
        return exerciseRepository.save(exercise);
    }

    // Retrieve all exercises
    public List<Exercise> getAllExercises() {
        return exerciseRepository.findAll()
                .stream()
                .peek(Exercise::getDescription)
                .toList();
    }

    public List<Exercise> getExercisesByType(String type) {
        return exerciseRepository.findByType(type);  // Ensure this method exists in ExerciseRepository
    }

    // Find an exercise by its id
    public Optional<Exercise> getExerciseById(Long id) {
        return exerciseRepository.findById(id);
    }

    // Delete an exercise by its id
    public void deleteExercise(Long id) {
        exerciseRepository.deleteById(id);
    }
}
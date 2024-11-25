package com.example.mindEase.controllers;

import com.example.mindEase.exercise.Exercise;
import com.example.mindEase.service.ExerciseService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/exercises")
public class ExerciseController {
    private final ExerciseService exerciseService;

    // Retrieve all exercises
    @GetMapping
    public List<Exercise> getAllExercises() {
        List<Exercise> exercises = exerciseService.getAllExercises();

        return exerciseService.getAllExercises();
    }

    // Retrieve exercises by type
    @GetMapping("/type/{type}")
    public List<Exercise> getExercisesByType(@PathVariable String type) {
        return exerciseService.getExercisesByType(type);
    }

    // Retrieve exercise by ID
    @GetMapping("/{id}")
    public Exercise getExerciseById(@PathVariable Long id) {
        return exerciseService.getExerciseById(id).orElse(null);
    }

    // Create a new exercise
    @PostMapping
    public Exercise createExercise(@RequestBody Exercise exercise) {
        return exerciseService.saveExercise(exercise);
    }

    // Delete an exercise by ID
    @DeleteMapping("/{id}")
    public void deleteExercise(@PathVariable Long id) {
        exerciseService.deleteExercise(id);
    }
}

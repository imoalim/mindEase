// src/main/java/com/example/mindEase/controllers/TherapistController.java
package com.example.mindEase.controllers;

import com.example.mindEase.user.User;
import com.example.mindEase.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/therapists")
@RequiredArgsConstructor
public class TherapistController {

    private final UserService userService;

    @GetMapping
    public ResponseEntity<List<User>> getAllProfessionals(){
        List<User> response = userService.getAllVerifiedProfessionals();
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

}
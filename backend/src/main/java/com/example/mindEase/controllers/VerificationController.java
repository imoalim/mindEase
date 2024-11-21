package com.example.mindEase.controllers;

import com.example.mindEase.service.VerificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/verification")
public class VerificationController {

    @Autowired
    private VerificationService verificationService;

    @PostMapping("/{userId}/start")
    public ResponseEntity<?> startVerification(
            @PathVariable Long userId,
            @RequestParam(required = false) String answers, // Für Studenten
            @RequestParam(required = false) MultipartFile document // Für Therapeuten
    ) {
        try {
            verificationService.startVerification(userId, answers, document);
            return new ResponseEntity<>("Verification process started.", HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>("Error starting verification.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}


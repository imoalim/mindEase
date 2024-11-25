package com.example.mindEase.controllers;

import com.example.mindEase.dto.CreateUserResponse;
import com.example.mindEase.dto.LoginRequest;
import com.example.mindEase.dto.LoginResponse;
import com.example.mindEase.service.AuthenticationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true", allowedHeaders = "*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthenticationController {
    @Autowired
    private final AuthenticationService authenticationService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> authenticate(@RequestBody @Valid LoginRequest loginRequest) {
        LoginResponse loginResponse = authenticationService.login(loginRequest);
        return ResponseEntity.status(HttpStatus.OK).body(loginResponse);
    }

    @PostMapping("/register")
    public ResponseEntity<CreateUserResponse> register(@RequestBody @Valid LoginRequest request) {
        CreateUserResponse response = authenticationService.createUser(request);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}

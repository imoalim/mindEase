package com.example.mindEase.dto;

import com.example.mindEase.user.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class LoginRequest {
    @Email
    @NotBlank
    private String email;

    @NotBlank
    private String password;

    private Role role; // Rolle: USER, THERAPIST, PSYCHOLOGY_STUDENT

    private String university; // Nur für Studenten
    private String qualifications; // Zusätzliche Qualifikationen für Studenten/Therapists
}

package com.example.mindEase.service;

import com.example.mindEase.config.security.token.AccessTokenEncoder;
import com.example.mindEase.config.security.token.impl.AccessTokenImpl;
import com.example.mindEase.dto.LoginRequest;
import com.example.mindEase.dto.LoginResponse;
import com.example.mindEase.exception.InvalidCredentialsException;
import com.example.mindEase.exception.TokenGenerationException;
import com.example.mindEase.exception.UserAlreadyExistsException;
import com.example.mindEase.user.Role;
import com.example.mindEase.user.User;
import com.example.mindEase.user.UserRepository;
import com.example.mindEase.user.UserRoleEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AccessTokenEncoder accessTokenEncoder;

    public LoginResponse login(LoginRequest loginRequest) {
        // Benutzer anhand der Email suchen
        User user = userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new InvalidCredentialsException("User not found"));

        // Passwort überprüfen
        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            throw new InvalidCredentialsException("Invalid credentials");
        }

        // Access Token generieren
        String accessToken = generateAccessToken(user);

        return LoginResponse.builder()
                .accessToken(accessToken)
                .build();
    }

    public void createUser(LoginRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new UserAlreadyExistsException("User already exists with this email");
        }

        // Validierung für spezifische Rollen
        if (request.getRole() == Role.PSYCHOLOGY_STUDENT) {
            if (request.getUniversity() == null || request.getQualifications() == null) {
                throw new IllegalArgumentException("University and qualifications are required for Psychology Students.");
            }
        }

        // Benutzer erstellen und speichern
        User newUser = saveNewUser(request);
        userRepository.save(newUser);
    }

    private User saveNewUser(LoginRequest request) {
        String encodedPassword = passwordEncoder.encode(request.getPassword());

        User.UserBuilder userBuilder = User.builder()
                .email(request.getEmail())
                .password(encodedPassword)
                .verified(false); // Standardmäßig unverifiziert

        if (request.getRole() == Role.PSYCHOLOGY_STUDENT) {
            userBuilder.university(request.getUniversity());
            userBuilder.qualifications(request.getQualifications());
        }

        User newUser = userBuilder.build();

        newUser.setUserRoles(Set.of(
                UserRoleEntity.builder()
                        .user(newUser)
                        .role(request.getRole() != null ? request.getRole() : Role.USER) // Standardrolle USER
                        .build()));

        return newUser;
    }

    private String generateAccessToken(User user) {
        Long userId = user.getId();
        List<String> roles = user.getUserRoles().stream()
                .map(userRole -> userRole.getRole().toString())
                .toList();

        // Token generieren
        String token = accessTokenEncoder.encode(
                new AccessTokenImpl(user.getEmail(), userId, roles, user.getVerified()));

        if (token == null || token.isEmpty()) {
            throw new TokenGenerationException("Failed to generate access token");
        }

        return token;
    }
}

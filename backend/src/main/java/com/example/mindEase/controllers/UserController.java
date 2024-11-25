package com.example.mindEase.controllers;

import com.example.mindEase.config.security.token.AccessToken;
import com.example.mindEase.service.UserService;
import com.example.mindEase.user.User;
import com.example.mindEase.user.UserQuestionnaire;
import io.jsonwebtoken.Jwt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true", allowedHeaders = "*")
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;


    @GetMapping("/me")
    public ResponseEntity<Optional<User>> getMe() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        AccessToken accessToken = (AccessToken) authentication.getDetails();

        Optional<User> user = userService.findUserById(accessToken.getUserId());
        if (user.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    // GET endpoint to get all users
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.findAllUsers();
        if (users.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    // GET endpoint to get a user by ID
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        Optional<User> user = userService.findUserById(id);
        return user.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // POST endpoint to add a new user
    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) {
        try {
            User newUser = userService.saveUser(user);
            return new ResponseEntity<>(newUser, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // DELETE endpoint to delete a user by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteUser(@PathVariable Long id) {
        try {
            boolean deleted = userService.deleteUserById(id);
            if (deleted) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @PostMapping("/questionnaire")
    public ResponseEntity<Long> saveQuestionnaire(@RequestBody UserQuestionnaire userQuestionnaire)
    {
        Long response = userService.saveUserEmotionalStateQuestionnaire(userQuestionnaire);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/currentUser")
    public ResponseEntity<Optional<User>> getCurrentUser(@RequestParam String email)
    {
        Optional<User> responseBody = userService.findCurrentUser(email);
        return ResponseEntity.ok(responseBody);
    }
}

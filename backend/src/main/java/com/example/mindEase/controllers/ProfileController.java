package com.example.mindEase.controllers;

import com.example.mindEase.config.security.token.AccessToken;
import com.example.mindEase.dto.ProfileConfirmationRequest;
import com.example.mindEase.service.ProfileService;
import com.example.mindEase.service.UserService;
import com.example.mindEase.user.User;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/profile")
public class ProfileController {
     private final ProfileService profileService;

     @PutMapping(consumes = {"multipart/form-data"})
     public ResponseEntity<User> updateProfile(@ModelAttribute @Valid ProfileConfirmationRequest request) {
          Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
          AccessToken accessToken = (AccessToken) authentication.getDetails();

          User user = profileService.updateProfileData(request, accessToken.getEmail());
          return ResponseEntity.status(HttpStatus.OK).body(user);
     }
}

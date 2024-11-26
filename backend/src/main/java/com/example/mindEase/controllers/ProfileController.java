package com.example.mindEase.controllers;

import com.example.mindEase.service.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/profile")
public class ProfileController {
     private final ProfileService profileService;
    // private final ProfileConverter profileConverter;
    // private final ProfileRepository profileRepository;
    // private final UserRepository userRepository
}

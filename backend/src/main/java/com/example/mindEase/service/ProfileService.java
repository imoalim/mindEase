package com.example.mindEase.service;

import com.example.mindEase.dto.ProfileConfirmationRequest;
import com.example.mindEase.exception.InvalidUserException;
import com.example.mindEase.user.User;
import com.example.mindEase.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProfileService {
    private final UserRepository userRepository;

    public User updateProfileData(ProfileConfirmationRequest request, String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new InvalidUserException(email));

        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setCountry(request.getCountry());
        user.setBirthday(request.getBirthday());
        user.setSelectedRole(request.getSelectedRole());
        user.setVerificationStep(2);

        userRepository.save(user);
        return user;
    }
}

package com.example.mindEase.service;

import com.example.mindEase.user.User;
import com.example.mindEase.user.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AdminService {

    private final UserRepository userRepository;

    public AdminService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

//    public User verifyUser(Long userId, boolean isApproved) {
//        Optional<User> userOptional = userRepository.findById(userId);
//
//        if (userOptional.isEmpty()) {
//            throw new IllegalArgumentException("User not found.");
//        }
//
//        User user = userOptional.get();
//
//        user.setVerified(isApproved);
//
//        return userRepository.save(user);
//    }
}

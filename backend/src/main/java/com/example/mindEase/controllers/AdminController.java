package com.example.mindEase.controllers;

import com.example.mindEase.service.AdminService;
import com.example.mindEase.service.UserService;
import com.example.mindEase.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private UserService userService;

    @Autowired
    private AdminService adminService;

//    @PostMapping("/verify/{userId}")
//    public ResponseEntity<?> verifyUser(@PathVariable Long userId, @RequestParam boolean isApproved) {
//        try {
//            User user = adminService.verifyUser(userId, isApproved);
//            String status = isApproved ? "approved" : "rejected";
//            return new ResponseEntity<>("User verification " + status, HttpStatus.OK);
//        } catch (IllegalArgumentException e) {
//            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
//        } catch (Exception e) {
//            return new ResponseEntity<>("Error during verification process.", HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }
        @PutMapping("/{id}")
        public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User userDetails) {
            Optional<User> userOptional = userService.findUserById(id);
            if (userOptional.isPresent()) {
                User user = userOptional.get();
                user.setFirstName(userDetails.getFirstName());
                user.setLastName(userDetails.getLastName());
                user.setEmail(userDetails.getEmail());
                user.setCountry(userDetails.getCountry());
                user.setBirthday(userDetails.getBirthday());
                user.setSelectedRole(userDetails.getSelectedRole());
                User updatedUser = userService.saveUser(user); // Save and get the updated user
                return new ResponseEntity<>(updatedUser, HttpStatus.OK); // Return the updated user
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }
}

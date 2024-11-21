package com.example.mindEase.controllers;

import com.example.mindEase.service.AdminService;
import com.example.mindEase.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @PostMapping("/verify/{userId}")
    public ResponseEntity<?> verifyUser(@PathVariable Long userId, @RequestParam boolean isApproved) {
        try {
            User user = adminService.verifyUser(userId, isApproved);
            String status = isApproved ? "approved" : "rejected";
            return new ResponseEntity<>("User verification " + status, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>("Error during verification process.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

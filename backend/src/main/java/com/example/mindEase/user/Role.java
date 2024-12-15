package com.example.mindEase.user;

import com.fasterxml.jackson.annotation.JsonCreator;

public enum Role {
    USER,
    THERAPIST,
    ADMIN,
    PSYCHOLOGY_STUDENT;


    @JsonCreator
    public static Role fromString(String role) {
        if (role.toLowerCase().equalsIgnoreCase("ADMIN")) {
            return USER;
        }
        return Role.valueOf(role.toUpperCase());
    }

    public String ToString() {
        return this.name();
    }
}

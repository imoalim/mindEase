package com.example.mindEase.config.security.token;

import com.example.mindEase.user.Role;

import java.util.Set;

public interface AccessToken {
    String getEmail();

    Long getUserId();

    Set<String> getRoles();

    Integer getVerificationStep();

    Boolean getVerified();

    String getSelectedRole();

    Boolean hasRole(String roleName);
}

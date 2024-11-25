package com.example.mindEase.config.security.token;

import java.util.Set;

public interface AccessToken {
    String getEmail();

    Long getUserId();

    Set<String> getRoles();

    Boolean getVerified();

    Boolean hasRole(String roleName);
}

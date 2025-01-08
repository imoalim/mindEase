package com.example.mindEase.config.security.token.impl;

import com.example.mindEase.config.security.token.AccessToken;
import com.example.mindEase.user.Role;
import lombok.EqualsAndHashCode;
import lombok.Getter;

import java.util.Collection;
import java.util.Collections;
import java.util.Set;

@EqualsAndHashCode
@Getter
public class AccessTokenImpl implements AccessToken {
    private final String email;
    private final Long userId;
    private final Set<String> roles;
    private final Integer verificationStep;
    private final Boolean verified;
    private final String selectedRole;

    public AccessTokenImpl(String email, Long userId, Collection<String> roles, Integer verificationStep, Boolean verified, String selectedRole) {
        this.email = email;
        this.userId = userId;
        this.roles = roles != null ? Set.copyOf(roles) : Collections.emptySet();
        this.verified = verified;
        this.verificationStep = verificationStep;
        this.selectedRole = selectedRole;
    }

    @Override
    public Boolean hasRole(String roleName) {
        return this.roles.contains(roleName);
    }
}

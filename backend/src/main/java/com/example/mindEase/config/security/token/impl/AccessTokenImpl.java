package com.example.mindEase.config.security.token.impl;

import com.example.mindEase.config.security.token.AccessToken;
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
    private final Boolean verified;

    public AccessTokenImpl(String email, Long userId, Collection<String> roles, boolean verified) {
        this.email = email;
        this.userId = userId;
        this.roles = roles != null ? Set.copyOf(roles) : Collections.emptySet();
        this.verified = verified;
    }

    @Override
    public Boolean hasRole(String roleName) {
        return this.roles.contains(roleName);
    }
}

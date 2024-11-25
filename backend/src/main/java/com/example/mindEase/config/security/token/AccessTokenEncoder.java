package com.example.mindEase.config.security.token;

public interface AccessTokenEncoder {
    String encode(AccessToken accessToken);
}

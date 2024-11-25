package com.example.mindEase.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;

@Builder
@Getter
@Data
@AllArgsConstructor
public class LoginResponse {
    private String accessToken;
}

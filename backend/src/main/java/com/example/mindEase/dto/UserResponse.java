package com.example.mindEase.dto;

import com.example.mindEase.user.Role;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Builder
@Data
public class UserResponse {
   private Long id;
   private String email;
   private String password;
   private List<Role> userRoles;
   private boolean verified;

}

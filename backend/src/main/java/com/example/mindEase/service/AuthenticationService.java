package com.example.mindEase.service;

import com.example.mindEase.config.security.token.AccessTokenEncoder;
import com.example.mindEase.config.security.token.impl.AccessTokenImpl;
import com.example.mindEase.dto.LoginRequest;
import com.example.mindEase.dto.LoginResponse;
import com.example.mindEase.exception.InvalidCredentialsException;
import com.example.mindEase.exception.UserAlreadyExistsException;
import com.example.mindEase.user.Role;
import com.example.mindEase.user.User;
import com.example.mindEase.user.UserRepository;
import com.example.mindEase.user.UserRoleEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Optional;
import java.util.Set;


@Service
@RequiredArgsConstructor
public class AuthenticationService extends DefaultOAuth2UserService {
        private final UserRepository userRepository;
        private final PasswordEncoder passwordEncoder;
        private final AccessTokenEncoder accessTokenEncoder;

        public LoginResponse login(LoginRequest loginRequest) {
            Optional<User> user = userRepository.findByEmail(loginRequest.getEmail());
            if (user.isEmpty()) {
                throw new InvalidCredentialsException();
            }

            if (!matchesPassword(loginRequest.getPassword(), user.get().getPassword())) {
                throw new InvalidCredentialsException();
            }

            String accessToken = generateAccessToken(user);
            return LoginResponse.builder().accessToken(accessToken).build();
        }

        public void createUser(@RequestBody LoginRequest request) {
            if(userRepository.existsByEmail(request.getEmail())) {
                throw new UserAlreadyExistsException();
            }

            User tempUser = User.builder().email(request.getEmail()).password(request.getPassword()).verified(false).build();

            saveNewUser(tempUser);
        }

        private User saveNewUser(@RequestBody User request) {
            String encodedPassword = passwordEncoder.encode(request.getPassword());

            User newUser = User.builder()
                    .email(request.getEmail())
                    .password(encodedPassword)
                    .verified(false)
                    .build();

            newUser.setUserRoles(Set.of(
                    UserRoleEntity.builder()
                            .user(newUser)
                            .role(Role.USER)
                            .build()));

            return userRepository.save(newUser);
        }

        private boolean matchesPassword(String rawPassword, String encodedPassword) {
            return passwordEncoder.matches(rawPassword, encodedPassword);
        }

        private String generateAccessToken(Optional<User> user) {
            Long userId = user.get().getId();
            List<String> roles = user.get().getUserRoles().stream()
                    .map(userRole -> userRole.getRole().toString())
                    .toList();

            return accessTokenEncoder.encode(
                    new AccessTokenImpl(user.get().getEmail(), userId, roles, user.get().getVerified()));
        }
}

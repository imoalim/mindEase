package com.example.mindEase.service;

import com.example.mindEase.user.User;
import com.example.mindEase.user.UserRepository;
import org.springframework.context.ApplicationListener;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.event.AuthenticationSuccessEvent;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;


@Service
public class AuthenticationService extends DefaultOAuth2UserService {
        private final UserRepository userRepository;

        public AuthenticationService(UserRepository userRepository) {
            this.userRepository = userRepository;
        }

        @Bean
        public ApplicationListener<AuthenticationSuccessEvent> authenticationSuccessEventApplicationListener() {
            return event -> {
                if (event.getAuthentication().getPrincipal() instanceof OAuth2User OAuthUser) {
                    if(!userRepository.existsByEmail(OAuthUser.getAttribute("email"))){
                        userRepository.save(new User(OAuthUser.getAttribute("email")));
                    }
                }
            };
        }
}

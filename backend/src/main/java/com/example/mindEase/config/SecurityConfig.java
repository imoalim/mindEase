package com.example.mindEase.config;

import com.example.mindEase.service.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {
    @Autowired
    private AuthenticationService oauthUserService;

    @Bean
    SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(AbstractHttpConfigurer::disable)
                .authorizeRequests(authorizeRequests ->
                        authorizeRequests.anyRequest().authenticated()
                )
//                .oauth2Login(oauth2 -> oauth2
//                        .userInfoEndpoint(userInfo -> userInfo.userService(oauthUserService)).successHandler((request, response, authentication) -> {
//                            CustomOAuth2User oauthUser = (CustomOAuth2User) authentication.getPrincipal();
//
//                            System.out.println(oauthUser.getName());
//
//
//                            response.sendRedirect("http://localhost:5173/");
//                        })
//                )
                .oauth2Login(oauth2 -> oauth2.defaultSuccessUrl("http://localhost:5173/post-auth", true))
                .logout(logout -> logout.logoutSuccessUrl("http://localhost:5173/").permitAll());
        return http.build();
    }
}

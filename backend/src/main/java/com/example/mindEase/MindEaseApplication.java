package com.example.mindEase;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@SpringBootApplication
public class MindEaseApplication {
	public static void main(String[] args) {
		// Load environment variables from .env file located in the backend directory
		Dotenv dotenv = Dotenv.configure()
				.directory("./")
				.load();

		// Set .env variables as system properties so application.properties can read them
		dotenv.entries().forEach(entry -> System.setProperty(entry.getKey(), entry.getValue()));

		SpringApplication.run(MindEaseApplication.class, args);
	}

	// CORS configuration
//	@Bean
//	public CorsFilter corsFilter() {
//		CorsConfiguration config = new CorsConfiguration();
//		config.addAllowedOrigin("http://localhost:5173"); // Frontend-URL
//		config.addAllowedHeader("*"); // Allow all headers
//		config.addAllowedMethod("*"); // Allow all HTTP methods (GET, POST, OPTIONS, etc.)
//		config.setAllowCredentials(true); // Allow cookies and authorization headers
//
//		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//		source.registerCorsConfiguration("/**", config);
//
//		return new CorsFilter(source);
//	}
}

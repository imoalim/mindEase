package com.example.mindEase;

import io.github.cdimascio.dotenv.Dotenv;
import io.jsonwebtoken.security.Keys;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.Base64;

@SpringBootApplication
public class MindEaseApplication {
	public static void main(String[] args) {
		Dotenv dotenv = Dotenv.configure()
				.directory("./")
				.load();

		// Set .env variables as system properties so application.properties can read them
		dotenv.entries().forEach(entry -> System.setProperty(entry.getKey(), entry.getValue()));

		SpringApplication.run(MindEaseApplication.class, args);
	}
}

package com.example.mindEase.user;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "users")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Email
    private String email;

    @NotNull
    private String password;

    @NotNull
    private String firstName;

    @NotNull
    private String lastName;

    @NotNull
    private String age;

    @NotNull
    private String location;

    @Enumerated(EnumType.STRING)
    private Role userRole;

    private boolean verified; // Ob der Benutzer verifiziert ist

    @Lob
    private String verificationAnswers; // Für Psychology Students: JSON oder Text

    private String documentPath; // Für Therapists: Pfad zum hochgeladenen Dokument

    public <A> User(A email) {
    }
}

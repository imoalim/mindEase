package com.example.mindEase.user;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

import java.util.Set;

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
    @Length(min = 2, max = 255)
    @Column(name = "password")
    private String password;

//    @NotNull
//    private String firstName;
//
//    @NotNull
//    private String lastName;
//
//    @NotNull
//    private String age;
//
//    @NotNull
//    private String location;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private Set<UserRoleEntity> userRoles;

//    private boolean verified;
//
//    @Lob
//    private String verificationAnswers;
//
//    private String documentPath;

}

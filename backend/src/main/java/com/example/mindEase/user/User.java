package com.example.mindEase.user;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.validator.constraints.Length;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.util.Set;

@Entity
@Table(name = "users")
@Data
@Getter
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
    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @NotNull
    @Length(min = 2, max = 50)
    @Column(name = "password")
    private String password;

    @Column(name = "country")
    private String country;

    @DateTimeFormat(pattern = "dd-mm-YYYY")
    @Column(name = "birthday")
    private LocalDate birthday;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private Set<UserRoleEntity> userRoles;

    @NotNull
    @ColumnDefault("false")
    private Boolean verified;

    @NotNull
    @ColumnDefault("1")
    @Column(name = "verification_step")
    private Integer verificationStep;
//
//    @Lob
//    private String verificationAnswers;
//
//    private String documentPath;

}

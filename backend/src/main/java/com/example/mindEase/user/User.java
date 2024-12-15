package com.example.mindEase.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.validator.constraints.Length;

import java.time.LocalDate;
import java.util.Set;

@Entity
@Table(name = "users")
@Data
@Getter
@Setter
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

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Length(min = 2, max = 255)
    @Column(name = "password")
    @JsonIgnore
    private String password;

    @Column(name = "country")
    private String country;

    @Column(name = "birthday", columnDefinition = "DATE")
    private LocalDate birthday;

    @ColumnDefault("false")
    private Boolean verified = false;

    @ColumnDefault("1")
    @Column(name = "verification_step")
    private Integer verificationStep = 1;

    @Column(name = "selected_role")
    @Enumerated(EnumType.STRING)
    private Role selectedRole;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private Set<UserRoleEntity> userRoles;
//
//    @Lob
//    private String verificationAnswers;
//
//    private String documentPath;
private String university; // Für Psychology Students
    private String qualifications; // Qualifikationen für spezifische Rollen
    private String enrollmentDocumentPath;


}

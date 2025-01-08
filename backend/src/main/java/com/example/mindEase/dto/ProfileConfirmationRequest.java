package com.example.mindEase.dto;

import com.example.mindEase.user.Role;
import com.example.mindEase.validation.ValidProfileConfirmationRequest;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.hibernate.validator.constraints.Length;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.Date;

@ValidProfileConfirmationRequest
@Builder
@Getter
@Data
@AllArgsConstructor
public class ProfileConfirmationRequest {
    @NotNull
    @Length(min = 2, max = 50)
    private String firstName;
    @NotNull
    @Length(min = 2, max = 50)
    private String lastName;
    @NotNull
    @Length(min = 2, max = 50)
    private String country;
    @NotNull
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate birthday;
    @NotNull
    private Role selectedRole;

    private String university;
    private String qualifications;
    private MultipartFile enrollmentDocument;

}

package com.example.mindEase.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = ProfileConfirmationRequestValidator.class)
@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
public @interface ValidProfileConfirmationRequest {
    String message() default "Invalid profile confirmation request";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
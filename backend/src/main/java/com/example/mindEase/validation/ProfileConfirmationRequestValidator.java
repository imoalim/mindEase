package com.example.mindEase.validation;

import com.example.mindEase.dto.ProfileConfirmationRequest;
import com.example.mindEase.user.Role;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class ProfileConfirmationRequestValidator implements ConstraintValidator<ValidProfileConfirmationRequest, ProfileConfirmationRequest> {

    @Override
    public boolean isValid(ProfileConfirmationRequest request, ConstraintValidatorContext context) {
        if (request.getSelectedRole() == Role.PSYCHOLOGY_STUDENT ||  request.getSelectedRole() == Role.THERAPIST) {
            if(request.getUniversity() == null) {
                context.disableDefaultConstraintViolation();
                context.buildConstraintViolationWithTemplate("University must not be null for this role")
                        .addPropertyNode("university")
                        .addConstraintViolation();
                return false;
            }

            if (request.getQualifications() == null) {
                context.disableDefaultConstraintViolation();
                context.buildConstraintViolationWithTemplate("Qualifications must not be null for this role")
                        .addPropertyNode("qualifications")
                        .addConstraintViolation();
                return false;
            }

            if (request.getEnrollmentDocument() == null) {
                context.disableDefaultConstraintViolation();
                context.buildConstraintViolationWithTemplate("Enrollment document must not be null for this role")
                        .addPropertyNode("enrollmentDocument")
                        .addConstraintViolation();
                return false;
            }

        }
        return true;
    }
}
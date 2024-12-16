package com.example.mindEase.service;

import com.example.mindEase.dto.ProfileConfirmationRequest;
import com.example.mindEase.exception.InvalidUserException;
import com.example.mindEase.user.User;
import com.example.mindEase.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
@RequiredArgsConstructor
public class ProfileService {
    private final UserRepository userRepository;

    public User updateProfileData(ProfileConfirmationRequest request, String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new InvalidUserException(email));

        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setCountry(request.getCountry());
        user.setBirthday(request.getBirthday());
        user.setSelectedRole(request.getSelectedRole());
        user.setUniversity(request.getUniversity());
        user.setQualifications(request.getQualifications());
        user.setDescription(request.getDescription());
        user.setLocation(request.getLocation());
        user.setGender(request.getGender());
        user.setExperienceYears(request.getExperienceYears());

        if (request.getEnrollmentDocument() != null && !request.getEnrollmentDocument().isEmpty()) {
            String filePath = saveFile(request.getEnrollmentDocument(), user.getId());
            user.setEnrollmentDocumentPath(filePath);
        }
        user.setVerificationStep(3);

        userRepository.save(user);
        return user;
    }

    private String saveFile(MultipartFile file, Long userId) {
        try {
            String UPLOAD_DIR = "uploads/"; // TODO: change this approach: Directory to store uploaded files
            if (!Files.exists(Paths.get(UPLOAD_DIR))) {
                Files.createDirectories(Paths.get(UPLOAD_DIR));
            }

            String fileName = userId + "_" + file.getOriginalFilename();
            Path filePath = Paths.get(UPLOAD_DIR + fileName);
            Files.write(filePath, file.getBytes());

            return filePath.toString();
        } catch (IOException e) {
            throw new RuntimeException("Error saving file: " + e.getMessage());
        }
    }
}

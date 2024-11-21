package com.example.mindEase.service;

import com.example.mindEase.user.Role;
import com.example.mindEase.user.User;
import com.example.mindEase.user.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.Optional;

@Service
public class VerificationService {

    private final UserRepository userRepository;

    public VerificationService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void startVerification(Long userId, String answers, MultipartFile document) throws Exception {
        Optional<User> userOptional = userRepository.findById(userId);

        if (userOptional.isEmpty()) {
            throw new IllegalArgumentException("User not found.");
        }

        User user = userOptional.get();

        // Überprüfung der Rolle
        if (user.getUserRole().equals(Role.THERAPIST)) {
            if (document == null || document.isEmpty()) {
                throw new IllegalArgumentException("Therapists must upload a document for verification.");
            }
            // Dokument speichern (Beispiel: Speicherung im Dateisystem)
            String documentPath = saveDocument(document);
            user.setDocumentPath(documentPath);
        } else if (user.getUserRole().equals(Role.PSYCHOLOGY_STUDENT)) {
            if (answers == null || answers.isEmpty()) {
                throw new IllegalArgumentException("Students must provide answers for verification.");
            }
            user.setVerificationAnswers(answers);
        } else {
            throw new IllegalArgumentException("This user role does not require verification.");
        }

        user.setVerified(false); // Noch nicht verifiziert
        userRepository.save(user);
    }

    private String saveDocument(MultipartFile document) throws IOException {
        String filePath = "path/to/documents/" + document.getOriginalFilename();
        File file = new File(filePath);
        document.transferTo(file);
        return filePath;
    }
}


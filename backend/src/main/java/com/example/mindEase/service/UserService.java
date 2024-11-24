package com.example.mindEase.service;

import com.example.mindEase.user.User;
import com.example.mindEase.user.UserQuestionnaire;
import com.example.mindEase.user.UserQuestionnaireRepository;
import com.example.mindEase.user.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final UserQuestionnaireRepository userQuestionnaireRepository;

    public UserService(UserRepository userRepository, UserQuestionnaireRepository userQuestionnaireRepository) {
        this.userRepository = userRepository;
        this.userQuestionnaireRepository = userQuestionnaireRepository;
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public List<User> findAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> findUserById(Long id) {
        return userRepository.findById(id);
    }

    public boolean deleteUserById(Long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public User registerUser(User user) {
        // Basisprüfung: Ist die E-Mail bereits registriert?
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email is already registered.");
        }

        // Validierung und spezielle Anforderungen basierend auf der Rolle
        switch (user.getUserRole()) {
            case THERAPIST:
                if (user.getDocumentPath() == null || user.getDocumentPath().isEmpty()) {
                    throw new IllegalArgumentException("Therapists must upload qualification documents.");
                }
                user.setVerified(false); // Verifikation durch Admin erforderlich
                break;

            case PSYCHOLOGY_STUDENT:
                if (user.getVerificationAnswers() == null || user.getVerificationAnswers().isEmpty()) {
                    throw new IllegalArgumentException("Psychology Students must provide answers for verification.");
                }
                user.setVerified(false); // Verifikation durch Admin erforderlich
                break;

            default: // Normale Benutzer
                user.setVerified(true); // Direkt aktiv
                break;
        }

        // Passwort-Hashing (z.B. BCrypt)
        user.setPassword(hashPassword(user.getPassword()));

        // Benutzer speichern
        return userRepository.save(user);
    }

    private String hashPassword(String password) {
        // Verwende eine Sicherheitsbibliothek wie BCrypt zum Hashen
        return password; // Placeholder für das Beispiel
    }


    public Long saveUserEmotionalStateQuestionnaire(UserQuestionnaire userQuestionnaire){
        //exception handling  if the user doesnt exist
//        if(userRepository.existsById(userQuestionnaire.getUser().getId()))
//        {
            UserQuestionnaire savedQuestionnaire = userQuestionnaireRepository.save(userQuestionnaire);
            return savedQuestionnaire.getId();
//        }else
//        {
//            throw exception... // it will be implemented
//        }

    }
}

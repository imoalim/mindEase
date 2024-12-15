package com.example.mindEase.service;

import com.example.mindEase.config.exceptionhandler.ObjectNotFoundException;
import com.example.mindEase.dto.UserQuestionnaireRequest;
import com.example.mindEase.dto.UserResponse;
import com.example.mindEase.user.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UserQuestionnaireRepository userQuestionnaireRepository;
    private final UserRoleRepository userRoleRepository;

    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public List<User> findAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> findUserById(Long id) {
        return userRepository.findById(id);
    }


    public List<User> findAllTherapists() {
        return userRepository.findAllBySelectedRoleAndVerified(Role.THERAPIST, true);
    }
    public boolean deleteUserById(Long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public User updateUserStatus(Long id){
            User userToUpdate = userRepository.findById(id).orElseThrow(() -> new ObjectNotFoundException("User does not exist"));
            userToUpdate.setVerified(true);

            UserRoleEntity roleToUpdate = userRoleRepository.findByUserId(id);
            roleToUpdate.setRole(Role.THERAPIST);
            userRoleRepository.save(roleToUpdate);


        return userRepository.save(userToUpdate);
    }

    public List<User> getAllUnverifiedProfessionals(){
        List<User> unverifiedProfessionals = userRepository.findAllBySelectedRoleAndVerified(Role.THERAPIST, false);
        unverifiedProfessionals.addAll( userRepository.findAllBySelectedRoleAndVerified(Role.PSYCHOLOGY_STUDENT, false));

        return unverifiedProfessionals;
    }

    public Long saveUserEmotionalStateQuestionnaire(UserQuestionnaireRequest request){
        User user = this.findUserById(request.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("User not found for ID: " + request.getUserId()));
        UserQuestionnaire userQuestionnaire = UserQuestionnaire.builder()
                .q2(request.getQ2())
            .q20(request.getQ20())
            .q22(request.getQ22())
            .q23(request.getQ23())
            .q24(request.getQ24())
            .q25(request.getQ25())
            .q26(request.getQ26())
            .q29(request.getQ29())
            .q30(request.getQ30())
            .q31(request.getQ31())
            .q32(request.getQ32())
                .user(user)
                .build();

        user.setVerificationStep(3);
        userRepository.save(user);

        UserQuestionnaire savedQuestionnaire = userQuestionnaireRepository.save(userQuestionnaire);
        return savedQuestionnaire.getId();
    }
}

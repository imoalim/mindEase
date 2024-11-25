package com.example.mindEase.service;

import com.example.mindEase.user.User;
import com.example.mindEase.user.UserQuestionnaire;
import com.example.mindEase.user.UserQuestionnaireRepository;
import com.example.mindEase.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UserQuestionnaireRepository userQuestionnaireRepository;

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

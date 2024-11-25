package com.example.mindEase.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserQuestionnaireRepository extends JpaRepository<UserQuestionnaire, Long> {

}

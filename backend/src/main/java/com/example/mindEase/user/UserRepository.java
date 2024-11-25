package com.example.mindEase.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    @Query("select case when count(u)> 0 then true else false end FROM User u WHERE u.email = :email")
    boolean existsByEmail(String email);

    Optional<User> findByEmail(@NotNull @Email String email);

}

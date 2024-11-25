package com.example.mindEase.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserRepository extends JpaRepository<User, Long> {
    @Query("select case when count(u)> 0 then true else false end FROM User u WHERE u.email = :email")
    boolean existsByEmail(String email);

    User findByEmail(String email);
}

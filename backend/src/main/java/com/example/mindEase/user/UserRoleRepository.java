package com.example.mindEase.user;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRoleRepository extends JpaRepository<UserRoleEntity, Long> {
    UserRoleEntity findByUserId(Long userId);
}

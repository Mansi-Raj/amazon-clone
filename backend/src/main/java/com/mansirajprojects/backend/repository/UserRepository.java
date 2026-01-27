package com.mansirajprojects.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mansirajprojects.backend.model.User;


public interface UserRepository extends JpaRepository<User, Long> {
  Optional<User>findByEmail(String email);
  Optional<User> findByUsername(String username);
  User findByVerificationCode(String verificationCode);
}

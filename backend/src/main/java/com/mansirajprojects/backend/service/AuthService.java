package com.mansirajprojects.backend.service;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.mansirajprojects.backend.model.User;
import com.mansirajprojects.backend.repository.UserRepository;
import com.mansirajprojects.backend.security.JwtUtils;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtUtils jwtUtils;
    @Autowired
    private EmailService emailService;

    public String register(String email, String password, String siteURL) throws Exception {
        if (userRepository.findByEmail(email).isPresent()) {
            throw new RuntimeException("Email already exists");
        }
        
        String encodedPassword = passwordEncoder.encode(password);
        String randomCode = UUID.randomUUID().toString();
        User user = new User(email, encodedPassword, randomCode);
        
        userRepository.save(user);
        emailService.sendVerificationEmail(user, siteURL);
        return "Registration successful. Please check your email to verify.";
    }

    public boolean verify(String verificationCode) {
        User user = userRepository.findByVerificationCode(verificationCode);
        if (user == null || user.isEnabled()) {
            return false;
        } else {
            user.setVerificationCode(null);
            user.setEnabled(true);
            userRepository.save(user);
            return true;
        }
    }

    public String login(String email, String password) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }
        if (!user.isEnabled()) {
            throw new RuntimeException("Account not verified. Please check email.");
        }
        return jwtUtils.generateJwtToken(email);
    }
}
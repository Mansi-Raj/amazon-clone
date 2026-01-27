package com.mansirajprojects.backend.service;

import java.util.*;

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

    public String register(String name, String username, String email, String password) throws Exception {
        if (userRepository.findByEmail(email).isPresent()) {
            throw new RuntimeException("Email is already registered. Please Sign In.");
        }
        if (userRepository.findByUsername(username).isPresent()) {
             throw new RuntimeException("Username is taken.");
        }
        
        // Generate 6-digit OTP
        String otp = String.format("%06d", new Random().nextInt(999999));

        String encodedPassword = passwordEncoder.encode(password);
        
        // Save User (Enabled = false initially)
        User user = new User(name, username, email, encodedPassword);
        user.setVerificationCode(otp);
        user.setEnabled(false); // Validating via OTP now
        
        userRepository.save(user);
        
        // Send OTP
        emailService.sendOtpEmail(email, otp);
        
        return "OTP sent to your email.";
    }

    public Map<String, String> verifyOtp(String email, String otp) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (user.isEnabled()) {
             throw new RuntimeException("User is already verified. Please Login.");
        }

        if (user.getVerificationCode() == null || !user.getVerificationCode().equals(otp)) {
            throw new RuntimeException("Invalid OTP");
        }

        // Activate User
        user.setEnabled(true);
        user.setVerificationCode(null); // Clear OTP after use
        userRepository.save(user);

        // Auto-Login: Generate Token
        String token = jwtUtils.generateJwtToken(email);
        
        Map<String, String> response = new HashMap<>();
        response.put("token", token);
        response.put("name", user.getName());
        return response;
    }

    public Map<String, String> login(String email, String password) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Provided email is not registered"));

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        if (!user.isEnabled()) {
            throw new RuntimeException("Account not verified. Please verify OTP.");
        }

        String token = jwtUtils.generateJwtToken(email);
        
        Map<String, String> response = new HashMap<>();
        response.put("token", token);
        response.put("name", user.getName());
        return response;
    }
}
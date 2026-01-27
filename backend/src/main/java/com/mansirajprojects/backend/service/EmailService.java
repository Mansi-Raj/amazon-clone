package com.mansirajprojects.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendOtpEmail(String toEmail, String otp) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("your-email@gmail.com"); // Ensure this matches application.properties
        message.setTo(toEmail);
        message.setSubject("Amazon Clone Verification Code");
        message.setText("Your verification code is: " + otp + "\n\nThis code expires in 15 minutes.");
        mailSender.send(message);
    }
}
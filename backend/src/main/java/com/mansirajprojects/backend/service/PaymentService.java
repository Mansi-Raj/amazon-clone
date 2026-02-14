package com.mansirajprojects.backend.service;

import java.util.Random;

import org.springframework.stereotype.Service;

@Service
public class PaymentService {

    private final Random random = new Random();

    public boolean processMockPayment(long amountCents, String currency) {
        try {
            // Simulate network latency (1.5 to 3 seconds)
            Thread.sleep(1500 + random.nextInt(1500));
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }

        // Simulate a 90% success rate for the demo
        // This forces you to handle failure points in your frontend/service logic
        return random.nextDouble() < 0.90;
    }
}
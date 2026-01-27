package com.mansirajprojects.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mansirajprojects.backend.model.CartItem;
import com.mansirajprojects.backend.model.CartSummary;
import com.mansirajprojects.backend.model.Product;
import com.mansirajprojects.backend.model.User;
import com.mansirajprojects.backend.repository.CartRepository;
import com.mansirajprojects.backend.repository.UserRepository;

@Service
public class CartService {
    
    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private ProductService productService;

    @Autowired
    private UserRepository userRepository;

    // Helper to get User entity from email
    private User getUser(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public CartSummary getCartSummary(String userEmail) {
        User user = getUser(userEmail);
        List<CartItem> cartItems = cartRepository.findByUser(user);
        return calculateSummary(cartItems);
    }

    public void addToCart(String userEmail, String productId, int quantity) {
        User user = getUser(userEmail);
        Optional<CartItem> existing = cartRepository.findByUserAndProductId(user, productId);

        if (existing.isPresent()) {
            CartItem item = existing.get();
            item.setQuantity(item.getQuantity() + quantity);
            cartRepository.save(item);
        } else {
            if (productService.getProductById(productId).isPresent()) {
                CartItem newItem = new CartItem(productId, quantity, "1", user);
                cartRepository.save(newItem);
            }
        }
    }

    @Transactional
    public void removeFromCart(String userEmail, String productId) {
        User user = getUser(userEmail);
        cartRepository.deleteByUserAndProductId(user, productId);
    }

    public void updateQuantity(String userEmail, String productId, int newQuantity) {
        User user = getUser(userEmail);
        cartRepository.findByUserAndProductId(user, productId).ifPresent(item -> {
            item.setQuantity(newQuantity);
            cartRepository.save(item);
        });
    }

    public void updateDeliveryOption(String userEmail, String productId, String optionId) {
        User user = getUser(userEmail);
        cartRepository.findByUserAndProductId(user, productId).ifPresent(item -> {
            item.setDeliveryOptionId(optionId);
            cartRepository.save(item);
        });
    }

    private CartSummary calculateSummary(List<CartItem> cartItems) {
        CartSummary summary = new CartSummary();
        
        // Populate transient Product objects
        for (CartItem item : cartItems) {
            Product p = productService.getProductById(item.getProductId()).orElse(null);
            item.setProduct(p);
        }
        summary.setItems(cartItems);
        
        long productPrice = 0;
        long shippingPrice = 0;
        int quantity = 0;

        for (CartItem item : cartItems) {
            if (item.getProduct() != null) {
                productPrice += (long) item.getProduct().getPriceCents() * item.getQuantity();
                shippingPrice += getDeliveryPrice(item.getDeliveryOptionId());
                quantity += item.getQuantity();
            }
        }

        long totalBeforeTax = productPrice + shippingPrice;
        long tax = Math.round(totalBeforeTax * 0.1);
        long total = totalBeforeTax + tax;

        summary.setTotalProductPriceCents(productPrice);
        summary.setTotalShippingCents(shippingPrice);
        summary.setTotalBeforeTaxCents(totalBeforeTax);
        summary.setEstimatedTaxCents(tax);
        summary.setTotalCents(total);
        summary.setCartQuantity(quantity);

        return summary;
    }

    private int getDeliveryPrice(String optionId) {
        if (optionId == null) return 0;
        return switch (optionId) {
            case "2" -> 499;
            case "3" -> 999;
            default -> 0;
        };
    }
}
package com.mansirajprojects.backend.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mansirajprojects.backend.model.CartItem;
import com.mansirajprojects.backend.model.CartSummary;

@Service
public class CartService {
    
    // In-memory cart for demonstration. In a real app, use a Database or Session.
    private List<CartItem> cart = new ArrayList<>();

    @Autowired
    private ProductService productService;

    public CartSummary getCartSummary() {
        CartSummary summary = new CartSummary();
        summary.setItems(cart);
        
        long productPrice = 0;
        long shippingPrice = 0;
        int quantity = 0;

        for (CartItem item : cart) {
            productPrice += (long) item.getProduct().getPriceCents() * item.getQuantity();
            shippingPrice += getDeliveryPrice(item.getDeliveryOptionId());
            quantity += item.getQuantity();
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
        switch (optionId) {
            case "2": return 499;
            case "3": return 999;
            default: return 0; // Option 1 is free
        }
    }

    public void addToCart(String productId, int quantity) {
        Optional<CartItem> existing = cart.stream()
                .filter(item -> item.getProduct().getId().equals(productId))
                .findFirst();

        if (existing.isPresent()) {
            existing.get().setQuantity(existing.get().getQuantity() + quantity);
        } else {
            productService.getProductById(productId).ifPresent(product -> {
                cart.add(new CartItem(product, quantity, "1"));
            });
        }
    }

    public void removeFromCart(String productId) {
        cart.removeIf(item -> item.getProduct().getId().equals(productId));
    }

    public void updateQuantity(String productId, int newQuantity) {
        cart.stream()
            .filter(item -> item.getProduct().getId().equals(productId))
            .findFirst()
            .ifPresent(item -> item.setQuantity(newQuantity));
    }

    public void updateDeliveryOption(String productId, String optionId) {
        cart.stream()
            .filter(item -> item.getProduct().getId().equals(productId))
            .findFirst()
            .ifPresent(item -> item.setDeliveryOptionId(optionId));
    }
}
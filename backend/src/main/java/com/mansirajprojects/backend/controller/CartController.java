package com.mansirajprojects.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mansirajprojects.backend.model.CartSummary;
import com.mansirajprojects.backend.service.CartService;

@RestController
@RequestMapping("/api/cart")
public class CartController {
    @Autowired private CartService cartService;

    @GetMapping
    public CartSummary getCart() {
        return cartService.getCartSummary();
    }

    @PostMapping("/add")
    public CartSummary addToCart(@RequestParam String productId, @RequestParam int quantity) {
        cartService.addToCart(productId, quantity);
        return cartService.getCartSummary();
    }

    @DeleteMapping("/remove/{productId}")
    public CartSummary removeFromCart(@PathVariable String productId) {
        cartService.removeFromCart(productId);
        return cartService.getCartSummary();
    }

    @PutMapping("/update/{productId}")
    public CartSummary updateQuantity(@PathVariable String productId, @RequestParam int quantity) {
        cartService.updateQuantity(productId, quantity);
        return cartService.getCartSummary();
    }

    @PutMapping("/delivery-option/{productId}")
    public CartSummary updateDeliveryOption(@PathVariable String productId, @RequestParam String optionId) {
        cartService.updateDeliveryOption(productId, optionId);
        return cartService.getCartSummary();
    }
}
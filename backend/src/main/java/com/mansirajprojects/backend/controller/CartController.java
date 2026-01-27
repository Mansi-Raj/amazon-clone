package com.mansirajprojects.backend.controller;

import com.mansirajprojects.backend.model.CartSummary;
import com.mansirajprojects.backend.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "http://localhost:5173")
public class CartController {

    @Autowired
    private CartService cartService;

    @GetMapping
    public CartSummary getCart(Principal principal) {
        return cartService.getCartSummary(principal.getName());
    }

    @PostMapping("/add")
    public void addToCart(@RequestParam String productId, @RequestParam int quantity, Principal principal) {
        cartService.addToCart(principal.getName(), productId, quantity);
    }

    @DeleteMapping("/remove/{productId}")
    public void removeFromCart(@PathVariable String productId, Principal principal) {
        cartService.removeFromCart(principal.getName(), productId);
    }

    @PutMapping("/update/{productId}")
    public void updateQuantity(@PathVariable String productId, @RequestParam int quantity, Principal principal) {
        cartService.updateQuantity(principal.getName(), productId, quantity);
    }

    @PutMapping("/delivery-option/{productId}")
    public void updateDeliveryOption(@PathVariable String productId, @RequestParam String optionId, Principal principal) {
        cartService.updateDeliveryOption(principal.getName(), productId, optionId);
    }
}
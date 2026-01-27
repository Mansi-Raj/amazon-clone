package com.mansirajprojects.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mansirajprojects.backend.model.CartItem;
import com.mansirajprojects.backend.model.CartSummary;
import com.mansirajprojects.backend.model.Product;
import com.mansirajprojects.backend.repository.CartRepository;

@Service
public class CartService {
    
    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private ProductService productService;

    public CartSummary getCartSummary() {
        CartSummary summary = new CartSummary();
        // 1. Fetch items from Database
        List<CartItem> cartItems = cartRepository.findAll();

        // 2. Populate the transient 'Product' object for each item
        // (Because the DB only stored the ID string)
        for (CartItem item : cartItems) {
            Product p = productService.getProductById(item.getProductId()).orElse(null);
            item.setProduct(p);
        }

        summary.setItems(cartItems);
        
        // 3. Calculate Totals (Logic remains mostly the same)
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

    public void addToCart(String productId, int quantity) {
        Optional<CartItem> existing = cartRepository.findByProductId(productId);

        if (existing.isPresent()) {
            CartItem item = existing.get();
            item.setQuantity(item.getQuantity() + quantity);
            cartRepository.save(item);
        } else {
            // Validate product exists before adding
            if (productService.getProductById(productId).isPresent()) {
                CartItem newItem = new CartItem(productId, quantity, "1");
                cartRepository.save(newItem);
            }
        }
    }

    @Transactional // Required for delete operations
    public void removeFromCart(String productId) {
        cartRepository.deleteByProductId(productId);
    }

    public void updateQuantity(String productId, int newQuantity) {
        cartRepository.findByProductId(productId).ifPresent(item -> {
            item.setQuantity(newQuantity);
            cartRepository.save(item);
        });
    }

    public void updateDeliveryOption(String productId, String optionId) {
        cartRepository.findByProductId(productId).ifPresent(item -> {
            item.setDeliveryOptionId(optionId);
            cartRepository.save(item);
        });
    }
}
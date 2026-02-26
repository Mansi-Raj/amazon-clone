package com.mansirajprojects.backend.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mansirajprojects.backend.model.CartSummary;
import com.mansirajprojects.backend.model.Order;
import com.mansirajprojects.backend.model.OrderItem;
import com.mansirajprojects.backend.model.OrderStatus;
import com.mansirajprojects.backend.model.PaymentStatus;
import com.mansirajprojects.backend.model.User;
import com.mansirajprojects.backend.repository.CartRepository;
import com.mansirajprojects.backend.repository.OrderRepository;
import com.mansirajprojects.backend.repository.UserRepository;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartService cartService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PaymentService paymentService;

    @Transactional
    public Order placeOrder(String email, String shippingAddress) {
        // 1. Fetch User
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // 2. Get Cart Summary
        CartSummary summary = cartService.getCartSummary(email);
        if (summary.getItems().isEmpty()) {
            throw new RuntimeException("Cart is empty");
        }

        // 3. Process Payment
        boolean paymentSuccessful = paymentService.processMockPayment(
            summary.getTotalCents(), 
            "INR"
        );

        if (!paymentSuccessful) {
            throw new RuntimeException("Payment Gateway Rejected the Transaction");
        }

        // 4. Create Order Entity
        Order order = new Order();
        
        // Map User details to Order fields (Since Order.java stores them as strings)
        order.setCustomerName(user.getName());
        order.setEmail(user.getEmail());
        
        order.setAddress(shippingAddress); // Fixed: was setShippingAddress
        order.setTotalAmountCents(summary.getTotalCents()); // Fixed: was setTotalCents
        
        // Use Enums instead of Strings
        order.setPaymentStatus(PaymentStatus.PAID); 
        order.setOrderStatus(OrderStatus.ORDERED); 

        // 5. Convert CartItems to OrderItems
        List<OrderItem> orderItems = summary.getItems().stream().map(cartItem -> {
            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            // orderItem.setProductId(cartItem.getProductId()); // Ensure OrderItem has this field or relation
            // If OrderItem links to Product entity directly:
             if (cartItem.getProduct() != null) {
                 orderItem.setProductId(cartItem.getProductId()); // Store ID for reference
                 orderItem.setProductName(cartItem.getProduct().getName());
                 orderItem.setPriceCents(cartItem.getProduct().getPriceCents());
             }
            
            orderItem.setQuantity(cartItem.getQuantity());
            // orderItem.setDeliveryOptionId(cartItem.getDeliveryOptionId()); // Only if your OrderItem supports this
            
            return orderItem;
        }).collect(Collectors.toList());

        order.setItems(orderItems); // Fixed: was setOrderItems
        
        // Save Order
        Order savedOrder = orderRepository.save(order);

        // 6. Empty the Cart
        cartRepository.deleteByUser(user);

        return savedOrder;
    }
}
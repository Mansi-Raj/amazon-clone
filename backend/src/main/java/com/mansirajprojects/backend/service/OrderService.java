package com.mansirajprojects.backend.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mansirajprojects.backend.model.CartSummary;
import com.mansirajprojects.backend.model.Order;
import com.mansirajprojects.backend.model.OrderItem;
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
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // 1. Get Cart Summary to get calculated totals and items
        CartSummary summary = cartService.getCartSummary(email);
        if (summary.getItems().isEmpty()) {
            throw new RuntimeException("Cart is empty");
        }

        boolean paymentSuccessful = paymentService.processMockPayment(
            summary.getTotalCents(), 
        "INR"
        );

    if (!paymentSuccessful) {
        throw new RuntimeException("Payment Gateway Rejected the Transaction");
    }

        // 2. Create the Order entity
        Order order = new Order();
        order.setUser(user);
        order.setTotalCents(summary.getTotalCents());
        order.setShippingAddress(shippingAddress);
        order.setPaymentStatus("COMPLETED");
        order.setOrderStatus("PLACED");

        // 3. Convert CartItems to OrderItems (Freezing the data)
        List<OrderItem> orderItems = summary.getItems().stream().map(cartItem -> {
            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setProductId(cartItem.getProductId());
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setDeliveryOptionId(cartItem.getDeliveryOptionId());
            
            // Critical: Frozen Price and Name
            if (cartItem.getProduct() != null) {
                orderItem.setProductName(cartItem.getProduct().getName());
                orderItem.setPriceCentsAtPurchase(cartItem.getProduct().getPriceCents());
            }
            return orderItem;
        }).collect(Collectors.toList());

        order.setOrderItems(orderItems);
        Order savedOrder = orderRepository.save(order);

        // 4. Empty the Cart
        cartRepository.deleteByUser(user);

        return savedOrder;
    }
}
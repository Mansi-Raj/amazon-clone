package com.mansirajprojects.backend.controller;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mansirajprojects.backend.model.Order;
import com.mansirajprojects.backend.model.OrderStatus;
import com.mansirajprojects.backend.model.PaymentStatus;
import com.mansirajprojects.backend.repository.OrderRepository;

@RestController
@RequestMapping("/api/admin/orders")
@CrossOrigin // Adjust origin for production
public class AdminOrderController {

    @Autowired
    private OrderRepository orderRepository;

    // Get all orders (with optional filters)
    @GetMapping
    public ResponseEntity<List<Order>> getOrders(
            @RequestParam(required = false) OrderStatus orderStatus,
            @RequestParam(required = false) PaymentStatus paymentStatus) {
        
        List<Order> orders;
        
        if (orderStatus != null && paymentStatus != null) {
            orders = orderRepository.findByOrderStatusAndPaymentStatus(orderStatus, paymentStatus);
        } else if (orderStatus != null) {
            orders = orderRepository.findByOrderStatus(orderStatus);
        } else if (paymentStatus != null) {
            orders = orderRepository.findByPaymentStatus(paymentStatus);
        } else {
            orders = orderRepository.findAll();
        }
        
        // Sort by earliest order first (or change to latest depending on preference)
        orders.sort((o1, o2) -> o2.getOrderDate().compareTo(o1.getOrderDate()));
        
        return ResponseEntity.ok(orders);
    }

    // Update Order Status
    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateOrderStatus(@PathVariable Long id, @RequestBody Map<String, String> payload) {
        return orderRepository.findById(id).map(order -> {
            try {
                OrderStatus newStatus = OrderStatus.valueOf(payload.get("status"));
                order.setOrderStatus(newStatus);
                
                // Automatically set delivery date when marked as DELIVERED
                if (newStatus == OrderStatus.DELIVERED && order.getDeliveryDate() == null) {
                    order.setDeliveryDate(LocalDateTime.now());
                }
                
                orderRepository.save(order);
                return ResponseEntity.ok(order);
            } catch (IllegalArgumentException e) {
                return ResponseEntity.badRequest().body("Invalid Order Status");
            }
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Update Payment Status
    @PutMapping("/{id}/payment")
    public ResponseEntity<?> updatePaymentStatus(@PathVariable Long id, @RequestBody Map<String, String> payload) {
        return orderRepository.findById(id).map(order -> {
            try {
                PaymentStatus newStatus = PaymentStatus.valueOf(payload.get("status"));
                order.setPaymentStatus(newStatus);
                orderRepository.save(order);
                return ResponseEntity.ok(order);
            } catch (IllegalArgumentException e) {
                return ResponseEntity.badRequest().body("Invalid Payment Status");
            }
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }
}
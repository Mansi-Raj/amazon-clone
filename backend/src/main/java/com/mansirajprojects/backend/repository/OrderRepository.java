package com.mansirajprojects.backend.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mansirajprojects.backend.model.Order;
import com.mansirajprojects.backend.model.OrderStatus;
import com.mansirajprojects.backend.model.PaymentStatus;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    
    // For automated 7-day return window closure
    List<Order> findByOrderStatusAndDeliveryDateBefore(OrderStatus status, LocalDateTime date);

    // For Admin filtering
    List<Order> findByOrderStatus(OrderStatus status);
    List<Order> findByPaymentStatus(PaymentStatus status);
    List<Order> findByOrderStatusAndPaymentStatus(OrderStatus orderStatus, PaymentStatus paymentStatus);
    
    // For Dashboard Analysis
    List<Order> findByOrderDateBetween(LocalDateTime start, LocalDateTime end);
}
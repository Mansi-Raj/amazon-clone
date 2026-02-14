package com.mansirajprojects.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mansirajprojects.backend.model.Order;
import com.mansirajprojects.backend.model.User;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUserOrderByOrderDateDesc(User user);
}
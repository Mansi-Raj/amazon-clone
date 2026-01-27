package com.mansirajprojects.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mansirajprojects.backend.model.CartItem;
import com.mansirajprojects.backend.model.User;

@Repository
public interface CartRepository extends JpaRepository<CartItem, Long> {
    // Find all items belonging to a specific user
    List<CartItem> findByUser(User user);

    // Find a specific product in a specific user's cart
    Optional<CartItem> findByUserAndProductId(User user, String productId);

    // Delete a specific product from a specific user's cart
    void deleteByUserAndProductId(User user, String productId);
}
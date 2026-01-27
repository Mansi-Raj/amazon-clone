package com.mansirajprojects.backend.repository;

import com.mansirajprojects.backend.model.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface CartRepository extends JpaRepository<CartItem, Long> {
    // Custom query to find an item by its product ID
    Optional<CartItem> findByProductId(String productId);
    
    // Helper to delete by product ID
    void deleteByProductId(String productId);
}
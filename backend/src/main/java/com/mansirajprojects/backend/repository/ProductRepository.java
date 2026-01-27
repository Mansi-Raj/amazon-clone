package com.mansirajprojects.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mansirajprojects.backend.model.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, String> {
  
}

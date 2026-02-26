package com.mansirajprojects.backend.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mansirajprojects.backend.model.Product;
import com.mansirajprojects.backend.repository.ProductRepository;

@RestController
@RequestMapping("/api/admin/products")
@CrossOrigin
public class AdminProductController {

    @Autowired
    private ProductRepository productRepository; // Make sure this repository extends JpaRepository<Product, String>

    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        return ResponseEntity.ok(productRepository.findAll());
    }

    @PostMapping("/add")
    public ResponseEntity<?> addProduct(@RequestBody Product product) {
        // Because of @UuidGenerator, the ID will be generated automatically
        Product savedProduct = productRepository.save(product);
        return ResponseEntity.ok(savedProduct);
    }

    @PutMapping("/update/{id}") // id is now a String
    public ResponseEntity<?> updateProduct(@PathVariable String id, @RequestBody Product productDetails) {
        return productRepository.findById(id).map(product -> {
            product.setName(productDetails.getName());
            product.setDescription(productDetails.getDescription());
            product.setCategory(productDetails.getCategory());
            product.setPriceCents(productDetails.getPriceCents());
            product.setStockQuantity(productDetails.getStockQuantity());
            product.setImage(productDetails.getImage());
            product.setSizeChartLink(productDetails.getSizeChartLink());
            product.setKeywords(productDetails.getKeywords());
            product.setAttributes(productDetails.getAttributes()); // Saves dynamic sizes/specs
            
            Product updatedProduct = productRepository.save(product);
            return ResponseEntity.ok(updatedProduct);
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/delete/{id}") // id is now a String
    public ResponseEntity<?> deleteProduct(@PathVariable String id) {
        if (productRepository.existsById(id)) {
            productRepository.deleteById(id);
            return ResponseEntity.ok().body(Map.of("message", "Product deleted successfully"));
        }
        return ResponseEntity.notFound().build();
    }
}
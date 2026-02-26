package com.mansirajprojects.backend.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;
import java.util.UUID;

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
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mansirajprojects.backend.model.Product;
import com.mansirajprojects.backend.repository.ProductRepository;

@RestController
@RequestMapping("/api/admin/products")
@CrossOrigin
public class AdminProductController {

    @Autowired
    private ProductRepository productRepository; // Make sure this repository extends JpaRepository<Product, String>

    // Define where to save the uploaded images
    private static String UPLOAD_DIR = "src/main/resources/static/images/products/";

    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        return ResponseEntity.ok(productRepository.findAll());
    }

    @PostMapping("/add")
    public ResponseEntity<?> addProduct(
            @RequestPart("productData") String productDataJson, 
            @RequestPart(value = "imageFile", required = false) MultipartFile imageFile) {
        
        try {
            // 1. Convert the JSON string back to a Product object
            ObjectMapper objectMapper = new ObjectMapper();
            Product product = objectMapper.readValue(productDataJson, Product.class);

            // 2. Handle the Image File Upload
            if (imageFile != null && !imageFile.isEmpty()) {
                // Ensure directory exists
                Path uploadPath = Paths.get(UPLOAD_DIR);
                if (!Files.exists(uploadPath)) {
                    Files.createDirectories(uploadPath);
                }

                // Create a unique file name to prevent overwriting
                String originalFilename = imageFile.getOriginalFilename();
                String uniqueFilename = UUID.randomUUID().toString() + "_" + originalFilename;
                
                // Save the file to the server
                Path fileNameAndPath = Paths.get(UPLOAD_DIR, uniqueFilename);
                Files.write(fileNameAndPath, imageFile.getBytes());
                
                // Set the image path in the product object so frontend can access it
                product.setImage("images/products/" + uniqueFilename);
            }

            // 3. Save to MySQL
            Product savedProduct = productRepository.save(product);
            return ResponseEntity.ok(savedProduct);

        } catch (IOException e) {
            return ResponseEntity.internalServerError().body("Failed to upload image or save product: " + e.getMessage());
        }
    }

    @PutMapping("/update/{id}") // id is now a String
    public ResponseEntity<?> updateProduct(@PathVariable String id, @RequestBody Product productDetails) {
        return productRepository.findById(id).map(product -> {
            product.setName(productDetails.getName());
            product.setDescription(productDetails.getDescription());
            product.setCategory(productDetails.getCategory());
            product.setPriceCents(productDetails.getPriceCents());
            product.setStockQuantity(productDetails.getStockQuantity());
            
            // Note: If you want to update images later, you will need to change this endpoint to accept MultipartFile similar to addProduct
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
            // Optional: You could add logic here to delete the image file from the server when the product is deleted
            productRepository.deleteById(id);
            return ResponseEntity.ok().body(Map.of("message", "Product deleted successfully"));
        }
        return ResponseEntity.notFound().build();
    }
}
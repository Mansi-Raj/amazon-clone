package com.mansirajprojects.backend.config;


import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mansirajprojects.backend.model.Product;
import com.mansirajprojects.backend.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

@Component
public class ProductDataLoader implements CommandLineRunner {
  private final ProductRepository productRepository;
    private final ObjectMapper objectMapper;

    public ProductDataLoader(ProductRepository productRepository, ObjectMapper objectMapper) {
        this.productRepository = productRepository;
        this.objectMapper = objectMapper;
    }

    @Override
    public void run(String... args) throws Exception {
        if (productRepository.count() == 0) {
            try (InputStream inputStream = getClass().getResourceAsStream("/products.json")) {
                if (inputStream != null) {
                    List<Product> products = objectMapper.readValue(inputStream, new TypeReference<List<Product>>() {});
                    productRepository.saveAll(products);
                    System.out.println("Imported " + products.size() + " products into the database.");
                } else {
                    System.out.println("products.json not found, skipping import.");
                }
            } catch (IOException e) {
                System.err.println("Failed to import products: " + e.getMessage());
            }
        } else {
            System.out.println("Database already contains products. Skipping import.");
        }
    }
}

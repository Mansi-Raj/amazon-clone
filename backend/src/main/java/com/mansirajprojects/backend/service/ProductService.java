package com.mansirajprojects.backend.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mansirajprojects.backend.model.Product;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    private List<Product> products = new ArrayList<>();

    @PostConstruct
    public void init() {
        // Load products.json from resources folder
        ObjectMapper mapper = new ObjectMapper();
        TypeReference<List<Product>> typeReference = new TypeReference<List<Product>>(){};
        InputStream inputStream = TypeReference.class.getResourceAsStream("/products.json");
        try {
            if (inputStream != null) {
                products = mapper.readValue(inputStream, typeReference);
                System.out.println("Loaded " + products.size() + " products.");
            }
        } catch (IOException e) {
            System.err.println("Unable to load products.json: " + e.getMessage());
        }
    }

    public List<Product> getAllProducts() {
        return products;
    }

    public Optional<Product> getProductById(String id) {
        return products.stream().filter(p -> p.getId().equals(id)).findFirst();
    }
}
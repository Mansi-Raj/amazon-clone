package com.mansirajprojects.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mansirajprojects.backend.model.Product;
import com.mansirajprojects.backend.service.ProductService;

@RestController
@RequestMapping("/api/products")
public class ProductController {
    @Autowired private ProductService productService;

    @GetMapping
    public List<Product> getProducts() {
        return productService.getAllProducts();
    }
}
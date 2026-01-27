package com.mansirajprojects.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;


@Entity
@Table(name = "cart_items")
public class CartItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String productId;

    @Transient
    private Product product;
    private int quantity;
    private String deliveryOptionId;

    public CartItem() {}

    public CartItem(String productId, int quantity, String deliveryOptionId) {
        this.productId = productId;
        this.quantity = quantity;
        this.deliveryOptionId = deliveryOptionId;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getProductId() { return productId; }
    public void setProductId(String productId) { this.productId = productId; }

    public Product getProduct() { return product; }
    public void setProduct(Product product) { this.product = product; }

    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }

    public String getDeliveryOptionId() { return deliveryOptionId; }
    public void setDeliveryOptionId(String deliveryOptionId) { this.deliveryOptionId = deliveryOptionId; }
}
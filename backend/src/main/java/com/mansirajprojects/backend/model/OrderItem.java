package com.mansirajprojects.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "order_items")
public class OrderItem {
  @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "order_id")
    @JsonIgnore
    private Order order;

    private String productId;
    private String productName;
    private int priceCentsAtPurchase; // Frozen Price
    private int quantity;
    private String deliveryOptionId;

    public OrderItem() {}

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Order getOrder() { return order; }
    public void setOrder(Order order) { this.order = order; }
    public String getProductId() { return productId; }
    public void setProductId(String productId) { this.productId = productId; }
    public String getProductName() { return productName; }
    public void setProductName(String productName) { this.productName = productName; }
    public int getPriceCentsAtPurchase() { return priceCentsAtPurchase; }
    public void setPriceCentsAtPurchase(int priceCentsAtPurchase) { this.priceCentsAtPurchase = priceCentsAtPurchase; }
    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }
    public String getDeliveryOptionId() { return deliveryOptionId; }
    public void setDeliveryOptionId(String deliveryOptionId) { this.deliveryOptionId = deliveryOptionId; }
}

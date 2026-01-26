package com.mansirajprojects.backend.model;

public class CartItem {
    private Product product;
    private int quantity;
    private String deliveryOptionId; // "1", "2", or "3"

    public CartItem(Product product, int quantity, String deliveryOptionId) {
        this.product = product;
        this.quantity = quantity;
        this.deliveryOptionId = deliveryOptionId;
    }

    // Getters and Setters
    public Product getProduct() { return product; }
    public void setProduct(Product product) { this.product = product; }
    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }
    public String getDeliveryOptionId() { return deliveryOptionId; }
    public void setDeliveryOptionId(String deliveryOptionId) { this.deliveryOptionId = deliveryOptionId; }
}
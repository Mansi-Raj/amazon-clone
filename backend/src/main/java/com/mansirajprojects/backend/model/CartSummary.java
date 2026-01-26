package com.mansirajprojects.backend.model;

import java.util.List;

public class CartSummary {
    private List<CartItem> items;
    private long totalProductPriceCents;
    private long totalShippingCents;
    private long totalBeforeTaxCents;
    private long estimatedTaxCents;
    private long totalCents;
    private int cartQuantity;

    // Getters and Setters
    public List<CartItem> getItems() { return items; }
    public void setItems(List<CartItem> items) { this.items = items; }
    public long getTotalProductPriceCents() { return totalProductPriceCents; }
    public void setTotalProductPriceCents(long totalProductPriceCents) { this.totalProductPriceCents = totalProductPriceCents; }
    public long getTotalShippingCents() { return totalShippingCents; }
    public void setTotalShippingCents(long totalShippingCents) { this.totalShippingCents = totalShippingCents; }
    public long getTotalBeforeTaxCents() { return totalBeforeTaxCents; }
    public void setTotalBeforeTaxCents(long totalBeforeTaxCents) { this.totalBeforeTaxCents = totalBeforeTaxCents; }
    public long getEstimatedTaxCents() { return estimatedTaxCents; }
    public void setEstimatedTaxCents(long estimatedTaxCents) { this.estimatedTaxCents = estimatedTaxCents; }
    public long getTotalCents() { return totalCents; }
    public void setTotalCents(long totalCents) { this.totalCents = totalCents; }
    public int getCartQuantity() { return cartQuantity; }
    public void setCartQuantity(int cartQuantity) { this.cartQuantity = cartQuantity; }
}
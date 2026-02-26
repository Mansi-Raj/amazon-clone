package com.mansirajprojects.backend.model;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.hibernate.annotations.UuidGenerator;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Embeddable;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapKeyColumn;
import jakarta.persistence.Table;

@Entity
@Table(name = "products")
public class Product {

    @Id
    @UuidGenerator // Automatically generates a unique String ID (UUID)
    private String id;

    private String name;

    @Column(length = 1000) // Allows for longer text
    private String description;

    private String image; // Matches frontend 'product.image'

    private String category; // e.g., "Electronics", "Clothing"

    private Integer priceCents;

    private Integer stockQuantity;

    private String sizeChartLink; // Specific to clothing

    // --- Embedded Rating (from Snippet 1) ---
    @Embedded
    private Rating rating;

    // --- Keywords List (from Snippet 1) ---
    @ElementCollection
    @CollectionTable(name = "product_keywords", joinColumns = @JoinColumn(name = "product_id"))
    @Column(name = "keyword")
    private List<String> keywords = new ArrayList<>();

    // --- Dynamic Attributes (from Snippet 2) ---
    // Stores variable data like "Size: M", "Processor: Intel", "Material: Ceramic"
    @ElementCollection
    @CollectionTable(name = "product_attributes", joinColumns = @JoinColumn(name = "product_id"))
    @MapKeyColumn(name = "attribute_name")
    @Column(name = "attribute_value")
    private Map<String, String> attributes = new HashMap<>();

    // --- Constructors ---

    public Product() {
        // Initialize rating to avoid null pointers in frontend
        this.rating = new Rating(0.0, 0); 
    }

    // --- Getters and Setters ---

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public Integer getPriceCents() { return priceCents; }
    public void setPriceCents(Integer priceCents) { this.priceCents = priceCents; }

    public Integer getStockQuantity() { return stockQuantity; }
    public void setStockQuantity(Integer stockQuantity) { this.stockQuantity = stockQuantity; }

    public String getSizeChartLink() { return sizeChartLink; }
    public void setSizeChartLink(String sizeChartLink) { this.sizeChartLink = sizeChartLink; }

    public Rating getRating() { return rating; }
    public void setRating(Rating rating) { this.rating = rating; }

    public List<String> getKeywords() { return keywords; }
    public void setKeywords(List<String> keywords) { this.keywords = keywords; }

    public Map<String, String> getAttributes() { return attributes; }
    public void setAttributes(Map<String, String> attributes) { this.attributes = attributes; }

    // --- Inner Static Class for Rating ---
    @Embeddable
    public static class Rating {
        private Double stars;
        private Integer count;

        public Rating() {}

        public Rating(Double stars, Integer count) {
            this.stars = stars;
            this.count = count;
        }

        public Double getStars() { return stars; }
        public void setStars(Double stars) { this.stars = stars; }

        public Integer getCount() { return count; }
        public void setCount(Integer count) { this.count = count; }
    }
}
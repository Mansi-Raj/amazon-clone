package com.mansirajprojects.backend.model;

import java.util.List;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Embeddable;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Table;

@Entity
@Table(name = "products")
public class Product {

    @Id
    private String id;

    private String image;
    private String name;

    @Embedded
    private Rating rating;

    private Integer priceCents;

    @ElementCollection
    @CollectionTable(name = "product_keywords", joinColumns = @JoinColumn(name = "product_id"))
    @Column(name = "keyword")
    private List<String> keywords;

    private String type;
    private String sizeChartLink;

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public Rating getRating() { return rating; }
    public void setRating(Rating rating) { this.rating = rating; }
    public Integer getPriceCents() { return priceCents; }
    public void setPriceCents(Integer priceCents) { this.priceCents = priceCents; }
    public List<String> getKeywords() { return keywords; }
    public void setKeywords(List<String> keywords) { this.keywords = keywords; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    public String getSizeChartLink() { return sizeChartLink; }
    public void setSizeChartLink(String sizeChartLink) { this.sizeChartLink = sizeChartLink; }

    @Embeddable
    public static class Rating {
        private Double stars;
        private Integer count;
        
        public Double getStars() { return stars; }
        public void setStars(Double stars) { this.stars = stars; }
        public Integer getCount() { return count; }
        public void setCount(Integer count) { this.count = count; }
    }
}
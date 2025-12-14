package com.sweetshop.sweetshop.entity;


import jakarta.persistence.*;

// Represents a sweet item in the sweet shop
// this entity is mapped to the sweets table in the databases
@Entity
@Table(name = "sweets")
public class Sweet {
    //Primary key for the sweets table
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Name of the sweet(cannot be null

    @Column(nullable = false)
    private String name;

    //Category of the sweet (milk,dry fruit, sugar-free
    private String category;

    // price of the sweet
    private double price;

    // Avaialable quantity in stock
    private int quantity;

    // Default constructor
    public Sweet() {
    }

    // Parameterized constructor
    public Sweet(Long id, String name, String category, double price, int quantity) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.price = price;
        this.quantity = quantity;
    }

    // Getters & Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}


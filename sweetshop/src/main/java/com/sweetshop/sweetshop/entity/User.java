package com.sweetshop.sweetshop.entity;


import jakarta.persistence.*;

//Represets an application user
// this wntity is mappe dto the users table in the database
@Entity
@Table(name = "users")
public class User {

        // primary key for users table
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //Unique username used for login
    @Column(unique = true, nullable = false)
    private String username;

        // Encrypted password

    @Column(nullable = false)
    private String password;

    // Role of the user
    @Column(nullable = false)
    private String role; // USER or ADMIN

    // Default constructor (REQUIRED by JPA)
    public User() {
    }

    // Parameterized constructor
    public User(Long id, String username, String password, String role) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.role = role;
    }

    // Getters & Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}


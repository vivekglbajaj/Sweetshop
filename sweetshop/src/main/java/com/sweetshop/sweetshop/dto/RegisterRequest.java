package com.sweetshop.sweetshop.dto;

/*
this DTO is used to reveive user registration data
from the frontend during signup
 */
public class RegisterRequest {

    //Username chosen by the user
    private String username;

    // password chosen by the user
    private String password;

    // Role assigned to the user(User or ADMIN)
    private String role;

        // return user and sets the username value
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    // return pass and sets the password value
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    // return the role and set the role
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
}

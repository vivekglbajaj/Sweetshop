package com.sweetshop.sweetshop.dto;

// this DTO is used to recieve login data from the client
// it contains username and password enterd on the login form
public class LoginRequest {

    // Username rpovided bt the user
    private String username;

    //password provided by the user
    private String password;

    // return the username

    public String getUsername() {
        return username;
    }

    //sets the username value

    public void setUsername(String username) {
        this.username = username;
    }

    //Return the password

    public String getPassword() {
        return password;
    }

    //Set the password value
    public void setPassword(String password) {
        this.password = password;
    }
}

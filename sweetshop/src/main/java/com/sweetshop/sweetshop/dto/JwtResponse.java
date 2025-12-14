package com.sweetshop.sweetshop.dto;

//this class is used to send JWT token back to the client
// after successful login

public class JwtResponse {


    // Holds the generated JWT token
    private String token;

    //constructor to initialize tokenvalue
    public JwtResponse(String token) {
        this.token = token;
    }

    // return the token to the contrller
    public String getToken() {
        return token;
    }
}

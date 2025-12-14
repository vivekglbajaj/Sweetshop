package com.sweetshop.sweetshop.controller;

import com.sweetshop.sweetshop.dto.JwtResponse;
import com.sweetshop.sweetshop.dto.LoginRequest;
import com.sweetshop.sweetshop.dto.RegisterRequest;
import com.sweetshop.sweetshop.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

// Allow requests from react frontend (vite runs on 5173)
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    // inject AuthService to handle actual auth logic
    public AuthController(AuthService authService) {
        this.authService = authService;
    }
 /*
 create a new user account
 throws errorif username already exists
  */
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest request) {
        authService.register(
                request.getUsername(),
                request.getPassword(),
                request.getRole() // USEr and ADMIN
        );
        return ResponseEntity.ok("User registered successfully");
    }

        /*
        varifies username & password
        Returns JWT token if credentails are valid
         */
    @PostMapping("/login")
    public ResponseEntity<JwtResponse> login(@RequestBody LoginRequest request) {
        String token = authService.login(
                request.getUsername(),
                request.getPassword()
        );

        // send token back to frontend
        return ResponseEntity.ok(new JwtResponse(token));
    }
}

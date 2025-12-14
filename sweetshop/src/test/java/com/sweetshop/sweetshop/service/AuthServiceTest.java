package com.sweetshop.sweetshop.service;

import com.sweetshop.sweetshop.dto.LoginRequest;
import com.sweetshop.sweetshop.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class AuthServiceTest {

    @Autowired
    private AuthService authService;

    @Autowired
    private UserRepository userRepository;

    @BeforeEach
    void cleanDatabase() {
        userRepository.deleteAll();
    }

    @Test
    void shouldRegisterNewUser() {
        authService.register("testuser1", "password123", "USER");

        var user = userRepository.findByUsername("testuser1").orElse(null);

        assertNotNull(user);
        assertEquals("testuser1", user.getUsername());
        assertEquals("USER", user.getRole());
    }

    @Test
    void shouldLoginSuccessfullyWithCorrectCredentials() {
        authService.register("loginuser", "secret", "USER");

        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setUsername("loginuser");
        loginRequest.setPassword("secret");

        String token = authService.login(
                loginRequest.getUsername(),
                loginRequest.getPassword()
        );

        assertNotNull(token);
    }

    @Test
    void shouldFailLoginWithWrongPassword() {
        authService.register("wrongpassuser", "correctpass", "USER");

        Exception exception = assertThrows(RuntimeException.class, () -> {
            authService.login("wrongpassuser", "wrongpass");
        });

        assertNotNull(exception.getMessage());
    }
}

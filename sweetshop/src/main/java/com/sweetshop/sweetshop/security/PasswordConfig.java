package com.sweetshop.sweetshop.security;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

//configuration classss for password encoding
// used to secrely store and verify user passwrod
@Configuration
public class PasswordConfig {

    // Defins passwrdendcoder bean for the applcation
    // Bcrypt is use for hashing passwrod securly
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}



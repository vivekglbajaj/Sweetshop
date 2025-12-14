package com.sweetshop.sweetshop.security;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;
// this configuration class handless CORD settings
// it allows the frontend applifation to access backend APIs
@Configuration
public class CorsConfig {

    //Defines global CORS configuration for the application
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        //create a new CORS configuration object
        CorsConfiguration config = new CorsConfiguration();

        // ALlow reuqests from frontend running on the URL

        config.setAllowedOrigins(List.of("http://localhost:5173"));

        // Allow common HTTP methods used by the application
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));

        // Allow all headers in requests
        config.setAllowedHeaders(List.of("*"));

        // Allow cookies and authorization headers
        config.setAllowCredentials(true);


        // Apply this cors configuration to all endpoints
        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        return source;
    }
}


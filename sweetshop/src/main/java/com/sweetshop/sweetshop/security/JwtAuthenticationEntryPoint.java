package com.sweetshop.sweetshop.security;


import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;

// This class handles unauthorized access attempts
//it is triggered whena user tries to access a protected API without authentication

@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {

    //Sends 401 unauthrized response when authenticatin fails
    @Override
    public void commence(HttpServletRequest request,
                         HttpServletResponse response,
                         AuthenticationException authException)
            throws IOException, ServletException {

        response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized");
    }
}

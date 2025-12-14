package com.sweetshop.sweetshop.security;

import com.sweetshop.sweetshop.repository.UserRepository;
import com.sweetshop.sweetshop.util.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

//this filtere runs for every incomin request
// it checks the jwt token adn sets authenticatin the seceruity context
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;

    // Inject Jwtutil and userrepostory
    public JwtAuthenticationFilter(JwtUtil jwtUtil,
                                   UserRepository userRepository) {
        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;
    }

    // Main filter logic excuted for each request
    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");
        String token = null;
        String username = null;

            // check if header ezists and start with Bearrrer
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            token = authHeader.substring(7);
            try {
                //Extract username from token
                username = jwtUtil.extractUsername(token);
            } catch (Exception e) {
                // if token is invalid return 401
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                return;
            }
        }
    // Proceed onl if username is found and user is not already authenticated
        if (username != null &&
                SecurityContextHolder.getContext().getAuthentication() == null) {
            //Fetch user from database
            var user = userRepository.findByUsername(username).orElse(null);

            if (user != null) {

                // 🔥 ROLE NORMALIZATION (MOST IMPORTANT FIX)
                String role = user.getRole().startsWith("ROLE_")
                        ? user.getRole()
                        : "ROLE_" + user.getRole().toUpperCase();

                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(
                                user.getUsername(),
                                null,
                                List.of(new SimpleGrantedAuthority(role))
                        );

                authentication.setDetails(
                        new WebAuthenticationDetailsSource().buildDetails(request)
                );

                SecurityContextHolder.getContext().setAuthentication(authentication);

            }
        }
    // continue filter chain
        filterChain.doFilter(request, response);
    }
}

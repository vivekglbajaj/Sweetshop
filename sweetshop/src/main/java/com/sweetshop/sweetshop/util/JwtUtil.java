package com.sweetshop.sweetshop.util;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

// utility class for generating and validating jwt token
// this is used during login and for securing api requests
@Component
public class JwtUtil {
    // secret key used for signing jwt token
    // length must be at leat
    // MUST be 32+ characters
    private static final String SECRET_KEY =
            "sweetshop-secret-key-sweetshop-secret-key-123456";

    //Token validity duration
    private static final long EXPIRATION_TIME = 86400000;

    //generation siging key form secret
    private final Key key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes());

    // creates jwt token using username
    public String generateToken(String username, String role) {
        return Jwts.builder()
                // set username as subject of the token
                .setSubject(username)

                // token cretion time
                .setIssuedAt(new Date())

                //token expiration time
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))

                //sign token using hmac sha256 algorithm
                .signWith(key, SignatureAlgorithm.HS256)

                // build final token stirng
                .compact();
    }

    // Extract username form the jwt token
    public String extractUsername(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }
}
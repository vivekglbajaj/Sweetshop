package com.sweetshop.sweetshop.service;


import com.sweetshop.sweetshop.entity.User;
import com.sweetshop.sweetshop.repository.UserRepository;
import com.sweetshop.sweetshop.util.JwtUtil;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

// this service handles authentication related logic
// such as user regitration land login
@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    // contructor injection of required dependencies
    public AuthService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       AuthenticationManager authenticationManager,
                       JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
    }

    //Register a new user in the system
    public void register(String username, String password, String role) {

        //check if user already exists
        if (userRepository.findByUsername(username).isPresent()) {
            throw new RuntimeException("User already exists");
        }

        User user = new User();
        user.setUsername(username);

        // encrypt password before saving
        user.setPassword(passwordEncoder.encode(password));
        //

        //Assign role (defoult is role user
        user.setRole(role == null ? "ROLE_USER" : role);

        //save user to databses
        userRepository.save(user);
    }


    //Authentication user and gerates jwt token
    public String login(String username, String password) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(username, password)
        );

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
    // Generate jwt token using username and role
        return jwtUtil.generateToken(user.getUsername(), user.getRole());
    }
}


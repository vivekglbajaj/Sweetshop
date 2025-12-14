package com.sweetshop.sweetshop.service;

import com.sweetshop.sweetshop.entity.User;
import com.sweetshop.sweetshop.repository.UserRepository;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

// this service is used by spring security to laod user details
// during authentication based on username
@Service
public class CustomUserDetailsService implements UserDetailsService {

        private final UserRepository userRepository;

        // inject userreposotory
    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    // load user information from database using username
    @Override
    public UserDetails loadUserByUsername(String username)
            throws UsernameNotFoundException {


        // Fetch user from fatabase
        User user = userRepository.findByUsername(username)
                .orElseThrow(() ->
                        new UsernameNotFoundException("User not found"));


        //Return spring security user object with role
        return new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPassword(),
                List.of(new SimpleGrantedAuthority(user.getRole()))
        );
    }
}


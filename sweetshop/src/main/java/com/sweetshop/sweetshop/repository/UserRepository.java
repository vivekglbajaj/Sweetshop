package com.sweetshop.sweetshop.repository;


import com.sweetshop.sweetshop.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
//Repository interface for user entity
// Used to interact with the users tbale in the database

public interface UserRepository extends JpaRepository<User, Long> {

    //Finds a user by username
    // Used during login and registration checks
    Optional<User> findByUsername(String username);
}

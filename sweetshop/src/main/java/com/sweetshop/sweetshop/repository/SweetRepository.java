package com.sweetshop.sweetshop.repository;


import com.sweetshop.sweetshop.entity.Sweet;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

// Repository interface for sweet entity
// Handles all database oerations related to sweets
public interface SweetRepository extends JpaRepository<Sweet, Long> {

    // finds sweets whose name contains the given text(case-insensitive
    //useful for seaerch fuctionality
    List<Sweet> findByNameContainingIgnoreCase(String name);
}


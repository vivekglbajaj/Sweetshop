package com.sweetshop.sweetshop.controller;

import com.sweetshop.sweetshop.entity.Sweet;
import com.sweetshop.sweetshop.service.SweetService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// Allow raect frontend to call these APIs
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/sweets")
public class SweetController {

    private final SweetService sweetService;

    // Injetc sweetService to handle business logic
    public SweetController(SweetService sweetService) {
        this.sweetService = sweetService;
    }

    // Return the list of all available sweets

    @GetMapping
    public List<Sweet> getAll() {
        return sweetService.getAllSweets();
    }

    // Used by admin to add a new sweet to the shop

    @PostMapping
    public Sweet add(@RequestBody Sweet sweet) {
        return sweetService.addSweet(sweet);
    }

    // Removes a sweet by id (admin only)
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        sweetService.deleteSweet(id);
    }

    // reduce quantity by 1 when user purchases a sweet
    // Throws error if stock is already zero
    @PostMapping("/{id}/purchase")
    public Sweet purchase(@PathVariable Long id) {
        return sweetService.purchaseSweet(id);
    }
}

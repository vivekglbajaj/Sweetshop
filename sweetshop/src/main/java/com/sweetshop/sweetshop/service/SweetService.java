package com.sweetshop.sweetshop.service;

import com.sweetshop.sweetshop.entity.Sweet;
import com.sweetshop.sweetshop.repository.SweetRepository;
import org.springframework.stereotype.Service;

import java.util.List;

// This service contains all business logic related to sweets
// it acts as a bridge between controller and repostory
@Service
public class SweetService {

    private final SweetRepository sweetRepository;

    // inject sweetrepository
    public SweetService(SweetRepository sweetRepository) {
        this.sweetRepository = sweetRepository;
    }

    // add new a sweet to the database

    public Sweet addSweet(Sweet sweet) {
        return sweetRepository.save(sweet);
    }

        // Return all sweets available in the shop
    public List<Sweet> getAllSweets() {
        return sweetRepository.findAll();
    }

    // updates details of an existing swet
    public Sweet updateSweet(Long id, Sweet updated) {
        Sweet sweet = sweetRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Sweet not found"));


        //update sweet detaiils
        sweet.setName(updated.getName());
        sweet.setCategory(updated.getCategory());
        sweet.setPrice(updated.getPrice());
        sweet.setQuantity(updated.getQuantity());

        return sweetRepository.save(sweet);
    }

    public void deleteSweet(Long id) {
        sweetRepository.deleteById(id);
    }

    public Sweet purchaseSweet(Long id) {
        Sweet sweet = sweetRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Sweet not found"));

        // chceck stock abailability
        if (sweet.getQuantity() <= 0) {
            throw new RuntimeException("Out of stock");
        }

        // Reduce quantity after puchase
        sweet.setQuantity(sweet.getQuantity() - 1);
        return sweetRepository.save(sweet);
    }

    // add stock to an existing sweet
    public Sweet restockSweet(Long id, int quantity) {

        // find sweet by id
        Sweet sweet = sweetRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Sweet not found"));

        // increse available quantity
        sweet.setQuantity(sweet.getQuantity() + quantity);
        return sweetRepository.save(sweet);
    }
}

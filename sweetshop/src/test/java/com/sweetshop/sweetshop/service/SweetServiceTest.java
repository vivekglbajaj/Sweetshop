package com.sweetshop.sweetshop.service;

import com.sweetshop.sweetshop.entity.Sweet;
import com.sweetshop.sweetshop.repository.SweetRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class SweetServiceTest {

    @Autowired
    private SweetService sweetService;
    @Autowired
    private SweetRepository sweetRepository;


    // 🔴 RED → should fail if addSweet not implemented correctly
    @Test
    void shouldAddNewSweet() {
        Sweet sweet = new Sweet();
        sweet.setName("Rasgulla");
        sweet.setCategory("Milk");
        sweet.setPrice(10);
        sweet.setQuantity(20);

        Sweet savedSweet = sweetService.addSweet(sweet);

        assertNotNull(savedSweet.getId(), "Sweet ID should not be null after saving");
        assertEquals("Rasgulla", savedSweet.getName());
        assertEquals(20, savedSweet.getQuantity());
    }

    // 🔴 RED → should fail if purchase logic is wrong
    @Test
    void shouldReduceQuantityWhenPurchased() {
        // Arrange
        Sweet sweet = new Sweet();
        sweet.setName("Barfi");
        sweet.setCategory("Milk");
        sweet.setPrice(15);
        sweet.setQuantity(5);

        Sweet savedSweet = sweetService.addSweet(sweet);

        // Act
        sweetService.purchaseSweet(savedSweet.getId());

        Sweet updatedSweet = sweetRepository.findById(savedSweet.getId()).orElseThrow();


        // Assert
        assertEquals(4, updatedSweet.getQuantity(),
                "Quantity should reduce by 1 after purchase");
    }
}

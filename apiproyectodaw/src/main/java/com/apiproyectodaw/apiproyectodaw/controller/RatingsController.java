package com.apiproyectodaw.apiproyectodaw.controller;

import com.apiproyectodaw.apiproyectodaw.model.Ratings;
import com.apiproyectodaw.apiproyectodaw.service.RatingsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/ratings")
@CrossOrigin(origins = "http://localhost:4200") // Permitir peticiones desde cualquier origen
public class RatingsController {

    @Autowired
    private RatingsService ratingsService;

    @GetMapping
    public List<Ratings> getAllRatings() {
        return ratingsService.getAllRatings();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Ratings> getRatingById(@PathVariable Long id) {
        Optional<Ratings> rating = ratingsService.getRatingById(id);
        return rating.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Ratings> createRating(@RequestBody Ratings rating) {
        Ratings newRating = ratingsService.saveRating(rating);
        return ResponseEntity.ok(newRating);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Ratings> updateRating(@PathVariable Long id, @RequestBody Ratings rating) {
        try {
            Ratings updatedRating = ratingsService.updateRating(id, rating);
            return ResponseEntity.ok(updatedRating);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRating(@PathVariable Long id) {
        ratingsService.deleteRating(id);
        return ResponseEntity.noContent().build();
    }
}

package com.apiproyectodaw.apiproyectodaw.service;

import com.apiproyectodaw.apiproyectodaw.model.Ratings;
import com.apiproyectodaw.apiproyectodaw.repository.RatingsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class RatingsService {

    @Autowired
    private RatingsRepository ratingsRepository;

    public List<Ratings> getAllRatings() {
        return ratingsRepository.findAll();
    }

    public Optional<Ratings> getRatingById(Long id) {
        return ratingsRepository.findById(id);
    }

    public Ratings saveRating(Ratings rating) {
        return ratingsRepository.save(rating);
    }

    public Ratings updateRating(Long id, Ratings updatedRating) {
        return ratingsRepository.findById(id).map(rating -> {
            rating.setPuntuacion(updatedRating.getPuntuacion());
            return ratingsRepository.save(rating);
        }).orElseThrow(() -> new RuntimeException("Puntuacion no encontrada"));
    }

    public void deleteRating(Long id) {
        ratingsRepository.deleteById(id);
    }
}

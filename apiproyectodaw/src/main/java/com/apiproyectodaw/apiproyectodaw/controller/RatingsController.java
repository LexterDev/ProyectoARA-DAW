package com.apiproyectodaw.apiproyectodaw.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.apiproyectodaw.apiproyectodaw.dto.CreateRatingsDTO;
import com.apiproyectodaw.apiproyectodaw.dto.RatingStatsDTO;
import com.apiproyectodaw.apiproyectodaw.dto.RatingsDTO;
import com.apiproyectodaw.apiproyectodaw.dto.UpdateRatingsDTO;
import com.apiproyectodaw.apiproyectodaw.service.RatingsService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/ratings")
@CrossOrigin(origins = "*")
@Validated
public class RatingsController {

    @Autowired
    private RatingsService ratingsService;

    // Crear o actualizar calificación
    @PostMapping
    public ResponseEntity<RatingsDTO> createOrUpdateRating(@Valid @RequestBody CreateRatingsDTO createDto) {
        RatingsDTO rating = ratingsService.createOrUpdateRating(createDto);
        return new ResponseEntity<>(rating, HttpStatus.CREATED);
    }

    // Obtener todas las calificaciones
    @GetMapping
    public ResponseEntity<List<RatingsDTO>> getAllRatings() {
        List<RatingsDTO> ratings = ratingsService.getAllRatings();
        return ResponseEntity.ok(ratings);
    }

    // Obtener calificación por ID
    @GetMapping("/{id}")
    public ResponseEntity<RatingsDTO> getRatingById(@PathVariable Long id) {
        RatingsDTO rating = ratingsService.getRatingById(id);
        return ResponseEntity.ok(rating);
    }

    // Obtener calificaciones por usuario
    @GetMapping("/user/{usuarioId}")
    public ResponseEntity<List<RatingsDTO>> getRatingsByUserId(@PathVariable Long usuarioId) {
        List<RatingsDTO> ratings = ratingsService.getRatingsByUserId(usuarioId);
        return ResponseEntity.ok(ratings);
    }

    // Obtener calificaciones por recurso
    @GetMapping("/resource/{recursoId}")
    public ResponseEntity<List<RatingsDTO>> getRatingsByResourceId(@PathVariable Long recursoId) {
        List<RatingsDTO> ratings = ratingsService.getRatingsByResourceId(recursoId);
        return ResponseEntity.ok(ratings);
    }

    // Obtener calificación específica de usuario para recurso
    @GetMapping("/user/{usuarioId}/resource/{recursoId}")
    public ResponseEntity<RatingsDTO> getUserRatingForResource(
            @PathVariable Long usuarioId, 
            @PathVariable Long recursoId) {
        RatingsDTO rating = ratingsService.getUserRatingForResource(usuarioId, recursoId);
        return ResponseEntity.ok(rating);
    }

    // Actualizar calificación
    @PutMapping("/{id}")
    public ResponseEntity<RatingsDTO> updateRating(
            @PathVariable Long id, 
            @Valid @RequestBody UpdateRatingsDTO updateDto) {
        RatingsDTO updatedRating = ratingsService.updateRating(id, updateDto);
        return ResponseEntity.ok(updatedRating);
    }

    // Eliminar calificación por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRating(@PathVariable Long id) {
        ratingsService.deleteRating(id);
        return ResponseEntity.noContent().build();
    }

    // Eliminar calificación por usuario y recurso
    @DeleteMapping("/user/{usuarioId}/resource/{recursoId}")
    public ResponseEntity<Void> deleteRatingByUserAndResource(
            @PathVariable Long usuarioId, 
            @PathVariable Long recursoId) {
        ratingsService.deleteRatingByUserAndResource(usuarioId, recursoId);
        return ResponseEntity.noContent().build();
    }

    // Obtener promedio de calificación por recurso
    @GetMapping("/average/resource/{recursoId}")
    public ResponseEntity<Double> getAverageRatingByResource(@PathVariable Long recursoId) {
        Double average = ratingsService.getAverageRatingByResource(recursoId);
        return ResponseEntity.ok(average);
    }

    // Obtener estadísticas completas de calificación por recurso
    @GetMapping("/stats/resource/{recursoId}")
    public ResponseEntity<RatingStatsDTO> getRatingStats(@PathVariable Long recursoId) {
        RatingStatsDTO stats = ratingsService.getRatingStats(recursoId);
        return ResponseEntity.ok(stats);
    }

    // Buscar calificaciones por puntuación mínima
    @GetMapping("/min-score")
    public ResponseEntity<List<RatingsDTO>> getRatingsByMinScore(@RequestParam int puntuacion) {
        List<RatingsDTO> ratings = ratingsService.getRatingsByMinScore(puntuacion);
        return ResponseEntity.ok(ratings);
    }

    // Verificar si usuario ya calificó recurso
    @GetMapping("/exists/user/{usuarioId}/resource/{recursoId}")
    public ResponseEntity<Boolean> hasUserRatedResource(
            @PathVariable Long usuarioId, 
            @PathVariable Long recursoId) {
        boolean hasRated = ratingsService.hasUserRatedResource(usuarioId, recursoId);
        return ResponseEntity.ok(hasRated);
    }
}

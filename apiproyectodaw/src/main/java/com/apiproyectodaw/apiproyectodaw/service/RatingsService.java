package com.apiproyectodaw.apiproyectodaw.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.apiproyectodaw.apiproyectodaw.dto.CreateRatingsDTO;
import com.apiproyectodaw.apiproyectodaw.dto.RatingStatsDTO;
import com.apiproyectodaw.apiproyectodaw.dto.RatingsDTO;
import com.apiproyectodaw.apiproyectodaw.dto.UpdateRatingsDTO;
import com.apiproyectodaw.apiproyectodaw.exception.ResourceNotFoundException;
import com.apiproyectodaw.apiproyectodaw.model.Ratings;
import com.apiproyectodaw.apiproyectodaw.model.Resource;
import com.apiproyectodaw.apiproyectodaw.model.User;
import com.apiproyectodaw.apiproyectodaw.repository.RatingsRepository;
import com.apiproyectodaw.apiproyectodaw.repository.ResourceRepository;
import com.apiproyectodaw.apiproyectodaw.repository.UserRepository;

@Service
@Transactional
public class RatingsService {

    @Autowired
    private RatingsRepository ratingsRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private ResourceRepository resourceRepository;

    // Crear o actualizar calificación
    public RatingsDTO createOrUpdateRating(CreateRatingsDTO createDto) {
        User usuario = userRepository.findById(createDto.getUsuarioId())
            .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado con ID: " + createDto.getUsuarioId()));
        
        Resource recurso = resourceRepository.findById(createDto.getRecursoId())
            .orElseThrow(() -> new ResourceNotFoundException("Recurso no encontrado con ID: " + createDto.getRecursoId()));
        
        // Verificar si ya existe una calificación del usuario para este recurso
        Optional<Ratings> existingRating = ratingsRepository.findByUsuarioIdAndRecursoId(
            createDto.getUsuarioId(), createDto.getRecursoId());
        
        Ratings rating;
        if (existingRating.isPresent()) {
            // Actualizar calificación existente
            rating = existingRating.get();
            rating.setPuntuacion(createDto.getPuntuacion());
        } else {
            // Crear nueva calificación
            rating = Ratings.builder()
                .usuario(usuario)
                .recurso(recurso)
                .puntuacion(createDto.getPuntuacion())
                .build();
        }
        
        Ratings savedRating = ratingsRepository.save(rating);
        return convertToDTO(savedRating);
    }

    // Obtener todas las calificaciones
    @Transactional(readOnly = true)
    public List<RatingsDTO> getAllRatings() {
        return ratingsRepository.findAll()
            .stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }

    // Obtener calificación por ID
    @Transactional(readOnly = true)
    public RatingsDTO getRatingById(Long id) {
        Ratings rating = ratingsRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Calificación no encontrada con ID: " + id));
        return convertToDTO(rating);
    }

    // Obtener calificaciones por usuario
    @Transactional(readOnly = true)
    public List<RatingsDTO> getRatingsByUserId(Long usuarioId) {
        return ratingsRepository.findByUsuarioId(usuarioId)
            .stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }

    // Obtener calificaciones por recurso
    @Transactional(readOnly = true)
    public List<RatingsDTO> getRatingsByResourceId(Long recursoId) {
        return ratingsRepository.findByRecursoIdOrderByPuntuacionDesc(recursoId)
            .stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }

    // Obtener calificación específica de usuario para recurso
    @Transactional(readOnly = true)
    public RatingsDTO getUserRatingForResource(Long usuarioId, Long recursoId) {
        Ratings rating = ratingsRepository.findByUsuarioIdAndRecursoId(usuarioId, recursoId)
            .orElseThrow(() -> new ResourceNotFoundException(
                "No se encontró calificación del usuario " + usuarioId + " para el recurso " + recursoId));
        return convertToDTO(rating);
    }

    // Actualizar calificación
    public RatingsDTO updateRating(Long id, UpdateRatingsDTO updateDto) {
        Ratings rating = ratingsRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Calificación no encontrada con ID: " + id));
        
        rating.setPuntuacion(updateDto.getPuntuacion());
        Ratings updatedRating = ratingsRepository.save(rating);
        return convertToDTO(updatedRating);
    }

    // Eliminar calificación
    public void deleteRating(Long id) {
        Ratings rating = ratingsRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Calificación no encontrada con ID: " + id));
        ratingsRepository.delete(rating);
    }

    // Eliminar calificación por usuario y recurso
    public void deleteRatingByUserAndResource(Long usuarioId, Long recursoId) {
        Ratings rating = ratingsRepository.findByUsuarioIdAndRecursoId(usuarioId, recursoId)
            .orElseThrow(() -> new ResourceNotFoundException(
                "No se encontró calificación del usuario " + usuarioId + " para el recurso " + recursoId));
        ratingsRepository.delete(rating);
    }

    // Obtener promedio de calificación por recurso
    @Transactional(readOnly = true)
    public Double getAverageRatingByResource(Long recursoId) {
        Double average = ratingsRepository.getAverageRatingByRecursoId(recursoId);
        return average != null ? Math.round(average * 100.0) / 100.0 : 0.0;
    }

    // Obtener estadísticas completas de calificación por recurso
    @Transactional(readOnly = true)
    public RatingStatsDTO getRatingStats(Long recursoId) {
        Resource recurso = resourceRepository.findById(recursoId)
            .orElseThrow(() -> new ResourceNotFoundException("Recurso no encontrado con ID: " + recursoId));
        
        Double promedio = ratingsRepository.getAverageRatingByRecursoId(recursoId);
        Long total = ratingsRepository.countByRecursoId(recursoId);
        
        // Obtener distribución de estrellas
        List<Object[]> stats = ratingsRepository.getRatingStatsbyRecursoId(recursoId);
        
        RatingStatsDTO.RatingStatsDTOBuilder builder = RatingStatsDTO.builder()
            .recursoId(recursoId)
            .tituloRecurso(recurso.getTitulo()) // Asumiendo que Resource tiene campo titulo
            .promedioCalificacion(promedio != null ? Math.round(promedio * 100.0) / 100.0 : 0.0)
            .totalCalificaciones(total)
            .estrellas5(0)
            .estrellas4(0)
            .estrellas3(0)
            .estrellas2(0)
            .estrellas1(0);
        
        // Procesar estadísticas por estrellas
        for (Object[] stat : stats) {
            Integer puntuacion = (Integer) stat[0];
            Long count = (Long) stat[1];
            
            switch (puntuacion) {
                case 5: builder.estrellas5(count.intValue()); break;
                case 4: builder.estrellas4(count.intValue()); break;
                case 3: builder.estrellas3(count.intValue()); break;
                case 2: builder.estrellas2(count.intValue()); break;
                case 1: builder.estrellas1(count.intValue()); break;
            }
        }
        
        return builder.build();
    }

    // Buscar calificaciones por puntuación mínima
    @Transactional(readOnly = true)
    public List<RatingsDTO> getRatingsByMinScore(int minPuntuacion) {
        return ratingsRepository.findByPuntuacionGreaterThanEqual(minPuntuacion)
            .stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }

    // Verificar si usuario ya calificó recurso
    @Transactional(readOnly = true)
    public boolean hasUserRatedResource(Long usuarioId, Long recursoId) {
        return ratingsRepository.existsByUsuarioIdAndRecursoId(usuarioId, recursoId);
    }

    // Método auxiliar para convertir entidad a DTO
    private RatingsDTO convertToDTO(Ratings rating) {
        return RatingsDTO.builder()
            .id(rating.getId())
            .usuarioId(rating.getUsuario().getId())
            .recursoId(rating.getRecurso().getId())
            .puntuacion(rating.getPuntuacion())
            .nombreUsuario(rating.getUsuario().getNombre()) // Asumiendo que User tiene campo nombre
            .tituloRecurso(rating.getRecurso().getTitulo()) // Asumiendo que Resource tiene campo titulo
            .build();
    }
}
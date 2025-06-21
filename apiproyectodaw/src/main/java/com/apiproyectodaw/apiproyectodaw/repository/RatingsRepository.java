package com.apiproyectodaw.apiproyectodaw.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.apiproyectodaw.apiproyectodaw.model.Ratings;

@Repository
public interface RatingsRepository extends JpaRepository<Ratings, Long> {
    
    // Buscar calificaciones por usuario
    List<Ratings> findByUsuarioId(Long usuarioId);
    
    // Buscar calificaciones por recurso
    List<Ratings> findByRecursoId(Long recursoId);
    
    // Buscar calificación específica de un usuario para un recurso
    Optional<Ratings> findByUsuarioIdAndRecursoId(Long usuarioId, Long recursoId);
    
    // Verificar si un usuario ya calificó un recurso
    boolean existsByUsuarioIdAndRecursoId(Long usuarioId, Long recursoId);
    
    // Buscar calificaciones por puntuación
    List<Ratings> findByPuntuacion(int puntuacion);
    
    // Buscar calificaciones por puntuación mayor o igual
    List<Ratings> findByPuntuacionGreaterThanEqual(int puntuacion);
    
    // Obtener promedio de puntuación por recurso
    @Query("SELECT AVG(r.puntuacion) FROM Ratings r WHERE r.recurso.id = :recursoId")
    Double getAverageRatingByRecursoId(@Param("recursoId") Long recursoId);
    
    // Contar calificaciones por recurso
    @Query("SELECT COUNT(r) FROM Ratings r WHERE r.recurso.id = :recursoId")
    Long countByRecursoId(@Param("recursoId") Long recursoId);
    
    // Obtener calificaciones de un recurso ordenadas por puntuación descendente
    @Query("SELECT r FROM Ratings r WHERE r.recurso.id = :recursoId ORDER BY r.puntuacion DESC")
    List<Ratings> findByRecursoIdOrderByPuntuacionDesc(@Param("recursoId") Long recursoId);
    
    // Obtener estadísticas de calificaciones por recurso
    @Query("SELECT r.puntuacion, COUNT(r) FROM Ratings r WHERE r.recurso.id = :recursoId GROUP BY r.puntuacion ORDER BY r.puntuacion DESC")
    List<Object[]> getRatingStatsbyRecursoId(@Param("recursoId") Long recursoId);
    
    // Obtener recursos mejor calificados (promedio >= puntuación mínima)
    @Query("SELECT r.recurso.id, AVG(r.puntuacion) as avgRating FROM Ratings r GROUP BY r.recurso.id HAVING AVG(r.puntuacion) >= :minRating ORDER BY avgRating DESC")
    List<Object[]> getTopRatedResources(@Param("minRating") double minRating);
}
package com.apiproyectodaw.apiproyectodaw.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.apiproyectodaw.apiproyectodaw.model.Comments;

@Repository
public interface CommentsRepository extends JpaRepository<Comments, Long> {
    
    // Buscar comentarios por usuario
    List<Comments> findByUsuarioId(Long usuarioId);
    
    // Buscar comentarios por recurso
    List<Comments> findByRecursoId(Long recursoId);
    
    // Buscar comentarios por usuario y recurso
    List<Comments> findByUsuarioIdAndRecursoId(Long usuarioId, Long recursoId);
    
    // Buscar comentarios ordenados por fecha (más recientes primero)
    @Query("SELECT c FROM Comments c ORDER BY c.fecha DESC")
    List<Comments> findAllOrderByFechaDesc();
    
    // Buscar comentarios de un recurso ordenados por fecha
    @Query("SELECT c FROM Comments c WHERE c.recurso.id = :recursoId ORDER BY c.fecha DESC")
    List<Comments> findByRecursoIdOrderByFechaDesc(@Param("recursoId") Long recursoId);
    
    // Contar comentarios por recurso
    @Query("SELECT COUNT(c) FROM Comments c WHERE c.recurso.id = :recursoId")
    Long countByRecursoId(@Param("recursoId") Long recursoId);
    
    // Buscar comentarios que contengan texto específico
    @Query("SELECT c FROM Comments c WHERE LOWER(c.contenido) LIKE LOWER(CONCAT('%', :contenido, '%'))")
    List<Comments> findByContenidoContainingIgnoreCase(@Param("contenido") String contenido);
}
package com.apiproyectodaw.apiproyectodaw.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.apiproyectodaw.apiproyectodaw.dto.CommentsDTO;
import com.apiproyectodaw.apiproyectodaw.dto.CreateCommentsDTO;
import com.apiproyectodaw.apiproyectodaw.dto.UpdateCommentsDTO;
import com.apiproyectodaw.apiproyectodaw.exception.ResourceNotFoundException;
import com.apiproyectodaw.apiproyectodaw.model.Comments;
import com.apiproyectodaw.apiproyectodaw.model.Resource;
import com.apiproyectodaw.apiproyectodaw.model.User;
import com.apiproyectodaw.apiproyectodaw.repository.CommentsRepository;
import com.apiproyectodaw.apiproyectodaw.repository.ResourceRepository;
import com.apiproyectodaw.apiproyectodaw.repository.UserRepository;

@Service
@Transactional
public class CommentsService {

    @Autowired
    private CommentsRepository commentsRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private ResourceRepository resourceRepository;

    // Crear comentario
    public CommentsDTO createComment(CreateCommentsDTO createDto) {
        User usuario = userRepository.findById(createDto.getUsuarioId())
            .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado con ID: " + createDto.getUsuarioId()));
        
        Resource recurso = resourceRepository.findById(createDto.getRecursoId())
            .orElseThrow(() -> new ResourceNotFoundException("Recurso no encontrado con ID: " + createDto.getRecursoId()));
        
        Comments comment = Comments.builder()
            .usuario(usuario)
            .recurso(recurso)
            .contenido(createDto.getContenido())
            .build();
        
        Comments savedComment = commentsRepository.save(comment);
        return convertToDTO(savedComment);
    }

    // Obtener todos los comentarios
    @Transactional(readOnly = true)
    public List<CommentsDTO> getAllComments() {
        return commentsRepository.findAllOrderByFechaDesc()
            .stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }

    // Obtener comentario por ID
    @Transactional(readOnly = true)
    public CommentsDTO getCommentById(Long id) {
        Comments comment = commentsRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Comentario no encontrado con ID: " + id));
        return convertToDTO(comment);
    }

    // Obtener comentarios por usuario
    @Transactional(readOnly = true)
    public List<CommentsDTO> getCommentsByUserId(Long usuarioId) {
        return commentsRepository.findByUsuarioId(usuarioId)
            .stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }

    // Obtener comentarios por recurso
    @Transactional(readOnly = true)
    public List<CommentsDTO> getCommentsByResourceId(Long recursoId) {
        return commentsRepository.findByRecursoIdOrderByFechaDesc(recursoId)
            .stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }

    // Actualizar comentario
    public CommentsDTO updateComment(Long id, UpdateCommentsDTO updateDto) {
        Comments comment = commentsRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Comentario no encontrado con ID: " + id));
        
        comment.setContenido(updateDto.getContenido());
        Comments updatedComment = commentsRepository.save(comment);
        return convertToDTO(updatedComment);
    }

    // Eliminar comentario
    public void deleteComment(Long id) {
        Comments comment = commentsRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Comentario no encontrado con ID: " + id));
        commentsRepository.delete(comment);
    }

    // Buscar comentarios por contenido
    @Transactional(readOnly = true)
    public List<CommentsDTO> searchCommentsByContent(String contenido) {
        return commentsRepository.findByContenidoContainingIgnoreCase(contenido)
            .stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }

    // Contar comentarios por recurso
    @Transactional(readOnly = true)
    public Long countCommentsByResourceId(Long recursoId) {
        return commentsRepository.countByRecursoId(recursoId);
    }

    // Método auxiliar para convertir entidad a DTO
    private CommentsDTO convertToDTO(Comments comment) {
        return CommentsDTO.builder()
            .id(comment.getId())
            .usuarioId(comment.getUsuario().getId())
            .recursoId(comment.getRecurso().getId())
            .contenido(comment.getContenido())
            .fecha(comment.getFecha())
            .nombreUsuario(comment.getUsuario().getNombre()) // Asumiendo que User tiene campo nombre
            .tituloRecurso(comment.getRecurso().getTitulo()) // Asumiendo que Resource tiene campo titulo
            .build();
    }
}
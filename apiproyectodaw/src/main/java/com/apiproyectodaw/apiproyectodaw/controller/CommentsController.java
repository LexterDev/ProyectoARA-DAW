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

import com.apiproyectodaw.apiproyectodaw.dto.CommentsDTO;
import com.apiproyectodaw.apiproyectodaw.dto.CreateCommentsDTO;
import com.apiproyectodaw.apiproyectodaw.dto.UpdateCommentsDTO;
import com.apiproyectodaw.apiproyectodaw.service.CommentsService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/comments")
@CrossOrigin(origins = "*")
@Validated
public class CommentsController {

    @Autowired
    private CommentsService commentsService;

    // Crear comentario
    @PostMapping
    public ResponseEntity<CommentsDTO> createComment(@Valid @RequestBody CreateCommentsDTO createDto) {
        CommentsDTO newComment = commentsService.createComment(createDto);
        return new ResponseEntity<>(newComment, HttpStatus.CREATED);
    }

    // Obtener todos los comentarios
    @GetMapping
    public ResponseEntity<List<CommentsDTO>> getAllComments() {
        List<CommentsDTO> comments = commentsService.getAllComments();
        return ResponseEntity.ok(comments);
    }

    // Obtener comentario por ID
    @GetMapping("/{id}")
    public ResponseEntity<CommentsDTO> getCommentById(@PathVariable Long id) {
        CommentsDTO comment = commentsService.getCommentById(id);
        return ResponseEntity.ok(comment);
    }

    // Obtener comentarios por usuario
    @GetMapping("/user/{usuarioId}")
    public ResponseEntity<List<CommentsDTO>> getCommentsByUserId(@PathVariable Long usuarioId) {
        List<CommentsDTO> comments = commentsService.getCommentsByUserId(usuarioId);
        return ResponseEntity.ok(comments);
    }

    // Obtener comentarios por recurso
    @GetMapping("/resource/{recursoId}")
    public ResponseEntity<List<CommentsDTO>> getCommentsByResourceId(@PathVariable Long recursoId) {
        List<CommentsDTO> comments = commentsService.getCommentsByResourceId(recursoId);
        return ResponseEntity.ok(comments);
    }

    // Actualizar comentario
    @PutMapping("/{id}")
    public ResponseEntity<CommentsDTO> updateComment(
            @PathVariable Long id, 
            @Valid @RequestBody UpdateCommentsDTO updateDto) {
        CommentsDTO updatedComment = commentsService.updateComment(id, updateDto);
        return ResponseEntity.ok(updatedComment);
    }

    // Eliminar comentario
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteComment(@PathVariable Long id) {
        commentsService.deleteComment(id);
        return ResponseEntity.noContent().build();
    }

    // Buscar comentarios por contenido
    @GetMapping("/search")
    public ResponseEntity<List<CommentsDTO>> searchCommentsByContent(@RequestParam String contenido) {
        List<CommentsDTO> comments = commentsService.searchCommentsByContent(contenido);
        return ResponseEntity.ok(comments);
    }

    // Contar comentarios por recurso
    @GetMapping("/count/resource/{recursoId}")
    public ResponseEntity<Long> countCommentsByResourceId(@PathVariable Long recursoId) {
        Long count = commentsService.countCommentsByResourceId(recursoId);
        return ResponseEntity.ok(count);
    }
}

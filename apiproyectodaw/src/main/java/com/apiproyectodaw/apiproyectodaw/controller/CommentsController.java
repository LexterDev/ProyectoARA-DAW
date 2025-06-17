package com.apiproyectodaw.apiproyectodaw.controller;

import com.apiproyectodaw.apiproyectodaw.model.Comments;
import com.apiproyectodaw.apiproyectodaw.service.CommentsService;
import com.apiproyectodaw.apiproyectodaw.service.ResourceService;
import com.apiproyectodaw.apiproyectodaw.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

import com.apiproyectodaw.apiproyectodaw.model.Resource;
import com.apiproyectodaw.apiproyectodaw.model.User;

@RestController
@RequestMapping("/api/comments")
@CrossOrigin(origins = "http://localhost:4200") // Permitir peticiones desde cualquier origen
public class CommentsController {

    @Autowired
    private CommentsService commentsService;
    private UserService userService;
    private ResourceService resourceService;

    @GetMapping("/resource/{id}")
    public List<Comments> getCommentsByResourceId(@PathVariable Long id) {
        return commentsService.getByIdResource(id);
    }

    @PostMapping("/{id}")
    public ResponseEntity<Comments> createComment(@RequestParam Long id_usuario, @RequestParam Long id_recurso, @RequestParam String contenido) {
    User usuario = userService.getUserById(id_usuario)
            .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
    Resource recurso = resourceService.getResourceById(id_recurso)
            .orElseThrow(() -> new RuntimeException("Recurso no encontrado"));

    Comments comment = new Comments();
    comment.setUsuario(usuario);
    comment.setRecurso(recurso);
    comment.setContenido(contenido);
    // La fecha se fija automáticamente en @PostConstruct
    
   Comments newComment = commentsService.createComment(id_usuario, id_recurso, contenido);
    return ResponseEntity.ok(newComment);
}

    @PutMapping("/{id}")
    public ResponseEntity<Comments> updateComment(@PathVariable Long id, @RequestBody Comments comment) {
        try {
            Long idUsuario = comment.getUsuario() != null ? comment.getUsuario().getId() : null;
            String nuevoContenido = comment.getContenido();
            Comments updatedComment = commentsService.updateComment(id, idUsuario, nuevoContenido);
            return ResponseEntity.ok(updatedComment);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteComment(@PathVariable Long id, @RequestParam Long idUsuario) {
        commentsService.deleteComment(id, idUsuario);
        return ResponseEntity.noContent().build();
    }
}   

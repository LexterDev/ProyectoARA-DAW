package com.apiproyectodaw.apiproyectodaw.service;

import com.apiproyectodaw.apiproyectodaw.model.Categories;
import com.apiproyectodaw.apiproyectodaw.model.Comments;
import com.apiproyectodaw.apiproyectodaw.repository.CommentsRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import com.apiproyectodaw.apiproyectodaw.model.Resource;
import com.apiproyectodaw.apiproyectodaw.model.User;
import com.apiproyectodaw.apiproyectodaw.repository.ResourceRepository;
import com.apiproyectodaw.apiproyectodaw.repository.UserRepository;

@Service
public class CommentsService{

    @Autowired
    private CommentsRepository commentsRepository;
    private UserRepository userRepository;
    private ResourceRepository resourceRepository;

public List<Comments> getByIdResource(Long id) {
    return commentsRepository.findByRecursoId(id);
}

    public Comments createComment(Long idUsuario, Long idRecurso, String contenido) {
        User usuario = userRepository.findById(idUsuario).orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        Resource recurso = resourceRepository.findById(idRecurso).orElseThrow(() -> new RuntimeException("Recurso no encontrado"));
        Comments comment = new Comments();
        comment.setUsuario(usuario);
        comment.setRecurso(recurso);
        comment.setContenido(contenido);
        return commentsRepository.save(comment);
    }

    public Comments updateComment(Long idComment, Long idUsuario, String nuevoContenido) {
        Comments comment = commentsRepository.findById(idComment)
                .orElseThrow(() -> new RuntimeException("Comentario no encontrado"));
        if (!comment.getUsuario().getId().equals(idUsuario)) {
            throw new RuntimeException("Sin permiso para actualizar el comentario.");
        }
        comment.setContenido(nuevoContenido);
        return commentsRepository.save(comment);
    }

    public void deleteComment(Long idComment, Long idUsuario) {
        Comments comment = commentsRepository.findById(idComment)
                .orElseThrow(() -> new RuntimeException("Comentario no encontrado"));
        if (!comment.getUsuario().getId().equals(idUsuario)) {
            throw new RuntimeException("Sin permiso para eliminar el comentario.");
        }
        commentsRepository.deleteById(idComment);
    }

}
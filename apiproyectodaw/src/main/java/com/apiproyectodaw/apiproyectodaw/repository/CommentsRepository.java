package com.apiproyectodaw.apiproyectodaw.repository;

import java.util.List;

import com.apiproyectodaw.apiproyectodaw.model.Comments;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentsRepository extends JpaRepository<Comments, Long> {
    List<Comments> findByRecursoId(Long idRecurso);
}

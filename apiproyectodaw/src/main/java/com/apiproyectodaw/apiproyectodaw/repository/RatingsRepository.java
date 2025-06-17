package com.apiproyectodaw.apiproyectodaw.repository;

import com.apiproyectodaw.apiproyectodaw.model.Ratings;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RatingsRepository extends JpaRepository<Ratings, Long> {
}

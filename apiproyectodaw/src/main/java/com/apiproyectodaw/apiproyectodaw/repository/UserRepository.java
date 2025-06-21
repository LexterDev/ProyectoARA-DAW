package com.apiproyectodaw.apiproyectodaw.repository;


import com.apiproyectodaw.apiproyectodaw.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
    @SuppressWarnings("null")
    Optional<User> findById(Long id);
    Optional<User> findByAuth0Id(String auth0Id);
    boolean existsByAuth0Id(String auth0Id);
}

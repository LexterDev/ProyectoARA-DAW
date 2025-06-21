package com.apiproyectodaw.apiproyectodaw.service;

import com.apiproyectodaw.apiproyectodaw.dto.*;
import com.apiproyectodaw.apiproyectodaw.model.User;
import com.apiproyectodaw.apiproyectodaw.repository.UserRepository;
import com.apiproyectodaw.apiproyectodaw.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthResponse register(RegisterRequest request) {
        User user = User.builder()
                .nombre(request.getNombre())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .rol(request.getRol())
                .avatar(request.getAvatar())
                .auth0Id(request.getAuth0_id())
                .build();

        // Check if the email already exists in the database
        Optional<User> existingUser = userRepository.findByEmail(request.getEmail());
        if (existingUser.isPresent()) {
            // Return a json response with error message
            return new AuthResponse(null, true, "El correo electrónico ya existe. Por favor, use otro.");
        } else {
            userRepository.save(user);

            if (userRepository.save(user) != null) {
                // Return a json response with success message
                return new AuthResponse(null, false, "Usuario registrado exitosamente. Será redirigido a la página de inicio de sesión.");
            } else {
                // Return a json response with error message
                return new AuthResponse(null, true, "Error al registrar el usuario. Por favor, inténtelo de nuevo.");
            }
        }

    }

    public AuthResponse login(AuthRequest request) {
        Optional<User> userOpt = userRepository.findByEmail(request.getEmail());

        if (userOpt.isPresent() && passwordEncoder.matches(request.getPassword(), userOpt.get().getPassword())) {
            String token = jwtUtil.generateToken(request.getEmail(), userOpt.get().getRol(), userOpt.get().getNombre(), userOpt.get().getAvatar());
            return new AuthResponse(token, false, "Login exitoso");
        } else {
            // Return a json response with error message
            return new AuthResponse(null, true, "Credenciales inválidas");
        }
    }

    public String edit(Long id, User user) {
        Optional<User> existingUser = userRepository.findById(id);
        if (existingUser.isPresent()) {
            User updatedUser = existingUser.get();
            updatedUser.setNombre(user.getNombre());
            updatedUser.setEmail(user.getEmail());
            updatedUser.setPassword(passwordEncoder.encode(user.getPassword()));
            updatedUser.setRol(user.getRol());
            updatedUser.setAvatar(user.getAvatar());
            userRepository.save(updatedUser);
            return "{ \"message\": \"Usuario actualizado exitosamente\", \"error\": false }";
        } else {
            return "{ \"message\": \"Usuario no encontrado\", \"error\": true }";
        }
    }

    public String get(Long id) {
        Optional<User> existingUser = userRepository.findById(id);
        if (existingUser.isPresent()) { 
            User user = existingUser.get();
            return "{ \"nombre\": \"" + user.getNombre() + "\", \"email\": \"" + user.getEmail() + "\", \"rol\": \"" + user.getRol() + "\"}";
        } else {
            return "{ \"message\": \"Usuario no encontrado\", \"error\": true }";

        }
    }
}



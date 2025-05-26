package com.apiproyectodaw.apiproyectodaw.controller;

import com.apiproyectodaw.apiproyectodaw.dto.*;
import com.apiproyectodaw.apiproyectodaw.model.User;
import com.apiproyectodaw.apiproyectodaw.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;



@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "https://proyectoara-daw-front.onrender.com")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }
    //Maneja el acceso a la funcion editar del usuario 
    @PutMapping("/edit/{id}")
    public ResponseEntity<String> edit(@PathVariable Long id, @RequestBody User user) {
        String response = authService.edit(id, user);
        if (response.equals("{ \"message\": \"Usuario editado exitosamente\", \"error\": false }")) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.badRequest().body(response);
        }
    
    }
    //Maneja el acceso a la funcion de acceso de la informacion del usuario
    @GetMapping("/get/{id}")
    public String getMethodName(@RequestParam String param) {
        return new String();
    }
    
}

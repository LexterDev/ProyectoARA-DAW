package com.apiproyectodaw.apiproyectodaw.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import com.apiproyectodaw.apiproyectodaw.model.Message;

@RestController
@CrossOrigin(origins = "http://localhost:4200") 
@RequestMapping("/api")
public class HelloContronller {

    @GetMapping("/hello")
    public Message sayHello() {
        return new Message("¡Hola desde Spring Boot sddffdf!");
    }
}

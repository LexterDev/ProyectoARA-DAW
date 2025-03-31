package com.apiproyectodaw.apiproyectodaw.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class RegisterRequest {

    private String nombre;
    private String email;
    private String password;
    private String rol;
    
}

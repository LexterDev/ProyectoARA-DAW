package com.apiproyectodaw.apiproyectodaw.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateCommentsDTO {
    
    @NotBlank(message = "El contenido del comentario es obligatorio")
    private String contenido;
}
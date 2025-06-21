package com.apiproyectodaw.apiproyectodaw.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RatingsDTO {
    
    private Long id;
    private Long usuarioId;
    private Long recursoId;
    private int puntuacion;
    
    // Información adicional para la respuesta
    private String nombreUsuario;
    private String tituloRecurso;
}
package com.apiproyectodaw.apiproyectodaw.dto;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CommentsDTO {
    
    private Long id;
    private Long usuarioId;
    private Long recursoId;
    private String contenido;
    private LocalDateTime fecha;
    
    // Información adicional para la respuesta
    private String nombreUsuario;
    private String tituloRecurso;
}
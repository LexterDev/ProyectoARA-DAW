package com.apiproyectodaw.apiproyectodaw.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RatingStatsDTO {
    
    private Long recursoId;
    private String tituloRecurso;
    private Double promedioCalificacion;
    private Long totalCalificaciones;
    private Integer estrellas5;
    private Integer estrellas4;
    private Integer estrellas3;
    private Integer estrellas2;
    private Integer estrellas1;
}
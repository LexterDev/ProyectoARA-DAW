package com.apiproyectodaw.apiproyectodaw.exception;

import java.time.LocalDateTime;
import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

// Clase para respuestas de error generales
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ErrorResponses {
    private LocalDateTime timestamp;
    private int status;
    private String error;
    private String message;
    private String path;
}

// Clase para errores de validación
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
class ValidationErrorResponse {
    private LocalDateTime timestamp;
    private int status;
    private String error;
    private String message;
    private String path;
    private Map<String, String> validationErrors;
}
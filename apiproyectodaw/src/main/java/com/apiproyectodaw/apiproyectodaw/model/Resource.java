package com.apiproyectodaw.apiproyectodaw.model;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.annotation.PostConstruct;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "resources")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Resource {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 255)
    private String titulo;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String descripcion;

    @Column(nullable = false, length = 50)
    private String tipo; // PDF, VIDEO, CÓDIGO, etc.

    @Column(nullable = false, columnDefinition = "TEXT")
    private String urlArchivo; // Ruta del archivo en el sistema o URL externa

    @Column(name = "fecha_subida", nullable = false, updatable = false)
    @Builder.Default
    private LocalDateTime fechaSubida = LocalDateTime.now();

    // Relación con Usuario (Creador del recurso)
    @ManyToOne
    @JoinColumn(name = "id_usuario", nullable = false)
    @JsonIgnoreProperties({ "recursos", "comentarios", "valoraciones" })
    private User usuario;

    // Relación con Comentarios
    @OneToMany(mappedBy = "recurso", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties({ "usuario", "recurso" })
    private List<Comments> comentarios;

    // Relación con Valoraciones
    @OneToMany(mappedBy = "recurso", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties({ "usuario", "recurso" })
    private List<Ratings> valoraciones;

    // Relación con Categoría
    @ManyToOne
    @JoinColumn(name = "id_categoria", nullable = false)
    @JsonIgnoreProperties({ "recursos", "tags", "descripcion" })
    private Categories categoria;

    // Relación con Licencias
    @ManyToOne
    @JoinColumn(name = "id_licencia", nullable = false)
    private Licenses licencia;

    @PostConstruct
    public void init() {
        // Asegurarse de que la fecha de subida esté correctamente inicializada
        if (fechaSubida == null) {
            fechaSubida = LocalDateTime.now();
        }
    }

    // Método para verificar si el archivo es local o remoto (por ejemplo, video de YouTube)
    public boolean isArchivoRemoto() {
        return tipo.equalsIgnoreCase("VIDEO") && (urlArchivo.contains("youtube.com") || urlArchivo.contains("vimeo.com"));
    }
}

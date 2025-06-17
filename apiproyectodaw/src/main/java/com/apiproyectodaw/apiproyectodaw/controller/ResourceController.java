package com.apiproyectodaw.apiproyectodaw.controller;

import com.apiproyectodaw.apiproyectodaw.dto.ResourceDTO;
import com.apiproyectodaw.apiproyectodaw.model.Resource;
import com.apiproyectodaw.apiproyectodaw.model.Categories;
import com.apiproyectodaw.apiproyectodaw.model.Licenses;
import com.apiproyectodaw.apiproyectodaw.model.User;
import com.apiproyectodaw.apiproyectodaw.service.ResourceService;
import com.apiproyectodaw.apiproyectodaw.service.CategoriesService;
import com.apiproyectodaw.apiproyectodaw.service.LicensesService;
import com.apiproyectodaw.apiproyectodaw.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
// Removed alias for org.springframework.core.io.Resource
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/resources")
@CrossOrigin(origins = "http://localhost:4200")
public class ResourceController {

    @Autowired
    private ResourceService resourceService;

    @Autowired
    private UserService userService;

    @Autowired
    private CategoriesService categoriesService;

    @Autowired
    private LicensesService licensesService;

    // Obtener todos los recursos
    @GetMapping
    public List<Resource> getAllResources() {
        return resourceService.getAllResources();
    }

    // Obtener recurso por ID
    @GetMapping("/{id}")
    public ResponseEntity<Resource> getResourceById(@PathVariable Long id) {
        Optional<Resource> resource = resourceService.getResourceById(id);
        return resource.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Crear nuevo recurso con archivo
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> createResource(
            @RequestParam("file") MultipartFile file,
            @RequestParam("titulo") String titulo,
            @RequestParam("descripcion") String descripcion,
            @RequestParam("tipo") String tipo,
            @RequestParam("idUsuario") Long idUsuario,
            @RequestParam("idCategoria") Long idCategoria,
            @RequestParam("idLicencia") Long idLicencia) {

        try {
            // Obtener entidades relacionadas
            User usuario = userService.getUserById(idUsuario)
                    .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

            Categories categoria = categoriesService.getCategoryById(idCategoria)
                    .orElseThrow(() -> new RuntimeException("Categoría no encontrada"));

            System.out.println("ID Licencia: " + idLicencia);

            Licenses licencia = licensesService.getLicenseById(idLicencia)
                    .orElseThrow(() -> new RuntimeException("Licencia no encontrada"));

            // Crear objeto de recurso
            Resource resource = Resource.builder()
                    .titulo(titulo)
                    .descripcion(descripcion)
                    .tipo(tipo)
                    .usuario(usuario)
                    .categoria(categoria)
                    .licencia(licencia)
                    .build();

            // Guardar recurso con archivo
            Resource savedResource = resourceService.saveResourceWithFile(resource, file);

            // Crear URL de descarga para el archivo
            String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                    .path("/api/resources/files/")
                    .path(savedResource.getUrlArchivo())
                    .toUriString();

            return ResponseEntity.ok(savedResource);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error al crear recurso: " + e.getMessage());
        }
    }

    // Crear nuevo recurso con URL externa (YouTube, etc.)
    @PostMapping("/external")
    public ResponseEntity<?> createExternalResource(@RequestBody ResourceDTO resourceDTO) {
        try {
            //Obtener entidades relacionadas
            User usuario = userService.getUserById(resourceDTO.getIdUsuario())
            .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));


            Categories categoria = categoriesService.getCategoryById(resourceDTO.getIdCategoria())
                    .orElseThrow(() -> new RuntimeException("Categoría no encontrada"));

            Licenses licencia = licensesService.getLicenseById(resourceDTO.getIdLicencia())
                    .orElseThrow(() -> new RuntimeException("Licencia no encontrada"));

            // Crear objeto de recurso
            Resource resource = Resource.builder()
                    .titulo(resourceDTO.getTitulo())
                    .descripcion(resourceDTO.getDescripcion())
                    .tipo(resourceDTO.getTipo())
                    .urlArchivo(resourceDTO.getUrlExterna())
                    .usuario(usuario)
                    .categoria(categoria)
                    .licencia(licencia)
                    .build();

            // Guardar recurso
            Resource savedResource = resourceService.saveResource(resource);

            return ResponseEntity.ok(savedResource);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error al crear recurso externo: " + e.getMessage());
        }
    }

    // Actualizar recurso
    @PutMapping("/{id}")
    public ResponseEntity<Resource> updateResource(@PathVariable Long id, @RequestBody Resource resource) {
        try {
            Resource updatedResource = resourceService.updateResource(id, resource);
            return ResponseEntity.ok(updatedResource);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Eliminar recurso
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteResource(@PathVariable Long id) {
        resourceService.deleteResource(id);
        return ResponseEntity.noContent().build();
    }

    // Descargar archivo
    @GetMapping("/files/{fileName:.+}")
    public ResponseEntity<org.springframework.core.io.Resource> downloadFile(@PathVariable String fileName) {
        try {
            org.springframework.core.io.Resource file = resourceService.loadFileAsResource(fileName);
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"")
                    .body(file);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Obtener recursos por usuario
    @GetMapping("/user/{userId}")
    public List<Resource> getResourcesByUser(@PathVariable Long userId) {
        return resourceService.getResourcesByUserId(userId);
    }

    // Obtener recursos por categoría
    @GetMapping("/category/{categoryId}")
    public List<Resource> getResourcesByCategory(@PathVariable Long categoryId) {
        return resourceService.getResourcesByCategoryId(categoryId);
    }

    // Obtener recursos por tipo
    @GetMapping("/type/{tipo}")
    public List<Resource> getResourcesByType(@PathVariable String tipo) {
        return resourceService.getResourcesByType(tipo);
    }
}
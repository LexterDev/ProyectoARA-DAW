package com.apiproyectodaw.apiproyectodaw.controller;

import com.apiproyectodaw.apiproyectodaw.model.Licenses;
import com.apiproyectodaw.apiproyectodaw.service.LicensesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/licenses")
@CrossOrigin(origins = "http://localhost:4200")
public class LicensesController {

    @Autowired
    private LicensesService licensesService;

    // Obtener todas las licencias
    @GetMapping
    public List<Licenses> getAllLicenses() {
        return licensesService.getAllLicenses();
    }

    // Obtener licencia por ID
    @GetMapping("/{id}")
    public ResponseEntity<Licenses> getLicensesById(@PathVariable Long id) {
        Optional<Licenses> license = licensesService.getLicenseById(id);
        return license.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Crear nueva licencia
    @PostMapping
    public ResponseEntity<Licenses> createLicense(@RequestBody Licenses license) {
        try {
            Licenses newLicense = licensesService.saveLicense(license);
            return ResponseEntity.ok(newLicense);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();  // Bad request si hay error
        }
    }

    // Actualizar licencia
    @PutMapping("/{id}")
    public ResponseEntity<Licenses> updateLicense(@PathVariable Long id, @RequestBody Licenses license) {
        try {
            Licenses updatedLicense = licensesService.updateLicense(id, license);
            return ResponseEntity.ok(updatedLicense);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Eliminar licencia
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLicense(@PathVariable Long id) {
        licensesService.deleteLicense(id);
        return ResponseEntity.noContent().build();
    }

    // Manejo de excepciones global
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<String> handleException(RuntimeException e) {
        return ResponseEntity.status(400).body(e.getMessage());  // Error 400
    }
}


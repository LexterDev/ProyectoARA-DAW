package com.apiproyectodaw.apiproyectodaw.controller;

import com.apiproyectodaw.apiproyectodaw.model.Categories;
import com.apiproyectodaw.apiproyectodaw.model.Tags;
import com.apiproyectodaw.apiproyectodaw.service.TagsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tags")
@CrossOrigin(origins = "http://localhost:4200")
public class TagsController {

    private final TagsService tagsService;

    public TagsController(TagsService tagsService) {
        this.tagsService = tagsService;
    }

    @GetMapping
    public List<Tags> getAllTags() {
        return tagsService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Tags> getTagById(@PathVariable Long id) {
        return tagsService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Tags> createTag(@RequestBody Tags tag) {
        // Asegurarse de que la categoría existe
        Categories categoria = tagsService.getCategoriaById(tag.getCategoria().getId());
        tag.setCategoria(categoria);
        Tags savedTag = tagsService.save(tag);
        return ResponseEntity.ok(savedTag);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Tags> updateTag(@PathVariable Long id, @RequestBody Tags tag) {
        return tagsService.findById(id).map(existing -> {
            existing.setNombre(tag.getNombre());
            existing.setDescripcion(tag.getDescripcion());
            existing.setColor(tag.getColor());
            Categories categoria = tagsService.getCategoriaById(tag.getCategoria().getId());
            existing.setCategoria(categoria);
            Tags updatedTag = tagsService.save(existing);
            return ResponseEntity.ok(updatedTag);
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTag(@PathVariable Long id) {
        if (tagsService.findById(id).isPresent()) {
            tagsService.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}

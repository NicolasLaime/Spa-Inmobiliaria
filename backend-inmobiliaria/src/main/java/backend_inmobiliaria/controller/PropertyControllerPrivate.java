package backend_inmobiliaria.controller;


import backend_inmobiliaria.dto.PropertyCreateDto;
import backend_inmobiliaria.dto.PropertyDto;
import backend_inmobiliaria.service.PropertyService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/admin/properties")
@RequiredArgsConstructor
public class PropertyControllerPrivate {


    private final PropertyService propertyService;


    // ========================
    // Traer todas las propiedades (admin)
    // ========================
    @GetMapping
    public ResponseEntity<Page<PropertyDto>> getAllProperties(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        Page<PropertyDto> properties = propertyService.getAllProperties(pageable);
        return ResponseEntity.ok(properties);
    }





    // ========================
    // Crear propiedad (admin)
    // ========================
    @PostMapping(consumes = {"multipart/form-data"})
    public ResponseEntity<PropertyDto> createProperty(
            @RequestPart("data") PropertyCreateDto dto,
            @RequestPart(value = "images", required = false) MultipartFile[] images
    ) throws IOException {
        PropertyDto created = propertyService.createWithImages(dto, images);
        return ResponseEntity.ok(created);
    }





    // ========================
    // Actualizar propiedad (admin)
    // ========================
    @PutMapping(value = "/{id}", consumes = {"multipart/form-data"})
    public ResponseEntity<PropertyDto> updateProperty(
            @PathVariable Long id,
            @RequestPart("data") PropertyCreateDto dto,
            @RequestPart(value = "images", required = false) MultipartFile[] images
    ) throws IOException {
        PropertyDto updated = propertyService.updateWithImages(id, dto, images);
        return ResponseEntity.ok(updated);
    }

    // ========================
    // Eliminar propiedad (admin)
    // ========================
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProperty(@PathVariable Long id) {
        propertyService.delete(id);
        return ResponseEntity.ok("Propiedad eliminada correctamente");
    }






}

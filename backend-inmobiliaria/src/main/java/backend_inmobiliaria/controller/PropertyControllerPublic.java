package backend_inmobiliaria.controller;


import backend_inmobiliaria.dto.PropertyDto;
import backend_inmobiliaria.service.PropertyService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/public/properties")
@RequiredArgsConstructor
public class PropertyControllerPublic {


    private final PropertyService propertyService;

    // ========================
    // Buscar propiedades con filtros (public)
    // ========================
    @GetMapping("/search")
    public ResponseEntity<Page<PropertyDto>> search(
            @RequestParam(required = false) String city,
            @RequestParam(required = false) String type,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice,
            Pageable pageable
    ) {
        Page<PropertyDto> result = propertyService.search(city, type, minPrice, maxPrice, pageable);
        return ResponseEntity.ok(result);
    }

    // ========================
    // Obtener propiedad por ID (public)
    // ========================
    @GetMapping("/{id}")
    public ResponseEntity<PropertyDto> getById(@PathVariable Long id) {
        PropertyDto property = propertyService.findById(id);
        return ResponseEntity.ok(property);
    }






}

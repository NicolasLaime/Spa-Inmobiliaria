package backend_inmobiliaria.service.impl;

import backend_inmobiliaria.dto.PropertyCreateDto;
import backend_inmobiliaria.dto.PropertyDto;
import backend_inmobiliaria.entity.Property;
import backend_inmobiliaria.entity.PropertyType;
import backend_inmobiliaria.mapper.PropertyMapper;
import backend_inmobiliaria.repository.PropertyRepository;
import backend_inmobiliaria.service.CloudinaryService;
import backend_inmobiliaria.service.PropertyService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Map;


@RequiredArgsConstructor
@Service
public class PropertyServiceImpl implements PropertyService {

    private final PropertyRepository repo;
    private final PropertyMapper mapper;
    private final CloudinaryService cloudinaryService;

    // ========================
    // Buscar propiedades con filtros
    // ========================
    @Override
    @Transactional
    public Page<PropertyDto> search(String city, String typeStr, Double minPrice, Double maxPrice, Pageable pageable) {
        PropertyType type = null;

        if (typeStr != null && !typeStr.isBlank()) {
            try {
                type = PropertyType.valueOf(typeStr.toUpperCase(Locale.ROOT));
            } catch (IllegalArgumentException e) {
                type = null;
            }
        }

        String normalizedCity = (city != null && !city.isBlank()) ? city.trim() : null;
        return repo.search(normalizedCity, type, minPrice, maxPrice, pageable)
                .map(mapper::toDto);
    }

    @Override
    public Page<PropertyDto> getAllProperties(Pageable pageable) {
        return repo.findAll(pageable)
                .map(mapper::toDto);
    }

    // ========================
    // Obtener propiedad por ID
    // ========================
    @Override
    @Transactional
    public PropertyDto findById(Long id) {
        Property property = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Propiedad no encontrada con el ID: " + id));
        return mapper.toDto(property);
    }

    // ========================
    // Crear nueva propiedad (con subida de imágenes)
    // ========================
    @Override
    @Transactional
    public PropertyDto create(PropertyCreateDto dto) {
        if (dto.getTitle() == null || dto.getTitle().isBlank()) {
            throw new RuntimeException("El título de la propiedad es obligatorio.");
        }
        if (dto.getPrice() == null || dto.getPrice() <= 0) {
            throw new RuntimeException("El precio debe ser mayor a 0.");
        }

        Property property = mapper.toEntity(dto);

        // Subir imágenes a Cloudinary si el DTO las trae
        if (dto.getImageUrls() == null || dto.getImageUrls().isEmpty()) {
            property.setImageUrls(new ArrayList<>());
        }

        Property saved = repo.save(property);
        return mapper.toDto(saved);
    }

    // ========================
    // Crear propiedad con imágenes subidas desde archivos
    // ========================
    @Transactional
    public PropertyDto createWithFiles(PropertyCreateDto dto, List<MultipartFile> files) throws IOException {
        Property property = mapper.toEntity(dto);

        List<String> uploadedUrls = new ArrayList<>();
        for (MultipartFile file : files) {
            Map uploadResult = cloudinaryService.uploadFile(file);
            uploadedUrls.add(uploadResult.get("secure_url").toString());
        }

        property.setImageUrls(uploadedUrls);
        Property saved = repo.save(property);

        return mapper.toDto(saved);
    }

    // ========================
    // Actualizar propiedad (incluyendo imágenes)
    // ========================
    @Override
    @Transactional
    public PropertyDto update(Long id, PropertyCreateDto dto) {
        Property property = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("No se puede actualizar: la propiedad con ID " + id + " no existe."));

        if (dto.getTitle() != null && dto.getTitle().isBlank()) {
            throw new RuntimeException("El título no puede estar vacío.");
        }
        if (dto.getPrice() != null && dto.getPrice() <= 0) {
            throw new RuntimeException("El precio debe ser mayor a 0.");
        }

        mapper.updateFromDto(dto, property);
        Property updated = repo.save(property);
        return mapper.toDto(updated);
    }

    // ========================
    // Eliminar propiedad
    // ========================
    @Override
    @Transactional
    public void delete(Long id) {
        if (!repo.existsById(id)) {
            throw new RuntimeException("No se puede eliminar: la propiedad con ID " + id + " no existe.");
        }

        repo.deleteById(id);
    }

    // ========================
// Crear propiedad con imágenes subidas a Cloudinary
// ========================
    @Override
    @Transactional
    public PropertyDto createWithImages(PropertyCreateDto dto, MultipartFile[] images) throws IOException {
        Property property = mapper.toEntity(dto);

        List<String> imageUrls = new ArrayList<>();
        if (images != null) {
            for (MultipartFile file : images) {
                Map uploadResult = cloudinaryService.uploadFile(file);
                imageUrls.add(uploadResult.get("secure_url").toString());
            }
        }
        property.setImageUrls(imageUrls);

        Property saved = repo.save(property);
        return mapper.toDto(saved);
    }

    // ========================
// Actualizar propiedad con imágenes nuevas
// ========================
    @Override
    @Transactional
    public PropertyDto updateWithImages(Long id, PropertyCreateDto dto, MultipartFile[] images) throws IOException {
        Property property = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Propiedad no encontrada con el ID: " + id));

        // Actualizar campos desde el DTO
        mapper.updateFromDto(dto, property);

        // Subir nuevas imágenes si las hay
        if (images != null && images.length > 0) {
            List<String> imageUrls = new ArrayList<>();
            for (MultipartFile file : images) {
                Map uploadResult = cloudinaryService.uploadFile(file);
                imageUrls.add(uploadResult.get("secure_url").toString());
            }
            property.setImageUrls(imageUrls);
        }

        Property updated = repo.save(property);
        return mapper.toDto(updated);
    }


}

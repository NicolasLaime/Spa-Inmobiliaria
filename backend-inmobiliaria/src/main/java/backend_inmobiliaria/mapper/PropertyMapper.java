package backend_inmobiliaria.mapper;

import backend_inmobiliaria.dto.PropertyCreateDto;
import backend_inmobiliaria.dto.PropertyDto;
import backend_inmobiliaria.entity.Property;
import org.springframework.stereotype.Component;

@Component
public class PropertyMapper {


    // Entity -> DTO
    public PropertyDto toDto(Property property) {
        if (property == null) return null;

        PropertyDto dto = new PropertyDto();
        dto.setId(property.getId());
        dto.setTitle(property.getTitle());
        dto.setDescription(property.getDescription());
        dto.setAddress(property.getAddress());
        dto.setCity(property.getCity());
        dto.setBedrooms(property.getBedrooms());
        dto.setBathrooms(property.getBathrooms());
        dto.setPrice(property.getPrice());
        dto.setPool(property.getPool());
        dto.setGardeen(property.getGarden());
        dto.setQuincho(property.getQuincho());
        dto.setPublished(property.getPublished());
        dto.setType(property.getType());
        dto.setImageUrls(property.getImageUrls());
        return dto;
    }

    // DTO -> Entity (para crear)
    public Property toEntity(PropertyCreateDto dto) {
        if (dto == null) return null;

        Property property = new Property();
        property.setTitle(dto.getTitle());
        property.setDescription(dto.getDescription());
        property.setAddress(dto.getAddress());
        property.setCity(dto.getCity());
        property.setBedrooms(dto.getBedrooms());
        property.setBathrooms(dto.getBathrooms());
        property.setPrice(dto.getPrice());
        property.setPool(dto.getPool());
        property.setGarden(dto.isGardeen());
        property.setQuincho(dto.getQuincho());
        property.setType(dto.getType());
        property.setImageUrls(dto.getImageUrls());
        // published puede quedar en false por default al crear
        property.setPublished(false);
        return property;
    }

    public void updateFromDto(PropertyCreateDto dto, Property entity) {
        if (dto == null || entity == null) return;

        if (dto.getTitle() != null) entity.setTitle(dto.getTitle());
        if (dto.getDescription() != null) entity.setDescription(dto.getDescription());
        if (dto.getAddress() != null) entity.setAddress(dto.getAddress());
        if (dto.getCity() != null) entity.setCity(dto.getCity());
        if (dto.getBedrooms() != null) entity.setBedrooms(dto.getBedrooms());
        if (dto.getBathrooms() != null) entity.setBathrooms(dto.getBathrooms());
        if (dto.getPrice() != null) entity.setPrice(dto.getPrice());
        if (dto.getPool() != null) entity.setPool(dto.getPool());
        entity.setGarden(dto.isGardeen());
        if (dto.getQuincho() != null) entity.setQuincho(dto.getQuincho());
        if (dto.getType() != null) entity.setType(dto.getType());
        if (dto.getImageUrls() != null) entity.setImageUrls(dto.getImageUrls());

    }







}

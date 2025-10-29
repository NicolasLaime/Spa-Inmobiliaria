package backend_inmobiliaria.mapper;


import backend_inmobiliaria.dto.ContactDto;
import backend_inmobiliaria.dto.ContactResponseDto;
import backend_inmobiliaria.entity.ContactMessage;
import backend_inmobiliaria.entity.Property;
import org.springframework.stereotype.Component;

@Component
public class ContactMapper {

    // DTO → Entidad
    public ContactMessage toEntity(ContactDto dto, Property property) {
        if (dto == null) return null;

        ContactMessage message = new ContactMessage();
        message.setName(dto.getName());
        message.setEmail(dto.getEmail());
        message.setMessage(dto.getMessage());
        message.setProperty(property);
        return message;
    }

    // Entidad → DTO de respuesta
    public ContactResponseDto toDto(ContactMessage message) {
        if (message == null) return null;

        ContactResponseDto dto = new ContactResponseDto();
        dto.setId(message.getId());
        dto.setName(message.getName());
        dto.setEmail(message.getEmail());
        dto.setMessage(message.getMessage());
        dto.setResponded(message.isResponded());
        dto.setSentAt(message.getSentAt());
        dto.setPropertyTitle(
                message.getProperty() != null ? message.getProperty().getTitle() : null
        );
        return dto;
    }




}

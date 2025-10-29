package backend_inmobiliaria.service.impl;

import backend_inmobiliaria.dto.ContactDto;
import backend_inmobiliaria.dto.ContactResponseDto;
import backend_inmobiliaria.dto.PropertyDto;
import backend_inmobiliaria.entity.ContactMessage;
import backend_inmobiliaria.mapper.ContactMapper;
import backend_inmobiliaria.repository.ContactRepository;
import backend_inmobiliaria.repository.PropertyRepository;
import backend_inmobiliaria.service.ContactService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;


@Service
@RequiredArgsConstructor
public class ContactServiceImpl implements ContactService {

    private final ContactRepository contactRepository;
    private final PropertyRepository propertyRepository;
    private final ContactMapper contactMapper;

    @Override
    @Transactional
    public void sendMessage(ContactDto dto) {
        if (dto.getName() == null || dto.getName().isBlank()) {
            throw new IllegalArgumentException("El nombre es obligatorio");
        }
        if (dto.getEmail() == null || dto.getEmail().isBlank()) {
            throw new IllegalArgumentException("El email es obligatorio");
        }
        if (dto.getMessage() == null || dto.getMessage().isBlank()) {
            throw new IllegalArgumentException("El mensaje no puede estar vacío");
        }

        var property = propertyRepository.findById(dto.getPropertyId())
                .orElseThrow(() -> new RuntimeException("Propiedad no encontrada"));

        ContactMessage message = contactMapper.toEntity(dto, property);
        message.setSentAt(LocalDateTime.now());

        contactRepository.save(message);
    }




    @Override
    @Transactional(readOnly = true)
    public List<ContactResponseDto> getAllMessages() {
        return contactRepository.findAll(Sort.by(Sort.Direction.DESC, "sentAt"))
                .stream()
                .map(contactMapper::toDto)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public ContactResponseDto getMessageById(Long id) {
        ContactMessage message = contactRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Mensaje no encontrado"));
        return contactMapper.toDto(message);
    }

    @Override
    @Transactional
    public void markAsResponded(Long id) {
        ContactMessage message = contactRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Mensaje no encontrado"));
        message.setResponded(true);
        message.setRespondedAt(LocalDateTime.now());
        contactRepository.save(message);
    }

    @Override
    @Transactional
    public void deleteMessage(Long id) {
        if (!contactRepository.existsById(id)) {
            throw new RuntimeException("Mensaje no encontrado");
        }
        contactRepository.deleteById(id);
    }

}

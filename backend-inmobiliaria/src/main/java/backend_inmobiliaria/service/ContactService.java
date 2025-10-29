package backend_inmobiliaria.service;

import backend_inmobiliaria.dto.ContactDto;
import backend_inmobiliaria.dto.ContactResponseDto;
import backend_inmobiliaria.entity.ContactMessage;

import java.util.List;

public interface ContactService {

    void sendMessage(ContactDto dto);
    List<ContactResponseDto> getAllMessages();
    ContactResponseDto getMessageById(Long id);
    void markAsResponded(Long id);
    void deleteMessage(Long id);


}

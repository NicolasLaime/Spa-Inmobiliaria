package backend_inmobiliaria.controller;


import backend_inmobiliaria.dto.ContactDto;
import backend_inmobiliaria.dto.ContactResponseDto;
import backend_inmobiliaria.entity.ContactMessage;
import backend_inmobiliaria.service.ContactService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contacts")
@RequiredArgsConstructor
public class ContactControllerPublic {


    private final ContactService contactService;



    // Cliente: enviar mensaje (público)
    @PostMapping
    public ResponseEntity<String> sendMessage(@RequestBody ContactDto dto) {
        contactService.sendMessage(dto);
        return ResponseEntity.ok("Mensaje enviado correctamente");
    }

    // Admin: listar todos los mensajes
    @GetMapping
    public ResponseEntity<List<ContactResponseDto>> getAllMessages() {
        return ResponseEntity.ok(contactService.getAllMessages());
    }

    // Admin: obtener mensaje por ID
    @GetMapping("/{id}")
    public ResponseEntity<ContactResponseDto> getMessageById(@PathVariable Long id) {
        return ResponseEntity.ok(contactService.getMessageById(id));
    }

    // Admin: marcar mensaje como respondido
    @PutMapping("/{id}/responded")
    public ResponseEntity<String> markAsResponded(@PathVariable Long id) {
        contactService.markAsResponded(id);
        return ResponseEntity.ok("Mensaje marcado como respondido");
    }

    // Admin: eliminar mensaje
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteMessage(@PathVariable Long id) {
        contactService.deleteMessage(id);
        return ResponseEntity.ok("Mensaje eliminado correctamente");
    }

}

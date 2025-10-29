package backend_inmobiliaria.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ContactResponseDto {

    private Long id;
    private String name;
    private String email;
    private String message;
    private boolean responded;
    private LocalDateTime sentAt;
    private String propertyTitle;

}

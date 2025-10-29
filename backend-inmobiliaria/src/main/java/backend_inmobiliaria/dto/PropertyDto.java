package backend_inmobiliaria.dto;

import backend_inmobiliaria.entity.PropertyType;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PropertyDto {
    private Long id;
    private String title;
    private String description;
    private String address;
    private String city;
    private Integer bedrooms;
    private Integer bathrooms;
    private Double price;
    private Boolean Pool;
    private boolean gardeen;
    private Boolean Quincho;
    private Boolean published;
    private PropertyType type;
    private List<String> imageUrls;
}


package backend_inmobiliaria.dto;

import backend_inmobiliaria.entity.PropertyType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PropertyCreateDto {
    private String title;
    private String description;
    private String address;
    private String city;
    private Integer bedrooms;
    private Integer bathrooms;
    private Boolean Pool;
    private boolean gardeen;
    private Boolean Quincho;
    private Double price;
    private PropertyType type;
    private List<String> imageUrls;
}

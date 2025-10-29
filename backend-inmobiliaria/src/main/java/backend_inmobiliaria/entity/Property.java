package backend_inmobiliaria.entity;


import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Property {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(length = 4000)
    private String description;

    private String address;

    private String city;

    private Integer bedrooms;

    private Integer bathrooms;

    private Double price;

    private Boolean Pool = false;


    private Boolean Garden = false;

    private Boolean Quincho = false;

    private Boolean published = true;

    @Enumerated(EnumType.STRING)
    private PropertyType type;

    @ElementCollection
    @CollectionTable(name = "property_images", joinColumns = @JoinColumn(name = "property_id"))
    @Column(name = "image_url")
    private List<String> imageUrls;


}

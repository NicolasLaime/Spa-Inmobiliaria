package backend_inmobiliaria.repository;

import backend_inmobiliaria.entity.Property;
import backend_inmobiliaria.entity.PropertyType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PropertyRepository extends JpaRepository<Property, Long> {

    @Query("""
        SELECT p FROM Property p
        WHERE (:city IS NULL OR LOWER(p.city) LIKE LOWER(CONCAT('%', :city, '%')))
          AND (:type IS NULL OR p.type = :type)
          AND (:minPrice IS NULL OR p.price >= :minPrice)
          AND (:maxPrice IS NULL OR p.price <= :maxPrice)
        ORDER BY p.id DESC
    """)
    Page<Property> search(
            @Param("city") String city,
            @Param("type") PropertyType type,
            @Param("minPrice") Double minPrice,
            @Param("maxPrice") Double maxPrice,
            Pageable pageable
    );
}

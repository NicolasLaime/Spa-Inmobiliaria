package backend_inmobiliaria.service;

import backend_inmobiliaria.dto.PropertyCreateDto;
import backend_inmobiliaria.dto.PropertyDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface PropertyService {

    Page<PropertyDto> search(String city, String type, Double minPrice, Double maxPrice , Pageable pageable);
    Page<PropertyDto> getAllProperties(Pageable pageable);
    PropertyDto findById(Long id);
    PropertyDto create(PropertyCreateDto dto);
    PropertyDto update(Long id, PropertyCreateDto dto);
    void delete(Long id);
    PropertyDto createWithImages(PropertyCreateDto dto, MultipartFile[] images) throws IOException;
    PropertyDto updateWithImages(Long id, PropertyCreateDto dto, MultipartFile[] images) throws IOException;

}

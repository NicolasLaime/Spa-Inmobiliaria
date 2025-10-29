package backend_inmobiliaria.repository;

import backend_inmobiliaria.entity.ContactMessage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactRepository extends JpaRepository<ContactMessage,Long> {
}

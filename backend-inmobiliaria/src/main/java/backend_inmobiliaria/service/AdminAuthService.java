package backend_inmobiliaria.service;

import backend_inmobiliaria.dto.AdminInfo;

public interface AdminAuthService {

    boolean login(String username, String password);
    AdminInfo getAdminInfo();
    String generateToken(String email);


}

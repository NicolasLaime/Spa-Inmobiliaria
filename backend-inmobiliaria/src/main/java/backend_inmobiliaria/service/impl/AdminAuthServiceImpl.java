package backend_inmobiliaria.service.impl;

import backend_inmobiliaria.dto.AdminInfo;
import backend_inmobiliaria.service.AdminAuthService;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class AdminAuthServiceImpl implements AdminAuthService {

    @Value("${admin.username}")
    private String adminUsername;

    @Value("${admin.password}")
    private String adminPassword;

    @Value("${jwt.secret}")
    private String jwtSecret;

    @Override
    public boolean login(String username, String password) {
        return adminUsername.equals(username) && adminPassword.equals(password);
    }

    @Override
    public AdminInfo getAdminInfo() {
        return new AdminInfo(adminUsername, "Administrador");
    }

    @Override
    public String generateToken(String email) {
        return JWT.create()
                .withSubject(email)
                .withIssuer("inmobiliaria")
                .withClaim("role", "ADMIN")
                .withExpiresAt(new Date(System.currentTimeMillis() + 1000 * 60 * 60)) // 1h
                .sign(Algorithm.HMAC256(jwtSecret));
    }
}

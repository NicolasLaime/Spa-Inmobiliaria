package backend_inmobiliaria.controller.admin;

import backend_inmobiliaria.dto.LoginRequest;
import backend_inmobiliaria.dto.LoginResponse;
import backend_inmobiliaria.dto.AdminInfo;
import backend_inmobiliaria.service.AdminAuthService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
public class AdminAuthController {

    private final AdminAuthService adminAuthService;

    public AdminAuthController(AdminAuthService adminAuthService) {
        this.adminAuthService = adminAuthService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request, HttpServletResponse response) {
        if (!adminAuthService.login(request.getEmail(), request.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales inválidas");
        }

        String token = adminAuthService.generateToken(request.getEmail());
        Cookie cookie = new Cookie("token", token);
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        cookie.setMaxAge(60 * 60); // 1h
        response.addCookie(cookie);

        return ResponseEntity.ok(new LoginResponse("Login exitoso", "ADMIN"));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {
        Cookie cookie = new Cookie("token", null);
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        cookie.setMaxAge(0);
        response.addCookie(cookie);
        return ResponseEntity.ok("Sesión cerrada");
    }

    @GetMapping("/me")
    public ResponseEntity<?> me(@CookieValue(name = "token", required = false) String token) {
        if (token == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("No logueado");

        try {
            // Decodificar token
            AdminInfo adminInfo = adminAuthService.getAdminInfo();
            return ResponseEntity.ok(adminInfo);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token inválido");
        }
    }
}

package backend_inmobiliaria.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
public class SecurityConfig {

    private final JwtFilter jwtFilter;

    public SecurityConfig(JwtFilter jwtFilter) {
        this.jwtFilter = jwtFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .cors(cors -> {})
                .authorizeHttpRequests(auth -> auth
                        // ==============================
                        // 🔓 RUTAS PÚBLICAS
                        // ==============================
                        .requestMatchers("/api/admin/login", "/api/admin/logout", "/api/public/**").permitAll()
                        .requestMatchers("/uploads/**").permitAll()
                        // El cliente puede enviar mensaje sin autenticarse
                        .requestMatchers(HttpMethod.POST, "/api/contacts").permitAll()

                        // ==============================
                        // 🔒 RUTAS PROTEGIDAS (ADMIN)
                        // ==============================
                        .requestMatchers(HttpMethod.GET, "/api/contacts/**").authenticated()
                        .requestMatchers(HttpMethod.PUT, "/api/contacts/**").authenticated()
                        .requestMatchers(HttpMethod.DELETE, "/api/contacts/**").authenticated()
                        .requestMatchers("/api/admin/**").authenticated()

                        // ==============================
                        // 🔐 CUALQUIER OTRA RUTA
                        // ==============================
                        .anyRequest().permitAll()
                )
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
                .httpBasic(AbstractHttpConfigurer::disable);

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:5173", "http://localhost:5174"));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}

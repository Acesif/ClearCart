package com.asif.server.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsConfigurationSource;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;

import java.time.Duration;
import java.util.List;

@Configuration
public class CorsConfig {

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration api = new CorsConfiguration();
        api.setAllowedOrigins(List.of(
                "http://localhost:3000"
        ));
        api.setAllowedMethods(
                List.of("POST", "GET", "OPTIONS")
        );
        api.setAllowedHeaders(
                List.of("Authorization", "Content-Type")
        );
        api.setAllowCredentials(true);
        api.setMaxAge(Duration.ofHours(1));

        CorsConfiguration playground = new CorsConfiguration();
        playground.setAllowedOrigins(api.getAllowedOrigins());
        playground.setAllowedMethods(
                List.of("GET", "OPTIONS")
        );
        playground.setAllowedHeaders(
                List.of("Accept", "Content-Type", "Origin")
        );
        playground.setAllowCredentials(true);
        playground.setMaxAge(Duration.ofHours(1));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/api", api);
        source.registerCorsConfiguration("/playground/**", playground);

        return source;
    }
}


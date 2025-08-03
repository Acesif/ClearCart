package com.asif.server.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableReactiveMethodSecurity;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.SecurityWebFiltersOrder;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.security.web.server.authentication.AuthenticationWebFilter;
import org.springframework.security.web.server.util.matcher.ServerWebExchangeMatchers;

@Configuration
@EnableWebFluxSecurity
@EnableReactiveMethodSecurity
public class SecurityConfig {

    @Bean
    SecurityWebFilterChain springSecurityFilterChain(ServerHttpSecurity http, JwtReactiveAuthenticationManager authManager) {
        var authFilter = new AuthenticationWebFilter(authManager);
        authFilter.setServerAuthenticationConverter(new BearerTokenServerAuthenticationConverter());
        authFilter.setRequiresAuthenticationMatcher(ServerWebExchangeMatchers.pathMatchers("/graphql"));

        return http
                .csrf(ServerHttpSecurity.CsrfSpec::disable)
                .cors(c -> {})
                .httpBasic(ServerHttpSecurity.HttpBasicSpec::disable)
                .formLogin(ServerHttpSecurity.FormLoginSpec::disable)

                .authorizeExchange(ex -> ex
                        .pathMatchers(HttpMethod.POST, "/graphql").permitAll()
                        .pathMatchers(HttpMethod.GET, "/graphiql/**").permitAll()
                        .anyExchange().denyAll()
                )
                .addFilterAt(authFilter, SecurityWebFiltersOrder.AUTHENTICATION)
                .build();
    }

    @Bean
    BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}

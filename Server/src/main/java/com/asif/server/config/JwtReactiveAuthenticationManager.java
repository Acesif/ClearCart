package com.asif.server.config;

import com.asif.server.service.jwt.JwtService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.ReactiveAuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Optional;

@Configuration
public class JwtReactiveAuthenticationManager implements ReactiveAuthenticationManager {

    private final JwtService jwt;
    public JwtReactiveAuthenticationManager(JwtService jwt) {
        this.jwt = jwt;
    }

    @Override
    public Mono<Authentication> authenticate(Authentication authentication) {

        if (!(authentication instanceof RawBearerToken raw)) return Mono.empty();
        try {
            Jws<Claims> jws = jwt.parse(raw.getCredentials());
            String subject = Optional
                    .ofNullable(jws.getPayload().getSubject())
                    .orElseThrow(() -> new BadCredentialsException("missing sub"));

            List<?> rawRoles = jws.getPayload().get("roles", List.class);
            List<String> roles = rawRoles.stream()
                    .filter(String.class::isInstance)
                    .map(String.class::cast)
                    .toList();

            var authorities = roles.stream().map(r -> new SimpleGrantedAuthority("ROLE_" + r)).toList();
            return Mono.just(new UsernamePasswordAuthenticationToken(subject, jws, authorities));
        } catch (Exception e) {
            return Mono.error(new BadCredentialsException("Invalid token", e));
        }
    }
}

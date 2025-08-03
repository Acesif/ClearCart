package com.asif.server.service.jwt;

import com.asif.server.entity.Role;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Map;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Set;

@Service
public class JwtService {

    @Value("${jwt.hs256-secret}") private String secret;
    @Value("${jwt.issuer}") private String issuer;
    @Value("${jwt.audience}") private String audience;
    @Value("${jwt.expires-minutes}") private long expiresMinutes;

    private SecretKey key() {
        return Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }

    public String createToken(String subject, Set<Role> roles) {
        Instant now = Instant.now();
        return Jwts.builder()
                .subject(subject)
                .issuer(issuer)
                .audience().add(audience)
                .and()
                .issuedAt(Date.from(now))
                .expiration(Date.from(now.plus(expiresMinutes, ChronoUnit.MINUTES)))
                .claims(Map.of("roles", roles))
                .signWith(key())
                .compact();
    }

    public Jws<Claims> parse(String token) {
        return Jwts.parser()
                .verifyWith(key())
                .requireIssuer(issuer)
                .requireAudience(audience)
                .build().
                parseSignedClaims(token);
    }
}

package com.asif.server.config;

import com.asif.server.utils.GraphQLConstants;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.web.server.ServerAuthenticationEntryPoint;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.nio.charset.StandardCharsets;

@Component
public class GraphQLAuthenticationEntryPoint implements ServerAuthenticationEntryPoint {

    private static final String UNAUTHORIZED_RESPONSE = GraphQLConstants.UNAUTHORIZED_RESPONSE;

    @Override
    public Mono<Void> commence(ServerWebExchange exchange, org.springframework.security.core.AuthenticationException ex) {
        var response = exchange.getResponse();
        response.setStatusCode(HttpStatus.UNAUTHORIZED);
        response.getHeaders().setContentType(MediaType.APPLICATION_JSON);
        var buffer = response.bufferFactory().wrap(UNAUTHORIZED_RESPONSE.getBytes(StandardCharsets.UTF_8));
        return response.writeWith(Mono.just(buffer));
    }
}


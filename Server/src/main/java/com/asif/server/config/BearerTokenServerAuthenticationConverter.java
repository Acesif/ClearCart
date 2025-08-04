package com.asif.server.config;

import org.springframework.http.HttpHeaders;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.server.authentication.ServerAuthenticationConverter;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

public class BearerTokenServerAuthenticationConverter implements ServerAuthenticationConverter {
    @Override
    public Mono<Authentication> convert(ServerWebExchange exchange) {
        String auth = exchange.getRequest().getHeaders().getFirst(HttpHeaders.AUTHORIZATION);

        if (auth != null && auth.startsWith("Bearer ")) {
            String token = auth.substring(7);
            return Mono.just(new RawBearerToken(token));
        }
        String qp = exchange
                .getRequest()
                .getQueryParams()
                .getFirst("access_token");

        if (qp != null && !qp.isBlank()) {
            return Mono.just(new RawBearerToken(qp));
        }
        return Mono.empty();
    }
}

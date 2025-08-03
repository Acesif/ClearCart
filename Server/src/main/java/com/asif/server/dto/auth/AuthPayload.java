package com.asif.server.dto.auth;

import lombok.Builder;

@Builder
public record AuthPayload(String accessToken, long expiresInSeconds, UserDTO user) {

}

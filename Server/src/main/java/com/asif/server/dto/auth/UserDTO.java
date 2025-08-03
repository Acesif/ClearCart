package com.asif.server.dto.auth;

import lombok.Builder;

@Builder
public record UserDTO(String id, String username, String email) {

}


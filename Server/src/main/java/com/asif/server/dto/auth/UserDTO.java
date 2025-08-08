package com.asif.server.dto.auth;

import lombok.Builder;

@Builder
public record UserDTO(
        String id,
        String fullName,
        String firstName,
        String lastName,
        String email,
        String phoneNumber,
        String address,
        String password) {
}


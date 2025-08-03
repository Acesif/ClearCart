package com.asif.server.dto.auth;

import com.asif.server.entity.Role;
import lombok.Builder;

import java.util.Set;

@Builder
public record UserDTO(Long id, String username, String email, Set<Role> roles) {

}


package com.asif.server.utils;

import com.asif.server.dto.auth.UserInformation;
import org.springframework.security.core.Authentication;

import java.util.Set;
import java.util.stream.Collectors;

public class ExtractAuth {

    public static UserInformation extractUserInformation(Authentication authentication) {
        String userId = (String) authentication.getPrincipal();
        Set<String> roles = authentication.getAuthorities()
                .stream()
                .map(Object::toString)
                .collect(Collectors.toSet());
        return new UserInformation(userId, roles);
    }
}

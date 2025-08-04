package com.asif.server.dto.auth;

import java.util.Set;

public record UserInformation(String userId, Set<String> roles) {
}

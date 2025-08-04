package com.asif.server.controller;

import com.asif.server.dto.auth.*;
import com.asif.server.dto.commons.GenericResponse;
import com.asif.server.service.users.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import reactor.core.publisher.Mono;

@Controller
@RequiredArgsConstructor
public class AuthController {
    private final UserService userService;

    @MutationMapping
    @PreAuthorize("permitAll()")
    public Mono<GenericResponse<UserDTO>> signUp(@Argument SignUpInput signupInput) {
        return userService.signUp(signupInput);
    }

    @MutationMapping
    @PreAuthorize("permitAll()")
    public Mono<GenericResponse<AuthPayload>> login(@Argument LoginInput loginInput) {
        return userService.login(loginInput);
    }

    @QueryMapping
    @PreAuthorize("isAuthenticated() and hasAuthority('ROLE_USER')")
    public Mono<GenericResponse<UserDTO>> user(Authentication authentication) {
        return userService.getMyInfo(authentication);
    }
}

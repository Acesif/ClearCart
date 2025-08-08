package com.asif.server.controller;

import com.asif.server.dto.auth.*;
import com.asif.server.dto.commons.GenericResponse;
import com.asif.server.service.users.UserService;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BeanPropertyBindingResult;
import org.springframework.validation.BindingResult;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;
import reactor.core.publisher.Mono;

import java.util.Objects;
import java.util.Set;

@Controller
@RequiredArgsConstructor
public class AuthController {
    private final UserService userService;
    private final Validator validator;

    @MutationMapping
    @PreAuthorize("permitAll()")
    public Mono<GenericResponse<UserDTO>> signUp(@Argument @Valid SignUpInput signupInput) {
        if (signupInput != null) {
            return userService.signUp(signupInput);
        }
        return Mono.just(GenericResponse.<UserDTO>builder()
                .message("Failed to sign up")
                .build());
    }

    @MutationMapping
    @PreAuthorize("permitAll()")
    public Mono<GenericResponse<AuthPayload>> login(@Argument LoginInput loginInput) {
        return userService.login(loginInput);
    }

    @QueryMapping
    @PreAuthorize("isAuthenticated()")
    public Mono<GenericResponse<UserDTO>> user(Authentication authentication) {
        return userService.getMyInfo(authentication);
    }

    @MutationMapping
    @PreAuthorize("isAuthenticated()")
    public Mono<GenericResponse<UserDTO>> updateUser(
            @Argument @Valid UserDTO userDTO,
            Authentication authentication
    ) {
        return userService.updateUser(userDTO, authentication);
    }
}

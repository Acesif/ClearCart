package com.asif.server.controller;

import com.asif.server.dto.auth.*;
import com.asif.server.dto.commons.GenericResponse;
import com.asif.server.entity.auth.User;
import com.asif.server.service.users.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

import static com.asif.server.utils.ExtractAuth.extractUserInformation;

@Controller
@RequiredArgsConstructor
public class AuthController {
    private final UserService users;

    @MutationMapping
    @PreAuthorize("permitAll()")
    public Mono<GenericResponse<UserDTO>> signUp(@Argument SignUpInput signupInput) {
        return users.signUp(
                        signupInput.username(),
                        signupInput.email(),
                        signupInput.password()
        );
    }

    @MutationMapping
    @PreAuthorize("permitAll()")
    public Mono<GenericResponse<AuthPayload>> login(@Argument LoginInput loginInput) {
        return users.login(
                loginInput.username(),
                loginInput.password()
        );
    }

    @QueryMapping
    @PreAuthorize("isAuthenticated() and hasAuthority('ROLE_USER')")
    public Mono<GenericResponse<UserDTO>> user(Authentication authentication) {
        return Mono.fromCallable(() -> {

            UserInformation userInformation = extractUserInformation(authentication);
            User user = users.findById(userInformation.userId());
            if (user == null) {
                return GenericResponse.<UserDTO>builder()
                        .message("User not found")
                        .data(null)
                        .build();
            }
            UserDTO userDTO = UserDTO.builder()
                    .id(user.getId())
                    .username(user.getUsername())
                    .email(user.getEmail())
                    .build();

            return GenericResponse.<UserDTO>builder()
                    .message("User found")
                    .data(userDTO)
                    .build();

        }).subscribeOn(Schedulers.boundedElastic());
    }
}
